import $ from "jquery";
import anime from "animejs";
const helpAccordion = (function() {

	let el = $('.js-help-accordion');
	let openClass = "is-open";

	const init = function() {

		console.log('helpAccordion init...');
		bindEvents();
		closeAllItems();

	};

	const bindEvents = function() {

		$('.help__accordion-switcher').on('click', triggerClick);

	};

	const triggerClick = function(e) {
		let item = $(e.currentTarget).parents('.help__accordion-item').toggleClass(openClass);
		// closeAllItems();
		// openItem(item);
	};

	const closeAllItems = function() {
		$('.help__accordion-item').removeClass(openClass);
		// anime({
		// 	targets: '.help__accordion-desc',
		// 	duration: 300,
		// 	easing: 'linear',
		// 	height: 0,
		// });
	};

	const openItem = function(item) {
		item.addClass(openClass);
		// item.css.height = 'auto';
		// let height = item.height();
		// console.log(height);
		// let desc = item.find('.help__accordion-desc');
		// anime({
		// 	targets: desc.get(0),
		// 	duration: 300,
		// 	easing: 'linear',
		// 	height: 200,
		// });
	};


	return {
		init: init,
	};

})();

export { helpAccordion };