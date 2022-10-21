import $ from "jquery";
const jumpBtn = (function() {

	let el = $('.js-jump');

	const init = function() {

		console.log('jumpBtn init...');
		triggerEvents();
		triggerDisplay();

	};

	const triggerDisplay = function() {

		$(window).on('scroll', function () {
	
			if ($(this).scrollTop() > 200) {
				el.fadeIn(300);
				} else {
					el.fadeOut(300);
				};
		
		});

	};

	const triggerEvents = function() {
		el.on('click', triggerClick);
	};

	const triggerClick = function(e) {
		$("html, body").animate({ scrollTop: 0 }, 300);
		return false;
	};

	return {
		init: init,
	};

})();

export { jumpBtn };