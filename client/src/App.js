import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import { NavBar } from './components/NavBar';
import { useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import Home from './components/Home.jsx'
import { getAllDogsfunc } from './components/redux/action';
import Detail from './components/Detail';
import FormNewDog from './components/FormNewDog'



function App() {
  //const dogsShown = useSelector(state=>state.showingDogs)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDogsfunc());
  }, [dispatch]);

  const location = useLocation()
  const navigate = useNavigate()
  const [access, setAccess] = useState(false)

  

  const login =() =>{
    
      setAccess(true)
      navigate('/home')
    
  }
  useEffect(() => {
    !access && navigate('/');
  }, [access]);
  
 




  return (
    
      <div>
       
        {location.pathname === '/'
        ? <LandingPage login={login}/>
        : <NavBar />}
      

      <Routes> 
        <Route path='/home' element={<Home />} />
        <Route path= '/dogs/:idRaza' element={<Detail/>} />
        <Route path= '/create' element={<FormNewDog/>} />
      </Routes>
      </div>
    
   
    
    
  );
}

export default App;
