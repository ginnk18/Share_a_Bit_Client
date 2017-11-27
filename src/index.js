import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import promise from 'redux-promise';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// const store = createStore(reducers, {}, applyMiddleware());
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
	<Router>
		<Route path="/" component={App} />	
	</Router>
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();