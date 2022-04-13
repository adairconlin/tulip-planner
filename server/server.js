const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
    // create new Apollo server and pass in our schema data
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // every request performs an auth check; updated req obj will be passed as the `context`
        context: authMiddleware
    });

    await server.start();
    // integrate Apollo server with Express application as middleware
    server.applyMiddleware({ app });

    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static assets
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "./public/404.html"));
});

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}.`);
    });
});