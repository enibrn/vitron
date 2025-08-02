<template>
  <div class="blog-home">
    <BlogSection
      title="Recently Created"
      :posts="newlyCreatedBlogPosts"
      timestamp-field="createdTimestamp"
    />

    <BlogSection
      title="Recently Updated"
      :posts="newlyUpdatedBlogPosts"
      timestamp-field="updatedTimestamp"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import BlogSection from './BlogSection.vue';
import { useData } from 'vitepress';
const { theme } = useData();

const newlyCreatedBlogPosts = theme.value.newlyCreatedBlogPosts || [];
const newlyUpdatedBlogPosts = theme.value.newlyUpdatedBlogPosts || [];
</script>

<style scoped>
.blog-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>