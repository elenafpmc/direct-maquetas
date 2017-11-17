$(function() {

	
	//$('body').width($(window).width());
	//
	//$(window).resize(function(){
	//	$('body').width($(window).width());
	//})

	/*	--------------------------------------------------
		Navegación offcanvas
	-------------------------------------------------- */
	$('button.navbar-toggle').click(function(){
		
		canvasTarget = $(this).attr('data-target');
		dataSide = $(this).attr('data-side');
		
		//Indicamos en la capa la dirección para cerrarla después
		$('.canvas-wrap').addClass(dataSide);
		
		//Si el target tiene .out esta abierto, asi que lo cerramos...
		if ( $(canvasTarget).hasClass('out') ){

			closeCanvas();
			
		}else{
			//Cerramos todos los que haya abiertos
			$('.off-canvas').removeClass('out');
			
			//Abrimos el seleccionado.
			$('body').addClass('in').addClass(dataSide);	
			$('html').addClass('in').addClass(dataSide);
			$(canvasTarget).addClass('out');
			
			$('.canvas-wrap').show().css('height', '100%');
		}
		
		
	})
	
	
	//Ocultamos la navegación al pulsar fuera de ella
	function closeCanvas(){
	
		if ($('body').hasClass('in')){
		
			//Cerramos todos los que haya abiertos
			$('.off-canvas').removeClass('out');
			
			//Abrimos el seleccionado.
			$('body').removeClass('in').addClass('out')
			$('html').removeClass('in').addClass('out')

			
			$('.canvas-wrap').hide()
			
			setTimeout(function () {
				$('body').removeClass('out left right');
				$('html').removeClass('out left right');
			}, 500);			
			
			
		}
		
		
	}

	$('.canvas-wrap').click('click', function(){

		closeCanvas();
		
	});
	
	$('.off-canvas [data-toggle="close"]').click('click', function(){

		closeCanvas();
		
	});
	
	
	//Control con swipes
	$(".canvas-wrap").swipe( {
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if ( $(this).hasClass('left') && direction == 'left'){
				 closeCanvas();
			}
			if ( $(this).hasClass('right') && direction == 'right'){
				 closeCanvas();
			}
			
		}
	});	
	
});