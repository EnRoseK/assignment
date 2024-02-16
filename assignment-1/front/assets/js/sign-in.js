const formValues = {
	email: '',
	password: '',
};

const setInitialValues = () => {
	$('#email').val(formValues.email);
	$('#password').val(formValues.password);
};

const handleInputChange = (e, selector) => {
	removeError(selector);
	formValues[e.target.name] = e.target.value;
};

const isFormValuesValid = () => {
	if (!formValues.email || !formValues.password) {
		if (!formValues.email) {
			showError({ selector: '#email-wrapper', message: 'Э-Шуудан хоосон байж болохгүй!' });
		}

		if (!formValues.password) {
			showError({ selector: '#password-wrapper', message: 'Нууц үг хоосон байж болохгүй!' });
		}
		return false;
	}

	const emailRegex = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/gi, 'gm');
	if (!emailRegex.test(formValues.email)) {
		showError({ selector: '#email-wrapper', message: 'Э-Шуудан буруу байна!' });
		return false;
	}

	return true;
};

const handleFormSubmit = async (e) => {
	e.preventDefault();

	if (!isFormValuesValid()) {
		return;
	}

	$('.form-btn').addClass('loading');

	const res = await fetch('http://localhost:8080/api/user/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formValues),
	});

	const data = await res.json();

	if (!res.ok) {
		displayToast({ type: 'error', message: data.message });
		return;
	}

	$('.form-btn').removeClass('loading');
	displayToast({ message: 'Амжилттай нэвтэрлээ' });

	setTimeout(() => {
		window.sessionStorage.setItem('logged_user', JSON.stringify(data));
		window.location.href = './index.html';
	}, 1000);
};

$(document).ready(function () {
	setInitialValues();

	$('#email').change((e) => handleInputChange(e, '#email-wrapper'));
	$('#password').change((e) => handleInputChange(e, '#password-wrapper'));

	$('#sign-in-form').submit(handleFormSubmit);
});
