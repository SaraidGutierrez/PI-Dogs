import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { filterAZ, filterWeight, filterOrigin, getTemperaments, filterTemperament } from './redux/action';
import './css/NavBar.css'
import createImg from '../images/newDog.png'



  export const NavBar = () => {
    const dispatch = useDispatch();
    useEffect(()=> dispatch(getTemperaments()), [dispatch])
    const temperaments = useSelector((state) => state.temperaments);
   
 
    const [page, setPage] = useState(true)

    const [filters, setFilters] = useState({
      name: { order: "asc" },
      weight: { order: "asc" },
      origin: { order: "API" },
      temperament: []
    });
  
    const handleSortName = (e) => {
      e.preventDefault();
      const order = filters.name.order === "asc" ? "desc" : "asc";
      dispatch(filterAZ({ order }));
      setFilters({ ...filters, name: { order } });
    };
  
    const handleSortWeight= (e) => {
      e.preventDefault();
      const order = filters.weight.order === "asc" ? "desc" : "asc";
      dispatch(filterWeight({ order }));
      setFilters({ ...filters, weight: { order } });
    };
  
    const handleSelectChange = (e) => {
      e.preventDefault();
      const order = e.target.value;
      dispatch(filterOrigin({ order }));
      setFilters({ ...filters, origin: { order } });
    };
  
    const handleSelectTemperaments = (e) =>{
      if(filters.temperament.length<8){
           setFilters({
              ...filters,
              temperament: [
                ...filters.temperament,
                e.target.value,
              ]
           })
    }else{
      alert('Solo puedes filtrar un maximo de 8')
    }
  }

    const handleDelete = (e) => {
     
      setFilters({
        ...filters,
        temperament: filters.temperament.filter((el) => el !== e),
      });
    
    };

    function handleSubmitFilter(e) {
      e.preventDefault();
        dispatch(filterTemperament(filters.temperament))
        setPage(prevState => !prevState);
    }
  
 function handleReset(e){
    e.preventDefault();
    dispatch(filterAZ({ order: "asc" }))
    dispatch(filterOrigin({ order: "API" }))
    dispatch(filterTemperament([]))
    setFilters({...filters,temperament: []})

    
 }

    return (
      <div className='seccion'>
      <div className='fondo'>
        <div className='createDog'>
        <Link to="/create"><img src={createImg} className='dogimagen' alt='Perrito'/></Link>
        <Link to="/create"><button className='buttonDog'>Create a new breed!</button>  </Link>
        </div>
        <div className='filtrosCont'>
        <Link to="/home"><button className='boton-con-imagenHome'></button>  </Link>
          <button className="boton-con-imagen" onClick={handleSortName}>A-Z <br></br>Sort</button>
          <button className="boton-con-imagen2" onClick={handleSortWeight}>Weight <br></br>Sort</button>
        <div>

          
        </div>
          <select className='select2'name="origin" onChange={handleSelectChange}>  
            <option value="API">API</option>
            <option value="BD">Data Base</option>
            <option value="ALL">All Origins</option>
          </select>
          {temperaments.length > 0 && (
                <select
                    multiple
                   
                    onChange={handleSelectTemperaments}
                >
                    {temperaments.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                </select>
            )}
            {/* ---------------------*/}
            <button
                className='boton-con-imagen3'
                type="submit"
                onClick={(e) => handleSubmitFilter(e)}
                >
                Filter temperaments
              </button>
            <button
              className='boton-con-imagenReset'
              onClick={(e)=> handleReset(e)}
              type='reset'
            >
               
            </button>



        </div>
        <SearchBar />
       </div>
    
                <div>
                {/* ---------------------*/}
                {filters.temperament.map((el, i) => (
                    <button
                      className='buttons'
                      key={i}
                      type="reset"
                      onClick={() => handleDelete(el)}
                    >
                      {el} X
                    </button>
                ))}
            
                </div>  
        
      </div>
    );
  };
  