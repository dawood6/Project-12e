// const path = require("path");
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;

//   const { data } = await graphql(`
//     {
//       get_lollies {
//         getLollies {
//           colorOne
//           colorTwo
//           colorThree
//           link
//           sender
//           reciever
//           message
//         }
//       }
//     }
//   `);

//   data.get_lollies.getLollies.forEach((node) => {
//     createPage({
//       path: `lolly/${node.link}`,
//       component: path.resolve("./src/template/template.tsx"),
//       context: {
//         colorOne: node.colorOne,
//         colorTwo: node.colorTwo,
//         colorThree: node.colorThree,
//         link: node.link,
//         message: node.message,
//         sender: node.sender,
//         reciever: node.reciever,
//       },
//     });
//   });
// };
