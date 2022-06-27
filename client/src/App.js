import { Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Slider from './Components/Slider/Slider';
import CreateBreed from './Components/CreateBreed/CreateBreed.jsx';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav.jsx';




function App() {
    return ( 
        // useHistory().push('/landing'),
        <div className = "App">
            <Route exact path = {'/'} component = {LandingPage} />
            <Route path = {'/app'} component = { Nav } /> 
            <Switch>
                <Route path = {'/app/home'} component = { Home } /> 
                <Route path = {`/app/dog/create`} component = { CreateBreed } />  
                <Route path = {`/app/dog/:id`} component = { Slider } />  
            </Switch>
        </div>
    );
}

export default App;