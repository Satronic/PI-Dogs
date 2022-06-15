import { Route, Switch} from 'react-router-dom';
import './App.css';
import Slider from './Components/Slider/Slider';
import CreateBreed from './Components/CreateBreed/CreateBreed.jsx';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav.jsx';



function App() {
    return ( 
        <div className = "App">
                <Route path = {'/'} component = { Nav } /> 
                <Switch>
                    <Route exact path = {'/'} component = { Home } /> 
                    <Route path = {`/dog/create`} component = { CreateBreed } />  
                    <Route path = {`/dog/:id`} component = { Slider } />  
                </Switch>
        </div>
    );
}

export default App;