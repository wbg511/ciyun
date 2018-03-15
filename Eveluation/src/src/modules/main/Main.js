import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { Router, hashHistory } from "react-router";
import reducers from "./rootReducers";
import Routes from "./rootRoutes";
import axios from "axios";

let store = createStore(reducers, applyMiddleware(thunk));
export default class Main extends Component {
	render(){
		return (
			<Provider store={store}>
				<Router routes={Routes} history={hashHistory}></Router>
			</Provider>
		)
	}

}
