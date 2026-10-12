from django.contrib import admin

from .models import Category, Comment, Like, Post, PostMedia, PostStatusHistory, PostTag, Tag


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
	list_display = ("__str__", "category", "status", "author", "updated_at")
	list_filter = ("status", "category", "allow_comments")
	search_fields = ("title_en", "title_bn", "slug")
	prepopulated_fields = {"slug": ("title_en",)}


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name", "slug", "updated_at")
	search_fields = ("name", "slug")
	prepopulated_fields = {"slug": ("name",)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
	list_display = ("name", "slug", "updated_at")
	search_fields = ("name", "slug")
	prepopulated_fields = {"slug": ("name",)}


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
	list_display = ("post", "display_author", "status", "created_at")
	list_filter = ("status", "created_at")
	search_fields = ("body", "guest_name", "guest_email", "user__username")

	@admin.display(description="Author")
	def display_author(self, obj):
		return obj.user or obj.guest_name


admin.site.register((Like, PostMedia, PostStatusHistory, PostTag))
