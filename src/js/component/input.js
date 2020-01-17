import React, { useState, useEffect } from "react"; //useEffect is used to run when if the component didmount, unmount, etc.

export function Input() {
	const [todos, setTodos] = useState(); //Initialize the todo input field
	const [list, setList] = useState([]); //Initialize the array where all the inputs will be stored

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/aleaguilar") //This is the endpoint where I'm pulling the API data. It only runs once
			.then(response => response.json()) //Start a promise that upon reaching a determination (the response) of the fetch, it will show
			.then(data => setList(data)); //setting the content of the endpoint as the new array
	}, []); //break the fetch otherwise it loops endlessly

	const removeTodo = index => {
		//declares a function called index that returns a copy the task list, splices and replaces the original list (check to use with filters)
		const newTodos = [...list];
		newTodos.splice(index, 1);
		setList(newTodos);
	};

	const addTodo = b => {
		//Adding the new todo to the ones API itself. Keep in mind we updated the original code to make this work because we created a new function
		fetch("https://assets.breatheco.de/apis/fake/todos/user/aleaguilar", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([
				{
					label: b,
					done: false
				}
			])
		}).then(() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/aleaguilar") //Rerun the fetch to pull all the API data, included the task we added here
				.then(response => response.json())
				.then(data => setList(data));
		});
	};

	const tasks = list.map((
		item,
		index //displays the list of tasks. Also adds a delete buton that triggers removeTodo above x
	) => (
		<li key={index}>
			{" "}
			{item.label}{" "}
			{/*When adding the fetch function, change the parameter to item.label so it matches the fetch return */}
			<button type="button" onClick={() => removeTodo()}>
				Delete{" "}
			</button>
		</li>
	));

	return (
		//Creates an input field. On change stores the inputed value and on click adds it to the actual list. After adding the fetch function we replaced the setList with the addTodo function defined above so it would run and fulfill the fetch function
		<div>
			<form>
				<input
					placeholder="Task"
					onChange={e => setTodos(e.target.value)}
				/>
				<button type="button" onClick={() => addTodo(todos)}>
					{" "}
					Add Task{" "}
				</button>
			</form>
			<div>{tasks}</div>
		</div>
	);
}
