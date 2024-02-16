const showError = ({ selector, message = 'Заавал шаардлагатай' }) => {
	$(selector).addClass('error');
	$(`${selector} .input-error`).text(message);
};

const removeError = (selector) => {
	$(selector).removeClass('error');
};
