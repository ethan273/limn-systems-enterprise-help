import nextra from 'nextra'
import rehypeSlug from 'rehype-slug'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    rehypePlugins: [rehypeSlug]
  }
})

export default withNextra({
  reactStrictMode: true,
})
