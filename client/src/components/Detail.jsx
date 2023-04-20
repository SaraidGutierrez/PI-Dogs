import React from "react";
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, cleanDetail } from './redux/action';
import goback from '../images/pointer.png'
import './css/Detail.css'
import perroEstandar from '../images/perro_estandar.jpeg'
import { type } from "os";

const Detail = () => {
    const dispatch = useDispatch()
    const {idRaza} = useParams()
    const dog = useSelector(state => state.detail)
 useEffect(() => {
     
      dispatch(getDetail(idRaza))
        
      return () => {
        dispatch(cleanDetail())
      }

      }, [idRaza])
      
      let temperamentos =
      typeof dog.temperament === 'object'
      ? dog.temperament.join(', ')
      : dog.temperament
  return (

    
    <div className="container2">

      {dog.name ? <> <Link className='home'to='/home'><img src={goback} alt='Imagen Go Back'className="goback" />Go home</Link>
      <h1 className="titulo">{dog.name? dog.name : 'No information about'}</h1>
      <p className="parrafo">Temperament: {temperamentos ? temperamentos: 'No information about'}</p>
      <p className="parrafo">Heigth: {dog.height ? dog.height : 'No information about'} cm</p>
      <p className="parrafo">Weigth: {dog.weight? dog.weight : 'No information about'} kg </p>
      <p className="parrafo">Life span: {dog.life_span? dog.life_span : 'No information about'} years</p>
      <p className="parrafo">Origin: {dog.origin ? dog.origin : 'No information about'}</p>
      <img className='imgperro' src={dog.image? dog.image : perroEstandar}  alt='Perro de muestra'/></>
: <h1>Cargando</h1> }
      


    </div>
  )
}

export default Detail
