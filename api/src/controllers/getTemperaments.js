var axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'
require('dotenv').config();
const {
    x_api_key
  } = process.env;

  const { Temperament} = require('../db.js');
const getTemperaments = async (req,res) =>{
 
console.log('entre a get temperaments linea 11')
    try {
        
        const {data} = await axios.get(`${URL}?${x_api_key}`)
    

        const arrayObjs = await filterData(data);
        const temperamentosPerros =  obtenerTemperamentos(arrayObjs);

 
         temperamentosPerros.forEach(async (temperamento) => {
            await Temperament.findOrCreate({ where: {name: temperamento} });
              });
            const TemperamentosBD = await Temperament.findAll()
            res.status(200).json(TemperamentosBD)
      
            
      } catch (error) {
        res.status(500).json({message: error});
    }
}

function filterData (data){
    console.log('entre a filter data linea 28')
    const temperamentos = data.map(perro=> {return {temperament: perro.temperament, id: perro.id }})
    return temperamentos
}

function obtenerTemperamentos(arrayObjs) {
    let temperamentos = []
    
        arrayObjs.forEach(element => {if(element.temperament !== undefined){
            const temperamentosSeparados = element.temperament.split(",")
            temperamentosSeparados.forEach(temperamento => {
                if (!temperamentos.includes(temperamento)) {
                    temperamentos.push(temperamento);
                }
            });
        }
        }
        );

        console.log(temperamentos, 'antes')
    respuesta = temperamentos.map(temp => temp.trim());
    console.log(temperamentos, 'despues')

       
        return respuesta

    }
  
  
  

  



module.exports = { getTemperaments }