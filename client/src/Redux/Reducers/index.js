import orderAlphabetically from '../../Custom-Methods/index.js'

import {
    GET_ALL_DOGS,
    SEARCH_DOGS_BY_NAME,
    FILTER_DOGS_BY_PROPERTY,
    GET_DOG_BY_ID,
    ORDER_DOGS,
    CREATE_DOG,
    INCREASE_PAGE,
    DECREASE_PAGE,
    SELECT_PAGE,
    GET_ALL_TEMPERAMENTS,
    RESET_DOG_ID
} from "../Actions";

// const pages = {
//     1: [0, 8],
//     2: [8, 16],
//     3: [16, 24],
//     4: [24, 32],
//     5: [32, 40],
//     6: [40, 48]
// }


const initialState = {
    dogs: [],
    dogId: [],
    count: 1,
    temperaments: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload
            }

        case SEARCH_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload,
                count: 1
            }

        case GET_DOG_BY_ID:
            return {
                ...state,
                dogId: action.payload
            }

        case ORDER_DOGS:
            console.log('order in reducer', action.payload)
            const array = [...state.dogs]
            return {
                ...state,
                dogs: orderAlphabetically(array, action.payload.typeOrder, action.payload.propertyName)
            }

        case FILTER_DOGS_BY_PROPERTY:
            return {
                ...state,
                dogs: action.payload
            }

        case RESET_DOG_ID:
            return {
                ...state,
                dogId: action.payload
            }

        case CREATE_DOG:
            return {
                ...state,
                dogs: state.dogs
            }

        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case INCREASE_PAGE:
            return {
                ...state,
                count: (state.count * 8 > state.dogs.length) ? state.count : state.count + 1
            }

        case DECREASE_PAGE:
            return {
                ...state,
                count: (state.count === 1) ? 1 : state.count - 1
            }

        case SELECT_PAGE:
            return {
                ...state,
                count: Number(action.payload)
            }

        default:
            return state;
    }
}

export default rootReducer;