import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './css/CardsGenerator.css'
import perroEstandar from '../images/perro_estandar.jpeg'

const CardsGenerator = (props) => {
  const {id, name, image, temperament, height, weight, life_span} = props

  let temperamentos =
  typeof temperament === 'object'
  ? temperament.join(', ')
  : temperament



  return (
    <div className='card-container'>
      <Link to={`/dogs/${id}`}>
      <div className='card'>
        <div className='image-container'>
          <img className='image' src={image ? image : perroEstandar} alt={name} />
        </div>
        <div className='info'>
          <h2>{name}</h2>
          <p><strong>Weight:</strong> {weight ? weight + ' kg': 'No information about'} </p>
          <p><strong>Temperament:</strong> {temperamentos ? temperamentos : 'No information about'}</p>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default CardsGenerator
