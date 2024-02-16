const formValues = {
	email: '',
	password: '',
	passwordConfirmation: '',
	firstName: '',
	lastName: '',
	gender: 'male',
	section: '',
	terms: false,
};

const setInitialValues = () => {
	$('#email').val(formValues.email);
	$('#password').val(formValues.password);
	$('#passwordConfirmation').val(formValues.passwordConfirmation);
	$('#firstName').val(formValues.firstName);
	$('#lastName').val(formValues.lastName);
	$('#section').val(formValues.section);
	$('#terms').prop('checked', formValues.terms);
	if (formValues.gender === 'male') {
		$('#male').prop('checked', true);
	} else if (formValues.gender === 'female') {
		$('#female').prop('checked', true);
	}
};

const handleInputChange = (e, selector) => {
	removeError(selector);

	if (e.target.type === 'checkbox') {
		formValues[e.target.name] = e.target.checked;
		return;
	}

	if (e.target.type === 'radio') {
		formValues.gender = e.target.value;
		return;
	}

	formValues[e.target.name] = e.target.value;
};

const isFormValuesValid = () => {
	if (!formValues.email) {
		showError({ selector: '#email-wrapper', message: 'Э-Шуудан заавал шаардлагатай!' });
	}
	if (!formValues.password) {
		showError({ selector: '#password-wrapper', message: 'Нууц үг заавал шаардлагатай!' });
	}
	if (!formValues.passwordConfirmation) {
		showError({
			selector: '#passwordConfirmation-wrapper',
			message: 'Нууц үг дахин оруулах заавал шаардлагатай!',
		});
	}
	if (!formValues.firstName) {
		showError({ selector: '#firstName-wrapper', message: 'Өөрийн нэр заавал шаардлагатай!' });
	}
	if (!formValues.lastName) {
		showError({ selector: '#lastName-wrapper', message: 'Овог заавал шаардлагатай!' });
	}
	if (!formValues.gender) {
		showError({ selector: '#gender-wrapper', message: 'Хүйс заавал сонгох шаардлагатай!' });
	}
	if (!formValues.section) {
		showError({ selector: '#section-wrapper', message: 'Хэлтэс заавал сонгох шаардлагатай!' });
	}
	if (!formValues.terms) {
		showError({ selector: '#terms-wrapper', message: 'Үйлчилгээ нөхцөл зөвшөөрөх шаардлагатай!' });
		return false;
	}

	const emailRegex = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/gi, 'gm');
	if (!emailRegex.test(formValues.email)) {
		showError({ selector: '#email-wrapper', message: 'Э-Шуудан буруу байна!' });
		return false;
	}
	if (formValues.password.length < 8) {
		showError({
			selector: '#password-wrapper',
			message: 'Нууц үгийн урт дор хаяж 8 тэмдэгт байх хэрэгтэй!',
		});
		return false;
	}
	if (formValues.password !== formValues.passwordConfirmation) {
		showError({
			selector: '#passwordConfirmation-wrapper',
			message: 'Нууц үг таарахгүй байна!',
		});
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

	const res = await fetch('http://localhost:8080/api/user/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: formValues.email,
			password: formValues.password,
			passwordConfirmation: formValues.passwordConfirmation,
			firstName: formValues.firstName,
			lastName: formValues.lastName,
			gender: formValues.gender,
			sectionId: Number(formValues.section),
		}),
	});
	const data = await res.json();

	if (!res.ok) {
		displayToast({ type: 'error', message: data.message });
		return;
	}

	$('.form-btn').removeClass('loading');
	displayToast({ type: 'success', message: 'Амжилттай бүртгэгдлээ' });
	setTimeout(() => {
		window.location.href = './sign-in.html';
	}, 1000);
};

const fetchSections = async () => {
	try {
		const res = await fetch('http://localhost:8080/api/section', {
			method: 'GET',
		}).then((res) => res.json());

		for (const section of res) {
			$('<option></option>').appendTo('#section').text(section.name).val(section.id);
		}
	} catch (error) {
		console.log(error);
	}
};

$(document).ready(function () {
	setInitialValues();

	fetchSections();

	$('#email').change((e) => handleInputChange(e, '#email-wrapper'));
	$('#password').change((e) => handleInputChange(e, '#password-wrapper'));
	$('#passwordConfirmation').change((e) => handleInputChange(e, '#passwordConfirmation-wrapper'));
	$('#firstName').change((e) => handleInputChange(e, '#firstName-wrapper'));
	$('#lastName').change((e) => handleInputChange(e, '#lastName-wrapper'));
	$('#section').change((e) => handleInputChange(e, '#section-wrapper'));
	$('#terms').change((e) => handleInputChange(e, '#terms-wrapper'));
	$('#male').change((e) => handleInputChange(e, '#gender-wrapper'));
	$('#female').change((e) => handleInputChange(e, '#gender-wrapper'));

	$('#sign-up-form').submit(handleFormSubmit);
});
