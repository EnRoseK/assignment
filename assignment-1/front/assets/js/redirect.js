const LOGGED_IN = JSON.parse(window.sessionStorage.getItem('logged_user')) || false;

const redirectPage = () => {
	const currentPage = window.location.pathname;
	const isHomePage = currentPage.includes('index.html');

	if (isHomePage && !LOGGED_IN) {
		window.location.href = './sign-in.html';
	}

	if (!isHomePage && LOGGED_IN) {
		window.location.href = './index.html';
	}
};

redirectPage();
