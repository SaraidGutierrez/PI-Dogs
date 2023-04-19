import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "./redux/action"
import './css/FormNewDog.css'

const FormNewDog = () => {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch()

  useEffect(()=> dispatch(getTemperaments()), [dispatch])

  const [input, setInput] = useState({
    name: "",
    minYears: "",
    maxYears: "",
    image: "",
    temperament: [],
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    if(!input.temperament.includes(e.target.value)){
    setInput({
        ...input,
        temperament: [
          ...input.temperament,
          
            e.target.value
          ,
        ],
      });
   }
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== e),
    });
  };
  function handleSubmit(e) {
    e.preventDefault();

    const nameRegex = /^[A-Za-z]+$/;
    const urlRegex = /\/\/(\S+?(?:jpe?g|png|gif))/ig;

    if (!input.name.match(nameRegex) || input.name.length > 35) {
      setErrorMsg("Breed name can only contain letters and not be greater than 35 characters");
      return;
    }
    
    if (Number(input.minWeight) < 1 || Number(input.minWeight) > 150) {
      setErrorMsg("Min weight must be between 1 and 150");
      return;
    }
    
    if (Number(input.maxWeight)<= Number(input.minWeight) || Number(input.maxWeight) > 200) {
      setErrorMsg("Max weight must be greater than minumun weight and less than 200");
      return;
    }

    if(!input.image.match(urlRegex)){
      setErrorMsg("Image url must be a valid url for an image");
      return;
    }

    if (Number(input.minHeight) < 1 || Number(input.minHeight) > 200) {
      setErrorMsg("Min height must be between 1 and 200");
      return;
    }

    if (Number(input.maxHeight) <= Number(input.minHeight) || Number(input.maxHeight) > 250) {
      setErrorMsg("Max height must be greater than minimum height and less than 250");
      return;
    }

    if (Number(input.minYears) < 1) {
      setErrorMsg("Minimun years must be at least 1");
      return;
    }

    if (Number(input.maxYears) <= Number(input.minYears) || Number(input.maxYears) > 25) {
      setErrorMsg(
        "Maximun years must be greater than minimun years and less or equal to 25 years"
      );
      return;
    }

    if (input.temperament.length === 0 || input.temperament.length > 5) {
      setErrorMsg("You must select at least one temperament and max 5 temperaments");
      return;
    }

    if (
      !input.name ||
      !input.minYears ||
      !input.minWeight ||
      !input.maxWeight ||
      !input.minHeight ||
      !input.maxHeight ||
      !input.image
    ) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    let newDog = {
      name: input.name,
      image: input.image,
      height: `${input.minHeight} - ${input.maxHeight}`,
      weight: `${input.minWeight} - ${input.maxWeight}`,
      temperament: input.temperament,
      life_span: `${input.minYears} - ${input.maxYears}`,
    };

    dispatch(postDog(newDog));

    setErrorMsg("");

    setInput({
      name: "",
      minYears: "",
      maxYears: "",
      minWeight: "",
      maxWeight: "",
      minHeight: "",
      maxHeight: "",
      image: "",
      temperament: [],
    });
  }
 
  
  return (
    <div className='wrapper'>
      
        <h2>Create a new breed</h2>
        <form className="form">
          
<div>
            <label className="titles">Breed name :</label>
            <input
              className="inputs"
              type="text"
              pattern="[A-Za-z]+"
              placeholder="Breed name"
              value={input.name}
              name="name"
              onChange={handleChange}
            />


</div>
<div>
            <label className="titles">Weight (kg)</label>
            <div >
                  <input
                    className="inputs"
                    type="number"
                    pattern="[0-9]+"
                    placeholder="Min weight"
                    value={input.minWeight}
                    min="1"
                    name="minWeight"
                    onChange={handleChange}
                  />
                  <input
                    className="inputs"
                    type="number"
                    pattern="[0-9]+"
                    placeholder="Max weight"
                    value={input.maxWeight}
                    min='0'
                    name="maxWeight"
                    onChange={handleChange}
                  />
            </div>

</div>
<div>
            <label className="titles">Height (cm)</label>
            <div>
                  <input
                   className="inputs"
                    type="number"
                    pattern="[0-9]+"
                    placeholder="Min height"
                    value={input.minHeight}
                    min="1"
                    name="minHeight"
                    onChange={handleChange}
                  />
                  <input
                   className="inputs"
                    type="number"
                    pattern="[0-9]+"
                    placeholder="Max height"
                    value={input.maxHeight}
                    min='1'
                    name="maxHeight"
                    onChange={handleChange}
                  />


            </div>

</div>
<div>
            <label className="titles">Image (url) </label>
            <input
            className="inputs"
              type="url"
              pattern="^https?://.*\.(png|jpg|jpeg|gif)$" required
              placeholder="URL"
              value={input.image}
              name="image"
              onChange={handleChange}
            />

</div>
<div>
            <label className="titles">Life span (years) </label>
            <div >

                  <input
                  className="inputs"
                    type="number"
                    pattern="[0-9]+"
                    placeholder="Min years"
                    value={input.minYears}
                    min="1"
                    name="minYears"
                    onChange={handleChange}
                  />
                  <input
                  className="inputs"
                    type="number"
                    pattern="[0-9]+"
                    placeholder="Max years"
                    value={input.maxYears}
                    min='1'
                    name="maxYears"
                    onChange={handleChange}
                  />

            </div>

</div>
<div>
            <label className="titles">Temperaments </label>
            <div>

              <div  className="selects">

                    {temperaments.length > 0 && (
                        <select
                            className="slect"
                            multiple
                            value={input.temperament}
                            onChange={handleSelectChange}
                        >
                            {temperaments.map((t) => (
                            <option key={t.id} value={t.name}>
                                {t.name}
                            </option>
                            ))}
                        </select>
                    )}

              </div>
              <div className="selects2">
                    {/* ---------------------*/}
                    {input.temperament.map((el, i) => (
                    <button
                      className="buttons"
                      key={i}
                      type="reset"
                      onClick={() => handleDelete(el)}
                    >
                      {el} X
                    </button>
                    ))}
                
              </div>

            </div>

</div>
        </form>

       <div >
          <button className="buttonSubmit" type="submit" onClick={(e) => handleSubmit(e)}>
            Create new breed
          </button>
          <p>{errorMsg}</p>
      </div>
     
    </div>

  );
};
export default FormNewDog;
