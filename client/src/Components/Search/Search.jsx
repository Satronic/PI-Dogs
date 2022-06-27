// import React, { useEffect } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../Search/Search.css';
import { orderDogs, searchDogsByName, filterDogs } from "../../Redux/Actions";

// import Message from "../Message/Message";


export default function Search () {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    // const handleError = useErrorHandler();
    // const dogs = useSelector(state => state.dogs);



    //* SEARCH *//
    const [searchState, setInputSearch] = useState({
        searchInput: ''
    })
    
    function onChangeInput(event) {   
        setInputSearch({
            ...searchState,
            [event.target.name]: event.target.value
        });
    }
    
    function onSearch() {
        // e.prevent.default()
        // dispatch(searchDogsByName(searchState.searchInput));
        dispatch(searchDogsByName(searchState.searchInput))
        // .catch(error => dispatch(setError(error)));
    }
    
    //* ORDER SECTION *//
    const [order, setOrder] = useState({
        typeOrder: '',
        propertyName: ''
    })

    function onSelectProperty(event){
        let select = event.target
        let index = select.selectedIndex;
        // let name = select.options[index].name;
        let value = select.options[index].value;
        console.log('Propiedad seleccionada: ' + value)
        return setOrder({
            ...order,
            propertyName: value
        })
    //    return  console.log(order);
    }

    function onSelectTypeOrder(event){
        
        let name = event.target.name;
        let value = event.target.value;

        setOrder({
            ...order,
            [name]: value
        })
    }

    useEffect(()=>{
        dispatch(orderDogs(order));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order.typeOrder])


    // //* END ORDER *//


    //* FILTER SECTION *//
    const [filter, setFilter] = useState({
        temperament: '',
        name: ''
    })

    function onChangeFilter(event) {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    }

    function onFilter() {
        dispatch(filterDogs(filter));
    }
    

    return (
    <div className='container'>
        <div className='container-search-bar'> 
            <div className="container-search">
                <input 
                    className='search-input' 
                    onChange={onChangeInput}
                    name='searchInput'
                    type="text" 
                    value={searchState.searchInput}
                    placeholder="¿Qué raza estas buscando?"
                />
                <button className='search-button' onClick={onSearch} >Buscar</button>
            </div>

            <div className="container-filter">
                {/* <select className='filter-input' name="breed" onChange={onChangeFilter}>
                    <option value="default">Filtrar por raza:</option>
                    {temperaments.map(temperament => 
                    <option 
                        key={temperament.id} 
                        value={temperament.name}
                            >{temperament.name}
                    </option>)}
                </select> */}
                <select className='filter-input' name="temperament" onChange={onChangeFilter}>
                    <option value="default">Filtrar por temperamento:</option>
                    {temperaments.map(temperament => 
                    <option 
                        key={temperament.id} 
                        value={temperament.name}
                            >{temperament.name}
                    </option>)}
                </select>
                <button 
                    className="material-symbols-outlined" 
                    onClick={onFilter}
                    title='Filtrar'
                    >filter_alt
                </button>
            </div>

            <div className="container-order">
                <select className='order-input' onChange={onSelectProperty}>
                    <option value="default">Ordenar por: </option>
                    <option 
                        name='propertyName' 
                        value="name">Nombre
                    </option>
                    <option 
                        name='propertyName' 
                        value="weight">Peso
                    </option>
                </select>
                <button 
                    className="material-symbols-outlined"
                    name='typeOrder'
                    value='asc'
                    onClick={onSelectTypeOrder}
                    title='Ordenar Ascendentemente'
                    >vertical_align_bottom
                </button>
                <button 
                    className="material-symbols-outlined"
                    name='typeOrder'
                    value='des'
                    onClick={onSelectTypeOrder}
                    title='Ordenar Descendentemente'
                    >vertical_align_top
                </button>
            </div>
        </div>
    </div>
    );
}

