/*	----------------------------------------------------------------------------------------------------
	 JS ADN generales
------------------------------------------------------------------------------------------------------ */

$(function() {
		
	/*	--------------------------------------------------
		Inicializamos plugins
	-------------------------------------------------- */
	 $.fn.datepicker.defaults.language = 'es';
	$('.js-datepicker').datepicker(
		{
		    autoclose:true	,
		    disableTouchKeyboard:true
		}
		
	);

	/*	--------------------------------------------------
		Mostramos y ocultamos los botones de poliza moto o coche
	-------------------------------------------------- */

	var anchoVentana= $(window).width();
				
	if(anchoVentana>767){

		$('#show-options-buttons').mouseenter(function(){
			$(this).hide();
			$('#options-buttons').removeClass('hidden');	
		});
		$('#options-buttons').mouseleave(function(){
			$(this).addClass('hidden');	
			$('#show-options-buttons').show();	
		});
					
	}else{
		$('#show-options-buttons').click(function(e){
			e.stopPropagation();
			$(this).hide();
			$('#options-buttons').removeClass('hidden');	
		});
		$(document).click(function(e){
			$('#options-buttons').addClass('hidden');	
			$('#show-options-buttons').show();	
		});		
		
		
	}		
		
	/*	--------------------------------------------------
		Radio Button block-direct
	-------------------------------------------------- */
	//Por defecto seleccionado primer input radio
	$("#radio1").attr("checked", true).parent().addClass('radio-sel');
    
    //Estilo input radio seleccionado
    $(':radio').change(function () {
        $(':radio[name=' + this.name + ']').parent().removeClass('radio-sel');
        $(this).parent().addClass('radio-sel');
    });

	/*	--------------------------------------------------
		Colocamos las tabs responsive
	-------------------------------------------------- */
	
	//colocamos las tabs en posición para que funcione el plugin
	$('#tabs-datospoliza').insertAfter('#tab-holder');	

	//esperamos e incializamos responsve tabs
	setTimeout(function(){
		
		(function($) {
		      fakewaffle.responsiveTabs(['xs']);
		  })(jQuery);	
			
		
		
	}, 500);

	
	$(window).resize(function(){
		var anchoLayer= $('.content-holder').outerWidth();
		var anchoVentana= $(window).width();
		if (anchoVentana<767){
		
			//colocamos las alertas que estan dentro de las tabs responsive
			$('.selectedInfo .block-alert').css('width',anchoVentana-30);
			$('.selectedInfo .block-alert').css('left',-20);
			
		
		
		}else{
			
			//$('#tabs-datospoliza').appendTo('#tab-holder');
			
				
		   	$('.selectedInfo .block-alert').css('width',anchoLayer+20);
		   	$('.selectedInfo .block-alert').css('left',-30); 			
			
			
			
		}
		console.log(anchoVentana);
	});

});

