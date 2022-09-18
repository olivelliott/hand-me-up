import './App.css';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';

import AllProducts from './pages/AllProducts';
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm'
import SubmitProduct from './pages/SubmitProduct'
import Cart from './pages/Cart'
import NoMatch from './pages/NoMatch';

import { Container } from '@chakra-ui/react'

function App() {
  const httpLink = createHttpLink({
    uri: '/graphql',
  });

  // Uncomment this when Auth/jwt is ready
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    // link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header />
          <Container my={5}>
            <Routes>
              <Route path='/' element={<AllProducts />} />
              <Route path='hero' element={<Hero />} />
              <Route path='/signup' element={<SignupForm />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/submit-product' element={<SubmitProduct />} />
              <Route path='/my-cart' element={<Cart />} />
              <Route path='*' element={<NoMatch />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
