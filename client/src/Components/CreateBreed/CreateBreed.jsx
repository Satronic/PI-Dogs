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
    const history = useHistory();
    const message = useSelector(state => state.message);
    const temperaments = useSelector(state => state.temperaments);

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
    
    const [dataState, setDataState] = useState({
        name: undefined,
        minHeight: undefined,
        maxHeight: undefined,
        minWeight: undefined,
        maxWeight: undefined,
        minLife: undefined,
        maxLife: undefined,
        image: undefined,
        // temperaments: undefined
    })

    const [formState, setFormState] = useState(undefined)

    function onChangeForm(event){
        let nameElement = event.target.name;
        let valueElement = event.target.value;
        let test = undefined;

        console.log('1.', dataState.temperaments)

        if(nameElement === 'name'){
            let regExp = /^[a-zA-Z ]{3,30}$/; // Empezar y finalizar solo con letras - Maximo 20
            test = regExp.test(valueElement);
        }

        if(nameElement === 'minHeight'){
            let regExp = /^[0-9]{2,2}$/;
            test = regExp.test(valueElement) && (Number(valueElement) >= 15 && Number(valueElement) <= 70);
            if(dataState.maxHeight === true ) test = test && Number(valueElement) <= Number(state.maxHeight);
        }

        if(nameElement === 'maxHeight'){
            let regExp = /^[0-9]{2,2}$/; // Empezar y finalizar solo con letras - Maximo 20
            test = Number(valueElement) >= Number(state.minHeight);
            test = test && regExp.test(valueElement) && (Number(valueElement) >= 20 && Number(valueElement) <= 90);
        }

        if(nameElement === 'minWeight'){
            let regExp = /^[0-9]{1,2}$/; // Empezar y finalizar solo con letras - Maximo 20
            test = regExp.test(valueElement) && (Number(valueElement) >= 1 && Number(valueElement) <= 50);
            if(dataState.maxWeight === true ) test = test && Number(valueElement) <= Number(state.maxWeight);
        }

        if(nameElement === 'maxWeight'){
            let regExp = /^[0-9]{1,2}$/; // Empezar y finalizar solo con letras - Maximo 20
            test = regExp.test(valueElement) && (Number(valueElement) >= 3 && Number(valueElement) <= 90);
            test = test && Number(valueElement) >= Number(state.minWeight);
        }

        if(nameElement === 'minLife'){
            let regExp = /^[0-9]{1,2}$/; // Empezar y finalizar solo con letras - Maximo 20
            test = regExp.test(valueElement) && (Number(valueElement) >= 7 && Number(valueElement) <= 12);
        }

        if(nameElement === 'maxLife'){
            let regExp = /^[0-9]{1,2}$/; // Empezar y finalizar solo con letras - Maximo 20
            test = regExp.test(valueElement) && (Number(valueElement) >= 12 && Number(valueElement) <= 22);
        }

        if(nameElement === 'image'){
            let regExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/; // Empezar y finalizar solo con letras - Maximo 20
            test = regExp.test(valueElement);
        }

        // if(test){
            // }
            
        if(nameElement === 'temperaments'){
            let select = event.target
            let index = select.selectedIndex;
            let id = select.options[index].id;
            let name = select.options[index].value;

            if(name === 'default') return;

            let temperamentFounded = state.temperaments.find(item => item.id === id);
            if(temperamentFounded) return;

            return setState({
                ...state,
                [nameElement]:  [...state.temperaments, {
                    id: id,
                    name: name
                }]
            });
        }

        (test) ? setDataState({...dataState, [nameElement]: true}) : setDataState({...dataState, [nameElement]: false});
        return setState({...state, [nameElement]: valueElement});
    }

    function onDeleteTemperament(id){
        return setState({
            ...state,
            temperaments: state.temperaments.filter(temperament => temperament.id !== id)
        });
    }

    useEffect(() => {
        let arrStates = Object.values(dataState);
        setFormState(arrStates.includes(false) || arrStates.includes(undefined) ? false : true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state, state.temperaments.length])


    function onSubmitForm(event){
        event.preventDefault();

        const dog = {
            name: state.name,
            height: `${state.minHeight} - ${state.maxHeight}`,
            weight: `${state.minWeight} - ${state.maxWeight}`,
            life_span: `${state.minLife} - ${state.maxLife}`,
            image: state.image,
            temperament: state.temperaments
        }

        dispatch(createDog(dog))

        history.push('/app/home');
    }
    
    
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
                <div className="form-container-content">
                <form className='form' onSubmit={onSubmitForm}>

                        <label className="label-form" htmlFor="name">
                            <span className="span-form">Nombre</span>
                            <input 
                                id="name" 
                                className={dataState.name ? 'input-form' : 'input-invalid'} 
                                name="name"
                                type="text" 
                                placeholder="Pastor Aleman"
                                title="El nombre debe tener entre 3 y 30 caracteres - Solo se aceptan letras y espacios"
                                onChange={onChangeForm}
                            /> 
                        </label>

                        <label className="label-form" htmlFor="height">
                            <span className="span-form">Altura</span>
                            <input 
                                id="height"
                                // className="input-form-left"  
                                className={dataState.minHeight ? 'input-form-left' : 'input-invalid'}
                                name="minHeight"
                                type="text" 
                                placeholder="Min"
                                title="Deber ser un numero entre 15 y 70"
                                onChange={onChangeForm}
                            /> 
                            <input 
                                id="height"
                                // className="input-form-right" 
                                className={dataState.maxHeight ? 'input-form-right' : 'input-invalid'}
                                name="maxHeight"
                                type="text" 
                                placeholder="Max"
                                title="Debe ser un numero entre 20 y 90 - Mayor que el minimo"
                                onChange={onChangeForm}
                            />
                        </label>

                        <label className="label-form" htmlFor="weight">
                            <span className="span-form">Peso</span>
                            <input 
                                id="weight"
                                // className="input-form-left" 
                                className={dataState.minWeight ? 'input-form-right' : 'input-invalid'}
                                type="text" 
                                name="minWeight"
                                placeholder="Min"
                                title="Debe ser un numero entre 1 y 50"
                                onChange={onChangeForm}
                            /> 
                            <input 
                                id="weight"
                                // className="input-form-right" 
                                className={dataState.maxWeight ? 'input-form-right' : 'input-invalid'}
                                type="text" 
                                name="maxWeight"
                                placeholder="Max"
                                title="Debe ser un numero entre 3 y 90"
                                onChange={onChangeForm}
                            />

                        </label>

                        <label className="label-form" htmlFor="span-life">
                            <span className="span-form">Años de vida</span>
                            <input 
                                id="span-life"
                                // className="input-form-left" 
                                className={dataState.minLife ? 'input-form-right' : 'input-invalid'}
                                type="text" 
                                name="minLife"
                                placeholder="Min"
                                title="Debe ser un numero entre 7 y 12"
                                onChange={onChangeForm}
                            /> 
                            <input 
                                id="span-life"
                                // className="input-form-right" 
                                className={dataState.maxLife ? 'input-form-right' : 'input-invalid'}
                                type="text" 
                                name="maxLife"
                                placeholder="Max"
                                title="Debe ser un numero entre 12 y 22"
                                onChange={onChangeForm}
                            />
                        </label>

                        <label className="label-form" htmlFor="URL-Imagen">
                            <span className="span-form">URL Imagen</span>
                            <input 
                                // className="input-form"
                                className={dataState.image ? 'input-form' : 'input-invalid'}
                                type="text" 
                                name="image"
                                id="URL-Imagen"
                                onChange={onChangeForm}
                            /> 
                        </label>

                        <label id='label-temperaments' className="label-form" htmlFor="temperaments">
                            <span className="span-form">Temperamentos</span>
                            <select 
                                id='temperaments' 
                                className={state.temperaments.length > 0 ? 'input-form' : 'input-invalid'}
                                onChange={onChangeForm} name='temperaments'> 

                                <option value="default">Seleccionar un Temperamento</option>
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


                        <button 
                            // className="button-form" 
                            className={formState && state.temperaments.length > 0 ? 'button-form' : 'button-form-invalid' }
                            type="submit"
                            onClick={onSubmitForm}
                            >
                            {formState && state.temperaments.length > 0 ? 'Crear Raza' : 'Debes dilegenciar todos los campos correctamente'}
                        </button>
                    </form>

                    <div>
                        <img className="form-image" src={state.image} alt="" />
                        <div className="list-temperaments">
                            {state.temperaments?.map(temperament =>{
                                return <span 
                                    className="list-temperaments-item" 
                                    key={temperament.id}>{temperament.name} 
                                    <button 
                                        className="button-temperament"
                                        onClick={() => onDeleteTemperament(temperament.id)}
                                        >X
                                    </button>
                                </span>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}