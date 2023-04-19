import React from 'react'
import { useState } from 'react'
import './css/SearchBar.css'
import { useDispatch } from 'react-redux'
import { getDogByName } from './redux/action'
import './css/SearchBar.css'

const SearchBar = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    
    const handleChange = e=>{
      e.preventDefault();
        setName(e.target.value);
    }
 
    function handleSubmit(e) {
      e.preventDefault();
      if (name.length === 0) {
        return alert("Please write a name");
      } else {
        dispatch(getDogByName(name));
        setName("");
      }
    }
  
  return (
    <div className='contorno'>
      
      <input className='searchInput' placeholder='Search Breed' type="search" value={name} onChange = {(e)=>handleChange(e)}  />
      <button className='button1 ' onClick={(e)=>handleSubmit(e)} type='submit' >Search Breed</button>
    </div>
  )
}

export default SearchBar
