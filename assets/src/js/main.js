import General from './_generalScripts';
import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';

const App = {

	/**
	 * App.init
	 */
	init() {
		// General scripts
		function initGeneral() {
			return new General();
		}
		initGeneral();
	}

};

document.addEventListener('DOMContentLoaded', () => {
	App.init();

	const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: true,
    // direction:"horizontal",
    // inertia:1,
    // repeat:true,
    offset: ["3%", 100]
	});

	function pageIn(){
		gsap.to('#content',{});
	}

	function pageOut(){
			gsap.to('#content',{});
	}

	function pageDelay(num) {
			return new Promise(function(resolve){
					setTimeout(resolve,num)
			})
	}

	barba.init({
		transitions: [{
			name: 'transition',
			async leave(data) {
				pageIn();
				await pageDelay(1500);

			},

			enter(data) {
				pageOut();
				// Set <body> classes for "next" page
				 var nextHtml = data.next.html;
				 var response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml)
				 var bodyClasses = $(response).filter('notbody').attr('class')
				 $("body").attr("class", bodyClasses);
			},

			async once(data) {
				pageIn();
				await pageDelay(1500);
				pageOut();
			}

		}]
	});

	barba.hooks.beforeLeave(() => {
		scroll.scrollTo("top");
	});

});
