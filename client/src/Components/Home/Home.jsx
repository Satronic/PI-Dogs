import React, { Component } from "react";
import Search from "../Search/Search";
import Card from '../Card/Card';
import Paginator from '../Pagination/Paginator'
import '../Home/Home.css';

import {connect} from 'react-redux';
import { getAllDogs, getAllTemperaments} from "../../Redux/Actions";
import Error from "../Error/Error";
import Message from "../Message/Message";



//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!!!
export class Home extends Component {

    componentDidMount(){
        // this.props.getAllDogs();
        this.props.getAllTemperaments();
    }

    createPages(arrayLength, pageSize) {
        let length = arrayLength;
        let numberPages = 0;
        let pages = {}
    
        if (length % pageSize === 0) {
            numberPages = length / pageSize;
            for (let i = 1; i <= numberPages; i++) {
                let max = (pageSize * i);
                let min = max - pageSize;
    
                pages[i] = [min, max]
            }
            return pages;
        }
        if (length % pageSize !== 0) {
            numberPages = Math.floor(length / pageSize);
            for (let i = 1; i <= numberPages; i++) {
                let max = (pageSize * i);
                let min = max - pageSize;
    
                pages[i] = [min, max]
            }
            pages[numberPages + 1] = [numberPages * pageSize, length]
            return pages;
        }
    }

    render() {
        console.log(this.props.message)
        const SIZE = 8;
        let total = this.props.dogs?.length || 0;
        let page = this.props.count;
        let pages = {};
        let min = - 1;
        let max = 0;

        if(total > 0){
            pages = this.createPages(total, SIZE);
            min = pages[page][0];
            max = pages[page][1];
        }

        return (
            // console.log('Dogs home', this.props.dogs),
            <div>
                <Search />
                <div className='container-slider-home'>
                    
                    {(this.props.message.hasOwnProperty('msg')) ? <Message message={this.props.message.msg}/>: this.props.dogs?.map(dog => 
                        <Card 
                            key={dog.id} 
                            id={dog.id}
                            image={dog.image}
                            name={dog.name}
                            temperament= {dog.temperament}
                            weight={dog.weight}
                        />
                    ).slice(min, max)
                    }
                    {<Error error={this.props.error} state={Object.entries(this.props.error).length > 0 ? true : false}/>}
                    
                </div>
                <Paginator pageMin={min + 1} pageMax={max} total={total} pages={pages} />
            </div>
        );
    }
}

export const mapStateToProps = function(state){
    return{
        dogs: state.dogs,
        error: state.error,
        count: state.count,
        message: state.message
    }
};

export const mapDispatchToProps = function(dispatch){
return{
    getAllDogs: (dogs) => dispatch(getAllDogs(dogs)),
    getAllTemperaments: (dogs) => dispatch(getAllTemperaments(dogs)),
}
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
