jQuery.noConflict();
(function($) {
	
	$('head').append('<link href="styleswitcher/styleswitcher.css" rel="stylesheet">');
	$('head').append('<script src="styleswitcher/jquery_cookie.js"></script>');
	
	/* setup */
	var $html = '<div class="style-switcher">';
	    $html += '<div class="switcher-row switcher-header">';
		$html += '<span class="h5">Style Selector</span>';
		$html += '<div class="switcher-dock-button"><a href="#" class="switcher-button open"></a></div></div>';
		$html += '<div class="switcher-row"><a href="#" class="switcher-opt-boxed"><span></span>Wide / Boxed</a></div>';
		$html += '<div class="switcher-row switcher-skin">';
		$html += '<a href="#" class="switcher-opt-skin skin-red active" data-skin="skin-red"></a>';
		$html += '<a href="#" class="switcher-opt-skin skin-blue" data-skin="skin-blue"></a>';
		$html += '<a href="#" class="switcher-opt-skin skin-green" data-skin="skin-green"></a>';
		$html += '<span></span><a href="#" class="switcher-opt-skin skin-orange" data-skin="skin-orange"></a>';
		$html += '<a href="#" class="switcher-opt-skin skin-purple" data-skin="skin-purple"></a>';
		
		$html += '</div></div>';
	
	$('body').append($html);
	
	//var $wrapper=$('#gw-switcher');
	/*if (!$.cookie('switcher')) { 
		$.cookie('switcher',1);
		$.cookie('sticky',1);
	}*/

	/* style switcher link event */
	$('body').on('click', 'a.switcher-button', function(e){
		var $wrapper = $('.style-switcher'); $this=$(this);
		
		e.preventDefault();
		if ($this.hasClass('open')) {
			$wrapper.animate({'left':'-140px'},350, function() { $this.removeClass('open'); });
		} else {
			$wrapper.animate({'left':'0'},350, function() { $this.addClass('open'); });
		};
	});
	
	/* switcher opt events */
	$('.switcher-opt-boxed').on('click', function(e){
		var $this=$(this);
		
		e.preventDefault();

		/* events */
		if ($this.hasClass('switcher-opt-boxed')) {
			if ($this.hasClass('switcher-opt-checked')) {
				$('body').removeClass('boxed');
				$.cookie('boxed',1, { expires: -1 });
			} else {
				$.cookie('boxed',1);
				$('body').addClass('boxed');
			};
			
			$(window).trigger('resize');
		};

		/* check & uncheck checkboxes */
		if ($this.hasClass('switcher-opt-checked')) {
			$this.removeClass('switcher-opt-checked');
		} else {
			$this.addClass('switcher-opt-checked');
		};
	});
	
	$('.switcher-skin a').on('click', function(e){
		e.preventDefault();
		
		$('.switcher-skin a').removeClass('active');
		if ($(this).hasClass('active')) {
			$.cookie('switcher-skin', $(this).data('skin'), { expires: -1 });
		} else {
			$.cookie('switcher-skin', $(this).data('skin'));
			$(this).addClass('active');
			
			if($('#switcher-link-skin').length > 0 ) {
				$('#switcher-link-skin').attr('href', 'assets/css/' + $(this).data('skin') + '.css');
			} else {
				$('head').append('<link id="switcher-link-skin" href="assets/css/' + $(this).data('skin') + '.css" rel="stylesheet">');
			}
			
		};
	});
	
	if($('.style-switcher').length > 0) {
		if ($.cookie('switcher-opt')) { $('.switcher-opt-boxed').addClass( $.cookie('switcher-opt') ); };
		
		if ($.cookie('boxed')) { $('.switcher-opt-boxed').trigger('click'); };
		if ($.cookie('switcher-skin')) { $('.switcher-skin a.' + $.cookie('switcher-skin') ).trigger('click'); };
	}

})(jQuery);