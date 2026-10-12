import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q


class Category(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=100, unique=True)
	slug = models.SlugField(max_length=120, unique=True)
	description = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		db_table = "blog_categories"
		ordering = ["name"]

	def __str__(self):
		return self.name


class Tag(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=60, unique=True)
	slug = models.SlugField(max_length=80, unique=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		db_table = "blog_tags"
		ordering = ["name"]

	def __str__(self):
		return self.name


class Post(models.Model):
	class Status(models.TextChoices):
		DRAFT = "DRAFT", "Draft"
		AI_GENERATED = "AI_GENERATED", "AI generated"
		IN_REVIEW = "IN_REVIEW", "In review"
		APPROVED = "APPROVED", "Approved"
		SCHEDULED = "SCHEDULED", "Scheduled"
		PUBLISHED = "PUBLISHED", "Published"

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	author = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.PROTECT,
		related_name="blog_posts",
	)
	category = models.ForeignKey(
		Category,
		on_delete=models.PROTECT,
		related_name="posts",
	)
	tags = models.ManyToManyField(Tag, through="PostTag", related_name="posts", blank=True)
	title_en = models.CharField(max_length=200, blank=True)
	title_bn = models.CharField(max_length=200, blank=True)
	slug = models.SlugField(max_length=220, unique=True)
	excerpt_en = models.TextField(blank=True)
	excerpt_bn = models.TextField(blank=True)
	content_en = models.JSONField(default=list, blank=True)
	content_bn = models.JSONField(default=list, blank=True)
	seo_title_en = models.CharField(max_length=160, blank=True)
	seo_title_bn = models.CharField(max_length=160, blank=True)
	seo_description_en = models.CharField(max_length=320, blank=True)
	seo_description_bn = models.CharField(max_length=320, blank=True)
	status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
	allow_comments = models.BooleanField(default=True)
	reviewed_by = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.SET_NULL,
		related_name="reviewed_blog_posts",
		null=True,
		blank=True,
	)
	reviewed_at = models.DateTimeField(null=True, blank=True)
	scheduled_at = models.DateTimeField(null=True, blank=True)
	published_at = models.DateTimeField(null=True, blank=True)
	view_count = models.PositiveBigIntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		db_table = "blog_posts"
		indexes = [
			models.Index(fields=["status", "created_at"]),
			models.Index(fields=["category", "status"]),
			models.Index(fields=["author", "status"]),
		]

	def clean(self):
		errors = {}
		if self.status == self.Status.SCHEDULED and not self.scheduled_at:
			errors["scheduled_at"] = "Scheduled posts require a scheduled time."
		if self.status == self.Status.PUBLISHED:
			if not self.reviewed_by or not self.reviewed_at:
				errors["reviewed_by"] = "Published posts require a recorded human review."
			if not (self.title_en or self.title_bn):
				errors["title_en"] = "Published posts require a title in at least one language."
			if not (self.content_en or self.content_bn):
				errors["content_en"] = "Published posts require content in at least one language."
		if errors:
			raise ValidationError(errors)

	def __str__(self):
		return self.title_en or self.title_bn or self.slug


class PostTag(models.Model):
	id = models.BigAutoField(primary_key=True)
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_tags")
	tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="post_tags")

	class Meta:
		db_table = "blog_post_tags"
		constraints = [
			models.UniqueConstraint(fields=["post", "tag"], name="unique_blog_post_tag"),
		]


class PostMedia(models.Model):
	class Role(models.TextChoices):
		HERO = "HERO", "Hero"
		GALLERY = "GALLERY", "Gallery"
		INLINE = "INLINE", "Inline"

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="media")
	url = models.URLField()
	role = models.CharField(max_length=10, choices=Role.choices, default=Role.INLINE)
	alt_en = models.CharField(max_length=255, blank=True)
	alt_bn = models.CharField(max_length=255, blank=True)
	caption_en = models.TextField(blank=True)
	caption_bn = models.TextField(blank=True)
	position = models.PositiveIntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "blog_post_media"
		ordering = ["position", "created_at"]
		indexes = [models.Index(fields=["post", "role", "position"])]


class Comment(models.Model):
	class Status(models.TextChoices):
		PENDING = "PENDING", "Pending"
		APPROVED = "APPROVED", "Approved"
		REJECTED = "REJECTED", "Rejected"
		SPAM = "SPAM", "Spam"

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.SET_NULL,
		related_name="blog_comments",
		null=True,
		blank=True,
	)
	guest_name = models.CharField(max_length=120, blank=True)
	guest_email = models.EmailField(blank=True)
	parent = models.ForeignKey(
		"self",
		on_delete=models.CASCADE,
		related_name="replies",
		null=True,
		blank=True,
	)
	body = models.TextField()
	status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		db_table = "blog_comments"
		ordering = ["-created_at"]
		indexes = [
			models.Index(fields=["post", "status", "created_at"]),
			models.Index(fields=["parent", "status"]),
		]
		constraints = [
			models.CheckConstraint(
				condition=(
					Q(user__isnull=False, guest_name="", guest_email="")
					| Q(user__isnull=True, guest_name__gt="", guest_email__gt="")
				),
				name="valid_comment_identity",
			),
		]

	def clean(self):
		if self.user_id and (self.guest_name or self.guest_email):
			raise ValidationError("Registered comments cannot include guest identity fields.")
		if not self.user_id and (not self.guest_name or not self.guest_email):
			raise ValidationError("Guest comments require a name and email address.")
		if self.parent_id and self.parent_id == self.id:
			raise ValidationError("A comment cannot be its own parent.")
		if self.parent_id and self.parent and self.parent.parent_id:
			raise ValidationError("Replies can only be one level deep.")


class Like(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="blog_likes",
	)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "blog_likes"
		constraints = [
			models.UniqueConstraint(fields=["user", "post"], name="unique_blog_like"),
		]
		indexes = [models.Index(fields=["post", "created_at"])]


class PostStatusHistory(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="status_history")
	actor = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.PROTECT,
		related_name="blog_status_changes",
	)
	from_status = models.CharField(max_length=20, choices=Post.Status.choices, blank=True)
	to_status = models.CharField(max_length=20, choices=Post.Status.choices)
	note = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "blog_post_status_history"
		ordering = ["-created_at"]
		indexes = [models.Index(fields=["post", "created_at"])]
