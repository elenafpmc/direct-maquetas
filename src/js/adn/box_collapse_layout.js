/*	----------------------------------------------------------------------------------------------------
	 JS ADN asíncronos
------------------------------------------------------------------------------------------------------ */
//Damos un valor inicial a los contenedores
 
 var idSelected = 0;
 var finalWrap = 0;

$(function() {
	/*	--------------------------------------------------
		las capas elegidas serán js-box-layout
	-------------------------------------------------- */


	var divs = $(".js-box-layout");
	
	
	var anchoVentana = $(window).width();
	

	if (anchoVentana > 992){
		
		for( i = 0; i < divs.length; i+=3) {
			
		  divs.slice(i, i+3).wrapAll('<div class="row wrap" id="' +i+'"></div>');
		}
		
	}	else{
		
		for( i = 0; i < divs.length; i+=2) {
			
		  divs.slice(i, i+2).wrapAll('<div class="row wrap" id="' +i+'"></div>');
		}		
		
	}
	

	$( "<div class='col-xs-12 content-holder'></div>" ).insertAfter( ".row.wrap" );


	
	$('.btn.btn-close').click(function(){


			//Esperamos un poco para que de tiempo a la animación
			setTimeout(function(){
				$(idSelected).insertAfter('.selectedBox');
				$(idSelected).removeClass('in');
				$('.selectedBox').removeClass('selectedBox');
				$('.content-holder.block-white').removeClass('block-white');	
			}, 500);			
			
			//Suavizamos un poco los movimientos de la caja
			$('.content-holder.block-white').fadeOut(300);
			$('.block-white.selectedBox .arrow-box').fadeOut(300);
			
			//Dejamos todo como estaba antes
			$('.selectedInfo').removeClass('selectedInfo');
			$('.box-collapses').css('opacity', '1');
			$('.block-banner').css('opacity', '1');


		
	});

	
	
	
	$('.box-collapses').on( "click", function(){

		//preparamos las alertas

		if (anchoVentana<767){
		

		setTimeout(function(){
				
			//colocamos las alertas que estan dentro de las tabs responsive
			$('.selectedInfo .block-alert').css('width',anchoVentana-30);
			$('.selectedInfo .block-alert').css('left',-20);
						
			
			
		}, 500);

		
		}else{

			
			setTimeout(function(){		
				
				var anchoLayer= $('#container-holder').width();
				
			   	$('.selectedInfo .block-alert').css('width',anchoLayer+20);
			   	$('.selectedInfo .block-alert').css('left',-30); 
			   	
			   				
			}, 500);		


				   
		}
	

		//colocamos el boton de cerrar
		var capaDestino= $(this).parent().parent().parent().next();
		$('#btn-close').appendTo(capaDestino);
		
		
		//mostramos la capa donde se mostraran si se ha ocultado
		$('.content-holder').show();

		//Esto nos muestra el triangulito de la caja seleccionada
		$('.arrow-box').hide();
		$(this).find('.arrow-box').show();

		//Ajusta opcidades del resto de cajas
		$('.box-collapses').css('opacity', '.5');
		$(this).css('opacity', '1');
		$('.block-banner').css('opacity', '.5');
		
		selectedLayer = '#' + $('.content-holder.block-white .selectedInfo').attr("id");
		idSelected = $(this).attr("data-target");
		
		
		//Miramos si es la misma que se muestra y si lo es se oculta y lo pone en su lugar, si no hace la funcionalidad
		if(idSelected == selectedLayer ){

	
	
				//Esperamos un poco para que de tiempo a la animación
				setTimeout(function(){
					$(idSelected).insertAfter('.selectedBox');
					$('.selectedBox').removeClass('selectedBox');
					$('.content-holder.block-white').removeClass('block-white');	
				}, 500);			
				
				//Suavizamos un poco los movimientos de la caja
				$('.content-holder.block-white').fadeOut(300);
				$('.block-white.selectedBox .arrow-box').fadeOut(300);
				
				//Dejamos todo como estaba antes
				$('.selectedInfo').removeClass('selectedInfo');
				$('.box-collapses').css('opacity', '1');
				$('.block-banner').css('opacity', '1');
			
		}else{
			
			
			//colocamos todo en su sitio
			$('.content-holder.block-white').removeClass('block-white');	
			$('.collapse').removeClass('in');
			$('.selectedInfo').insertAfter('.selectedBox');
			$('.selectedInfo').removeClass('selectedInfo');
			$('.selectedBox').removeClass('selectedBox');
			
			//Le indicamos que hemos seleccionado esa capa
	
			$(this).parent().addClass('selectedBox');	
			
			//Y que lo tendrá que poner en la capa siguiente a la del padre
			
			finalWrap = $(this).parent().parent().parent().next();
		
			//A la capa contenedora le ponemos la clase que llevará
			
			$(finalWrap).addClass('block-white');
			
			//Lo metemos todo dentro y le decimos que es la info seleccionada
			
			
			$(idSelected).appendTo(finalWrap);		
			$(idSelected).addClass('selectedInfo');	

			
		}

			//Necesitamos saber las últimas capas
				
			
			idSelected = idSelected;
			finalWrap = finalWrap;

			
		setTimeout(function(){
			sameHeight();
			autoHeightParent();
		}, 0);			
					
	});


	function reOrderLayout(){
		
			//Movemos las capas al contenedor global de nuevo
			$('.js-box-layout').appendTo('#container-holder');
			
			//Movemos el boton que colocamos antes
			$('#btn-close').appendTo('#container-holder');
			
			//Si había alguna seleccionada la ponemos en su sitio
			$(idSelected).insertAfter('.selectedBox');
					
			//Eliminamos las capas que creamos antes dinámicamente	
			$('.content-holder').remove();
			$('.row.wrap').remove();
			
			
			//Y volvemos a crear todo de nuevo	
			var anchoVentana = $(window).width();
			
		
			if (anchoVentana > 992){
				
				for( i = 0; i < divs.length; i+=3) {
					
				  divs.slice(i, i+3).wrapAll('<div class="row wrap" id="' +i+'"></div>');
				}
				
			}	else{
				
				for( i = 0; i < divs.length; i+=2) {
					
				  divs.slice(i, i+2).wrapAll('<div class="row wrap" id="' +i+'"></div>');
				}		
				
			}
			
		
			$( "<div class='col-xs-12 content-holder'></div>" ).insertAfter( ".row.wrap" );
		
		
			//Si hay alguna abierta definimos de nuevo donde está	
		
			var finalWarp = $('.selectedInfo').parent().parent().next();
			
			//y la colocamos en su lugar
			$('.selectedInfo').appendTo(finalWarp);
			$('.selectedInfo').parent().addClass('block-white');
			
			/*	—————————————————————————
			
				colocamos el boton de cerrar
			
			————————————————————————— */
	
	
			var capaDestino= $('.content-holder');
			$('#btn-close').appendTo(capaDestino);
		
		
		
	}

	// Resize escritorio
	$(window).resize(function(){
			
		if ($('html').hasClass('no-touch')){
			
			/*	—————————————————————————
				
				Reordenamos el layout
			
			————————————————————————— */
			reOrderLayout();
		
			/*	—————————————————————————
				
				Le damos alto al parent en el resize
			
			————————————————————————— */
		
			 autoHeightParent();
			
		}else{
			//Do nothing
		}
	
	});	

	// Resize táctil
	$(window).bind( 'orientationchange', function(e){
	
		setTimeout(function(){
	
			if ($('html').hasClass('touch')){
				
				/*	—————————————————————————
					
					Reordenamos el layout
				
				————————————————————————— */
				reOrderLayout();
			
				/*	—————————————————————————
					
					Le damos alto al parent en el resize
				
				————————————————————————— */
			
				 autoHeightParent();
				
			}else{
				//Do nothing
			}
			
		}, 300);
	
	
	});



	/*	—————————————————————————
			
	Script para mostrar las cajas ocultas de la home
	
	————————————————————————— */
	
	$('.block-grey.editable, .section .back-button, .js-btn-pay').click(function(){
	
	
		selectedLayer = $(this).attr("data-target");
		
		$('section.section').hide();

		$(selectedLayer).fadeIn(1500);
		$('section.section.active').hide();
		
		
		$(selectedLayer).addClass('active');
		$('section.section.active').removeClass('active');
		

		autoHeightParent();
		
		 
		 
		 
	});
	


});



	
	
	/*	—————————————————————————
	autoHeigh: Calcula la altura, muy util para hacer absolutos centrados
————————————————————————— */
function autoHeight(){
	$('.js-auto-height').each(function(){
		
		$(this).css('height',$(this).height());
		
	
		
	});

}
	/*	—————————————————————————
	autoHeightParent: Calcula la altura, del parent, util para meter una absoluta y ponerle un alto
————————————————————————— */		
	
function autoHeightParent(){
	
	$('.js-auto-height-parent').each(function(){
		
		$(this).parent().css('height',$(this).height());
		
	});

}
	


/*	--------------------------------------------------
	SameHeight : Iguala altura de elementos
	v:1.0		
-------------------------------------------------- */
function sameHeight(){
	
	$('.js-same-height').each(function(){
		
		//Reset de altura
		var maxHeight = 0;
		
		//Cual es la altura más alta?		
		$(this).find('.js-same').each(function(){
			
			$(this).removeAttr('style');
			
			maxHeightNew = $(this).outerHeight(true);
							
			if (maxHeight < maxHeightNew){
				maxHeight = maxHeightNew;
			}
			
			
		});
		
		//Ponemos la altura segun los cortes
		if($(this).hasClass('no-xs') && windowWidth < 767){							
			$(this).find('.js-same').css('min-height','0px');		
		}else if($(this).hasClass('no-sm') && windowWidth < 991 ){
			$(this).find('.js-same').css('min-height','0px');
		}else{
			$(this).find('.js-same').css('min-height',maxHeight);
			
		}

		//Ponemos la altura segun los cortes
		if(windowWidth > 768){		
			$(this).find('.v-middle').css('height', $(this).height());
			
		}
	
		
		//Llamamos funciones que dependen de esta para poder funcionar
		//halfHeight();
		
		//$(window).trigger('resize');
		
	});
	
	
}


