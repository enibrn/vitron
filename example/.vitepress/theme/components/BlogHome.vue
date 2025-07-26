<template>
  <div class="blog-home">
    <section
      v-if="newlyCreatedPosts.length > 0"
      class="blog-section"
    >
      <h2>Recently Created</h2>
      <div class="blog-posts">
        <article
          v-for="post in newlyCreatedPosts"
          :key="post.fileName"
          class="blog-post"
        >
          <h3>
            <a :href="post.link">{{ post.title }}</a>
          </h3>
          <p class="excerpt">{{ post.excerpt }}</p>
          <div class="meta">
            <time :datetime="new Date(post.createdTimestamp).toISOString()">
              {{ formatTimestamp(post.createdTimestamp) }}
            </time>
            <span class="breadcrumbs">{{ post.breadcrumbs.join(' > ') }}</span>
          </div>
        </article>
      </div>
    </section>

    <section
      v-if="newlyUpdatedPosts.length > 0"
      class="blog-section"
    >
      <h2>Recently Updated</h2>
      <div class="blog-posts">
        <article
          v-for="post in newlyUpdatedPosts"
          :key="post.fileName"
          class="blog-post"
        >
          <h3>
            <a :href="post.link">{{ post.title }}</a>
          </h3>
          <p class="excerpt">{{ post.excerpt }}</p>
          <div class="meta">
            <time :datetime="new Date(post.updatedTimestamp).toISOString()">
              {{ formatTimestamp(post.updatedTimestamp) }}
            </time>
            <span class="breadcrumbs">{{ post.breadcrumbs.join(' > ') }}</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import newlyCreatedPosts from '../../generated/newly-created-blog-posts.json';
import newlyUpdatedPosts from '../../generated/newly-updated-blog-posts.json';
import { useDateUtils } from '../composables/useDateUtils';

const { formatTimestamp } = useDateUtils();
</script>

<style scoped>
.blog-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.blog-section {
  margin-bottom: 3rem;
}

.blog-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.blog-posts {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.blog-post {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-post:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.blog-post h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
}

.blog-post h3 a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.blog-post h3 a:hover {
  text-decoration: underline;
}

.excerpt {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.breadcrumbs {
  font-style: italic;
}

@media (min-width: 768px) {
  .meta {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>