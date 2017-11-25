import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

//Pages:
import SignInPage from './SignInPage';
import HomePage from './HomePage';

class App extends Component {

	_renderNavbar() {
		return (
			<nav className="navbar navbar-expand share-navbar">
				<Link to="/"><i class="fa fa-globe fa-3x" aria-hidden="true"></i></Link>
				<div className="ml-auto">
				<Link to="/sign_in">Sign In</Link>
				</div>
			</nav>
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
	        	<Route path="/" component={HomePage} />
	        </Switch>
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
