import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { setError } from "../../Redux/Actions";
import '../Message/Message.css';


export default function Message ({message}) {

    // const dispatch = useDispatch();
    // // console.log(state, error);
    // function AceptError() {
    //     dispatch(setError({}));
    // }
    
    return (
        <div className={'container-error-active'}>
            <div className="content-error">
            <p className="error-icon">X</p>
                <h1 className="error-title">Advertencia</h1>
                {/* <h2 className="error-message">{`${error.name} in ${error.config?.method} method to ${error.config?.url}`}</h2> */}
                <h2 className="error-message">{message}</h2>
                <button className="error-button">SALIR</button>
            </div>
        </div>
    );
}