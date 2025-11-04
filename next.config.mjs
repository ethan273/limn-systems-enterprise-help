import nextra from 'nextra'
import rehypeSlugH2Plus from './lib/rehype-slug-h2-only.mjs'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    rehypePlugins: [
      // Only add IDs to h2-h6 headings, excluding h1 to prevent duplicate TOC entries
      rehypeSlugH2Plus,
    ]
  }
})

export default withNextra({
  reactStrictMode: true,
})
