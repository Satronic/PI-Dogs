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
                <img className='logo-nav' src={image} alt="Logo" />
                <h1>App Dogs</h1>
                
                    <NavLink 
                        className={(path === '/app/home') ? 'nav-link' : 'nav-link-unselected'}
                        to="/app/home">
                        Home
                    </NavLink>
                    <NavLink 
                        className={(path === '/app/dog/create') ? 'nav-link' : 'nav-link-unselected'}
                        to="/app/dog/create">Create Breed</NavLink>
                    <NavLink 
                        className={(path === '/app/about') ? 'nav-link' : 'nav-link-unselected'}
                        to="/app/about">About
                    </NavLink>
                
            </div>
        </div>
        );
    }
}