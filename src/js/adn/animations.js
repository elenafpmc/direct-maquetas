/*	----------------------------------------------------------------------------------------------------
	 JS ADN asíncronos
------------------------------------------------------------------------------------------------------ */
//Damos un valor inicial a los contenedores
 


$(function() {
	/*	--------------------------------------------------
		Mostramos la capa al modificar PIN
	-------------------------------------------------- */

	
	$('#js-modify-pin').click(function(){

		
		if($('#pin-edit').is(":visible")){


			//movemos scroll
			moveToOffset = $('#contenido1').offset().top-100;
			$("html, body").animate({scrollTop: moveToOffset, useTranslate3d:true }, 700);
			$('[data-target="#pin-edit"]').trigger( "click" );

			
		}else{
			if($('#contenido1').is(":visible")){

			}else{
				//Hacemos un trigger a boton de modificar PIN
				$('#datos-personales .box-collapses').trigger( "click" );

			}

			//movemos scroll
			moveToOffset = $('#contenido1').offset().top-100;
			$("html, body").animate({scrollTop: moveToOffset, useTranslate3d:true }, 700);
			$('[data-target="#pin-edit"]').trigger( "click" );

		}
		
		
	});

	/*	--------------------------------------------------
		Ocultamos la capa al mantener PIN
	-------------------------------------------------- */

	
	$('#js-keep-pin').click(function(){
		$(this).parent().parent().parent().slideToggle();
	
	});
	

	
});


