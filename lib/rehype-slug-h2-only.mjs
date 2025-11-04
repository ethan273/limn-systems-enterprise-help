import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { hasProperty } from 'hast-util-has-property'
import { headingRank } from 'hast-util-heading-rank'
import slugFunction from 'github-slugger'

const slugs = new slugFunction()

/**
 * Custom rehype plugin to add IDs only to h2-h6 headings, excluding h1
 * This prevents h1 from showing up in the TOC
 */
export default function rehypeSlugH2Plus() {
  return (tree) => {
    slugs.reset()

    visit(tree, 'element', (node) => {
      const rank = headingRank(node)

      // Only add IDs to h2, h3, h4, h5, h6 - skip h1
      if (rank && rank >= 2 && rank <= 6 && !hasProperty(node, 'id')) {
        node.properties.id = slugs.slug(toString(node))
      }
    })
  }
}
