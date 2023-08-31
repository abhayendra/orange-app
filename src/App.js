import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import GetRepoList from './Components/GetRepoList';
import RepoDetail from './Components/GetRepoDetails';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message, location, path }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:3001/graphql' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router> 
        <Routes>
          <Route path="/" element={<GetRepoList />} /> 
           <Route path="/repo/:owner/:repoName" element={<RepoDetail />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
