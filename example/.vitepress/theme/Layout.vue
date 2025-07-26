<template>
  <Layout>
    <template
      #aside-top
      v-if="frontmatter.Layout !== 'home'"
    >
      <AsideTable
        :created-timestamp="frontmatter.created"
        :updated-timestamp="frontmatter.updated"
        :uid="frontmatter.id"
      />
    </template>
  </Layout>
</template>

<script
  setup
  lang="ts"
>
import DefaultTheme from 'vitepress/theme';
import { inBrowser, useData, useRouter, withBase } from 'vitepress';
import AsideTable from './components/AsideTable.vue';
import { watch, computed, onMounted } from 'vue';
import redirects from '../generated/redirects.json';

const { Layout } = DefaultTheme;
const { page, frontmatter, site } = useData();
const { go, route } = useRouter();

watch(
  () => page.value.isNotFound,
  (isNotFound) => {
    if (!isNotFound || !inBrowser) return;

    const guid = extractGuidFromRoute();
    if (!guid) return;

    const redirect = redirects[guid];
    if (!redirect) return;

    const redirectPath = withBase('/' + redirect);
    go(redirectPath);
  },
  { immediate: true }
);

function extractGuidFromRoute() {
  const baseUrl = site.value.base; //to be tested without baseUrl
  const pathWithoutBase = route.path.replace(new RegExp(`^${baseUrl}`), '/')

  const guidMatch = pathWithoutBase.match(/\/([\w-]+)\.html$/)
  return guidMatch ? guidMatch[1] : null;
}

</script>