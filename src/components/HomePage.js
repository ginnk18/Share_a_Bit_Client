import React, { Component } from 'react';

class HomePage extends Component {
	render() {
		const styles = {
			jumbotron: {
				height: '400px'
			},

			img: {
				width: '50%',
				marginLeft: 'auto',
				opacity: 0.85
			},
			header: {
				width: '50%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}
		}
		return (
			<div className="HomePage">
				<div style={styles.jumbotron} className="row">
					<div style={styles.header}>
  						<h1><strong>Share a Bit</strong></h1>
  						<h5 className="pl-5">Welcome to Share a Bit. Sign up to safely and easily manage
  						your donations to organizations that keep the world turning.</h5>
					</div>
  					<img style={styles.img} className="animated fadeIn" src="/images/earth-leaves.png" />
  				</div>

			</div>
		);
	}
}

export default HomePage;