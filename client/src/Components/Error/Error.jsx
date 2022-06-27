import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { setError } from "../../Redux/Actions";
import '../Error/Error.css';


export default function Error ({error, state}) {

    const dispatch = useDispatch();
    // console.log(state, error);
    function AceptError() {
        dispatch(setError({}));
    }
    
    return (
        <div className={state ? 'container-error-active' : 'container-error-inactive'}>
            <div className="content-error">
            <p className="error-icon">X</p>
                <h1 className="error-title">{error.name}</h1>
                {/* <h2 className="error-message">{`${error.name} in ${error.config?.method} method to ${error.config?.url}`}</h2> */}
                <h2 className="error-message">{error.message}</h2>
                <button className="error-button" onClick={AceptError}>SALIR</button>
            </div>
        </div>
    );
}