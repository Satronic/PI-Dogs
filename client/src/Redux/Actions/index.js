import axios from 'axios';


export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const SEARCH_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const FILTER_DOGS_BY_PROPERTY = 'FILTER_DOGS_BY_PROPERTY';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const ORDER_DOGS = 'ORDER_DOGS';
export const RESET_DOG_ID = 'RESET_DOG_ID';
export const SET_ERROR = 'SET_ERROR';
export const SET_MESSAGE = 'SET_MESSAGE';

export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';

/*************************************** */

export const CREATE_DOG = 'CREATE_DOG';

export const INCREASE_PAGE = 'INC_PAGE';
export const DECREASE_PAGE = 'DEC_PAGE';
export const SELECT_PAGE = 'SEL_PAGE';

const API_URL = process.env.REACT_APP_API_URL;


export const getAllDogs = () => {
    return async function(dispatch) {
        try {
            const allDogs = await axios.get(`${API_URL}/dogs`);

            console.log('Promise', allDogs.data)
            return dispatch({
                type: GET_ALL_DOGS,
                payload: allDogs.data
            })
        } catch (error) {
            return dispatch({
                type: SET_ERROR,
                payload: error
            })
        }
    }
};

export const searchDogsByName = (name) => {
    return async function(dispatch) {
        try {
            const dogsByName = await axios.get(`${API_URL}/dogs?name=${name}`);

            if (Object.keys(dogsByName.data).includes('msg')) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: dogsByName.data
                })
            }

            return dispatch({
                type: SEARCH_DOGS_BY_NAME,
                payload: dogsByName.data
            })
        } catch (error) {
            return dispatch({
                type: SET_ERROR,
                payload: error
            })
        }

    }
};

export const getDogByID = (id) => {
    return async function(dispatch) {
        const dogByID = await axios.get(`${API_URL}/dogs/${id}`);

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

// export const filterDogs = ({ name, temperament }) => {
//     return async function(dispatch) {
//         const filterDogsByProperty = await axios.get(`${API_URL}/dogs?name=${name}&temperament=${temperament}`);

//         return dispatch({
//             type: FILTER_DOGS_BY_PROPERTY,
//             payload: filterDogsByProperty.data
//         })
//     }
// };

export const filterDogs = ({ name, temperament }) => {
    return {
        type: FILTER_DOGS_BY_PROPERTY,
        payload: { name, temperament }
    }
}

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
        try {
            const dogCreatedMessage = await axios.post(`${API_URL}/dogs`, {
                name,
                height,
                weight,
                life_span,
                image,
                temperament
            });

            console.log('Promise', dogCreatedMessage.data)

            return dispatch({
                type: CREATE_DOG,
                payload: dogCreatedMessage.data
            })
        } catch (error) {
            return dispatch({
                type: SET_ERROR,
                payload: error
            })
        }
    }
};

export const getAllTemperaments = () => {
    return async function(dispatch) {
        try {
            const allTemperaments = await axios.get(`${API_URL}/temperament`);
            return dispatch({
                type: GET_ALL_TEMPERAMENTS,
                payload: allTemperaments.data
            })
        } catch (error) {
            return error;
        }
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

export const setError = (error) => {
    console.log('error in actions', error)
    return ({
        type: SET_ERROR,
        payload: error
    })
}