import React from "react";
import '../CreateBreed/CreateBreed.css';

import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTemperaments, createDog, searchDogsByName } from "../../Redux/Actions";
// import { getDogByID } from "../../Redux/Actions";

// import CreateBreed from '../CreateBree'
// import Dog from '../Dog/Dog.jsx';


export default function CreateBreed (props) {
    const dispatch = useDispatch();
    const history = useHistory()

    const [state, setState] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLife: '',
        maxLife: '',
        image: '',
        temperaments: []
    })
    

    function onChangeForm(event){
        let nameElement = event.target.name;
        let valueElement = event.target.value;

        if(nameElement === 'temperaments'){
            let select = event.target
            let index = select.selectedIndex;
            let id = select.options[index].id;
            let name = select.options[index].value;
            // console.log(select.options[index].id, select.options[index].value);
    
            return setState({
                ...state,
                [nameElement]:  [...state.temperaments, {
                    id: id,
                    name: name
                }]
            })
        }

        return setState({
            ...state,
            [nameElement]: valueElement
        })
    }

    function onSubmitForm(event){
        console.log('button presed')
        event.preventDefault();

        const dog = {
            name: state.name,
            height: `${state.minHeight} - ${state.maxHeight}`,
            weight: `${state.minWeight} - ${state.maxWeight}`,
            life_span: `${state.minLife} - ${state.maxLife}`,
            image: state.image,
            temperament: state.temperaments
        }
        dispatch(createDog(dog));
        dispatch(searchDogsByName(dog.name));
        history.push('/');
    }

    const temperaments = useSelector(state => state.temperaments);
    
    useEffect(()=>{
        dispatch(getAllTemperaments());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // // if (dogID === dog.ig){}
    // console.log(props)
    return (
        <div className="form-container-main">
            <div className='form-container'>
                <h1 className="form-title">Crear Raza</h1>
                <form className='form' onSubmit={onSubmitForm}>

                    <label className="label-form" htmlFor="name">
                        <span className="span-form">Nombre</span>
                        <input 
                            id="name" 
                            className="input-form" 
                            name="name"
                            type="text" 
                            placeholder="Ej: Pastor Aleman"
                            onChange={onChangeForm}
                        /> 
                    </label>

                    <label className="label-form" htmlFor="height">
                        <span className="span-form">Altura</span>
                        <input 
                            id="height"
                            className="input-form-left"  
                            name="minHeight"
                            type="text" 
                            placeholder="Min - Ej: 15 cm"
                            onChange={onChangeForm}
                        /> 
                        <input 
                            id="height"
                            className="input-form-right" 
                            name="maxHeight"
                            type="text" 
                            placeholder="Max - Ej: 25 cm"
                            onChange={onChangeForm}
                        />
                    </label>

                    <label className="label-form" htmlFor="weight">
                        <span className="span-form">Peso</span>
                        <input 
                            id="weight"
                            className="input-form-left" 
                            type="text" 
                            name="minWeight"
                            placeholder="Max - Ej: 25 cm"
                            onChange={onChangeForm}
                        /> 
                        <input 
                            id="weight"
                            className="input-form-right" 
                            type="text" 
                            name="maxWeight"
                            placeholder="Max - Ej: 25 cm"
                            onChange={onChangeForm}
                        />

                    </label>

                    <label className="label-form" htmlFor="span-life">
                        <span className="span-form">Años de vida</span>
                        <input 
                            id="span-life"
                            className="input-form-left" 
                            type="text" 
                            name="minLife"
                            placeholder="Min - Ej: 10 years"
                            onChange={onChangeForm}
                        /> 
                        <input 
                            id="span-life"
                            className="input-form-right" 
                            type="text" 
                            name="maxLife"
                            placeholder="Max - Ej: 10 years"
                            onChange={onChangeForm}
                        />
                    </label>

                    <label className="label-form" htmlFor="temperaments">
                        <span className="span-form">Temperamentos</span>
                        <select className="input-form" onChange={onChangeForm} name='temperaments'> 
                            <option value="">Seleccionar un Temperamento</option>
                            {temperaments.map(temperament => 
                                <option
                                    key={temperament.id}
                                    id={temperament.id}
                                    name={temperament.name}
                                >
                                    {temperament.name}
                                </option>)
                            }
                        </select>
                    </label>

                    <label className="label-form" htmlFor="URL-Imagen">
                        <span className="span-form">URL Imagen</span>
                        <input 
                            className="input-form"
                            type="text" 
                            name="image"
                            id="URL-Imagen"
                            onChange={onChangeForm}
                        /> 
                    </label>

                    <button 
                        className="button-form" 
                        type="submit"
                        // onClick={onSubmitForm}
                        >
                            Aceptar
                    </button>
                </form>
            </div>
        </div>
    );
}