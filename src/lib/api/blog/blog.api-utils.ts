/* eslint-disable @typescript-eslint/no-explicit-any */
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Element } from 'rehype-autolink-headings/lib';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { Plugin, Preset, Processor, unified } from 'unified';

let p: ReturnType<typeof getParserPre> | undefined;

export const getParserPre = async (): Promise<Processor> =>
  unified()
    .use(remarkParse as Preset)
    .use(remarkRehype as Preset)
    .use(remarkGfm as Preset)
    .use(rehypeStringify as Preset)
    .use(rehypeSlug as Preset)
    .use(rehypeAutolinkHeadings as unknown as Plugin<any>, {
      content: (arg: Element) => ({
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#${arg.properties?.id}`,
          style: 'margin-right: 10px',
        },
        children: [{ type: 'text', value: '#' }],
      }),
    }) as unknown as Promise<Processor>;

export const getParser = (): Promise<Processor> => {
  if (!p) {
    p = getParserPre().catch((e) => {
      p = undefined;
      throw e;
    });
  }
  return p;
};
