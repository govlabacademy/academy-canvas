$(document).ready(function() {
	$(document).foundation();

  // Off Canvas Menu
  $('.e-mainnav-trigger').click(function() {
  	var trigger = $(this);
  	console.log(trigger);

  	if(trigger.hasClass('m-nav-active')) {
  		trigger.removeClass('m-nav-active');
	  	trigger.parent().parent().parent().removeClass('m-nav-active');	
  	} else {
  		trigger.addClass('m-nav-active');
	  	trigger.parent().parent().parent().addClass('m-nav-active');	
  	}

  });

$('#overlay').click(function() {
	$(this).removeClass('m-active');
	$('.b-filters').removeClass('m-active');
});

// Multiple SwipeJS Galleries
// var swipes = []
// $('.swipe').each(function(i, obj) {
//      swipes[i] = new Swipe(obj);
//  });


 }); // Closes Document.ready