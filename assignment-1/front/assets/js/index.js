const fetchUsers = async () => {
	try {
		const res = await fetch('http://localhost:8080/api/user', { method: 'GET' }).then((res) =>
			res.json()
		);

		for (const user of res) {
			const newRow = $('<tr></tr>').append(`<th scope="row">${user.id}</th>`);
			newRow.append(`<td>${user.firstName}</td>`);
			newRow.append(`<td>${user.lastName}</td>`);
			newRow.append(`<td>${user.email}</td>`);
			newRow.append(`<td>${user.section.name}</td>`);

			$('#users-table tbody').append(newRow);
		}
	} catch (error) {
		console.log(error);
	}
};

const getCurrentUser = async () => {
	const currentUser = JSON.parse(window.sessionStorage.getItem('logged_user'));

	$('.user-detail span').text(currentUser.firstName);
};

const logout = () => {
	window.sessionStorage.removeItem('logged_user');

	window.location.href = './sign-in.html';
};

$(document).ready(function () {
	fetchUsers();
	getCurrentUser();

	$('.logout-btn').click(() => {
		logout();
	});
});
