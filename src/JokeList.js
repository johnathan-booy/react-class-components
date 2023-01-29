import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
	static defaultProps = {
		numJokesToGet: 10,
	};

	constructor(props) {
		super(props);
		this.generateNewJokes = this.generateNewJokes.bind(this);
		this.vote = this.vote.bind(this);
		this.getJokes = this.getJokes.bind(this);
		this.state = { jokes: [], ...props };
	}

	/* empty joke list and then call getJokes */
	generateNewJokes() {
		this.setState({ jokes: [] });
	}

	/* get jokes */
	async getJokes() {
		let j = [...this.state.jokes];
		let seenJokes = new Set();
		try {
			while (j.length < this.state.numJokesToGet) {
				let res = await axios.get("https://icanhazdadjoke.com", {
					headers: { Accept: "application/json" },
				});
				let { status, ...jokeObj } = res.data;

				if (!seenJokes.has(jokeObj.id)) {
					seenJokes.add(jokeObj.id);
					j.push({ ...jokeObj, votes: 0 });
				} else {
					console.error("duplicate found!");
				}
			}
			this.setState({ jokes: j });
		} catch (e) {
			console.log(e);
		}
	}

	/* change vote for this id by delta (+1 or -1) */
	vote(id, delta) {
		this.setState((state) => {
			const allJokes = state.jokes.map((j) =>
				j.id === id ? { ...j, votes: j.votes + delta } : j
			);
			return { jokes: allJokes };
		});
	}

	componentDidMount() {
		this.getJokes();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.jokes.length === 0) this.getJokes();
	}

	render() {
		const jokes = this.state.jokes;

		if (jokes) {
			let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

			return (
				<div className="JokeList">
					<button className="JokeList-getmore" onClick={this.generateNewJokes}>
						Get New Jokes
					</button>

					{sortedJokes.map((j) => (
						<Joke
							text={j.joke}
							key={j.id}
							id={j.id}
							votes={j.votes}
							vote={this.vote}
						/>
					))}
				</div>
			);
		}

		return null;
	}
}

export default JokeList;
