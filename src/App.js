import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Header from './components/Header/Header';
import Home from './routes/Home/Home';
import Happier from './routes/Happier/Happier';
import Login from './routes/Login/Login';
import Signup from './routes/Signup/Signup';

function App() {
  const user = true
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Happier' element={user ? <Happier /> : <Login />}></Route>
        <Route path='/Happier/login' element={<Login />}></Route>
        <Route path='/Happier/signup' element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
