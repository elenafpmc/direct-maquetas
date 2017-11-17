/*	----------------------------------------------------------------------------------------------------
	 JS ADN asíncronos
------------------------------------------------------------------------------------------------------ */


$(function() {


	if(windowWidth>767){
		$('#help .block-white').addClass('fixed');
		$('#help').removeClass('collapse');
	}


	/*	--------------------------------------------------
		Mostramos la ayuda
	-------------------------------------------------- */	
	
	
	$('#js-show-help').click(function(){
		$('#help .block-white').show();	
		$('#help .block-white').css('right',-615);	
		$('#help').show();
		
		setTimeout(function(){
			$("#help .block-white").animate({ right:0, useTranslate3d:true }, 700);
		}, 100);		
		
	});
	
	

});

$(window).resize(function(){
	
	if(windowWidth>767){
		$('#help .block-white').addClass('fixed');
		$('#help').removeClass('collapse');
		$('#help').parent().removeClass('block-white');
		$('#help').removeClass('selectedInfo');
	}else{
		$('#help .block-white').removeClass('fixed');
		$('#help.in').addClass('selectedInfo');
		$('#help').addClass('collapse');	
		
	}	
	
	
});	

	

	

