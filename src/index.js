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


///////////////////////////////////////////////////////////////

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import promise from 'redux-promise';

// import reducers from './reducers';
// import PostsIndex from './components/posts_index';
// import PostsNew from './components/posts_new';
// import PostsShow from './components/posts_show';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <BrowserRouter>
//     	<div>
//         <Switch> 
//           <Route path="/posts/new" component={PostsNew} />
//           <Route path="/posts/:id" component={PostsShow} />
//           <Route path="/" component={PostsIndex} />
//         </Switch>
//     	</div>
//     </BrowserRouter>
//   </Provider>
//   , document.querySelector('.container'));