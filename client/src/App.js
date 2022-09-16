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
import Hero from './components/Hero';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import { PhotoDrop } from './pages/PhotoDrop';

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
          <div>
            <Routes>
              {/* routes to pages go here */}
              <Route path='/' element={<Hero />} />
              <Route path='/signup' element={<SignupForm />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/photodrop' element={<PhotoDrop />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
