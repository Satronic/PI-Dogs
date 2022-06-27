// import React from "react";
import {useHistory } from 'react-router-dom';
import './LandingPage.css';


export default function LandingPage () {

    const enter = useHistory();

function enterApp(){
    enter.push('/app/home')
}

    return (
        <div className='container-landing'>
           <div className="container-landing-content">
                <h1 className="landing-title">Bienvenido a App-Dogs</h1>
                <p className='landing-paragraph'>
                    Esta aplicación web te permite ver razas de perros con su imagen, peso y su distintos temperamentos.
                </p>
                <p className="landing-paragraph">
                    Puedes buscar una por su nombre, filtrar por su temperamento y ordenarlos por su nombre y su peso.
                    Además, Cuenta con una barra de navegación que te permitirá navegar entre las diferentes páginas.
                </p>
                <p className="landing-paragraph">
                    Finalmente, puedes crear una nueva raza de perro con su nombre, peso, altura, teperamentos asociados y su imagen.
                </p>
                <button className='landing-button' onClick={enterApp}>INGRESAR</button>
           </div>
        </div>
    );
}