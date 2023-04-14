import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { filterAZ, filterWeight, filterOrigin, getTemperaments, filterTemperament } from './redux/action';



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
           setFilters({
              ...filters,
              temperament: [
                ...filters.temperament,
                e.target.value,
              ]
           })
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
  


    return (
      <div>
        <Link to="/create"><button>Create a new dog</button></Link>
        <div>
          <button onClick={handleSortName}>A-Z Sort</button>
          <button onClick={handleSortWeight}>Weight Sort</button>
          <select name="origin" onChange={handleSelectChange}>  
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
                    <option key={t.id} value={t.name}>
                        {t.name}
                    </option>
                    ))}
                </select>
            )}
            <div>
            {/* ---------------------*/}
            {filters.temperament.map((el, i) => (
                <button
                  
                  key={i}
                  type="reset"
                  onClick={() => handleDelete(el)}
                >
                  {el} X
                </button>
            ))}
        
            </div>
            {/* ---------------------*/}
            <button
          
                type="submit"
                onClick={(e) => handleSubmitFilter(e)}
              >
                Filter temperaments
              </button>



            {/* ---------------------*/}




        </div>
        <SearchBar />
        <div>NavBar</div>
      </div>
    );
  };
  