import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {AuthService} from './auth/Auth.service';
import {Home} from './pages/Home/Home';
import {Callback} from './pages/Callback/Callback';
import {Login} from './pages/Login/Login';

const auth = new AuthService();

const handleAuthentication = (nextState: any, replace?: any) => {
    console.log('NEXT STATE', nextState)
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" render={(props: any) => <Home auth={auth} {...props} />}/>
            <Route path="/home" render={(props: any) => <Home auth={auth} {...props} />}/>
            <Route path="/login" render={(props: any) => {
                auth.login();
                return <Login auth={auth} {...props} />
            }}/>
            <Route path="/callback" render={(props: any) => {
                handleAuthentication(props);
                return <Redirect to={'/home'}/>
            }}/>
        </Switch>
    );
}
