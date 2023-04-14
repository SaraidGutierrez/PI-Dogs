import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "./redux/action"

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
    
    setInput({
        ...input,
        temperament: [
          ...input.temperament,
          
            e.target.value
          ,
        ],
      });
   
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
    const numberRegex = /^[0-9]+$/;

    if (!input.name.match(nameRegex)) {
      setErrorMsg("Breed name can only contain letters");
      return;
    }

    if (input.minWeight < 1) {
      setErrorMsg("Min weight must be at least 1");
      return;
    }

    if (input.maxWeight <= input.minWeight) {
      setErrorMsg("Max weight must be greater than minumun weight");
      return;
    }

    if (input.minHeight < 1) {
      setErrorMsg("Min height must be at least 1");
      return;
    }

    if (input.maxHeight <= input.minHeight) {
      setErrorMsg("Max height must be greater than minimum height");
      return;
    }

    if (input.minYears < 1) {
      setErrorMsg("Minimun years must be at least 1");
      return;
    }

    if (input.maxYears <= input.minYears || input.maxYears > 25) {
      setErrorMsg(
        "Maximun years must be greater than minimun years and less or equal to 25 years"
      );
      return;
    }

    if (input.temperament.length === 0) {
      setErrorMsg("You must select at least one temperament");
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
    <div>
      <div>
        <h2>Create a new Dog</h2>
        <form>
          {/* LABELS */ }
          <div>
            <label>Breed name :</label>
            <label>Weight (kg)</label>
            <label>Height (cm)</label>
            <label>Image (url) </label>
            <label>Life span (years) </label>
            <label>Temperaments </label>
          </div>

          {/* INPUTS */ }
          <div>
            <input
              type="text"
              pattern="[A-Za-z]+"
              placeholder="Breed name"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
            <input
              type="number"
              pattern="[0-9]+"
              placeholder="Min weight"
              value={input.minWeight}
              min="1"
              name="minWeight"
              onChange={handleChange}
            />
            <input
              type="number"
              pattern="[0-9]+"
              placeholder="Max weight"
              value={input.maxWeight}
              min='0'
              name="maxWeight"
              onChange={handleChange}
            />
            <input
              type="number"
              pattern="[0-9]+"
              placeholder="Min height"
              value={input.minHeight}
              min="1"
              name="minHeight"
              onChange={handleChange}
            />
            <input
              type="number"
              pattern="[0-9]+"
              placeholder="Max height"
              value={input.maxHeight}
              min='1'
              name="maxHeight"
              onChange={handleChange}
            />
            <input
              type="url"
              pattern="^https?://.*\.(png|jpg|jpeg|gif)$" required
              placeholder="URL"
              value={input.image}
              name="image"
              onChange={handleChange}
            />
            <input
              type="number"
              pattern="[0-9]+"
              placeholder="Min years"
              value={input.minYears}
              min="1"
              name="minYears"
              onChange={handleChange}
            />
            <input
              type="number"
              pattern="[0-9]+"
              placeholder="Max years"
              value={input.maxYears}
              min='1'
              name="maxYears"
              onChange={handleChange}
            />
            {temperaments.length > 0 && (
                <select
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
            <div>
            {/* ---------------------*/}
            {input.temperament.map((el, i) => (
          <button
            
            key={i}
            type="reset"
            onClick={() => handleDelete(el)}
          >
            {el} X
          </button>
        ))}
        
      </div>
       {/* ---------------------*/}
       <div >
        <button
          
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Create new breed
        </button>
      </div>
      <p>{errorMsg}</p>
          </div>
        </form>
      </div>
    </div>

  );
};
export default FormNewDog;
