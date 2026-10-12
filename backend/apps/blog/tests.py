from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.test import TestCase

from .models import Category, Comment, Like, Post, PostTag, Tag


class BlogModelTests(TestCase):
	def setUp(self):
		user_model = get_user_model()
		self.author = user_model.objects.create_user(username="author", password="test-pass")
		self.reviewer = user_model.objects.create_user(username="reviewer", password="test-pass")
		self.category = Category.objects.create(name="Technology", slug="technology")
		self.tag = Tag.objects.create(name="Django", slug="django")
		self.post = Post.objects.create(
			author=self.author,
			category=self.category,
			title_en="A bilingual post",
			slug="a-bilingual-post",
			content_en=[{"type": "paragraph", "text": "Content"}],
		)

	def test_published_post_requires_human_review_and_content(self):
		self.post.status = Post.Status.PUBLISHED
		with self.assertRaises(ValidationError):
			self.post.full_clean()

		self.post.reviewed_by = self.reviewer
		self.post.reviewed_at = self.post.updated_at
		self.post.full_clean()

	def test_guest_comment_requires_identity(self):
		comment = Comment(post=self.post, body="Useful article")
		with self.assertRaises(ValidationError):
			comment.full_clean()

		comment.guest_name = "Guest Reader"
		comment.guest_email = "guest@example.com"
		comment.full_clean()

	def test_registered_comment_cannot_include_guest_identity(self):
		comment = Comment(
			post=self.post,
			user=self.author,
			guest_name="Guest Reader",
			body="Useful article",
		)
		with self.assertRaises(ValidationError):
			comment.full_clean()

	def test_replies_are_limited_to_one_level(self):
		root = Comment.objects.create(
			post=self.post,
			user=self.author,
			body="Root comment",
		)
		reply = Comment.objects.create(
			post=self.post,
			user=self.reviewer,
			parent=root,
			body="First reply",
		)
		nested_reply = Comment(
			post=self.post,
			user=self.author,
			parent=reply,
			body="Nested reply",
		)
		with self.assertRaises(ValidationError):
			nested_reply.full_clean()

	def test_post_tags_and_likes_are_unique(self):
		PostTag.objects.create(post=self.post, tag=self.tag)
		with self.assertRaises(IntegrityError):
			PostTag.objects.create(post=self.post, tag=self.tag)

		Like.objects.create(post=self.post, user=self.author)
		with self.assertRaises(IntegrityError):
			Like.objects.create(post=self.post, user=self.author)
