const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withNextra({
  reactStrictMode: true,
  swcMinify: true,
}) 