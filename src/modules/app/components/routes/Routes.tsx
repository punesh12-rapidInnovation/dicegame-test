import React from 'react';
import Header from '../header';
import NotFound from './NotFound';
import { Paths } from './types';
import { Redirect, Switch } from "react-router";
import { Router, Route } from 'react-router-dom'
import LiveChat from '../../../liveChat/LiveChat';
import HousePool from 'pages/housePool';
import LandingPage from 'pages/landingPage/LandingPage';
import history from 'shared/helpers/history';
import TermsAndConditions from 'pages/termsAndConditons/TermsAndConditions';
import Footer from '../footer/Footer';
import { screenSizes } from 'shared/styles/theme';




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
    {
        path: Paths.liveChat,
        component: LiveChat,
        protected: false,
        redirect: Paths.liveChat,
    },
    {
        path: Paths.housePool,
        component: HousePool,
        protected: false,
        redirect: Paths.landing,
    },
    {
        path: Paths.terms_and_conditons,
        component: TermsAndConditions,
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


function getRouteRenderWithAuth(route: RouteDefinition, i: number) {
    return () => <route.component />
}

const Routes = () => {
    return (
        <Router history={history}>
            {
                window.innerWidth < screenSizes.mediaS ?
                    <Header /> : null
            }
            <Switch>
                <Redirect exact from="/" to={Paths.landing} />
                {routes.map((route, i) => {
                    const render = getRouteRenderWithAuth(route, i)
                    const rest = { render }
                    return <Route key={i} path={route.path} exact {...rest} />
                })}
            </Switch>
            <Footer />
        </Router>
    );
};

export default Routes;