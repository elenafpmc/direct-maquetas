module.exports = function(grunt) {
	
	//Variables de paths
	
	// Sin CMS
	// system: html
	// tplPath: html
	// tpl: php
	// web: localhost/basemaquetacion/web/
	// 
	// Drupal:
	// system: drupal/sites/all/themes/custom/adn/
	// tplPath: web
	// tpl: php
	// web: 
	// 
	// Wordpress:
	// system: wordpress/wp-content/themes/adn/
	// tplPath: 
	// tpl: 
	// web: 
	// 
	// Magento:
	// system: 
	// tplPath: 
	// tpl: 
	// web: 
	
	var globalConfig = {
		system: 'html/',
		tplPath: 'src/',
		tpl: 'html',
		web: 'localhost/direct/html/'
	};	
	
	//Necesario para el updater de dependencias
	require('load-grunt-tasks')(grunt);
	
	//variable para imagemin
	var mozjpeg = require('imagemin-mozjpeg');
	
	
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		globalConfig: globalConfig,
		//Usamos watch para controlar cambios en archivos
		watch: {			
		    zetzer: {
		        files: ['src/**/*.html'],
		        tasks: ['zetzer'],
		        options: {
		            spawn: false,
		            livereload: true
		        },
		    },		

		    jshint: {
		        files: ['<%= globalConfig.tplPath  %>/js/adn/*.js'],
		        tasks: ['newer:jshint'],
		        options: {
		            spawn: false,
		            livereload: true
		        },
		    },		
		    uglify: {
		        files: ['<%= globalConfig.tplPath  %>/js/**/*.js'],
		        tasks: ['newer:uglify'],
		        options: {
		            spawn: false,
		            livereload: false
		        },
		    },
			imagemin: {
			  files: ['html/**/*.{png,jpg,gif}'],
			  tasks: ['newer:imagemin'],
			  options: {
			      spawn: false,
			      livereload: false
			  }
			},  		    
			less: {
			    files: ['<%= globalConfig.tplPath  %>/less/**/*.less'],
			    //No funciona bien si hay imports y usamos newer:
			    tasks: ['less'],
			    options: {
		          spawn: false,
		          livereload: false
		      	}
			},
			svgmin: {
			    files: ['<%= globalConfig.tplPath  %>/svg/**/*.svg'],
			    tasks: ['newer:svgmin'],
			    options: {
		          spawn: false,
		          livereload: false
		      	}
			},			
			//webfont: {
			//    files: ['<%= globalConfig.system  %>/svg/svg-iconfont/*.svg'],
			//    tasks: ['webfont'],
			//    options: {
		    //      spawn: false,
		    //      livereload: false,
		    //  	}
			//},
			//webfontLess: {
			//    files: ['<%= globalConfig.system  %>/svg/svg-iconfont/*.svg'],
			//    tasks: ['less'],
			//    options: {
		    //      spawn: false,
		    //      livereload: false,
		    //  	}
			//},
			grunticon: {
			    files: ['<%= globalConfig.tplPath  %>/svg/svg-icon/*.svg'],
			    tasks: ['grunticon'],
			    options: {
		          spawn: false,
		          livereload: false
		      	}
			},
			grunticonLess: {
			    files: ['<%= globalConfig.tplPath  %>/svg/svg-icon/*.svg'],
			    tasks: ['less'],
			    options: {
		          spawn: false,
		          livereload: false
		      	}
			},
			
			autoprefixer: {
			    files: ['<%= globalConfig.tplPath  %>/less/*.less'],
			    tasks: ['autoprefixer'],
			    options: {
		          spawn: false,
		          livereload: false
		      	}
			}
			
		},
		
		browserSync: {
		  bsFiles: {
		      src : ['<%= globalConfig.system  %>/css/*.css','<%= globalConfig.system  %>/js/*.js','<%= globalConfig.tplPath  %>/**/*.<%= globalConfig.tpl  %>']
		  },
		  options: {
		    proxy: "<%= globalConfig.web  %>",
			    watchTask : true
		  }
		},
		svgmin: {
		    options: {
		        plugins: [
		            {
		                removeViewBox: false
		            }, {
		                removeUselessStrokeAndFill: false
		            }
		        ]
		    },
			multiple: {
				files: [{
					expand:true,
					cwd: '<%= globalConfig.tplPath  %>/svg',
					src: ['**/*.svg'],
					dest: '<%= globalConfig.tplPath  %>/svg/'
				}]
			}

		},		
		uglify: {
			options: {
				mangle: false,
				beautify: true,
				wrap: true
			},						
			critical: {
			  files: {
			    '<%= globalConfig.system  %>js/critical.js':
			    [
				    
				//'<%= globalConfig.tplPath  %>/js/vendor/jquery-1.11.2.min.js',	
				'<%= globalConfig.tplPath  %>/js/vendor/jquery-2.1.3.min.js',	
				
				'<%= globalConfig.tplPath  %>/js/bootstrap/affix.js',				
				'<%= globalConfig.tplPath  %>/js/bootstrap/carousel.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/scrollspy.js',	
															
				'<%= globalConfig.tplPath  %>/js/adn/helpers.js',
				'<%= globalConfig.tplPath  %>/js/adn/main.js'
				
				
			    ]
			  }
			},
			async: {
			  files: {
			    '<%= globalConfig.system  %>/js/async.js':
			    [
				    				    
				//Bootstrap			    
				'<%= globalConfig.tplPath  %>/js/bootstrap/transition.js',				    
				'<%= globalConfig.tplPath  %>/js/bootstrap/alert.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/button.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/collapse.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/dropdown.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/modal.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/tooltip.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/popover.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/tab.js',
				
				
				
				
				
				//Plugins
				//'<%= globalConfig.tplPath  %>/js/vendor/add2home.js',
				'<%= globalConfig.tplPath  %>/js/vendor/lazysizes.js',
				//'<%= globalConfig.tplPath  %>/js/vendor/masonry.pkgd.min.js',
				'<%= globalConfig.tplPath  %>/js/vendor/jquery.touchSwipe.js',
				
				
				//Plugins Bootstrap
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-tabdrop.js',					
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-slider.js',					
				//'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-select.js',	
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/jqBootstrapValidation.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-datepicker/bootstrap-datepicker.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js',

				//Plugins ADN
				//'<%= globalConfig.tplPath  %>/js/adn/plugins/parallax.js',		
				//'<%= globalConfig.tplPath  %>/js/adn/plugins/ajax-forms.js',	
				'<%= globalConfig.tplPath  %>/js/adn/plugins/off-canvas.js',	
				//'<%= globalConfig.tplPath  %>/js/adn/plugins/create-nav-bar.js',
				
									
				'<%= globalConfig.tplPath  %>/js/adn/helpers_async.js',
				'<%= globalConfig.tplPath  %>/js/adn/main_async.js',
				'<%= globalConfig.tplPath  %>/js/adn/box_collapse_layout.js',
				'<%= globalConfig.tplPath  %>/js/adn/animations.js',				
				'<%= globalConfig.tplPath  %>/js/adn/help-block.js'
				
			    ]
			  }
			}
		},
		imagemin: {
			options: {
			cache: false
			},
			dist: {
				files: [{
				  expand: true,
				  cwd: '<%= globalConfig.system  %>/img/',
				  src: ['**/*.{png,jpg,gif}'],
				  dest: '<%= globalConfig.system  %>/img/'
				}]
			}
		},
		less: {
		  production: {
		    options: {
		      paths: ["css"],			    
		      cleancss: false,
		      yuicompress: false,
		      modifyVars: {
			      adnVersion : grunt.template.today('ddmmyyyy')
			      
		      }		      
		    },
		    files: {
			     "<%= globalConfig.system  %>/css/async.min.css": "<%= globalConfig.tplPath  %>/less/async.less",
			     "<%= globalConfig.system  %>/css/async-new-vh.min.css": "<%= globalConfig.tplPath  %>/less/async-new-vh.less",
			     "<%= globalConfig.system  %>/css/critical.min.css": "<%= globalConfig.tplPath  %>/less/critical.less",
			     "<%= globalConfig.system  %>/css/critical-new-vh.min.css": "<%= globalConfig.tplPath  %>/less/critical-new-vh.less",
			     "<%= globalConfig.system  %>/css/fonts.min.css": "<%= globalConfig.tplPath  %>/less/fonts.less"
		    }
		  }
		},	
		
		jshint: {
		   all: ['<%= globalConfig.tplPath  %>/js/adn/*.js']
		},
		
		//webfont: {
		//    icons: {
		//        src: '<%= globalConfig.system  %>/svg/svg-iconfont/*.svg',
		//        dest: '<%= globalConfig.system  %>/fonts',
		//        destCss: '<%= globalConfig.system  %>/less/components/',
		//        options: {
		//            stylesheet: 'less',
		//            relativeFontPath: '../fonts',
		//            htmlDemo: false,
		//            embed: true,
		//            syntax: 'bootstrap'
		//        }
		//    }
		//},		
				
		grunticon: {
		    myIcons: {
		        files: [{
		            expand: true,
		            cwd: '<%= globalConfig.tplPath  %>/svg/svg-icon',
		            src: ['*.svg', '*.png'],
		            dest: "<%= globalConfig.system  %>/css/grunticon"
		        }],
		        options: {
			        pngfolder :'ie8-icon',
			        enhanceSVG: true,
			        cssprefix:'.icon-svg-'
		        }
		    }
		},	
		
		autoprefixer: {
			
			options: {
			      browsers: ['last 2 versions']
			},			
			no_dest: {
		      src: '<%= globalConfig.system  %>/css/*.css' // -> src/css/file1.css, src/css/file2.css
		    }
			
		},
		

		zetzer: {
		    main: {
		      options: {
		        env: {
		          title: "Zetzer"
		        },
		        partials: "src/includes/",
		        templates: "templates",
		        
		        dot_template_settings:{
			        strip: false
			        
		        }
		      },
		      files: [
		        {
		          expand: true,
		          cwd: "src/",
		          src: "*.html",
		          dest: "html",
		          ext: ".html",
		          flatten: false
		        }
		      ]
		    }
		  },

  				
		devUpdate: {
	        main: {
	            options: {
					updateType: 'prompt', //just report outdated packages
	                reportUpdated: false, //don't report up-to-date packages
	                semver: true, //stay within semver when updating
	                packages: {
	                    devDependencies: true, //only check for devDependencies
	                    dependencies: false
	                },
	                packageJson: null, //use matchdep default findup to locate package.json
	                reportOnlyPkgs: [] //use updateType action on all packages            
	            }
	        }
	    }
		
	});

	//
	//// Cargamos plugins
	//
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	//Plugin de compresión de img
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	
	//Generador de icon fonts
	//grunt.loadNpmTasks('grunt-webfont');

	//Para iconos SVG no fuentes
	grunt.loadNpmTasks('grunt-grunticon');
	
	//Plugin para sólo archivos modificados
	grunt.loadNpmTasks('grunt-newer');
	
	//Less
	grunt.loadNpmTasks('grunt-contrib-less');

	//Autoprefixer
	grunt.loadNpmTasks('grunt-autoprefixer');
	
	//Updater de dependencias
	grunt.loadNpmTasks('grunt-dev-update');
	
	//Watch para less y cambios en codigo
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	
	//Alertas y notificaciones
	grunt.loadNpmTasks('grunt-notify');

	//Avisador de errores JS
	grunt.loadNpmTasks('grunt-contrib-jshint');

	//Sistema de plantillas	
	grunt.loadNpmTasks('grunt-zetzer');

	// Registramos tareas
	grunt.registerTask('default',
		["browserSync", "watch"]
	
	);

};