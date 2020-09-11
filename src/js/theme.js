import $ from 'jquery';
window.jQuery = $;
window.$ = $;

//Components
import '../scss/theme.scss';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';

//Images
import '../image/sample.jpg';
import '../image/twitter.svg';



jQuery(document).ready(function (jQuery) {
	//SVG INJECTOR
	var elementsToInject = document.querySelectorAll('.inject-me');
	var injectorOptions = {
		evalScripts: 'once'
	};
	var injector = new SVGInjector(injectorOptions);
	if (jQuery(elementsToInject).length) {
		injector.inject(
			elementsToInject
		);
	}
});