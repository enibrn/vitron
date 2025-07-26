import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import type { UserConfig, DefaultTheme } from 'vitepress';

import { DendronNodesImporter } from './dendron-nodes-importer';
import { ConfigBuilder } from './config-builder';
import { ThemeDataProvider, type ThemeConfig } from './theme-data-provider';

import markdownItWikilinksFn from 'markdown-it-wikilinks';
import mditAsyncFmTitleFn from './mdit-async-fm-title';

export interface VpdConfig {
  title: string;
  baseUrl?: string;
  srcDir?: string; //Source directory is where your Markdown source files live
  rootDir?: string; //Project root is where VitePress will try to look for the .vitepress special directory
  lastCreatedItemsToTake?: number;
  lastUpdatedItemsToTake?: number;
  maxExcerptLength?: number;
};

export async function Vpd(
  config: VpdConfig): Promise<UserConfig<NoInfer<DefaultTheme.Config>>> {
  // resolve config
  const docsPath = path.join(config.rootDir || '', config.srcDir || '');  
  const dendronNodeImporter = new DendronNodesImporter(docsPath);
  const configBuilder = new ConfigBuilder(dendronNodeImporter);
  await configBuilder.resolveConfig();

  // theme config
  const themeConfig: ThemeConfig = {
    lastCreatedItemsToTake: config.lastCreatedItemsToTake || 5,
    lastUpdatedItemsToTake: config.lastUpdatedItemsToTake || 5,
    maxExcerptLength: config.maxExcerptLength || 200
  };
  const themeDataProvider = new ThemeDataProvider(
    themeConfig, configBuilder.leafNodes);
  await themeDataProvider.resolveThemeData();

  // write the theme data to be used in the theme
  const generatedDataDir = path.join(config.rootDir || '', '.vitepress', 'generated');
  await mkdir(generatedDataDir, { recursive: true });
  const writeMyDataFile = async (fileName: string, data: any) => {
    await writeFile(`${generatedDataDir}/${fileName}.json`, JSON.stringify(data, null, 2), 'utf-8');
  };
  await writeMyDataFile('redirects', themeDataProvider.redirects);
  await writeMyDataFile('newly-created-blog-posts', themeDataProvider.newlyCreatedBlogPosts);
  await writeMyDataFile('newly-updated-blog-posts', themeDataProvider.newlyUpdatedBlogPosts);

  // Write the index file needed for VitePress to render the home page
  const indexFilePath =  path.join(docsPath, 'index.md');
  const indexFileContent = `---
layout: home
---
<BlogHome/>`;
  await writeFile(indexFilePath, indexFileContent);

  // return the VitePress configuration
  const result = {
    title: config.title,
    themeConfig: {
      nav: configBuilder.nav,
      sidebar: configBuilder.sidebar,
      search: {
        provider: 'local'
      }
    },
    markdown: {
      config: (md) => {
        const options = {
          postProcessLabel: (label: string | number) =>
            configBuilder.linksVocabulary[label] ?? label
        };
        md.use(markdownItWikilinksFn(options));
        md.use(mditAsyncFmTitleFn);
      }
    },
    srcExclude: configBuilder.srcExclude
  } as UserConfig<NoInfer<DefaultTheme.Config>>; // type assertion to match VitePress config type

  if (config.baseUrl) {
    result.base = config.baseUrl;
  }

  if (config.srcDir) {
    result.srcDir = config.srcDir;
  }

  return result;
};
