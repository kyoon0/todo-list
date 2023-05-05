const registerForm = document.querySelector('#register');
const loginForm = document.querySelector('#login');
const usernameRegister = document.querySelector('#username_register');
const passwordRegister = document.querySelector('#password_register');
const usernameLogin = document.querySelector('#username_login');
const passwordLogin = document.querySelector('#password_login');

registerForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = {
		username: usernameRegister.value,
		password: passwordRegister.value,
	};
	fetch('/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			localStorage.setItem('user', JSON.stringify(data));
			location.href = './dashboard.html';
		});
});

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = {
		username: usernameLogin.value,
		password: passwordLogin.value,
	};
	fetch('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data) {
				localStorage.setItem('user', JSON.stringify(data));
				location.href = './dashboard.html';
			} else {
				window.alert('User does not exist');
			}
		});
});

if (JSON.parse(localStorage.getItem('user'))) {
	location.href = './dashboard.html';
}
