import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

class Beer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLiked: false
		};
	}

	handleClick = () => {
		this.setState({
			isLiked: !this.state.isLiked
		});
	};
	render() {
		return (
			<div className="beerBox">
				<div className="beerName">{this.props.beer.name}</div>
				<img style={{ width: "30px" }} src={this.props.beer.image_url}></img>
				<p style={{ fontStyle: "italic", fontWeight: "bold" }}>
					{this.props.beer.tagline}
				</p>
				<button
					style={{ fontSize: "14px", borderRadius: "50%" }}
					onClick={this.handleClick}
				>
					{this.state.isLiked ? "Liked" : "Like"}
				</button>
				<p>{this.props.beer.description}</p>
			</div>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			beers: [{}]
		};
	}

	componentDidMount() {
		fetch("https://api.punkapi.com/v2/beers")
			.then((json) => json.json())
			.then((data) => {
				this.setState({
					beers: data
				});
				console.log(data);
			})
			.catch((error) => console.log("parsing failed", error));
	}

	render() {
		return (
			//JSX from here
			<div className="App">
				{/* <Beer beer={this.state.beers[0]} /> */}
				{this.state.beers.map((beerData, index) => (
					<Beer key={index} beer={beerData} />
				))}
				<button>LIKE</button>
			</div>
			//JSX to here
		);
	}
}

export default App;
