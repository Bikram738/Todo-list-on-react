import React, { Component } from "react";
import deleteIcon from "./system-outline-39-trash.png";
import editIcon from "./Edit_icon_(the_Noun_Project_30184).svg.png";

export default class Todolist extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: "",
      Edit_task: false,
      currentid: "",
      currentValue: ""
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  AddNewTask = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.value,
      id: Date.now(),
      timestamp: new Date().toLocaleString() // Add timestamp to the task
    };
    if (this.state.value !== "") {
      this.setState({ todos: [...this.state.todos, obj] });
      this.setState({ value: "" });
    }
  };


  EditTodo = (id, newValue) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, name: newValue };
        }
        return todo;
      })
    }));
  };

  UpdateTodo = (e) => {
    e.preventDefault();
    this.EditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ Edit_task: false });
  };

  DeleteTask = (itemId) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== itemId)
    });
  };


  EditToggle = (todo) => {
    this.setState({ Edit_task: true });
    this.setState({ currentid: todo.id });
    this.setState({ currentValue: todo.name });
  };

  inputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  render() {
    const List = this.state.todos.map((todo) => (
      <li className="todo_item" key={todo.id}>
        <p>
          {todo.name} - ({todo.timestamp})
        </p>
        <div>
          <button onClick={() => this.EditToggle(todo)}>
            <img src={editIcon} alt="Edit" />
          </button>
          <button onClick={() => this.DeleteTask(todo.id)}>
            <img src={deleteIcon} alt="Delete" />
          </button>
        </div>
      </li>
    ));

    return (
      <div>
        {this.state.Edit_task === false ? (
          <form onSubmit={this.AddNewTask}>
            <input
              placeholder="Add your task"
              value={this.state.value}
              onChange={this.onChange}
            />
            <button onClick={this.AddNewTask}>+ Add task</button>
          </form>
        ) : (
          <form onSubmit={this.UpdateTodo}>
            <input
              placeholder="Edit your task"
              value={this.state.currentValue}
              name={this.state.currentValue}
              onChange={this.inputChange}
            />
            <button onClick={this.UpdateTodo}>Update</button>
          </form>
        )}
        <ul className="todo-Container">{List}</ul>
      </div>
    );
  }
}