import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const SEARCH_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const FILTER_DOGS_BY_PROPERTY = 'FILTER_DOGS_BY_PROPERTY';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const ORDER_DOGS = 'ORDER_DOGS';
export const RESET_DOG_ID = 'RESET_DOG_ID';

export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';

/*************************************** */

export const CREATE_DOG = 'CREATE_DOG';

export const INCREASE_PAGE = 'INC_PAGE';
export const DECREASE_PAGE = 'DEC_PAGE';
export const SELECT_PAGE = 'SEL_PAGE';

// export async function getAllBreeds() {
//     const allBreeds = await axios.get('http://localhost:3001/api/dogs');

// }

export const getAllDogs = () => {
    return async function(dispatch) {
        const allDogs = await axios.get('http://localhost:5000/api/dogs');

        return dispatch({
            type: GET_ALL_DOGS,
            payload: allDogs.data
        })
    }
};

export const searchDogsByName = (name) => {
    return async function(dispatch) {
        const dogsByName = await axios.get(`http://localhost:5000/api/dogs?name=${name}`);

        return dispatch({
            type: SEARCH_DOGS_BY_NAME,
            payload: dogsByName.data
        })
    }
};

export const getDogByID = (id) => {
    return async function(dispatch) {
        const dogByID = await axios.get(`http://localhost:5000/api/dogs/${id}`);

        return dispatch({
            type: GET_DOG_BY_ID,
            payload: dogByID.data
        })
    }
};

export const orderDogs = ({ typeOrder, propertyName }) => {
    // console.log('order in actions', { typeOrder, propertyName })
    return {
        type: ORDER_DOGS,
        payload: { typeOrder, propertyName }
    }
};

export const filterDogs = ({ name, temperament }) => {
    return async function(dispatch) {
        const filterDogsByProperty = await axios.get(`http://localhost:5000/api/dogs?name=${name}&temperament=${temperament}`);

        return dispatch({
            type: FILTER_DOGS_BY_PROPERTY,
            payload: filterDogsByProperty.data
        })
    }
};

export const resetDogID = () => {
    return ({
        type: RESET_DOG_ID,
        payload: []
    })
}

//*********************************************************************************** */
export const createDog = (dog) => {
    return async function(dispatch) {
        const { name, height, weight, life_span, image, temperament } = dog;
        const dogCreated = await axios.post('http://localhost:5000/api/dogs', {
            name,
            height,
            weight,
            life_span,
            image,
            temperament
        });

        console.log(dogCreated.data)

        return dispatch({
            type: CREATE_DOG,
            // payload: allTemperaents.data
        })
    }
};

export const getAllTemperaments = () => {
    return async function(dispatch) {
        const allTemperaments = await axios.get('http://localhost:5000/api/temperament');
        // console.log(allTemperaments.data)
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: allTemperaments.data
        })
    }
};

export const incPage = () => {
    return ({
        type: INCREASE_PAGE,
    })
}

export const decPage = () => {
    return ({
        type: DECREASE_PAGE,
    })
}

export const selPage = (page) => {
    return ({
        type: SELECT_PAGE,
        payload: page
    })
}