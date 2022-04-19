import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../../client/src/utils/auth";

import Header from "./components/Header";
import Menu from "./components/Menu";
import EventDetails from "./components/EventDetails";
import Footer from "./components/Footer";

import MyPlanner from "./pages/MyPlanner";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// establish a link to the graphql server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// protects the MyPlanner page by redirecting users to Login page if not signed in
const PrivateRoute = ({ children }) => {
  return Auth.loggedIn() ? children : <Navigate to="/login" />;
}
// redirects users to their planner when going to the homepage or "/"
const UserRedirect = ({ children }) => {
  return Auth.loggedIn() ? <Navigate to="/myplanner" /> : children;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
          <Header />
          <Menu />
            <Routes>
              <Route path="/" element={
                <UserRedirect>
                  <Homepage />
                </UserRedirect>
                } 
              />
              <Route path="/myplanner" element={ 
                <PrivateRoute>
                  <MyPlanner />
                </PrivateRoute>
                }
              />
              <Route path="/myplanner/event/:id" element={ 
                <PrivateRoute>
                  <EventDetails />
                </PrivateRoute>
                } 
              />
              <Route path="/signup" element={ <Signup />} />
              <Route path="/login" element={ <Login />} />
            </Routes>
          <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
