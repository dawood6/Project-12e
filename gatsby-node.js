const path = require("path");
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      get_lollies {
        getLollies {
          colorOne
          colorTwo
          colorThree
          link
          sender
          reciever
          message
        }
      }
    }
  `);

  data.get_lollies.getLollies.forEach((node) => {
    createPage({
      path: `lolly/${node.link}`,
      component: path.resolve("./src/template/template.tsx"),
      context: node
    });
  });
};
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/lolly/)) {
    page.matchPath = "/lolly/*";
    createPage(page);
  }
};
