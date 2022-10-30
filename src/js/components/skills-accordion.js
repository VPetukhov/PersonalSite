import $ from "jquery";
const skillsAccordion = (function() {

	let el = $('.js-skills-accordion');
	let openClass = "is-open";

	const init = function() {

		console.log('skillsAccordion init...');
		bindEvents();

	};

	const bindEvents = function() {
		el.find('.with-spoiler').on('click', triggerClick);
	};

	const triggerClick = function(e) {
		let item = $(e.currentTarget);
		let opened = item.hasClass(openClass);
		(opened) ? closeSpoiler(item) : openSpoiler(item);
	};

	const openSpoiler = function(item) {
		item.addClass(openClass);
		item.find('.skill__desc').slideDown(100);
	};

	const closeSpoiler = function(item) {
		item.removeClass(openClass);
		item.find('.skill__desc').slideUp(100);

	};


	return {
		init: init,
	};

})();

export { skillsAccordion };