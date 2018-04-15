import React, { Component } from 'react';

// Every single component in react has the property children
class Scroll extends Component {
	render(){
		return(
			<div style={{'overflowY':'scroll','border':'1px solid black','height':this.props.height}}>
				{this.props.children}
			</div>
		)
	}
}

export default Scroll;