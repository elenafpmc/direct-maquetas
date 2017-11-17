<?php

	/*
		
	Configuración de guia de estilos, marcar con false si no se usa el componente	
		
	*/

	$lists	   	=true;
	$tables	   	=true;
	$forms	   	=true;
	$alerts	   	=true;
	$dropdowns 	=true;
	$modals	   	=true;
	$tabs	   	=true;
	$tooltips  	=true;
	$breadcrumb	=true;
	$pagination	=true;
	$progress  	=true;
	$accordion 	=true;
	$video   	=true;
	$carousel   =true;
	$blocks   	=true;

	//Declaramos los colores

	$colors = array(
		array('color-white','#fff'),
		array('color-success','#71a67b'),
		array('color-info','#61a0b9'),
		array('color-warning','#f08400'),
		array('color-danger','#ec3457'),
		array('color-text','#181512'),
		array('color-default','#181512'),
		array('color-primary','#9bc8db'),
		array('color-secondary','#dae275'),



	);

	
	/*
		
	Ignorar a partir de aqui. NO TOCAR!!!	
		
	*/

	//Función para pintar los colores
	function printColors($colors){
		$htmlColors = '';
		for ($i=0;$i<sizeof($colors);$i++){
		  $htmlColors .= '
		  	<div class="col-xs-6 col-sm-2">
		  		<div class="js-square bg-'.$colors[$i][0].'"> '.$colors[$i][0].'<br>'.$colors[$i][1].' </div>
		  	</div>
		  ';
		}
		echo $htmlColors;
	}
	
	
	

?>


	<?php include('../src/includes/core/html-start.html')?>  

		<style>
			section { margin: 40px 0; border-bottom: 1px solid #444; padding-bottom: 60px; padding-top: 40px }
			
			h1 {margin-top:20px !important; padding-bottom: 20px !important; color: #444 !important }
			/*h2 { margin-top:20px !important;padding-bottom: 20px !important; color: #444 !important }*/
			#Dropdowns .dropdown-menu { position: static !important; display: block; margin-bottom: 10px; float: none }
			
			
			.modal {
				position: relative;
				top: auto;
				right: auto;
				left: auto;
				margin: auto;
				bottom: 0;
				z-index: 1;
				display: block;	
				opacity: 1;			
			}
			aside.affix { width: 100% }
			#Modales { height: auto; position: relative;  }
			#Modales h1 { color: #fff }
			.modal-dialog { top:60px }
			.modal-backdrop { z-index: 0 }
			.modal-backdrop.in { opacity: 1 }
			.color-swatch { padding-bottom: 100px }
			
			.js-square { text-align: center; padding-top: 35%; margin-bottom: 10px; }
			
			.case-study{ background: #111111; padding: 20px; }
			
			.case-study h2{ color: #7fc131 !important }
			
			#nav-bar-guide a{ padding: 0px }
			
		</style>


    <body  data-spy="scroll" data-target=".navbar" data-offset="108">
    	<?php include('../src/includes/style-guide/off-canvas.html')?>    
    	<?php include('../src/includes/style-guide/off-canvas-right.html')?> 
		<?php include('../src/includes/blocks/header.html')?>		
		<main class="wrapper tooltips popovers">
		
			<div class="container-fluid">
				<div class="container">
						
						<div class="row">
							
							<main class="col-sm-9">
							
								<section class="in" id="Favicon">
									<h1 class="h1">Favicon</h1>
									<img class="no-responsive" src="<?php echo $host; ?>system/img/favicons/favicon-194x194.png" width="80" height="80" alt="">
									
								</section>
							
								<section class="in" id="Colores">
									<h1 class="h1">Paleta de colores</h1>
									
									<h2 class="h2">Colores</h2>
									

									<div class="row">
										<?php
											printColors($colors);										
										?>
									</div><!-- row -->
									
								</section>
								
								<section class="in" id="Tipografías">
									<h1 class="h1">Tipografía General</h1>
									
									
									<h2 class="h2">Titulares</h2>
									
									<span class="h1">H1 Futura std 40px</span>
									<span class="h2">H2 Futura std 25px</span>
									<span class="h3">H3 Futura std 20px</span>
									<span class="h4">H4 Futura std 18px</span>
									<span class="h5">H5 Futura std 15px</span>
									<span class="h6">H6 Futura std 14px</span>

									
									<h2 class="h2">Body y parrafos</h2>
									<p>16px Helvetica</p>
									
									<h2 class="h2">Entradas</h2>
									<p class="lead">18px Tahoma</p>
									
									<h2 class="h2">Textos pequeños</h2>
									<small>10px Tahoma</small>
									

								</section>
																
								<section class="in" id="Links">
									<h1 class="h1">Enlaces.</h1>
									
									<a href="">Link</a>
									
									<a href="" class="active">Link activo</a>
									
								</section>
								
								<section class="in" id="Botones">
									<h1 class="h1">Botones</h1>	
									<h2 class="h2">Tamaños fijos</h2>
									<p>
										<button type="button" class="btn btn-primary btn-lg">Large button</button>
										<button type="button" class="btn btn-secondary btn-lg">Large button</button>
										<button type="button" class="btn btn-default btn-lg">Large button</button>
									</p>
									<p>
										<button type="button" class="btn btn-primary">Primary button</button>
										<button type="button" class="btn btn-secondary">Secondary button</button>
										<button type="button" class="btn btn-default">Default button</button>
									</p>
									<p>
										<button type="button" class="btn btn-primary btn-sm">Small primary button</button>
										<button type="button" class="btn btn-secondary btn-sm">Small secondary button</button>
										<button type="button" class="btn btn-default btn-sm">Small default button</button>
									</p>
									<p>
										<button type="button" class="btn btn-primary btn-xs">Extra small button</button>
										<button type="button" class="btn btn-secondary btn-xs">Extra small button</button>
										<button type="button" class="btn btn-default btn-xs">Extra small button</button>
									</p>	
									
									
									<h2 class="h2">Adaptados al contenedor</h2>
									<div class="row">
										<div class="col-sm-6">
											<button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
											<button type="button" class="btn btn-default btn-lg btn-block">Block level button</button>
										</div>	
									</div><!-- row -->
									
									<h2 class="h2">Con aspecto de link</h2>
									<button type="button" class="link">Link falso</button>
									
									<h2 class="h2">Botones que se quedan marcados</h2>
									<button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">ON / OFF</button>
									<h2 class="h2">Radio que son botones que se quedan marcados</h2>
									<div class="btn-group" data-toggle="buttons">
										<label class="btn btn-primary active">
											<input type="radio" name="options" id="option1" autocomplete="off" checked> Radio 1 (preselected)
										</label>
										<label class="btn btn-primary">
											<input type="radio" name="options" id="option2" autocomplete="off"> Radio 2
										</label>
										<label class="btn btn-primary">
											<input type="radio" name="options" id="option3" autocomplete="off"> Radio 3
										</label>
									</div>									
									
									<h2 class="h2">Grupos</h2>
									<h3 class="h3">Button toolbar</h3>
									<div class="btn-group" role="group" aria-label="First group">
										<button type="button" class="btn btn-default">1</button>
										<button type="button" class="btn btn-default">2</button>
										<button type="button" class="btn btn-default">3</button>
										<button type="button" class="btn btn-default">4</button>
									</div>	
																	
									<h3 class="h3">Ajustados al contenedor</h3>
									<div class="btn-group btn-group-justified" role="group" aria-label="First group">
										<div class="btn-group" role="group">
									    	<button type="button" class="btn btn-default">1</button>
									    </div>							
										<div class="btn-group" role="group">
									    	<button type="button" class="btn btn-default">2</button>
									    </div>							
										<div class="btn-group" role="group">
									    	<button type="button" class="btn btn-default">3</button>
									    </div>							
										<div class="btn-group" role="group">
									    	<button type="button" class="btn btn-default">4</button>
									    </div>							
									</div>									
									
								</section>								
								
								<section class="in" id="Iconos">
									
									
									<?php
										
										//Cargamos los svg-iconfont y los pintamos como spans
										if ($handle = opendir('../src/system/svg/svg-iconfont/')) {
											//Formamos el array
										    while (false !== ($entry = readdir($handle))) {
												//no metemos en el array ciertos archivos												
										       // if (
										       // 	$entry != "." ||
										       // 	$entry != ".." ||
										       // 	$entry != ".DS_Store") {
										            $entryArray[] = str_replace('.svg','',$entry);;
										      //  }
										        
										    }
										
										    closedir($handle);
										}
											
										sort($entryArray);										
										unset($entryArray[0]);
										unset($entryArray[1]);
										sort($entryArray);
										
										print_r($entryArray);
										
										$i=0;
										//Pintamos el listado
										foreach ($entryArray as $file){
											$iconsFont .= "<span class=\"icon-$file sm\"></span>";
											$i++;
										}

										if ($iconsFont){
											echo '<h1 class="h1">Iconos Fuente <small>(Tamaño definido por el alto)</small></h1>';
											echo $iconsFont;
										}

										

										//Cargamos los svg-icon y los pintamos como spans
										if ($handle = opendir('../src/svg/svg-icon/')) {
											
											$entryArray='';
											
											//Formamos el array
										    while (false !== ($entry = readdir($handle))) {
												//no metemos en el array ciertos archivos												
										        if (
										        	$entry != "." ||
										        	$entry != ".." ||
										        	$entry != ".DS_Store") {
										            $entryArray[] = str_replace('.svg','',$entry);;
										        }
										        
										    }
										
										    closedir($handle);
										}
											
										sort($entryArray);										
										unset($entryArray[0]);
										unset($entryArray[1]);
										sort($entryArray);
										
										$i=0;
										//Pintamos el listado
										foreach ($entryArray as $file){
											
											if  ($file!='.DS_Store'){
												$iconsSVG .= "<span data-grunticon-embed class=\"icon-svg-$file sm\"></span>";
												$i++;
											}
											
										}

										if ($iconsSVG){
											echo '<h1 class="h1">Iconos SVG <small>(Tamaño definido por el ancho)</small></h1>';
											
											echo $iconsSVG;
										}

										
									?>
									
									
									<h1 class="h1">Tamaños de iconos</h1>
									
									<h2 class="h2">LG</h2>
									150x150px
									<h2 class="h2">MD</h2>
									75x75px
									<h2 class="h2">SM</h2>
									40x40px
									<h2 class="h2">XS</h2>
									20x20px
									
									
								</section>
								
								<?php
									if($lists===true){
								?>
								
								<section class="in" id="Listados">
									<h1 class="h1">Listados</h1>
									
									<h2 class="h2">Con bullets</h2>
									<ul>
										<li>Item 1</li>
										<li>Item 2</li>
									</ul>
									<h2 class="h2">Sin bullets</h2>
									<ul class="list-unstyled">
										<li>Item 1</li>
										<li>Item 2</li>
									</ul>		
									
									<h2 class="h2">Ordenado</h2>
									<ol>
										<li>Item 1</li>
										<li>Item 2</li>
									</ol>		
									
									
									<h2 class="h2">En linea</h2>
									<ul class="list-inline">
										<li>Item 1</li>
										<li>Item 2</li>
									</ul>	
									<h2 class="h2">Con iconos</h2>
									<ul class="list-icons lg-icons">
										<li><div class="text"><span class="icon-svg-car lg" data-grunticon-embed></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
																								
									<ul class="list-icons md-icons">
										<li><div class="text"><span class="icon-svg-car md" data-grunticon-embed></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
																								
									<ul class="list-icons sm-icons">
										<li><div class="text"><span class="icon-svg-car sm" data-grunticon-embed></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
																								
									<ul class="list-icons xs-icons">
										<li><div class="text"><span class="icon-svg-car xs" data-grunticon-embed></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
									
									<div class="list-icons sm-icons">
										<div><div class="text"><span class="icon-svg-car sm" data-grunticon-embed></span>Tambien se puede usar sin ul para un único elemento</div></div>
									</div>	
									

									<h2 class="h2">Listas de definición</h2>
									<dl>
										<dt>Description lists</dt>
										<dd>A description list is perfect for defining terms.</dd>
										<dt>Euismod</dt>
										<dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
										<dd>Donec id elit non mi porta gravida at eget metus.</dd>
										<dt>Malesuada porta</dt>
										<dd>Etiam porta sem malesuada magna mollis euismod.</dd>
									</dl>		
									
									<h2 class="h2">Listas de definición Horizontales</h2>
									<dl class="dl-horizontal">
										<dt>Description lists</dt>
										<dd>A description list is perfect for defining terms.</dd>
										<dt>Euismod</dt>
										<dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
										<dd>Donec id elit non mi porta gravida at eget metus.</dd>
										<dt>Malesuada porta</dt>
										<dd>Etiam porta sem malesuada magna mollis euismod.</dd>
									</dl>									
																
									
																								
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($tables===true){
								?>
								
								<section class="in" id="Tablas">
									<h1 class="h1">Tablas</h1>
									
									<h2 class="h2">Responsive con scroll</h2>
									<div class="table-responsive">
										<table class="table table-hover table-striped">
											<caption class="sr-only">Descripción de la tabla</caption>
											<thead>
												<tr>
													<th>#</th>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Username</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td>Mark</td>
													<td>Otto</td>
													<td>@mdo</td>
												</tr>
												<tr>
													<td>2</td>
													<td>Jacob</td>
													<td>Thornton</td>
													<td>@fat</td>
												</tr>
												<tr>
													<td>3</td>
													<td>Larry</td>
													<td>the Bird</td>
													<td>@twitter</td>
												</tr>
											</tbody>
										</table>
									</div>		
									
									<h2 class="h2">Responsive con reflow</h2>						
									
									<div class="table-reflow">
										<table class="table table-hover table-striped">
											<caption class="sr-only">Descripción de la tabla</caption>
											<thead>
												<tr>
													<th>Movie Title</th>
													<th>Genre</th>
													<th>Year</th>
													<th>Gross</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td data-th="Movie Title">Star Wars</td>
													<td data-th="Genre">Adventure, Sci-fi</td>
													<td data-th="Year">1977</td>
													<td data-th="Gross">$460,935,665</td>
												</tr>
												<tr>
													<td data-th="Movie Title">Howard The Duck</td>
													<td data-th="Genre">"Comedy"</td>
													<td data-th="Year">1986</td>
													<td data-th="Gross">$16,295,774</td>
												</tr>
												<tr>
													<td data-th="Movie Title">American Graffiti</td>
													<td data-th="Genre">Comedy, Drama</td>
													<td data-th="Year">1973</td>
													<td data-th="Gross">$115,000,000</td>
												</tr>
											</tbody>
										</table>	
									</div>								
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($forms===true){
								?>
								
								<section class="in" id="Formularios">
									<h1 class="h1">Formularios con caso de éxito, error y aviso. Radio button, checkboxes.</h1>
									
									<h2 class="h2">Clasico</h2>
									<form role="form" data-toggle="validator">
									
										<div class="form-group">
											<label for="exampleInputEmail1">Email address</label>
											<input data-error="E-mail incorrecto" type="email" required class="form-control" id="exampleInputEmail1" placeholder="Enter email">
											<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
											<div class="help-block with-errors"></div>	
										</div>
										<div class="form-group">
											<label for="exampleInputPassword1">Password</label>
											<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
											<p class="help-block">Example block-level help text here.</p>											
										</div>
										
										<div class="form-group">
											<label for="exampleInputAmount">Input groups</label>
											<div class="input-group">
												<div class="input-group-addon">$</div>
												<input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
												<div class="input-group-addon">.00</div>
											</div>
										</div>		
										<div class="form-group">
											<div class="input-group">
												<input type="text" class="form-control" placeholder="Search for...">
												<span class="input-group-btn">
													<button class="btn btn-primary" type="button">Go!</button>
												</span>
												
											</div>																	
										</div>
										<div class="form-group">
											<label for="input-datepicker">Datepicker</label><br>

											<input name="input-datepicker" type="text" class="js-datepicker form-control" data-provide="datepicker" value="DD/MM/YYYY">
										</div>
										
										<div class="form-group">
											<label for="start-datepicker">Datepicker con rangos</label><br>
											<div class="input-daterange input-group js-datepicker" id="datepicker">
											    <input type="text" class="input-sm form-control" id="start-datepicker" name="start-datepicker" />
											    <span class="input-group-addon">to</span>
											    <input type="text" class="input-sm form-control" name="end-datepicker" />
											</div>										
										</div>
										
										<div class="form-group">
												<label class="control-label" for="month">[month] con placeholder en XS</label>
											
												<input class="form-control" id="month" type="month" name="month" placeholder="Escoge fecha">
										</div><!-- row -->
										
										
										<div class="form-group">
											<label for="input-slider">JS Slider</label><br>
											<input name="input-slider" type="text" class="js-input-slider form-control" value="" data-slider-min="-20" data-slider-max="20" data-slider-step="1" data-slider-value="-14" data-slider-orientation="horizontal" data-slider-selection="after"data-slider-tooltip="hide">
											
										</div>
										
										<div class="form-group">
											<label for="exampleInputFile">File input</label>
											<input type="file" id="exampleInputFile">
										</div>
										<div class="form-group">
											<textarea class="form-control" rows="3"></textarea>
										</div>
										<div class="form-group">
											<div class="checkbox">
												<input id="checkbox1" type="checkbox"> 
												<label name="checkbox1" for="checkbox1">
													Checkbox
												</label>
											</div>
										</div>
										
										<div class="form-group">
											<div class="radio">
												<input name="radio" id="radio1" type="radio"> 
												<label for="radio1">
													Radio 1
												</label>
											</div>
										</div>
										
										<div class="form-group">
											<div class="radio">
												<input name="radio" id="radio2" type="radio"> 
												<label for="radio2">
													Radio 2
												</label>
											</div>
										</div>
										
										<select name="select" id="select" class="selectpicker">
											<option value="">1</option>
											<option value="">2</option>
											<option value="">3</option>
										</select>
									</form>		
									
									
									
									<h2 class="h2">Horizontal</h2>
									<form class="form-horizontal" role="form">
										<div class="form-group">
											<label for="inputEmail3" class="col-sm-2 control-label">Email</label>
											<div class="col-sm-10">
												<input type="email" class="form-control" aria-describedby="helpBlock" id="inputEmail3" placeholder="Email">
												<span id="helpBlock" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
											</div>
										</div>
										<div class="form-group has-error">
											<label for="inputEmail3" class="col-sm-2 control-label">Error</label>
											<div class="col-sm-10">
												<input type="email" class="form-control" id="inputEmail3" placeholder="Email">
												<ul class="error" role="alert">
													<li>Error 1</li>
													<li>Error 2</li>
												</ul>												
											</div>
										</div>
										<div class="form-group has-success">
											<label for="inputEmail3" class="col-sm-2 control-label">Exito</label>
											<div class="col-sm-10">
												<input type="email" class="form-control" id="inputEmail3" placeholder="Email">
											</div>
										</div>
										<div class="form-group">
											<label for="inputPassword3" class="col-sm-2 control-label">Password</label>
											<div class="col-sm-10">
												<input type="password" class="form-control" id="inputPassword3" placeholder="Password">
											</div>
										</div>
										<div class="form-group">
											<div class="col-sm-offset-2 col-sm-10">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Remember me
													</label>
												</div>
											</div>
										</div>
										
									</form>		
									
									
									<h2 class="h2">Tamaños</h2>														
									
									<form action="index.php" method="" accept-charset="utf-8">
										
										
										<div class="form-group">
											<label for="exampleInputPassword1">LG</label>
											<input type="password" class="form-control input-lg" id="exampleInputPassword1" placeholder="Password">
										</div>
										
										<div class="form-group">
											<label for="exampleInputPassword1">SM</label>
											<input type="password" class="form-control input-sm" id="exampleInputPassword1" placeholder="Password">
										</div>
										
										
									</form>
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($alerts===true){
								?>
								
								<section class="in" id="Alertas">
									<h1 class="h1">Mensajes de alerta</h1>
									
									<div class="alert alert-warning alert-dismissable" role="alert">
										  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
										  <strong>Warning!</strong> Better check yourself, you're not looking too good.
									</div>									
									
									<div class="alert alert-success alert-dismissable" role="alert">
										  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
										  <strong>Warning!</strong> Better check yourself, you're not looking too good.
									</div>									
									
									<div class="alert alert-info alert-dismissable" role="alert">
										  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
										  <strong>Warning!</strong> Better check yourself, you're not looking too good.
									</div>									
									
									<div class="alert alert-danger alert-dismissable" role="alert">
										  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
										  <strong>Warning!</strong> Better check yourself, you're not looking too good.
									</div>									
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($dropdowns===true){
								?>
								
								<section class="in" id="Dropdowns">
									<h1 class="h1">Dropdowns</h1>
									
									<ul class="dropdown-menu list-unstyled" role="menu" aria-labelledby="dropdownMenu2">
										<li role="presentation" class="dropdown-header">Dropdown header</li>
										<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
										<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
										<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
										<li role="presentation" class="divider"></li>
										<li role="presentation" class="dropdown-header">Dropdown header</li>
										<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
									</ul>									

								</section>
								
								<?php
									}
								?>
								
								<?php
									if($modals===true){
								?>
								
								<section id="Modales" class="in">
									<h1 class="h1">Diseño de modales</h1>
																											
									<div class="modal fade">
									  <div class="modal-dialog modal-lg">
									    <div class="modal-content">
									      <div class="modal-header">
									        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									        <h4 class="modal-title">Modal Grande</h4>
									      </div>
									      <div class="modal-body">
									        <p>One fine body&hellip;</p>
									      </div>
									      <div class="modal-footer">
									        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
									        <button type="button" class="btn btn-primary">Save changes</button>
									      </div>
									    </div><!-- /.modal-content -->
									  </div><!-- /.modal-dialog -->
									</div><!-- /.modal -->		
									
									<div class="modal fade" role="dialog" aria-labelledby="myModalLabel">
									  <div class="modal-dialog">
									    <div class="modal-content">
									      <div class="modal-header">
									        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									        <h4 class="modal-title" id="myModalLabel">Modal Defecto</h4>
									      </div>
									      <div class="modal-body">
									        <p>One fine body&hellip;</p>
									      </div>
									      <div class="modal-footer">
									        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
									        <button type="button" class="btn btn-primary">Save changes</button>
									      </div>
									    </div><!-- /.modal-content -->
									  </div><!-- /.modal-dialog -->
									</div><!-- /.modal -->		
									
									
									<div class="modal fade">
									  <div class="modal-dialog modal-sm">
									    <div class="modal-content">
									      <div class="modal-header">
									        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									        <h4 class="modal-title">Modal Pequeño</h4>
									      </div>
									      <div class="modal-body">
									        <p>One fine body&hellip;</p>
									      </div>
									      <div class="modal-footer">
									        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
									        <button type="button" class="btn btn-primary">Save changes</button>
									      </div>
									    </div><!-- /.modal-content -->
									  </div><!-- /.modal-dialog -->
									</div><!-- /.modal -->									
																
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($tabs===true){
								?>
								
								<section class="in" id="Pestañas">
									<h1 class="h1">Pestañas</h1>
									
									<!-- Nav tabs -->
									<ul class="nav nav-tabs">
										<li class="active"><a href="#home" data-toggle="tab">Home</a></li>
										<li><a href="#profile" data-toggle="tab">Profile</a></li>
										<li><a href="#messages" data-toggle="tab">Messages</a></li>
										<li><a href="#settings" data-toggle="tab">Settings</a></li>
									</ul>
									
									<!-- Tab panes -->
									<div class="tab-content">
										<div class="tab-pane active" id="home">...</div>
										<div class="tab-pane" id="profile">...</div>
										<div class="tab-pane" id="messages">...</div>
										<div class="tab-pane" id="settings">...</div>
									</div>									
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($tooltips===true){
								?>
								
								<section class="in" id="Tooltips">
									<h1 class="h1">Tooltips y popovers</h1>
									
									<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>									
									<div class="tooltip top">
										<div class="tooltip-inner">
										Some tooltip text!
										</div>
										<div class="tooltip-arrow"></div>
									</div>									
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($breadcrumb===true){
								?>
								
								<section class="in" id="Breadcrumbs">
									<h1 class="h1">Breadcrumb</h1>
									<ol class="breadcrumb">
										<li><a href="#">Home</a></li>
										<li><a href="#">Library</a></li>
										<li class="active">Data</li>
									</ol>									
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($pagination===true){
								?>
								
								<section class="in" id="Paginación">
									<h1 class="h1">Paginación</h1>
									<ul class="list-unstyled pagination">
										<li>
											<a href="#" aria-label="Previous">
												<span aria-hidden="true">&laquo;</span>
											</a>
										</li>								
    									<li class="active"><a href="#">1<span class="sr-only">(current)</span></a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
										<li><a href="#">4</a></li>
										<li class="disabled"><a href="#">5</a></li>
										<li>
											<a href="#" aria-label="Next">
												<span aria-hidden="true">&raquo;</span>
											</a>
										</li>

									</ul>		
									
									<h2 class="h2">Tamaños</h2>	
									<h3 class="h3">LG</h3>					
									<ul class="list-unstyled pagination pagination-lg">
    									<li class="active"><a href="#">1<span class="sr-only">(current)</span></a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
									</ul>		
									<h3 class="h3">SM</h3>					
									<ul class="list-unstyled pagination pagination-sm">
    									<li class="active"><a href="#">1<span class="sr-only">(current)</span></a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
									</ul>		
									
									
								</section>								
								
								<?php
									}
								?>
								
								<?php
									if($progress===true){
								?>
								
								<section class="in" id="Barras de progreso">
									<h1 class="h1">Barras de progreso</h1>
									
									<div class="progress">
										<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
											60% Complete
										</div>
									</div>									
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($accordion===true){
								?>
								
								<section class="in" id="Desplegables">
									<h1 class="h1">Desplegables.</h1>
									<div class="panel-group" id="accordion">
									
										<div class="panel panel-default">
											<div class="panel-heading">
												<span class="panel-title">
												<a data-toggle="collapse" class="no-scroll" data-parent="#accordion" href="#panel-1">
												Panel abierto <span class="icon-arrow bottom pull-right"></span>
												</a>
												</span>
											</div>
											<div id="panel-1" class="panel-collapse collapse in">
												<div class="panel-body">
												Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
												</div>
											</div>
										</div>
										
										<div class="panel panel-default">
											<div class="panel-heading">
												<span class="panel-title">
												<a data-toggle="collapse" class="no-scroll" data-parent="#accordion" href="#panel-2">
												Panel cerrado <span class="icon-arrow bottom pull-right"></span>
												</a>
												</span>
											</div>
											<div id="panel-2" class="panel-collapse collapse">
												<div class="panel-body">
												Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
												</div>
											</div>
										</div>
										
									    
									</div>
									
									
								</section>
								
								<?php
									}
								?>

								<?php
									if($video===true){
								?>
								<section class="in" id="Video responsive">
									<h1 class="h1">Videos responsive</h1>

									<div class="embed-responsive embed-responsive-16by9">
										<iframe class="embed-responsive-item" src="https://player.vimeo.com/video/126544483"frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
										</div>

								</section>
								
								<?php
									}
								?>
								
								<?php
									if($carousel===true){
								?>
								<section class="in" id="Carrusel">
									<h1 class="h1">Carrusel / Slider</h1>

									<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
										<ol class="carousel-indicators">
										<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
										<li data-target="#carousel-example-generic" data-slide-to="1"></li>
										<li data-target="#carousel-example-generic" data-slide-to="2"></li>
										</ol>
										<div class="carousel-inner" role="listbox">
											<div class="item active">
											  <img data-src="holder.js/900x500/auto/#777:#555/text:First slide" alt="First slide [900x500]" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzc3NyIvPjxnPjx0ZXh0IHg9IjMxNy43MzQzNzUiIHk9IjI1MCIgc3R5bGU9ImZpbGw6IzU1NTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZTo0MnB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPkZpcnN0IHNsaWRlPC90ZXh0PjwvZz48L3N2Zz4=" data-holder-rendered="true">
											</div>
											<div class="item">
											  <img data-src="holder.js/900x500/auto/#666:#444/text:Second slide" alt="Second slide [900x500]" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzY2NiIvPjxnPjx0ZXh0IHg9IjI3Ny4yODEyNSIgeT0iMjUwIiBzdHlsZT0iZmlsbDojNDQ0O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjQycHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+U2Vjb25kIHNsaWRlPC90ZXh0PjwvZz48L3N2Zz4=" data-holder-rendered="true">
											</div>
											<div class="item">
											  <img data-src="holder.js/900x500/auto/#555:#333/text:Third slide" alt="Third slide [900x500]" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzU1NSIvPjxnPjx0ZXh0IHg9IjMwOC40MjE4NzUiIHk9IjI1MCIgc3R5bGU9ImZpbGw6IzMzMztmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZTo0MnB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPlRoaXJkIHNsaWRlPC90ZXh0PjwvZz48L3N2Zz4=" data-holder-rendered="true">
											</div>
										</div>
										<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
											<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
											<span class="sr-only">Previous</span>
										</a>
										<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
											<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
											<span class="sr-only">Next</span>
										</a>
									</div>
									

								</section>
								
								<script>
									
								</script>
								
								<?php
									}
								?>
								
								
								<?php
									if($blocks===true){
								?>
								
								<section class="in" id="Bloques">
									<h1 class="h1">Bloques</h1>

									<?php include('../src/includes/blocks/blocks.html')?>
																						
								</section>
								
								<?php
									}
								?>
								
							</main>
							
							<div class="col-sm-3">				
								<aside id="aside-affix" data-spy="affix">

									<nav id="nav-bar-guide" class="navbar">
									    <ul class="nav list-unstyled" role="tablist">
									
									    </ul>
									 </nav>										
									
								</aside>
							</div>
								
						</div><!-- row -->

				</div><!-- container -->
			</div><!-- container-fluid -->
			
			
		</main>
    
	<?php include('../src/includes/core/footer.html')?>
	
	<?php include('../src/includes/core/plugins.js.html')?>
	
	<script src="../src/js/adn/plugins/create-nav-bar.js" charset="utf-8"></script>
	
	<script type="text/javascript">
		
		$(function() {
		
			$('#nav-bar-guide').createNavBar();		
		
		});
		
		
		
	</script>
		
        
	<?php include('../src/includes/core/html-end.html')?>