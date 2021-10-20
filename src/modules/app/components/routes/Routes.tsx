import React from 'react';
import Header from '../header';
import NotFound from './NotFound';
import { Paths } from './types';
import { Redirect, Switch } from "react-router";
import { Router, Route } from 'react-router-dom'
import history from '../history'
import LandingPage from '../../../../pages/landingPage/LandingPage';



const notFoundRoute: RouteDefinition = {
    path: '*',
    component: NotFound,
    protected: false,
    title: '',
}

export const routes: RouteDefinition[] = [

    {
        path: Paths.landing,
        component: LandingPage,
        protected: false,
        redirect: Paths.landing,
    },
].concat(notFoundRoute as any) // Ensure that notFound is the last route

export interface RouteDefinition {
    path: string
    protected?: boolean
    redirect?: string
    component?: any
    routes?: RouteDefinition[]
    title?: string
    pathType?: number
}


interface Props { }
interface RoutesProps { }
interface StateProps {
    user: any
}

function getRouteRenderWithAuth(route: RouteDefinition, i: number) {
    return () => <route.component />
}


const authLoading = false

const Routes = () => {
    return (
        <Router history={history}>
            <Header />
            <Switch>
                <Redirect exact from="/" to={Paths.landing} />
                {routes.map((route, i) => {

                    if (authLoading) {
                        return <div key={i}>Loading ...</div>
                    } else {
                        const render = getRouteRenderWithAuth(route, i)
                        const rest = { render }
                        return <Route key={i} path={route.path} exact {...rest} />
                    }
                })}
            </Switch>
        </Router>
    );
};

export default Routes;