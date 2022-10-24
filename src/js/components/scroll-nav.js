const scrollNav = (function () {
	const scrollEl = [].slice.call(document.querySelectorAll(".js-scroll"));
	const speed = 400;

	const init = function () {
		console.log("scrollNav init...");
		bindEvents();
	};

	const bindEvents = function () {
		scrollEl.forEach(function (item) {
			item.addEventListener("click", function (e) {
				e.preventDefault();
				let target = getTarget(item);
				scrollTo(target, speed);
			});
		});
	};

	const getTarget = function (el) {
		let prefix = ".js-scroll-";
		let href = el.getAttribute("href");
		return href ? prefix + href.split("#")[1] : false;
	};

	const scrollTo = function (element, duration) {

		if(!getElementY) return;
		
		var startingY = window.pageYOffset;
		var elementY = getElementY(element) - 40;

		// If element is close to page's bottom then window will scroll only to some position above the element.
		var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
		var diff = targetY - startingY;
		var start;

		if (!diff) return;

		// Bootstrap our animation - it will get called right before next frame shall be rendered.
		window.requestAnimationFrame(function step(timestamp) {
			if (!start) start = timestamp;
			// Elapsed miliseconds since start of scrolling.
			var time = timestamp - start;
			// Get percent of completion in range [0, 1].
			var percent = Math.min(time / duration, 1);
			// Apply the easing.
			// It can cause bad-looking slow frames in browser performance tool, so be careful.
			percent = easingFunction(percent);

			window.scrollTo(0, startingY + diff * percent);

			// Proceed with animation as long as we wanted it to.
			if (time < duration) {
				window.requestAnimationFrame(step);
			}
		});
		
	};

	const getElementY = function (el) {
		return (document.querySelector(el)) ? window.pageYOffset + document.querySelector(el).getBoundingClientRect().top : false;
	};

	// Easing function: easeInOutCubic
	// From: https://gist.github.com/gre/1650294
	const easingFunction = function (t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	};

	return { init };
})();

export { scrollNav };
