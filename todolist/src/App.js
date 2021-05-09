import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: ["Item1", "Item2", "Item3", "Item4", "Item5"],
      completed: [],
    };
  }

  getTodo = () => {
    return this.state.todo.map((item) => (
      <li
        onClick={() => {
          this.moveTodo("completed", item);
        }}
      >
        {item}
      </li>
    ));
  };

  getCompleted = () => {
    return this.state.completed.map((item) => (
      <li
        onClick={() => {
          this.moveTodo("todo", item);
        }}
      >
        {item}
      </li>
    ));
  };

  moveTodo = (target, val) => {
    if ("completed" === target) {
      this.setState({
        todo: this.state.todo.filter((item) => item !== val),
        completed: [...this.state.completed, val],
      });
    }
    if ('todo' === target) {
      this.setState({
        completed: this.state.completed.filter((item) => item !== val),
        todo: [...this.state.todo, val],
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-box Todo">
          <h2>todo</h2>
          <ul>{this.getTodo()}</ul>
        </div>

        <div className="App-box Completed">
          <h2>completed</h2>
          <ul>{this.getCompleted()}</ul>
        </div>
      </div>
    );
  }
}
export default App;
