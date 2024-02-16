let toastCounter = 1;

const displayToast = ({ type = 'success', message = '' }) => {
	const className = 'toast-' + toastCounter;
	const newNotification = $('.toast-notification').clone().appendTo('.toasts').addClass(className);
	newNotification.find('.toast-msg').text(message);
	newNotification.find('.toast-icon i').addClass(type === 'success' ? 'fa-check' : 'fa-xmark');
	newNotification
		.find('.toast-icon')
		.addClass('wiggle')
		.css('background-color', type === 'success' ? 'var(--color-success)' : 'var(--color-danger)');
	newNotification
		.removeClass('toast-hide')
		.addClass(type === 'success' ? 'slide-in-slide-out' : 'slide-in-fade-out');

	setTimeout(() => {
		newNotification.remove();
	}, 3800);

	toastCounter++;
};
