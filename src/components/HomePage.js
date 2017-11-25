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
				<div style={styles.jumbotron} class="row">
					<div style={styles.header}>
  						<h1><strong>Share a Bit</strong></h1>
  						<p class="pl-5">Pinterest kickstarter etsy blue bottle butcher.
  						 Flannel taiyaki lo-fi cliche. Snackwave sartorial 
  						 beard kombucha iPhone narwhal. Celiac vape brooklyn
  						  franzen vexillologist squid. Meggings mlkshk authentic 
  						  bicycle rights. Meggings slow-carb retro kinfolk, 
  						  pop-up semiotics pitchfork.</p>
					</div>
  					<img style={styles.img} src="/images/earth-leaves.png" />
  				</div>

			</div>
		);
	}
}

export default HomePage;