import {
   
   GET_ALL_DOGS,
   GET_TEMPERAMENTS,
   GET_DOG_BY_NAME,
   GET_DETAIL,
   POST_DOG,
   FILTER_TEMPERAMENTS,
   FILTER_NAME,
   FILTER_ORIGIN_DATA,
   FILTER_WEIGHT,

} from './action-types'
import axios from 'axios'

export const getAllDogsfunc = ()=>{
    return async function(dispatch){
        try {
            let getAllDogs = await axios.get(`http://localhost:3001/dogs`)
            
            return dispatch({
                type: GET_ALL_DOGS,
                payload: getAllDogs.data,
            })
        } catch (error) {
            return {error: error}
        }
    }
}

export const getTemperaments = ()=>{
    return async function(dispatch){
        try {
            let temperamen = await axios.get(`http://localhost:3001/temperaments`)
            let payload = temperamen.data
            
            
           
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: payload
            })
        } catch (error) {
            return {error: error}
        }
    }
}

export const getDogByName = (name)=>{
    return async function(dispatch){
        try {
            let resultadoBusqueda = await axios.get(`http://localhost:3001/dogs/name?name=${name}`)
            let payload = resultadoBusqueda.data
           
            return dispatch({
                type: GET_DOG_BY_NAME,
                payload: payload
            })
        } catch (error) {
            return {error: error}
        }
    }
}

export const getDetail = (id)=>{
    return async function(dispatch){
        try {
            let busqueda = await axios.get(`http://localhost:3001/dogs/${id}`)
            let payload = busqueda.data
            
            return dispatch({
                type: GET_DETAIL,
                payload: payload
            })
        } catch (error) {
            return {error: error}
        }
    }
}

export const cleanDetail = ()=>{
    return function(dispatch){
        try {
            let clean = {}
            
            return dispatch({
                type: GET_DETAIL,
                payload: clean
            })
        } catch (error) {
            return {error: error}
        }
    }
}


export const postDog = (newDog)=>{
    return async function(dispatch){
        try {
             await axios.post(`http://localhost:3001/dogs`, newDog)

             alert(`Successfully created dog`);
            
            return (dispatch({
                type: POST_DOG,
                
               
            }
            
            ))
            
        } catch (error) {
            alert(`Failed to create dog`);
            return {error: error}
        }
    }
}

export const filterAZ = (sortBy)=>{
                return {
                type: FILTER_NAME,
                payload: sortBy

            }
}
export const filterWeight = (sortBy)=>{
    return {
    type: FILTER_WEIGHT,
    payload: sortBy

}
}

export const filterOrigin = (sortBy)=>{
   
    return {
        type: FILTER_ORIGIN_DATA,
        payload: sortBy
      }
    
}

export const filterTemperament = (temperaments)=>{
   
    return {
        type: FILTER_TEMPERAMENTS,
        payload: temperaments
      }
    
}