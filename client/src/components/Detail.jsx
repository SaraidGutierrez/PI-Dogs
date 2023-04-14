
import React from "react";
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDetail } from './redux/action';
import goback from '../images/pointer.png'
import './css/Detail.css'
import perroEstandar from '../images/perro_estandar.jpeg'

const Detail = () => {
    const dispatch = useDispatch()
    const {idRaza} = useParams()
    console.log(idRaza, 'esto es id Detail linea 12')
    const [dog, setDog] = useState({})

    useEffect(()=>{
        console.log('linea 15 Detail component')
        dispatch(getDetail(idRaza)).then(response =>{
            console.log(response, 'linea 18 DEtail component')
           return setDog(response.payload)
        })
    }, [dispatch, idRaza]);
    console.log(dog, 'perro linea 22')

  return (
    
    <div className="container">
      <Link className='a'to='/home'><img src={goback} className="goback" />Go home</Link>
      <h1>{dog?.name}</h1>
      <p>Temperament: {dog?.temperament}</p>
      <p>Heigth: {dog?.height} cm</p>
      <p>Weigth: {dog?.weight} kg </p>
      <p>Life span: {dog?.life_span} years</p>
      <p>Origin: {dog.origin ? dog.origin : 'No information about'}</p>
      <img className='imgperro' src={dog.image? dog.image : perroEstandar} />



    </div>
  )
}

export default Detail
