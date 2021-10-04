import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route exact={true} path='/' component={Homepage}/>
                    <Route path='/shop' component={ShopPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
        ;
}

export default App;
