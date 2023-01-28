import React from "react";
import TodoItem from "./TodoItem";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todotext: "",
			todoitems: [],
		};
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleAdd() {
		// Add the text in this.state.todotext
		this.setState({
			todoitems: this.state.todoitems.concat([
				<TodoItem
					id={uuidv4()}
					handleDelete={this.handleDelete}
					description={this.state.todotext}></TodoItem>,
			]),
			todotext: "",
		});

		// to the this.state.todoitems
		// clear the value of this.state.todotext
	}

	handleClear = () =>
		this.setState({
			todoitems: [],
		});

	componentDidMount = () => {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((response) => response.json())
			.then((result) => {
				let newTodoItems = [];
				for (let element of result) {
					newTodoItems.push(
						<TodoItem
							id={element.id}
							handleDelete={this.handleDelete}
							description={element.title}></TodoItem>
					);
				}
				this.setState({
					todoitems: newTodoItems,
				});
			});
	};

	handleEnter = (e) => {
		if (e.key === "Enter") this.handleAdd();
	};

	handleDelete = (id) => {
		this.setState({
			todoitems: this.state.todoitems.filter((item) => item.props.id !== id),
		});
	};

	render() {
		return (
			<div className="todoapp">
				<header>
					<h1>The Todo App</h1>
				</header>
				<main>
					<section>
						<input
							value={this.state.todotext}
							onChange={(e) => this.setState({ todotext: e.target.value })}
							onKeyDown={this.handleEnter}
							type="text"
							placeholder="Enter your todo item"
						/>{" "}
						<button onClick={this.handleAdd}>Add</button>{" "}
						<button onClick={this.handleClear}>Clear All</button>{" "}
						<button onClick={this.componentDidMount}>Load All</button>
					</section>
					<br></br>
					<section>
						{this.state.todoitems.map((item, index) => {
							return <div key={index}> {item}</div>;
						})}
					</section>
				</main>
			</div>
		);
	}
}

export default App;
