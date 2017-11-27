import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import promise from 'redux-promise';

// const store = createStore(reducers, {}, applyMiddleware());
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}><App /></Provider>, 
	document.getElementById('root')
);
registerServiceWorker();