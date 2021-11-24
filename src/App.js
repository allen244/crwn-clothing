import './App.css';
import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import {auth} from "./firebase/firebase.utils"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {createUserProfileDocument} from "./firebase/firebase.utils";
import { selectCurrentUser } from './redux/user/user.selectors';
import {createStructuredSelector} from "reselect";

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }


    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact={true} path='/' component={Homepage}/>
                        <Route path='/shop' component={ShopPage}/>
                        <Route exact path='/signin' render={() =>
                            this.props.currentUser ? (<Redirect to='/'/>)
                                :
                            (<SignInAndSignUpPage/>)
                        }/>
                    </Switch>
                </div>
            </BrowserRouter>
        )

    }


}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))

})
export default connect(mapStateToProps, mapDispatchToProps)(App);
