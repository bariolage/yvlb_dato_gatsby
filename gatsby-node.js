const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

/* exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "DatoCmsTheme") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value
    })
  }
} */

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allDatoCmsTheme {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }
        result.data.allDatoCmsTheme.edges.forEach(({ node }) => {
          createPage({
            path: node.slug,
            component: path.resolve(`./src/templates/album.js`),
            context: { id: node.id }
          })
        })
      })
    )
  })
}