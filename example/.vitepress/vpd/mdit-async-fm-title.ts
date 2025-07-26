import matter from 'gray-matter';

interface MditAsyncFmTitleOptions {
  exclude?: string[];
  titleKey?: string;
}

interface MarkdownEnv {
  path?: string;
  [key: string]: any;
}

interface MarkdownIt {
  renderAsync: (src: string, env?: MarkdownEnv) => Promise<string>;
  [key: string]: any;
}

const mditAsyncFmTitleFn = (md: MarkdownIt, options: MditAsyncFmTitleOptions = {}): void => {
  const exclude: string[] = options.exclude || [];
  const titleKey: string = options.titleKey || 'title';

  const originalRenderAsync = md.renderAsync.bind(md);
    
  md.renderAsync = async (src: string, env?: MarkdownEnv): Promise<string> => {
    // Exclude paths if specified
    if (env?.path && exclude.some((p: string) => env.path!.includes(p))) {
      return await originalRenderAsync(src, env);
    }

    const { data, content } = matter(src);
    const title: string = data[titleKey];
    
    let processedSrc: string = src;
    if (title) {
      // Check if content already starts with an H1 title
      const trimmedContent: string = content.trim();
      const hasH1Title: boolean = trimmedContent.startsWith('# ');
      
      // Only add title if content doesn't already have an H1
      if (!hasH1Title) {
        const titleHeader: string = `# ${title}\n\n`;
        const newContent: string = titleHeader + content;
        processedSrc = matter.stringify(newContent, data);
      }
    }
    
    return await originalRenderAsync(processedSrc, env);
  };
};

export default mditAsyncFmTitleFn;
