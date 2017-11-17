<?php

	/*
		
	Configuración de guia de estilos, marcar con false si no se usa el componente	
		
	*/

	$lists	   	=true;
	$tables	   	=false;
	$forms	   	=true;
	$alerts	   	=false;
	$dropdowns 	=false;
	$modals	   	=false;
	$tabs	   	=false;
	$tooltips  	=false;
	$breadcrumb	=false;
	$pagination	=false;
	$progress  	=false;
	$accordion 	=false;
	$helpers   	=false;

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


	<?php include('../web/includes/core/html-start.php')?>  

		<style>
			section { margin: 40px 0; border-bottom: 1px solid #444; padding-bottom: 60px; padding-top: 40px }
			
			h1 {margin-top:20px !important; padding-bottom: 20px !important; color: #444 !important }
			h2 { margin-top:20px !important;padding-bottom: 20px !important; color: #444 !important }
			#dropdowns .dropdown-menu { position: static !important; display: block; margin-bottom: 10px; float: none }
			
			
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
			#modals { height: auto; position: relative; }
			#modals h1 { color: #fff }
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
    	<?php include('../web/includes/style-guide/off-canvas.php')?>    
    	
		<?php include('../web/includes/core/header.php')?>		
		<main class="wrapper tooltips popovers">
		
			<div class="container-fluid">
				<div class="container">
						
						<div class="row">
							
							<main class="col-sm-9">
							
								<section class="in" id="favicon">
									<h1 class="h1">Favicon</h1>
									<img class="no-responsive" src="<?php echo $host; ?>system/img/favicons/favicon-196x196.png" width="80" height="80" alt="">
									
								</section>
							
								<section class="in" id="colours">
									<h1 class="h1">Paleta de colores</h1>
									
									<h2 class="h2">Colores</h2>
									
									<?php
										//Grises
										$colors = array(
											array('blue','#9AC8DB'),
											array('green','#DAE275'),
											array('pink','#F2958D'),
										);
									?>

									<div class="row">
										<?php
											printColors($colors);										
										?>
									</div><!-- row -->
									
								</section>
								
								<section class="in" id="tipography">
									<h1 class="h1">Tipografía General</h1>
									
									
									<h2 class="h2">Titulares</h2>
									
									<span class="h1">H1 Droid serif regular 40px</span>
									<span class="h2">H2 Tahoma negrita 32px</span>
									<span class="h3">H3 26px Atlas Grotesk</span>
									<span class="h4">H4 24px Helvetica</span>
									<span class="h5">H5 22px Helvetica</span>
									<span class="h6">H6 22px Helvetica</span>

									
									<h2 class="h2">Body y parrafos</h2>
									<p>16px Helvetica</p>
									
									<h2 class="h2">Entradas</h2>
									<p class="lead">25px Helvetica Light</p>
									

								</section>
																
								<section class="in" id="links">
									<h1 class="h1">Enlaces.</h1>
									
									<a href="">Link</a>
									
									<a href="" class="active">Link activo</a>
									
								</section>
								
								<section class="in" id="buttons">
									<h1 class="h1">Botones</h1>	
									<h2 class="h2">Tamaños fijos</h2>
									<p>
										<button type="button" class="btn btn-primary btn-lg">Large button</button>
										<button type="button" class="btn btn-default btn-lg">Large button</button>
									</p>
									<p>
										<button type="button" class="btn btn-primary">Default button</button>
										<button type="button" class="btn btn-default">Default button</button>
									</p>
									<p>
										<button type="button" class="btn btn-primary btn-sm">Small button</button>
										<button type="button" class="btn btn-default btn-sm">Small button</button>
									</p>
									<p>
										<button type="button" class="btn btn-primary btn-xs">Extra small button</button>
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
								</section>								
								
								<section class="in" id="icons">
									
									
									<?php
										
										//Cargamos los svg-iconfont y los pintamos como spans
										if ($handle = opendir('../web/system/svg/svg-iconfont/')) {
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
											$iconsFont .= "<span class=\"icon-$file big\"></span>";
											$i++;
										}

										if ($iconsFont){
											echo '<h1 class="h1">Iconos Fuente</h1>';
											echo $iconsFont;
										}



										//Cargamos los svg-icon y los pintamos como spans
										if ($handle = opendir('../web/system/svg/svg-icon/')) {
											
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
										
										//print_r($entryArray);
										$i=0;
										//Pintamos el listado
										foreach ($entryArray as $file){
											$iconsSVG .= "<span data-grunticon-embed class=\"icon-svg-$file big\"></span>";
											$i++;
										}

										if ($iconsSVG){
											echo '<h1 class="h1">Iconos SVG</h1>';
											echo $iconsSVG;
										}

										
									?>
									
									
									<h1 class="h1">Tamaños de iconos</h1>
									
									<h2 class="h2">LG</h2>
									40x40px
									<h2 class="h2">MD</h2>
									40x40px
									<h2 class="h2">SM</h2>
									40x40px
									<h2 class="h2">XS</h2>
									40x40px
									
									
								</section>
								
								<?php
									if($lists===true){
								?>
								
								<section class="in" id="lists">
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
									<h2 class="h2">En linea</h2>
									<ul class="list-inline">
										<li>Item 1</li>
										<li>Item 2</li>
									</ul>	
									<h2 class="h2">Con iconos</h2>
									<ul class="list-icons big-icons">
										<li><div class="text"><span class="icon-camera big"></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
																								
									<ul class="list-icons medium-icons">
										<li><div class="text"><span class="icon-camera medium"></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
																								
									<ul class="list-icons small-icons">
										<li><div class="text"><span class="icon-camera small"></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
																								
									<ul class="list-icons mini-icons">
										<li><div class="text"><span class="icon-camera mini"></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
																								
									<ul class="list-icons micro-icons">
										<li><div class="text"><span class="icon-camera micro"></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
																								
									<ul class="list-icons atom-icons">
										<li><div class="text"><span class="icon-camera atom"></span>Lorem ipsum dolor sit amet</div></li>
									</ul>	
									
									<div class="list-icons medium-icons">
										<div><div class="text"><span class="icon-svg-lock medium" data-grunticon-embed></span>Tambien se puede usar sin ul para un único elemento</div></div>
									</div>	
																								
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($tables===true){
								?>
								
								<section class="in" id="tables">
									<h1 class="h1">Tablas</h1>
									
									<h2 class="h2">Responsive con scroll</h2>
									<div class="table-responsive">
										<table class="table table-hover">
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
										<table class="table">
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
								
								<section class="in" id="forms">
									<h1 class="h1">Formularios con caso de éxito, error y aviso. Radio button, checkboxes.</h1>
									
									<h2 class="h2">Clasico</h2>
									<form role="form">
									
										<div class="form-group">
											<label for="exampleInputEmail1">Email address</label>
											<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
										</div>
										<div class="form-group">
											<label for="exampleInputPassword1">Password</label>
											<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
											<p class="help-block">Example block-level help text here.</p>											
										</div>
										
										<div class="form-group">
											<label for="input-slider">JS Slider</label><br>
											<input name="input-slider" type="text" class="js-input-slider form-control" value="" data-slider-min="-20" data-slider-max="20" data-slider-step="1" data-slider-value="-14" data-slider-orientation="horizontal" data-slider-selection="after"data-slider-tooltip="hide">
											
										</div>
										
										<div class="form-group">
											<label for="exampleInputFile">File input</label>
											<input type="file" id="exampleInputFile">
										</div>
										<textarea class="form-control" rows="3"></textarea>
										<div class="checkbox">
											<input id="checkbox1" type="checkbox"> 
											<label name="checkbox1">
												Check me out
											</label>
										</div>
										<label class="checkbox-inline">
											
										</label>
										<label class="checkbox-inline">
											<input type="checkbox" id="inlineCheckbox2" value="option2"> 2
										</label>										
										<div class="radio">
											<label>
												<input type="radio"> Check me out
											</label>
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
												<input type="email" class="form-control" id="inputEmail3" placeholder="Email">
												<span class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
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
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($alerts===true){
								?>
								
								<section class="in" id="alerts">
									<h1 class="h1">Mensajes de alerta</h1>
									
									<div class="alert alert-warning alert-dismissable">
										  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
										  <strong>Warning!</strong> Better check yourself, you're not looking too good.
									</div>									
									
									<div class="alert alert-success alert-dismissable">
										  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
										  <strong>Warning!</strong> Better check yourself, you're not looking too good.
									</div>									
									
									<div class="alert alert-info alert-dismissable">
										  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
										  <strong>Warning!</strong> Better check yourself, you're not looking too good.
									</div>									
									
									<div class="alert alert-danger alert-dismissable">
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
								
								<section class="in" id="dropdowns">
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
								
								<section id="modals" class="modal-backdrop in">
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
									
									<div class="modal fade">
									  <div class="modal-dialog">
									    <div class="modal-content">
									      <div class="modal-header">
									        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									        <h4 class="modal-title">Modal Defecto</h4>
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
								
								<section class="in" id="tabs">
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
								
								<section class="in" id="tooltips">
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
								
								<section class="in" id="breadcrumb">
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
								
								<section class="in" id="pagination">
									<h1 class="h1">Paginación</h1>
									<ul class="list-unstyled pagination">
										<li><a href="#">&laquo;</a></li>
										<li><a href="#">1</a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
										<li><a href="#">4</a></li>
										<li><a href="#">5</a></li>
										<li><a href="#">&raquo;</a></li>
									</ul>								
									
								</section>								
								
								<?php
									}
								?>
								
								<?php
									if($progress===true){
								?>
								
								<section class="in" id="progress">
									<h1 class="h1">Barras de progreso</h1>
									
									<div class="progress">
										<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
											<span class="sr-only">60% Complete</span>
										</div>
									</div>									
									
								</section>
								
								<?php
									}
								?>
								
								<?php
									if($accordion===true){
								?>
								
								<section class="in" id="accordion">
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
									if($helpers===true){
								?>
								<section class="in" id="helpers">
									<h1 class="h1">Helpers</h1>
									
									<h2 class="h2">CSS</h2>
									
									
									<p>.hide-xs, .hide-sm, .hide-md, .hide-lg</p>
									
									<p>
										.hidden<br>
										.hide-touch<br>
									</p>
									
									<p>.show-xs, .show-sm, .show-md, .show-lg</p>
									
									<p>
									.display-none<br>
									.display-block<br>
									.display-block-xs<br>
									.display-inline<br>
									.display-inline-block<br>
										&.v-middle<br>
										&.v-top<br>
										&.v-super<br>
										&.xs-default<br>
									.display-table<br>
									.display-table-cell<br>
									.display-table-cell<br>
									&.v-bottom<br>
									</p>
									<p>
									.initial, .relative , .absolute<br>
									.absolute.bottom<br>
									</p>
									<p>
									.overflow<br>
									.overflow.scroll<br>
									.clear-both<br>
									</p>
									<p>
									.text-xs-left<br>
									.text-xs-right<br>
									.text-xs-center<br>
									.caps<br>
									.bold<br>
									.text-ellipsis<br>
									</p>
									<p>
									.margin-sm-b-5 ... 10,15,20...40<br>
									.margin-xs-b-5 ... 10,15,20...40<br>
									</p>
									<p>
									.row-no-padding
									</p>
									
									<h2 class="h2">JS</h2>		
									
									
									<h3 class="h3">Variables globales</h3>
									
									<p>
										windowWidth : Ancho de la pantalla<br>
										smBreak: 768px<br>
										mdBreak: 992px<br>
										lgBreak: 1200px<br>
										
									</p>
									
									<h3 class="h3">Automáticos</h3>
									
									<p>
										.lazyload
										
										img src="imagen-LQ" data-src="image-HQ"
										
										también funciona con srcset
										
									</p>
									
									<p>
										Cuando no estemos en móvil se cargaran los select del plugin selectpicker, en movil los select nativos de móvil.
										
									</p>
									
									<p>Cuando se abre un collapsable la pantalla hace scroll al contenido mostrado, se previene si el boton tiene clase .no-scroll</p>
									
									<p>
										Carga de tooltips y popovers
									</p>
									
									<p>
										Placeholders automáticos en IE inferior a 10
									</p>
									
									<p>
										Los affix con data-spy="affix" generan automáticamente un contenedor con su misma altura y data-offset-top para evitar saltos y que se convierta en fixed antes de tiempo. Han de tener id obligatoriamente
									</p>
									
									<p>
										Los input[type="number"] bloquean el uso de teclas no numéricas y se les añade botones de añadir/restar cantidad
										
									</p>
									
									<h4 class="h4">Desplegables que están cerrados en desktop, abiertos en iPad / móvil</h4>
									
									<p>
										iPad + móvil:<br>
										.js-responsive-auto-close<br><br>
										Móvil:<br>
										.js-responsive-auto-close-xs<br>
									</p>	
									
									
									<h4 class="h4">Cuadrados perfectos</h4>
									
									<p>
										.js-square
									</p>	
									
									<h4 class="h4">Igualar alturas</h4>
									
									<p>
										Parent: .js-same-height
									</p>	
									
									<p>
										Children: .js-same
									</p>	
									
									
									
									<h3 class="h3">Manuales</h3>
									<h4 class="h4">PopOvers con contenido HTML</h4>		
									<p>data-toggle="html-popover"</p>				
									<p>Contenido a mostrar : data-id-content="#nombre-id"</p>
									
									<p>
										<button type="button" class="btn btn-primary" data-toggle="html-popover" data-id-content="#pop-over-demo">Demo</button>
										<div id="pop-over-demo" class="hide">
											
											<div class="h3">fdfdf</div>
											lorem <strong>ipsum</strong>
											<p>sdfsdfsf</p>
											
											
										</div>
									</p>
									
									
									<h4 class="h4">Botones de colapse que cambian su texto</h4>
									<p>
										Estado inicial = data-original-text<br>
										Texto a alternar = data-new-text<br>
									</p>
									
									<p>
										
										<button type="button" class="btn btn-primary no-scroll"
											data-toggle="collapse"
											data-target="#collapse-demo-change-text"
											data-original-text="Mostrar"
											data-new-text="Ocultar"
										>
										  Mostrar
										</button>
										
										<div id="collapse-demo-change-text" class="collapse">
											
											Contenido del collapse
											
										</div>
										
										
									</p>
									
									
									<h4 class="h4">Movemos el scroll al elemento indicado haciendo click</h4>
									<p>
										Scroll a ID : data-id-scroll="#nombre-id", el ID de destino ha de tener la clase in<br>
										
										Si el header es affix, hay que añadir una correción al scroll en data-pixel-fix=""
										
									</p>									

									<h4 class="h4">Boton que cierra el Id indicado</h4>
									<p>
										ID a ocultar : data-id-dismiss="#nombre-id", si es this, se cierra el parent<br>
										Animación : data-animation, fade, slide. Si no se define no se anima<br>
									</p>
									
									<p>
										
										
										
										<div>
											
											Ahora me ves
											
											<button type="button" class="btn btn-primary"
											data-id-dismiss="this"
											data-animation="fade"
											>Demo</button>
											
										</div>
										
									</p>

									<h4 class="h4">Boton que oculta el Id indicado y luego muestra otro</h4>
									<p>
										El boton ha de tener la clase .js-reveal<br>
										ID a mostrar: data-id-hide="#nombre-id"<br>
										ID a ocultar: data-id-show="#nombre-id"<br>
										Animación : data-animation, fade, slide. Si no se defino no se anima<br>
									</p>
									<p>
										
										<button type="button" class="btn btn-primary js-reveal"
											data-id-hide="#reveal-demo-hide"
											data-id-show="#reveal-demo-show"
										>Demo</button>
										
										<div id="reveal-demo-hide">
											
											Me ves inicialmente
											
										</div>
										
										<div id="reveal-demo-show" class="display-none">
											
											Ahora me ves a mi
											
										</div>
										
										
										
										
										
									</p>

									<h4 class="h4">Boton que alterna la visibilidad de 2 elementos cada vez que se pulsa</h4>
									<p>
										El boton ha de tener la clase .js-toggle<br>
										ID a mostrar: data-id-hide="#nombre-id"<br>
										ID a ocultar: data-id-show="#nombre-id"<br>
										Número de veces que se hará: data-times, 0 para infinito.<br>
										Animación : data-animation, fade, slide. Si no se define no se anima<br>
									</p>
									<p>
										

										<button type="button" class="btn btn-primary js-toggle"
											data-id-hide="#toggle-demo-hide"
											data-id-show="#toggle-demo-show"
											data-times="0"
										>Demo</button>
										
										<div id="toggle-demo-hide">
											
											Marco!
											
										</div>
										
										<div id="toggle-demo-show" class="display-none">
											
											Polo!
											
										</div>
										
										
										
									</p>
									
									
									<h4 class="h4">Todos los efectos son combinables!</h4>
									<p>
										<button type="button" class="btn btn-primary js-toggle"
											data-id-hide="#total-demo-hide"
											data-id-show="#total-demo-show"
											data-times="0"
											
											data-id-dismiss="#total-demo-adios"
											
											data-original-text="Demo total"
											data-new-text="Demo total nuevo texto"
											
											
										>Demo total</button>
										
										<div id="total-demo-adios">
											
											En cuanto pulses voy a desaparecer...
											
										</div>
										
										<div id="total-demo-hide">
											
											Marco!
											
										</div>
										
										<div id="total-demo-show" class="display-none">
											
											Polo!
											
										</div>
									</p>

									<h4 class="h4">Select que alterna la visibilidad de collapses</h4>
									<p>
										El select ha de tener la clase .js-accordion-select<br>
										 data-id-trigger="#nombre-id"<br>

									</p>

									<p>
										<select name="" id="" class="selectpicker js-accordion-select">
											
											<option value="1" data-id-trigger="#accordion-select-one">Panel 1</option>
											<option value="2" data-id-trigger="#accordion-select-two">Panel 2</option>
											<option value="3" data-id-trigger="#accordion-select-three">Panel 3</option>
											
										</select>
										
										<div class="panel-group" id="accordion-select-demo">
										
											<div class="panel panel-default">
												<div class="panel-heading">
													<h4 class="panel-title">
													<a data-toggle="collapse" data-parent="#accordion-select-demo" class="no-scroll" href="#accordion-select-one">
													Collapsible Group Item #1
													</a>
													</h4>
												</div>
												<div id="accordion-select-one" class="panel-collapse collapse in">
													<div class="panel-body">
													Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
													</div>
												</div>
											</div>
											
											<div class="panel panel-default">
												<div class="panel-heading">
													<h4 class="panel-title">
													<a data-toggle="collapse" data-parent="#accordion-select-demo" class="no-scroll" href="#accordion-select-two">
													Collapsible Group Item #2
													</a>
													</h4>
												</div>
												<div id="accordion-select-two" class="panel-collapse collapse">
													<div class="panel-body">
													Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
													</div>
												</div>
											</div>
											
											<div class="panel panel-default">
												<div class="panel-heading">
													<h4 class="panel-title">
													<a data-toggle="collapse" data-parent="#accordion-select-demo" class="no-scroll" href="#accordion-select-three">
													Collapsible Group Item #3
													</a>
													</h4>
												</div>
												<div id="accordion-select-three" class="panel-collapse collapse">
													<div class="panel-body">
													Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
													</div>
												</div>
											</div>
										    
										</div>
									</p>
																	
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
    
	<?php include('../web/includes/core/footer.php')?>
	
	<?php include('../web/includes/core/plugins.js.php')?>
	
	<script src="../web/system/js/adn/plugins/create-nav-bar.js" charset="utf-8"></script>
	
	<script type="text/javascript">
		
		$(function() {
		
			$('#nav-bar-guide').createNavBar();		
		
		});
		
		
		
	</script>
		
        
	<?php include('../web/includes/core/html-end.php')?>