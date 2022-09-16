import './App.css';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import { PhotoDrop, LoginForm, SignupForm, SubmitProduct } from './pages/PhotoDrop';

function App() {
  const httpLink = createHttpLink({
    uri: '/graphql',
  });

  // Uncomment this when Auth/jwt is ready
  // const authLink = setContext((_, { headers }) => {
  //   const token = localStorage.getItem('id_token');
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : '',
  //     },
  //   };
  // });

  const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<AllProducts />} />
              <Route path='/signup' element={<SignupForm />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/submit-product' element={<SubmitProduct />} />
              <Route path='/my-cart' element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
