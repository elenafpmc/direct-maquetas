<?php
error_reporting(0);
//Leemos el directorio
if ($handle = opendir('.')) {
	//Formamos el array
    while (false !== ($entry = readdir($handle))) {

		//no metemos en el array ciertos archivos
        if (
        	$entry != "." &&
        	$entry != ".." &&
        	$entry != ".DS_Store" &&
        	$entry != ".htaccess" &&
        	$entry != ".." &&
        	$entry != "home.php" &&
        	$entry != "index.php" &&
        	$entry != "duplicame.php" &&
        	$entry != "cambios.rtf" &&      	
        	is_file($entry)) {

            $entryArray[] = $entry;
        }
    }

    closedir($handle);
}
	
	sort($entryArray);
	
	$i=0;
	//Pintamos el listado
	foreach ($entryArray as $file){
		$inicial = $file[0].$file[1];
		
		if (!$inicialAnterior){ $inicialAnterior = $file[0].$file[1] ; }		

		$br ='<br>';


		if( $inicialAnterior != $inicial) {
			
			$brInicial ='<br><br>';
			
		}else{
			$brInicial ='';
		}
		
		$link .= $brInicial.'<a href="'.$file.'" target="_blank">'.$file.'</a>'.$br;
		
		$inicialAnterior = $inicial;
		
		$i++;
	}
	
	

?>


<?php include('web/includes/common/html-start.php')?>  
    
<body style="padding:20px;">

<h1 class="h1">Maquetas</h1>

<a target='_blank' href='web/'>Web</a><br/><br/><br/>
<a target='_blank' href='prop/'>Propuestas</a><br/><br/>
<a target='_blank' href='old/'>Maquetas descartadas</a><br/><br/><br/><br/>


<a target='_blank' href='docs/'>Documentaci&oacute;n t&eacute;cnica</a>





</body>
</html>
