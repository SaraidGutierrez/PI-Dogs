import { getAllDogsfunc } from './redux/action';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsGenerator from './CardsGenerator';
import './css/Home.css'
import { useLocation } from 'react-router-dom';


const Home = () => {
  const dispatch = useDispatch();

 

 

  useEffect(() => {
    dispatch(getAllDogsfunc());
  }, [dispatch]); 

  const dogsShown = useSelector(state => state.showingDogs);
   const numberOfResults = dogsShown.length
  // PAGINADO //
  const ITEMS_PER_PAGE = 8;
  const [datosPaginados, setDatosPaginado] = useState(dogsShown);
  const [dogsPPage, setDogsPPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setDatosPaginado(dogsShown);
    setDogsPPage(dogsShown.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(0);
  }, [dogsShown]);

  // Función para manejar el evento de "Siguiente" en la paginación
  const nextHandler = () => {
    // Calculamos el número total de páginas redondeando hacia arriba la cantidad de elementos totales dividido por los elementos por página
    const totalPages = Math.ceil(datosPaginados.length / ITEMS_PER_PAGE);

    // Si ya estamos en la última página, salimos de la función sin hacer nada
    if (currentPage + 1 >= totalPages) return;

    // Calculamos los índices de la página siguiente
    const firstIndex = (currentPage + 1) * ITEMS_PER_PAGE;
    const lastIndex = Math.min(firstIndex + ITEMS_PER_PAGE, datosPaginados.length);
    // Actualizamos el estado de los elementos por página y la página actual
    setDogsPPage(datosPaginados.slice(firstIndex, lastIndex));
    setCurrentPage(currentPage + 1);
  };

  const prevHandler = () => {
    // Si la página actual es menor o igual a 0, no hay más páginas anteriores para mostrar
    if (currentPage <= 0) return;

    // Define el primer y el último índice de la página anterior para mostrar
    const firstIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastIndex = firstIndex + ITEMS_PER_PAGE;

    // Establece la lista de perros para mostrar en la página anterior y actualiza la página actual
    setDogsPPage(datosPaginados.slice(firstIndex, lastIndex));
    setCurrentPage(currentPage - 1);
  };

  // Obtenemos el número total de páginas
  const totalPages = Math.ceil(datosPaginados.length / ITEMS_PER_PAGE);

  return (
    <div>
      
      <div>
      <br/>
        <div className='container'>
          {
            dogsPPage.map((perro)=>{
              return(
                <CardsGenerator
                key={perro.id}
                id={perro.id }
                name={perro.name} 
                image={perro.image}
                temperament={perro.temperament} 
                height={perro.height}
                weight={perro.weight}
                life_span={perro.life_span}
                
                />

              )
            })
          }
        </div>
      
    </div>
      <div className='Paginado'>
        <p>Results found: {numberOfResults}. Showing page {currentPage + 1} of {totalPages}</p>
        <div>
          <button className='botones' onClick={prevHandler}> Prev</button>
          <button className='botones' onClick={nextHandler}>Next </button>
        </div>  
      </div>
  </div>
  )
}

export default Home
