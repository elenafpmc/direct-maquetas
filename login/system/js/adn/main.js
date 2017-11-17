
/*	----------------------------------------------------------------------------------------------------
	 JS ADN generales
------------------------------------------------------------------------------------------------------ */

$(document).ready(function() {

	
	$('.js-show-help').click(function(){
		

		var anchoVentana = $(window).width();


		
		
		if(anchoVentana > 767){
			
			
			if($('.help-text').is(':visible')) {


				$('.bottom-content').css('top', 170);
		
										
				//$('.modal').css('height', altoModal+ altoGrow )
				
				$('.modal').animate({height: 385, useTranslate3d:true }, 700);				


			}else{
				
				
				$('.bottom-content').css('top', 170);
		
				var altoModal =$('.modal').outerHeight();		
				var altoGrow =$('.help-text').height();
						
				//$('.modal').css('height', altoModal+ altoGrow )
				
				$('.modal').animate({height:  altoModal+ altoGrow , useTranslate3d:true }, 700);				
					
				
			}
			
						
		}

		$('.help-text').fadeToggle(300);
		
		
	})
	
	
	// Al borrar la caja de cookies la modal recupera su forma
	$('.cookies-close').on( "click", function() {
		$('.wrap-cookies').hide();
		$('.modal').removeClass('modal-cookies');
	});

});

$( window ).resize(function() {
	if($('.help-text').is(":visible")){
		$('.modal').css('height', 517);
	}else{
		$('.modal').css('height', 315);
	}
	
})	
