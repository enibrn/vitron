import { writeFile, mkdir } from 'fs/promises';
import { HNode } from './types';

export class VitePressDataLoader {
  private readonly vitepressDir: string;

  constructor(vitepressDir: string = '.vitepress') {
    this.vitepressDir = vitepressDir;
  }

  async writeDataFiles(
    redirects: Record<string, string>,
    newlyCreatedBlogPosts: HNode.BlogPost[],
    newlyUpdatedBlogPosts: HNode.BlogPost[]
  ): Promise<void> {
    await mkdir(this.vitepressDir, { recursive: true });

    await this.writeRedirectsData(redirects);
    await this.writeNewlyCreatedBlogPostsData(newlyCreatedBlogPosts);
    await this.writeNewlyUpdatedBlogPostsData(newlyUpdatedBlogPosts);
  }

  private async writeRedirectsData(redirects: Record<string, string>): Promise<void> {
    const content = `import { defineLoader } from 'vitepress'

declare const data: Record<string, string>
export { data }

export default defineLoader({
  watch: ['../packages/vpd-generator/src/**'],
  load(): Record<string, string> {
    return ${JSON.stringify(redirects, null, 2)}
  }
})
`;
    await writeFile(`${this.vitepressDir}/redirects.data.ts`, content, 'utf-8');
  }

  private async writeNewlyCreatedBlogPostsData(blogPosts: HNode.BlogPost[]): Promise<void> {
    const content = `import { defineLoader } from 'vitepress'
import type { HNode } from '../packages/vpd-generator/src/types'

declare const data: HNode.BlogPost[]
export { data }

export default defineLoader({
  watch: ['../packages/vpd-generator/src/**'],
  load(): HNode.BlogPost[] {
    return ${JSON.stringify(blogPosts, null, 2)}
  }
})
`;
    await writeFile(`${this.vitepressDir}/newly-created-blog-posts.data.ts`, content, 'utf-8');
  }

  private async writeNewlyUpdatedBlogPostsData(blogPosts: HNode.BlogPost[]): Promise<void> {
    const content = `import { defineLoader } from 'vitepress'
import type { HNode } from '../packages/vpd-generator/src/types'

declare const data: HNode.BlogPost[]
export { data }

export default defineLoader({
  watch: ['../packages/vpd-generator/src/**'],
  load(): HNode.BlogPost[] {
    return ${JSON.stringify(blogPosts, null, 2)}
  }
})
`;
    await writeFile(`${this.vitepressDir}/newly-updated-blog-posts.data.ts`, content, 'utf-8');
  }
}