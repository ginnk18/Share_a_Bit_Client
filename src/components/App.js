import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AuthRoute from './AuthRoute';

//Pages:
import SignInPage from './SignInPage';
import HomePage from './HomePage';
import OrganizationsIndexPage from './OrganizationsIndexPage';
import OrganizationsShowPage from './OrganizationsShowPage';
import DonorDashboardPage from './DonorDashboardPage';
import OrgDashboardPage from './OrgDashboardPage';
import UpdateShowPage from './UpdateShowPage';
import CampaignShowPage from './CampaignShowPage';

class App extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      user: {},
	      flash: ''
	    }

	    this.signIn = this.signIn.bind(this);
	    this.signOut = this.signOut.bind(this);
	  }

	componentWillMount() {
    	this.signIn();
  	}

  	signIn() {
	    const jwt = localStorage.getItem('jwt');
	    if (jwt) {
	      const payload = jwtDecode(jwt);
	      this.setState({user: payload})
	      // this.setState({user: payload, flash: 'Welcome, thanks for signing in!'});
	      // setTimeout(() => {
	      // 	this.clearFlash()
	      // }, 5000)
	    }
	    return this.state.user;
  	}

  	signOut() {
  		localStorage.clear()
  		this.setState({user: {}, flash: 'Signed out.'})
  		this.props.history.push('/') // not working ?? (App is wrapped in Route)
  		setTimeout(() => {
	      	this.clearFlash()
	    }, 3000)
  	}


	isSignedIn() {
	  return !!this.state.user.id
	}

	clearFlash() {
		this.setState({flash: ''})
	}

	_renderNavbar() {
		return (
			<nav className="navbar navbar-expand share-navbar">
				<Link to="/"><i className="fa fa-globe fa-3x" aria-hidden="true"></i></Link>
				{
					this.isSignedIn()
						? this.state.user.type === 'donor'
							? <Link to="/donor_dashboard">Your Dashboard</Link>
							: <Link to="/org_dashboard">Your Dashboard</Link>
						: ''
				}
				{
					this.isSignedIn()
						? <Link to="/organizations">Organizations</Link>
						: ''
				}
				<div className="ml-auto">
				{
					this.isSignedIn()
						? this.state.user.type === 'donor' 
							? <span>Welcome, {this.state.user.firstName}</span>
							: <span>Welcome, {this.state.user.name} </span>
						: <Link to="/sign_in">Sign In</Link>
				}
				{
					this.isSignedIn()
						? <a className="sign-out-link" onClick={this.signOut}>Sign Out</a>
						: ''
				}
				</div>
			</nav>
		);
	}


	_renderFooter() {

		return (
			  <div className="footer">
    			<div className="footer-social-icons">
			        <ul className="social-icons mb-0">
			            <li><a href="" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
			            <li><a href="" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
			            <li><a href="" className="social-icon"> <i className="fa fa-rss"></i></a></li>
			            <li><a href="" className="social-icon"> <i className="fa fa-youtube"></i></a></li>
			            <li><a href="" className="social-icon"> <i className="fa fa-linkedin"></i></a></li>
			            <li><a href="" className="social-icon"> <i className="fa fa-google-plus"></i></a></li>
			        </ul>
    			</div>
  			</div>
		);
	}

	_renderFlashMessage() {
		return (
			<div className="alert alert-success alert-dismissible fade show" role="alert">
				{this.state.flash}
			</div>
		);
	}


  render() {
  	// const styles = {
  	// 	navImage: {
  	// 		height: '80px',
  	// 		width: '100vw',
  	// 		backgroundImage: 'url("/images/hand-world.jpg")'
  	// 	}
  	// }

    return (
    	<Router>
	      <div className="App">
	      	{/*<div style={styles.navImage}></div>*/}
	        {this._renderNavbar()}
	        {
	        	this.state.flash 
	        		? this._renderFlashMessage()
	        		: <div></div>
	        }
	        <Switch>
	        	<Route 
	        		path="/sign_in" 
	        		render={props => <SignInPage {...props} onSignIn={this.signIn} />} 
	        	/>
	        	<AuthRoute
	        		isAuthenticated={this.isSignedIn()}
	        		path="/updates/:id"
	        		component={UpdateShowPage}
	        	/>
	        	<AuthRoute
	        		isAuthenticated={this.isSignedIn()}
	        		path="/campaigns/:id"
	        		component={CampaignShowPage}
	        	/>
	        	<AuthRoute 
	        		isAuthenticated={this.isSignedIn()}
	        		path="/organizations/:id" 
	        		component={OrganizationsShowPage} 
	        		// render={props => <OrganizationsShowPage {...props} />}
	        	/>
	        	<AuthRoute 
	        		isAuthenticated={this.isSignedIn()}
	        		path="/organizations" 
	        		component={OrganizationsIndexPage} 
	        	/>
	        	<AuthRoute
	        		isAuthenticated={this.isSignedIn()}
	        		path="/donor_dashboard"
	        		render={props => <DonorDashboardPage {...props} userId={this.state.user.id} />}
	        	/>
	        	<AuthRoute 
	        		isAuthenticated={this.isSignedIn()}
	        		path="/org_dashboard" 
	        		render={props => <OrgDashboardPage {...props} userId={this.state.user.id} />} 
	        	/>
	        	<Route path="/" component={HomePage} />
	        </Switch>
	        {this._renderFooter()}
	      </div>
      	</Router>
    );
  }
}

export default App;