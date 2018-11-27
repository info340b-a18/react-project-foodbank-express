import $ from 'jquery';

//Partially adapted from
//https://scotch.io/tutorials/level-up-your-websites-with-animatecss

// export default function staggeredAnimateBox() {
// 	$('.animate-box').waypoint( function() {			
// 		$(this.element).addClass('item-animate');
// 		setTimeout(function() {
// 			$('body .animate-box.item-animate').each(function(k) {
// 				var el = $(this);
// 				setTimeout( function() {
// 					el.addClass('fadeInUp animated-fast');
// 					el.removeClass('item-animate');
// 				},  k * 200, 'easeInOutExpo' );
// 			});
// 		}, 100);
// 	} , { offset: '85%' } );
// };

// staggeredAnimateBox();

export default function staggeredAnimationBox() {
	setTimeout(function() {
		$('body .animate-box.item-animate').each(function(k) {
			var el = $(this);
			setTimeout( function() {
				el.addClass('fadeInUp animated-fast');
				el.removeClass('item-animate');
			},  k * 200, 'easeInOutExpo' );
		});
	}, 100);
}

