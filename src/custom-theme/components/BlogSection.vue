<template>
  <section
    v-if="posts.length > 0"
    class="blog-section"
  >
    <h2>{{ title }}</h2>
    <div class="blog-posts">
      <article
        v-for="post in posts"
        :key="post.fileName"
        class="blog-post"
      >
        <h3>
          <a :href="withBase(post.link)">{{ post.title }}</a>
        </h3>
        <p class="excerpt">{{ post.excerpt }}</p>
        <div class="meta">
          <time :datetime="new Date(getTimestamp(post)).toISOString()">
            {{ formatTimestamp(getTimestamp(post)) }}
          </time>
          <span class="breadcrumbs">{{ post.breadcrumbs.join(' > ') }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script
  setup
  lang="ts"
>
import { useDateUtils } from '../composables/useDateUtils';
import { withBase } from 'vitepress';

interface BlogPost {
  fileName: string;
  title: string;
  excerpt: string;
  link: string;
  breadcrumbs: string[];
  createdTimestamp: number;
  updatedTimestamp: number;
}

interface Props {
  title: string;
  posts: BlogPost[];
  timestampField: 'createdTimestamp' | 'updatedTimestamp';
}

const props = defineProps<Props>();
const { formatTimestamp } = useDateUtils();

const getTimestamp = (post: BlogPost): number => {
  return post[props.timestampField];
};
</script>

<style scoped>
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