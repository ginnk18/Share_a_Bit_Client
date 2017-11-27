import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

//Pages:
import SignInPage from './SignInPage';
import HomePage from './HomePage';
import OrganizationsIndexPage from './OrganizationsIndexPage';
import OrganizationsShowPage from './OrganizationsShowPage';

class App extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      user: {}
	    }

	    this.signIn = this.signIn.bind(this);
	    this.signOut = this.signOut.bind(this);
	  }

	componentDidMount() {
		console.log('User: ', this.state.user)
    	this.signIn();
    	console.log('localStorage', localStorage);
  	}

  	signIn() {
	    const jwt = localStorage.getItem('jwt');
	    if (jwt) {
	      const payload = jwtDecode(jwt);
	      this.setState({user: payload});
	    }
  	}

  	signOut() {
  		localStorage.clear()
  		this.setState({user: {}})
  	}

	isSignedIn() {
	  return !!this.state.user.id
	}

	_renderNavbar() {
		return (
			<nav className="navbar navbar-expand share-navbar">
				<Link to="/"><i className="fa fa-globe fa-3x" aria-hidden="true"></i></Link>
				<div className="ml-auto">
				<Link to="/organizations">Organizations</Link>
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


  render() {
  	const styles = {
  		navImage: {
  			height: '80px',
  			width: '100vw',
  			backgroundImage: 'url("/images/hand-world.jpg")'
  		}
  	}

    return (
    	<Router>
	      <div className="App">
	      	{/*<div style={styles.navImage}></div>*/}
	        {this._renderNavbar()}
	        <Switch>
	        	<Route 
	        		path="/sign_in" 
	        		render={props => <SignInPage {...props} onSignIn={this.signIn} />} 
	        	/>
	        	<Route path="/organizations/:id" component={OrganizationsShowPage} />
	        	<Route path="/organizations" component={OrganizationsIndexPage} />
	        	<Route path="/" component={HomePage} />
	        </Switch>
	        {this._renderFooter()}
	      </div>
      	</Router>
    );
  }
}

export default App;