import path from 'path';
import type { UserConfig, DefaultTheme } from 'vitepress';

import { DendronNodesImporter } from './dendron-nodes-importer';
import { ConfigBuilder } from './config-builder';
import { ThemeDataProvider, type ThemeConfig } from './theme-data-provider';

import markdownItWikilinksFn from 'markdown-it-wikilinks';
import mditAsyncFmTitleFn from './mdit-async-fm-title';

export interface VitronOptions {
  title: string;
  baseUrl?: string;
  srcDir?: string; //Source directory is where your Markdown source files live
  rootDir?: string; //Project root is where VitePress will try to look for the .vitepress special directory
  lastCreatedItemsToTake?: number;
  lastUpdatedItemsToTake?: number;
  maxExcerptLength?: number;
};

export async function VitronConfigGenerator(
  options: VitronOptions): Promise<UserConfig<NoInfer<DefaultTheme.Config>>> {
  // resolve config
  const docsPath = path.join(options.rootDir || '', options.srcDir || '');  
  const dendronNodeImporter = new DendronNodesImporter(docsPath);
  const configBuilder = new ConfigBuilder(dendronNodeImporter);
  await configBuilder.resolveConfig();

  // theme config
  const themeConfig: ThemeConfig = {
    lastCreatedItemsToTake: options.lastCreatedItemsToTake || 5,
    lastUpdatedItemsToTake: options.lastUpdatedItemsToTake || 5,
    maxExcerptLength: options.maxExcerptLength || 200
  };
  const themeDataProvider = new ThemeDataProvider(
    themeConfig, configBuilder.leafNodes);
  await themeDataProvider.resolveThemeData();

  // return the VitePress configuration
  const result = {
    title: options.title,
    themeConfig: {
      nav: configBuilder.nav,
      sidebar: configBuilder.sidebar,
      search: {
        provider: 'local'
      },
      redirects: themeDataProvider.redirects,
      newlyCreatedBlogPosts: themeDataProvider.newlyCreatedBlogPosts,
      newlyUpdatedBlogPosts: themeDataProvider.newlyUpdatedBlogPosts,
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

  if (options.baseUrl) result.base = options.baseUrl;
  if (options.srcDir) result.srcDir = options.srcDir;

  return result;
};
