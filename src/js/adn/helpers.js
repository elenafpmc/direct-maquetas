/*	----------------------------------------------------------------------------------------------------
	 Helpers Bootstrap ADN criticos
------------------------------------------------------------------------------------------------------ */


$(function() { // DOM Ready
	
	/*	--------------------------------------------------
		Variables globales
	-------------------------------------------------- */
	windowWidth = $(window).width();
	$(window).resize(function(){ windowWidth = $(window).width(); } );
	xsBreak = 480;
	smBreak = 768;
	mdBreak = 992;
	lgBreak = 1200;

	windowHeight = $(window).height();

	/*	--------------------------------------------------
		Grid visible
	-------------------------------------------------- */

	$(window).load(function() { $('#grid .bg').height($('body').height());});			

	/*	--------------------------------------------------
		fixJumpyAffix: Arregla saltos de los afixes
		v:1.0		
	-------------------------------------------------- */
	
	$(window).load(function(){
		//Si hay affixes...
		if ( $('[data-spy="affix"]').length !== 0 ){
	
			// Vamos uno por uno creando contenedores para evitar saltos al hacer scroll
			$('[data-spy="affix"]').each(function(){
				
				//Aplicamos altura al holder con ID construido segun el ID original
				affixHolderHeight = $(this).outerHeight();
				affixID = $(this).attr('id');	
				$(this).wrap('<div id="'+affixID+'-holder" class="affix-holder"></div>');
				$(this).parent().height(affixHolderHeight);

				//Determinamos la altura a la que se hará fixed y se la indicamos
				affixHolderOffset = $(this).offset().top - affixHolderHeight;				
				$(this).attr('data-offset-top',affixHolderOffset);
				
			});
	
			
			
		}
		
		
		
	});
	
	


			
	
	
	/*	--------------------------------------------------
		placeholdersIE
		v:1.0		
	-------------------------------------------------- */
	
	$('html.legacy-ie [placeholder]').focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
		    input.val('');
		    input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() === '' || input.val() == input.attr('placeholder')) {
		    input.addClass('placeholder');
		    input.val(input.attr('placeholder'));
		  }
		}).blur().parents('form').submit(function() {
		  $(this).find('[placeholder]').each(function() {
		    var input = $(this);
		    if (input.val() == input.attr('placeholder')) {
		      input.val('');
	    }
	  });
	});
		
		
	/*--------------------------------------------------
		inputNumberButtons: Botones + - para input number y pattern para forzar numérico (tiene código async)
		v:1.0		
	-------------------------------------------------- */
	 
	    $('input[type=number]').each(function(){
		    //Forzamos en movil el teclado numérico
		  //  $(this).attr('pattern',"\d");
		    
		    //Le ponemos controles si asi se indica
		    if( $(this).attr('data-controls') == "true" ){
		        $(this).after('<button class="more" title="Aumentar">+</button>');
		        $(this).before('<button class="less" title="Reducir">-</button>');
		    }
		    
	    });
	 
			

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
		
			
			//Llamamos funciones que dependen de esta para poder funcionar
			//halfHeight();
			
			//$(window).trigger('resize');
			
		});
		
		
	}
		
	/*	--------------------------------------------------
		makeSquare: Crea cuadrados perfectos
		v:1.0		
	-------------------------------------------------- */
	function makeSquare(){
		
		
		$('.js-square').each(function(){
			
			$(this).css('height',$(this).width());
			
		});
	
	}
	
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
		Llamada de funciones
	-------------------------------------------------- */


	$( window ).load(function() {
		//Igualamos alturas
		sameHeight();
		
		//Creamos cuadrados
		makeSquare();
		
		//Igualamos las alturas del padre en absoluto
		 autoHeightParent();
		 
		 
		 //autoHeight();
		 

		 
		 
	});
	
	
	//Responsive y giros de pantallas
	$(window).resize(function(){
	
		sameHeight();
		
		makeSquare();
		
		
	});
	



}); // Cierre DOM Ready abierto al inicio de la página