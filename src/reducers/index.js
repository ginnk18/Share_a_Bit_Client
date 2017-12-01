import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import orgsReducer from './orgsReducer';
import userReducer from './userReducer';
import userOrgReducer from './userOrgReducer';

export default combineReducers({
	auth: authReducer,
	orgs: orgsReducer,
	form: formReducer,
	userDonor: userReducer,
	userOrg: userOrgReducer 
})