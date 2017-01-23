/* -------------------- GLOBALS -------------------- */
/* ------------------------------------------------ */

/* ----------- BROWSER SUPPORT ---------- */
//IE9 transit fallback
if (!$.support.transition) {
   $.fn.transition = $.fn.animate;
}
//check if user's browser is Chrome
var isChrome = !!window.chrome && !!window.chrome.webstore;
var windowWidth;
var vpWidth;
/* -------------------- PLUGINS -------------------- */
/* ------------------------------------------------ */

/* -------------------- AJAX -------------------- */
/* -------------------------------------------------- */

/* -------------------- FUNCTIONS -------------------- */
/* -------------------------------------------------- */
//we need to treat the window width variable differently depending on
//whether the user is using Chrome or not. Chrome interprets the window width
//larger than css does, so without treating them differently, there would be gaps
//in responsive breakpoints. Other browsers wth this issue should be added as noticed.
//Make sure to use the windowWidth variable rather than using $(window).width()
function setWindowWidth() {
	if (isChrome === true) {
		vpWidth = viewport().width;
   		windowWidth = vpWidth;
	} else {
		windowWidth = $(window).width();
	}
}

function removeHello() {
	$('.hello').delay(1000).transition({ 'opacity': '0'}, {duration: 400, complete: function() {
		$('.hello').css('display', 'none');
		$('.navigation-container').css('display', 'block')
		$('.navigation-container').stop().transition({'opacity': '1'}, {duration: 400})
	}})
}
function openAbout() {
	if (!$('.navigation-container').hasClass('nav-moved')) {
		$('#about-section').css('display', 'block').transition({'opacity': '1'}, {duration: 300, queue: true}).addClass('active-section');
		$('.main-image').delay(750).transition({'opacity': '1', y: '-30'}, {duration: 700})
		$('.about-right').delay(850).transition({'opacity': '1', y: '-30'}, {duration: 700});
	} else {
		$('#about-section').css('display', 'block').transition({'opacity': '1'}, {duration: 300, queue: true}).addClass('active-section');
		$('.main-image').delay(250).transition({'opacity': '1', y: '-30'}, {duration: 700})
		$('.about-right').delay(350).transition({'opacity': '1', y: '-30'}, {duration: 700});
	}
}
function closeAbout() {
	$('.main-image').transition({y: '0'}).css('opacity', '0');
	$('.about-right').css('opacity', '0');
}
function openPortfolio() {
	if (!$('.navigation-container').hasClass('nav-moved')) {
		$('#portfolio-section').css('display', 'block').stop().transition({'opacity': '1'}, {duration: 300, queue: true}).addClass('active-section');
		$('#project-1').delay(750).transition({'opacity': '1'}, {duration: 400, queue: true});
		$('#project-2').delay(850).transition({'opacity': '1'}, {duration: 400, queue: true});
		$('#project-3').delay(950).transition({'opacity': '1'}, {duration: 400, queue: true});
		$('#project-4').delay(1050).transition({'opacity': '1'}, {duration: 400, queue: true});
		$('.github-button').delay(1150).transition({'opacity': '1'}, {duration: 400, queue: true});
	} else {
		$('#portfolio-section').css('display', 'block').stop().transition({'opacity': '1'}, {duration: 300, queue: true}).addClass('active-section');
		$('#project-1').delay(250).transition({'opacity': '1'}, {duration: 400, queue: true});
		$('#project-2').delay(350).transition({'opacity': '1'}, {duration: 400, queue: true});
		$('#project-3').delay(450).transition({'opacity': '1'}, {duration: 400, queue: true});
		$('#project-4').delay(550).transition({'opacity': '1'}, {duration: 400, queue: true});
		$('.github-button').delay(650).transition({'opacity': '1'}, {duration: 400, queue: true});
	}
}
function closePortfolio() {
	$('#project-1').css('opacity', '0');
	$('#project-2').css('opacity', '0');
	$('#project-3').css('opacity', '0');
	$('#project-4').css('opacity', '0');
}
/* --------------------- DOCUMENT READY ---------------------- */
/* ---------------------------------------------------------- */
$(document).ready(function(){
	// setWindowWidth();

	/* ---------- EVENT LISTENERS ------------- */

	//nav hover
	$('body').on('mouseenter', '.navigation-container li', function() {
		$(this).stop().transition({'color': '#0d8f85'}, {duration: 300});
	});
	$('body').on('mouseleave', '.navigation-container li', function() {
		if (!$(this).hasClass('nav-item-clicked')) {
			$(this).stop().transition({'color': 'black'}, {duration: 300});
		}
	});

	//nav move to bottom
	$('body').on('click', '.navigation-container li', function() {
		$this = $(this);
		var openProject = $('body').find('.open-project');
		var projectsContainer = $('body').find('.projects-closed');
		if (!$('.navigation-container').hasClass('nav-moved')) {
			$('.navigation-container').stop().transition({'y': ($(window).height() / 2) - $('.navigation-container').height()}, {duration: 400, complete: function() {
			$('.navigation-container').addClass('nav-moved').transition({scale: .5}, {duration: 300});
			$($this).css('color', '#0d8f85').addClass('nav-item-clicked');
			}});
		}
		if (openProject.length > 0) {
			$(openProject).stop().transition({'opacity': '0'}, {duration: 300, complete: function() {
				$(this).css('display', 'none');
			}});
		}
		if (projectsContainer.length > 0) {
			$(projectsContainer).stop().css('display', 'inline-block').transition({'opacity': '1'}, {duration: 300, complete: function() {
				$(this).css('display', 'none');
			}});
		}
		if (!$('.active-section').length == 0) {
			$('.active-section').transition({'opacity': '0'}, {duration: 300, queue: true, complete: function() {
				$(this).css("display", "none").removeClass('active-section');
				if ($(this).hasClass('portfolio-section')) {
					closePortfolio();
				}	
				if ($(this).hasClass('about-section')) {
					closeAbout();
				}	
				if ($($this).hasClass('about')) {
					openAbout();
				}
				if ($($this).hasClass('portfolio')) {
					openPortfolio();
				}	
			}});
		} else {
				if ($($this).hasClass('about')) {
					openAbout();
				}
				if ($($this).hasClass('portfolio')) {
					openPortfolio();
				}
		}
	});

	/* ----- HOVER EVENTS ------ */
	//icon box at top
	$('body').on('mouseenter', '.icon-box', function() {
		$(this).stop().transition({'opacity': '1'}, {duration: 300});
	})
	$('body').on('mouseleave', '.icon-box', function() {
		$(this).stop().transition({'opacity': '.2'}, {duration: 300});
	})
	$('body').on('mouseenter', '.icon', function() {
		$(this).stop().transition({scale: 1.1}, {duration: 300});
	})
	$('body').on('mouseleave', '.icon', function() {
		$(this).stop().transition({scale: 1}, {duration: 300});
	})

	//portfolio page project boxes
	$('body').on('mouseenter', '.project-box', function() {
		$(this).children('.project-logo').stop().transition({scale: .9}, {duration: 300});
		var projectOverlay = $(this).children('.project-overlay');
		$(projectOverlay).stop().transition({'opacity': ".5"});
		$(projectOverlay).children().css('display', 'block').stop().transition({y: '-30px'})
	})
	$('body').on('mouseleave', '.project-box', function() {
		var projectOverlay = $(this).children('.project-overlay');
		$(this).children('.project-logo').stop().transition({scale: 1}, {duration: 300});
		$(this).stop().transition({scale: 1}, {duration: 300});
		$(projectOverlay).stop().transition({'opacity': '0'});
		$(projectOverlay).children().stop().transition({y: '30px'}, {duration: 300, complete: function() {
			$(projectOverlay).children().css('display', 'none');
		}})
	})
	$('body').on('mouseenter', '.visit-button, .github-button', function() {
		$(this).stop().transition({'background-color': '#0d8f85', 'color': 'white'}, {duration: 300})
	});
	$('body').on('mouseleave', '.visit-button, .github-button', function() {
		$(this).stop().transition({'background-color': 'transparent', 'color': 'black'}, {duration: 300})
	});
	$('body').on('mouseenter', '.back-button', function() {
		$('.back-before').transition({'transform': 'translate(-50%, -50%) rotate(-45deg) skewX(-5deg) skewY(-5deg)'}, {duration: 300});
	});
	$('body').on('mouseleave', '.back-button', function() {
		$('.back-before').stop().transition({'transform': 'translate(-50%, -50%) rotate(-45deg) skewX(10deg) skewY(10deg)'}, {duration: 300});
	});
	$('body').on('click', '.back-button', function() {
		$('body').find('.open-project').transition({'opacity': '0'}, {duration: 300, complete: function() {
			$(this).css('display', 'none').removeClass('open-project');
			$('.projects-container').css('display', 'inline-block').stop().transition({x: '0px', 'opacity': '1'}, {duration: 300});
		}});
	})
	$('body').on('click', '.project-box', function() {
		$this = $(this);
		$('.projects-container').stop().transition({x: '-600px', 'opacity': '0'}, {duration: 400, complete: function() {
			$('.projects-container').css('display', 'none').addClass('projects-closed');
			// get this project id
			var thisProjectId = $($this).attr('id');
			// match id to where the project is going
			var matchingProject = $('body').find('.project-page[data-project="' + thisProjectId + '"]')
			$(matchingProject).css('display', 'block').transition({'opacity': 1}).addClass('open-project');
		}})
	})

}); // end document ready

$(window).resize(function() {
	// setWindowWidth();

});