$( document ).ready(function() {
	 if ($.fn.owlCarousel) {
	   $("#testimonial-2").owlCarousel({
	       autoPlay: 10000, //Set AutoPlay to 10 seconds
	       items: 1,
	       singleItem: true
	   });
	}
});