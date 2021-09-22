import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";

const HatesPage = () => (
    <div><h1>Hats Page</h1></div>
)

function App() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact={true} path='/' component={Homepage}/>
                    <Route path='/hats' component={HatesPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
        ;
}

export default App;
