import $ from "jquery";
import ClipboardJS from "clipboard/dist/clipboard";
const copyClipboard = (function() {

	const init = function() {

		console.log('copyClipboard init...');
		let clipboard = new ClipboardJS('.js-clipboard');
		clipboard.on('success', function(e) {
			$(e.trigger).addClass('copied');
		});
	};

	return {
		init: init,
	};

})();

export { copyClipboard };