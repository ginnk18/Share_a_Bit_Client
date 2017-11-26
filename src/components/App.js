import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

//Pages:
import SignInPage from './SignInPage';
import HomePage from './HomePage';
import OrganizationsIndexPage from './OrganizationsIndexPage';
import OrganizationsShowPage from './OrganizationsShowPage';

class App extends Component {

	_renderNavbar() {
		return (
			<nav className="navbar navbar-expand share-navbar">
				<Link to="/"><i className="fa fa-globe fa-3x" aria-hidden="true"></i></Link>
				<div className="ml-auto">
				<Link to="/organizations">Organizations</Link>
				<Link to="/sign_in">Sign In</Link>
				</div>
			</nav>
		);
	}

	_renderFooter() {
		return (
			  <div className="footer">
    			<div className="footer-social-icons">
    				{/*<p>© Share a Bit 2017</p>*/}
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
	        	<Route path="/sign_in" component={SignInPage} />
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



  // _renderNavBar() {
  //   return (
  //         <nav>
  //           <h3>Awesome Answers</h3>
  //           <Link to="/">Home</Link>
  //           <Link to="/questions">Questions</Link>
  //           <Link to="/questions/new">Add a Question</Link>
  //           { this.isSignedIn()
  //               ? <span>Hello, {this.state.user.first_name}</span>
  //               : <Link to='/sign_in'>Sign In</Link>
  //           }
  //         </nav>
  //   );
  // }
