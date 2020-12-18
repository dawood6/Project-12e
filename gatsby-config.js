module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GCMS",
        fieldName: "get_lollies",
        url: "https://virtualLolly-dawood/.netlify/functions/lollies",
      },
    },
  ],
}; //virtualLolly-dawood
