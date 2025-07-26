<template>
  <div class="blog-home">
    <BlogSection
      title="Recently Created"
      :posts="newlyCreatedPosts"
      timestamp-field="createdTimestamp"
    />

    <BlogSection
      title="Recently Updated"
      :posts="newlyUpdatedPosts"
      timestamp-field="updatedTimestamp"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import BlogSection from './BlogSection.vue';
import newlyCreatedPosts from '../../generated/newly-created-blog-posts.json';
import newlyUpdatedPosts from '../../generated/newly-updated-blog-posts.json';
</script>

<style scoped>
.blog-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>