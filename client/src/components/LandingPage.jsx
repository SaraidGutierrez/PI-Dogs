
import React from 'react'
import './css/LandingPage.css'
import { Link } from 'react-router-dom'




const LandingPage = (props) => {
  return (
    <div >
      <div className='cuadro'>
        <h1 className='titulo1'>The Dog Explorer</h1>
        <div className='contenido'>
            <h2>Meet breeds you have never seen before!</h2>
            <p className='parrafo'>"Welcome to our website dedicated to dog breeds! Our project sources data from an API to bring you detailed information on various dog breeds. Whether you're a dog enthusiast or just curious, we invite you to explore our collection of breeds and learn more about these wonderful friends."</p>
           <Link to ='/home'>

                <button className='boton' onClick={()=>props.login()}>Get Started</button>
           </Link>

        </div>
      </div>
    </div>
  )
}

export default LandingPage
