import React, { Component } from 'react';
import CardList from '../components/CardList';
//import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

/*
1 - Create the constructor
2 - Render
3 - Update the state
4 - Render again because state change
*/
class App extends Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: '',
			height: ''
		}
	}

	// Use = and => to refer to the element that created the function when using this
	// otherwise this will refer to the input that called the event
	onSearchChange = (event) => {
		// Change the state
		this.setState({searchfield: event.target.value})
	}

	// Used to resize correctly the height of the card list component
	setCardListHeight = () => {
		var offsetHeight = 64 + document.getElementsByTagName('h1')[0].offsetHeight + document.getElementsByClassName('pa2')[0].offsetHeight;
		this.setState({height: window.innerHeight - offsetHeight + 'px'})
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(json => this.setState({robots: json}))
		// Assign the correct height on the card list
		// create an event to call the function every time the size of window changes
		setTimeout(() => {
			this.setCardListHeight();
			window.addEventListener("resize", this.setCardListHeight.bind(this));
		},500)
	}

	// This render method is called always when you call setState(), because shouldComponentUpdate always returns true by default
	render(){
		const { robots, searchfield, height } = this.state;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		if(robots.length === 0){
			return <h1>Loading data...please wait</h1>
		} else {
			return(
				<div className='tc'>
					<h1 className='f1'>Robot friends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll height={height}>
						<CardList robots={filteredRobots}/>
					</Scroll>	
				</div>
			);
		}
	}
}

export default App;