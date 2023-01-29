import React from "react";
import "./Joke.css";

class Joke extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { vote, votes, text, id } = this.props;
		return (
			<div className="Joke">
				<div className="Joke-votearea">
					<button onClick={() => vote(id, +1)}>
						<i className="fas fa-thumbs-up" />
					</button>

					<button onClick={() => vote(id, -1)}>
						<i className="fas fa-thumbs-down" />
					</button>

					{votes}
				</div>

				<div className="Joke-text">{text}</div>
			</div>
		);
	}
}

export default Joke;
