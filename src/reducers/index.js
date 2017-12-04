import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orgsReducer from './orgsReducer';
import userReducer from './userReducer';
import userOrgReducer from './userOrgReducer';
import updatesReducer from './updatesReducer';
import campaignsReducer from './campaignsReducer';

export default combineReducers({
	orgs: orgsReducer,
	form: formReducer,
	userDonor: userReducer,
	userOrg: userOrgReducer,
	updates: updatesReducer,
	campaigns: campaignsReducer
})