import React from "react";
import '../Slider/Slider.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogByID, resetDogID } from "../../Redux/Actions";

import Dog from '../Dog/Dog.jsx';


export default function Slider (props) {
    
    const dogID = props.match.params.id;
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getDogByID(dogID));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () =>{
            dispatch(resetDogID())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const dog = useSelector(state => state.dogId);
    
    return (
        <div>
            {dog.map(dog=>
                <Dog 
                    key={dog.id}
                    name={dog.name}
                    image={dog.image}
                    height={dog.height}
                    weight={dog.weight}
                    life_span={dog.life_span}
                    temperament={dog.temperament}
                />)
            }
        </div>
    );
}

