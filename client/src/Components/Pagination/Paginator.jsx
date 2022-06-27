import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { incPage, decPage, selPage } from "../../Redux/Actions";
import './Paginator.css';


//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!!!
const Nav = ({pageMin, pageMax, total, pages}) => {

const dispatch = useDispatch();
const count = useSelector(state => state.count);

const incrementPage = function(){
    dispatch(incPage());
}

const decrementPage = function(){
    dispatch(decPage());
}

const selectPage = function(event){
    let page = event.target.innerHTML;
    console.log(page)
    dispatch(selPage(page));
}

return (
<div className='container'>
    <div className="container-paginator">
        <div className='container-pagination-bar'>
            <button className="material-symbols-outlined controls">keyboard_arrow_left</button>
            <button 
                name='previusPage' 
                className="material-symbols-outlined" 
                onClick={()=>decrementPage()}
                title="Página anterior"
            >keyboard_double_arrow_left</button>
                
            <div className="content-pages">
                {Object.keys(pages).map(page => <button 
                    key={page}
                    className={page == count ? 'pageActive': 'pageInactive'} 
                    title='Pagina'
                    onClick={(event)=>selectPage(event)}
                    >{page}
                </button>)}
            </div>
                
            <button 
                name='previusPage' 
                className="material-symbols-outlined" 
                onClick={()=>incrementPage()}
                title='Página siguiente'
            >keyboard_double_arrow_right</button>
            <button className="material-symbols-outlined">keyboard_arrow_right</button>
        </div>
        <div className='container-pagination-bar'>
            <h3 className='container-pagination-text'>
                {pageMin} al {pageMax} de {total}
            </h3>
        </div>
    </div>
</div>
);

}

export default Nav;