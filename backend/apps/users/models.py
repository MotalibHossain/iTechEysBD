import uuid

from django.conf import settings
from django.db import models


class UserProfile(models.Model):
	id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
	user = models.OneToOneField(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="profile",
	)
	avatar = models.URLField(blank=True)
	bio = models.TextField(blank=True)
	website = models.URLField(blank=True)
	location = models.CharField(max_length=100, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		db_table = "user_profiles"

	def __str__(self):
		return self.user.get_full_name() or self.user.username
