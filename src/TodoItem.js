import React from "react";
import "./TodoItem.css";

class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			done: false,
		};
	}

	handleDone = () => {
		this.setState({
			done: !this.state.done,
		});
	};

	render() {
		return (
			<div className="todoItem">
				<span className={this.state.done ? "done" : "notDone"}>
					{this.props.description}
				</span>{" "}
				<button onClick={this.handleDone}>
					{this.state.done ? "Undo" : "Done"}
				</button>{" "}
				<button onClick={() => this.props.handleDelete(this.props.id)}>
					Remove
				</button>
			</div>
		);
	}
}

export default TodoItem;
