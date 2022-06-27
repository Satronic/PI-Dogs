import React from "react";
import { Link } from "react-router-dom";
import '../Card/Card.css';


//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!!!
const Card = ({id, name, image, weight, temperament})=> {

    return (

        <div className='card'>
                <Link className='card-link' to={`/app/dog/${id}`}>
                    <img className='card-image' src={image} alt="" />
                    <div className='card-content' >
                        <h4 className="card-content-title">{name}</h4>
                        <p className="card-content-detail"><strong>Temperamento: </strong>{temperament}</p>
                        <p className="card-content-detail"><strong>Peso: </strong>{weight}</p>
                    </div>
                </Link>
        </div>
    );
}

export default Card;