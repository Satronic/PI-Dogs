import React from "react";
import '../Dog/Dog.css';


export default function Dog ({id, name, image, weight, height, life_span, temperament}) {

    return (
        <div className='dog-container-main'>
            <h1 className="dog-content-title">{name}</h1>
            <div className='dog-container'>
                <div className='dog-container-left'>
                    <img className='dog-image' src={image} alt="" />
                </div>
                <div className='dog-container-right' >
                    <h3 className="dog-content-detail-title">Detalles de la Raza</h3>
                    <p className="dog-content-detail"><strong className="dog-content-subtitle">Altura: </strong>{height}</p>
                    <p className="dog-content-detail"><strong className="dog-content-subtitle">Peso: </strong>{weight}</p>
                    <p className="dog-content-detail"><strong className="dog-content-subtitle">Años de vida: </strong>{life_span}</p>
                    <p className="dog-content-detail"><strong className="dog-content-subtitle">Temperamento: </strong>{temperament}</p>
                </div>
            </div>
            
        </div>
    );
}

