// DOM references (# for id, . for class)
const list = document.querySelector('#list');
const input = document.querySelector('.input');
const addSubmit = document.querySelector('.addSubmit');
const form = document.querySelector('#todo-container');

let todoList = [];

// @desc Get To Do
// @route GET /api/todo
// @access Public
const getTodos = () => {
	fetch('/api/todo')
		.then((response) => response.json())
		.then((data) => {
			todoList = data;
			renderTodos();
		});
};

// @desc Create To Do
// @route POST /api/todo
// @access Public
form.addEventListener('submit', (e) => {
	e.preventDefault();
	createTodo();
	input.value = '';
});

const createTodo = () => {
	const data = { item: input.value };
	fetch('/api/todo', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((data) => {
			todoList.push(data);
			renderTodos();
		});
};

// RETURN / Render all data
const renderTodos = () => {
	console.log(todoList);
	list.innerHTML = '';
	todoList.forEach((element, index) => {
		list.innerHTML += `
		<li key=${index} id="${element._id}">
				<label>${element.item}</label>
				<button class="editId">EDIT</button>
				<button class="removeId">x</button>
		</li>
		`;
	});

	// @desc Delete To Do
	// @route DELETE /api/todo
	// @access Public
	const removeId = document.querySelectorAll('.removeId');
	removeId.forEach((element, index) => {
		element.addEventListener('click', (e) => {
			let id = todoList[index]._id;
			fetch(`/api/todo/${id}`, {
				method: 'DELETE',
			})
				.then((response) => response.json())
				.then((data) => {
					todoList = data;
					getTodos();
				});
		});
	});

	// @desc Edit To Do
	// @route PUT /api/todo
	// @access Public
	const editId = document.querySelectorAll('.editId');

	editId.forEach((element, index) => {
		element.addEventListener('click', (e) => {
			e.target.nextElementSibling.remove();
			const edit_input = document.createElement('input');
			element.parentElement.appendChild(edit_input);
			edit_input.value = e.target.previousElementSibling.innerText;
			const ok = document.createElement('button');
			ok.setAttribute('class', 'editConfirm');
			ok.innerText = 'OK';
			element.parentElement.appendChild(ok);
			if (ok) {
				ok.addEventListener('click', (e) => {
					const updatedData = { item: edit_input.value };
					let id = todoList[index]._id;
					fetch(`/api/todo/${id}`, {
						method: 'PUT',
						body: JSON.stringify(updatedData),
						headers: {
							'Content-Type': 'application/json',
						},
					})
						.then((response) => response.json())
						.then((data) => {
							todoList = data;
							getTodos();
						});
				});
			}
		});
	});
};

// Initialize all function calls
const init = () => {
	getTodos();
};
init();

// todoList.forEach((element, index) => {
// 	const newItem = document.createElement('li');
// 	newItem.setAttribute('key', `${index}`);
// 	newItem.setAttribute('id', `${element._id}`);
// 	const itemDesc = document.createElement('label');
// 	const btn = document.createElement('button');
// 	itemDesc.innerText = `${element.item}`;
// 	btn.setAttribute('class', 'removeId');
// 	btn.innerText = 'x';
// 	list.appendChild(newItem);
// 	newItem.appendChild(itemDesc);
// 	newItem.appendChild(btn);
// });
