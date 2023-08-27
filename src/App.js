import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Signup from './routes/Signup/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './routes/Profile/Profile';
import Timeline from './routes/Happier/Timeline';
import Reply from './routes/Reply/Reply';


function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Happier'
          element={
            <ProtectedRoute>
              <Timeline />
            </ProtectedRoute>
          }>
        </Route>
        <Route path='/Happier/login' element={<Login />}></Route>
        <Route path='/Happier/signup' element={<Signup />}></Route>
        <Route path='/Happier/:id' element={<Profile />}></Route>
        <Route path='/Happier/reply/:postId' element={<Reply />}></Route>

      </Routes>
    </>
  );
}

export default App;
