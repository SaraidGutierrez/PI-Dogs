import { getAllDogsfunc } from './redux/action';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsGenerator from './CardsGenerator';
import './css/Home.css'

const Home = (props) => {
const dispatch = useDispatch()

const allDogs = useSelector(state=> state.dogs)
useEffect(() => {
  dispatch(getAllDogsfunc());
}, [dispatch]); 

const dogsShown = useSelector(state=> state.showingDogs)

console.log(dogsShown, 'dogsshown line 18')

//console.log(props.dogsShown, 'soy dogs shown')
  
  // PAGINADO //
const ITEMS_PER_PAGE = 8;
const [datosPaginados, setDatosPaginado] = useState(dogsShown);
const [dogsPPage, setDogsPPage] = useState([]);
const [currentPage, setCurrentPage] = useState(0);

useEffect(() => {
  console.log("active aqui");
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



  // PAGINADO //


  return (
 <div>
  <h1>Pagina: {currentPage}</h1>
    <button onClick={prevHandler}> Prev</button>
    <button onClick={nextHandler}>Next </button>

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
      <h1>Soy home</h1>
    </div>
  </div>
  )
}

export default Home
