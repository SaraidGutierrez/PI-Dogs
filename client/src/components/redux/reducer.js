import {
   
    GET_ALL_DOGS,
    GET_TEMPERAMENTS,
    GET_DOG_BY_NAME,
    GET_DETAIL,
    POST_DOG,
    FILTER_WEIGHT,
    FILTER_TEMPERAMENTS,
    FILTER_NAME,
    FILTER_ORIGIN_DATA,
 
 } from './action-types'


const INITIAL_STATE = {
    dogs: [],
    temperaments: [],
    detail:{},
    showingDogs: [],
  };



export default function rootReducer(state = INITIAL_STATE, { type, payload }){
    switch(type){
        case GET_ALL_DOGS:
            let todos = payload.sort((a, b) => a.name.localeCompare(b.name));
            let show= todos.filter((perro)=> perro.id < 270)
            
            return{
                ...state,
                dogs: todos,
                showingDogs: show
                
            }
        case GET_DETAIL:
           
            return{
                ...state,
                detail:payload,
                
            }
        case GET_DOG_BY_NAME:
        
            return{
                ...state,
                showingDogs: payload,
                  
            }
        case GET_TEMPERAMENTS:
         
            return{
                ...state,
                temperaments: payload,
                         
            }
        case POST_DOG:
         
            return{
                ...state,
                
                         
            }
        case FILTER_NAME:
            let sortedDogs = [...state.showingDogs];
            if (payload.order === "asc") {
                sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
            } else {
                sortedDogs.sort((a, b) => b.name.localeCompare(a.name));
            }
            return {
                 ...state,
                showingDogs: sortedDogs,
            };
        case FILTER_WEIGHT:
            let arrayDogs = [...state.showingDogs];
            if(payload.order === "asc"){
            arrayDogs.sort((a, b) => {
                const aWeight = parseInt(a.weight.split(' - ')[0]);
                const bWeight = parseInt(b.weight.split(' - ')[0]);
                return aWeight - bWeight;
              });
            }else{
                arrayDogs.sort((a, b) => {
                    const aWeight = parseInt(a.weight.split(' - ')[0]);
                    const bWeight = parseInt(b.weight.split(' - ')[0]);
                    return bWeight - aWeight;
                  });
            }
             
            return {
                 ...state,
                showingDogs: arrayDogs,
            };

        case FILTER_ORIGIN_DATA:
            let arrayOrigin = [...state.dogs]
            
         if(payload.order === 'API'){
              arrayOrigin = arrayOrigin.filter((perro)=> typeof perro.id === 'number')
             
         }else if (payload.order === 'BD'){
            arrayOrigin = arrayOrigin.filter((perro)=> typeof perro.id === 'string')
              
         }else if( payload.order === 'ALL'){
             arrayOrigin = arrayOrigin
            }
         return{
                ...state,
                showingDogs: arrayOrigin
                         
            }

        case FILTER_TEMPERAMENTS:
            const buscarAqui = state.dogs.map(dog => ({...dog}));
            const dogsFiltrados = [];
            const todosConTemperamento = buscarAqui.filter(perro => perro.temperament);
            
            todosConTemperamento.forEach(element => {
                if (payload.every(item => element.temperament.includes(item)) === true ){
                    dogsFiltrados.push(element);
                }
            });
                    
            return {
                ...state,
                showingDogs: dogsFiltrados,
            };
            
            
            
          
        default:
            return state
        }

            
           
    


}