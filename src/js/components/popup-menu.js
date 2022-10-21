const popupMenu = (function() {

	let switcher = document.querySelector('.js-menu-switcher');
	let menu = document.querySelector('.popup-menu');
	let isOpen = false;

	const init = function() {

		console.log('popupMenu init...');
		bindEvents();

	};

	const bindEvents = function() {

		switcher.addEventListener('click', function() {
			return (isOpen) ? closePopup() : openPopup();
		});

	};

	const openPopup = function() {
		document.body.classList.add('popup-menu--active');
		menu.classList.add('popup-menu--active');
		switcher.querySelector('.hamburger').classList.add('is-active');
		isOpen = true;
	};

	const closePopup = function() {
		document.body.classList.remove('popup-menu--active');
		menu.classList.remove('popup-menu--active');
		switcher.querySelector('.hamburger').classList.remove('is-active');
		isOpen = false;
	};

	return {
		init: init,
		open : openPopup,
		close : closePopup
	};

})();

export { popupMenu };