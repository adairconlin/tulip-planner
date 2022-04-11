import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import Header from "./components/Header";
import Footer from "./components/Footer";

import MyPlanner from "./pages/MyPlanner";
import Homepage from "./pages/Homepage";

// establish a link to the graphql server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Homepage />
      <MyPlanner />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
