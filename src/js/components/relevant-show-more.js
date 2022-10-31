import $ from "jquery";
const relevantShowMore = (function() {

	let el = $('.js-relevant-show-more');

	const init = function() {

		console.log('relevantShowMore init...');
		triggerEvents();

	};

	const triggerEvents = function() {
		el.on('click', triggerClick);
	};

	const triggerClick = function() {
		el.hide();
		el.next().slideDown(100);
	};

	return {
		init: init,
	};

})();

export { relevantShowMore };