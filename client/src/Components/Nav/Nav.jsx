import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import '../Nav/Nav.css';
import image from '../../Images/dog.png';

//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!!!
export default class Nav extends Component {
   

    render() {
        let path = this.props.location.pathname;
        console.log(path)
        return (
        <div className='container-main'>
            <div className='container-nav'>
                <img src={image} alt="Logo" />
                <h1>App Dogs</h1>
                
                    <NavLink 
                        className={(path === '/') ? 'nav-link' : 'nav-link-unselected'}
                        to="/">
                        Home
                    </NavLink>
                    <NavLink 
                        className={(path === '/dog/create') ? 'nav-link' : 'nav-link-unselected'}
                        to="/dog/create">Create Breed</NavLink>
                    <NavLink 
                        className={(path === '/about') ? 'nav-link' : 'nav-link-unselected'}
                        to="/about">About
                    </NavLink>
                
            </div>
        </div>
        );
    }
}