import './App.css';
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import {auth} from "./firebase/firebase.utils"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import {createUserProfileDocument} from "./firebase/firebase.utils";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });

                    console.log(this.state);
                });
            }

            this.setState({ currentUser: userAuth });
        });
    }


    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header currentUser={this.state.currentUser}/>
                    <Switch>
                        <Route exact={true} path='/' component={Homepage}/>
                        <Route path='/shop' component={ShopPage}/>
                        <Route path='/signin' component={SignInAndSignUpPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )

    }


}

export default App;
