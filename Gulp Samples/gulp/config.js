/**
 * Load modules
 */

var path = require('path');

/**
 * Config values and settings for various gulp tasks
 *
 *   - imported by './gulpfile.js'
 */

module.exports = function($){

	var basePath = path.join(__dirname, '..'),
		
		// src
		srcPath = path.join(basePath, 'src'),
		srcPublicPath = path.join(srcPath, 'public'),

		// src > assets
		srcFontsPath = path.join(srcPublicPath, 'assets', 'fonts'),
		srcImagesPath = path.join(srcPublicPath, 'assets', 'images'),
		srcScriptsPath = path.join(srcPublicPath, 'assets', 'js'),
		srcScriptsVendorsPath = path.join(srcScriptsPath, 'vendors'),

		// src > site
		srcSitePath = path.join(srcPublicPath, 'site'),
		srcSiteStylesPath = path.join(srcSitePath, 'assets', 'sass'),
		srcSiteConfigPath = path.join(srcSitePath, 'config'),
		srcSiteViewsPath = path.join(srcSitePath, 'views'),
		srcSiteLayoutsPath = path.join(srcSiteViewsPath, 'layouts'),
		srcSiteComponentsPath = path.join(srcSitePath, 'components'),
		
		// src > app
		srcAppPath = path.join(srcPublicPath, 'app'),
		srcAppStylesPath = path.join(srcAppPath, 'assets', 'sass'),
		srcAppConfigPath = path.join(srcAppPath, 'config'),
		srcAppViewsPath = path.join(srcAppPath, 'views'),
		srcAppLayoutsPath = path.join(srcAppViewsPath, 'layouts'),
		srcAppComponentsPath = path.join(srcAppPath, 'components'),

		// staging
		stagingPath = path.join(basePath, 'staging'),
		stagingPublicPath = path.join(stagingPath, 'public'),
		stagingViewsPath = path.join(stagingPath, 'views'),
		stagingLayoutsPath = path.join(stagingViewsPath, 'layouts'),
		stagingPartialsPath = path.join(stagingViewsPath, 'partials'),

		// staging > assets
		stagingFontsPath = path.join(stagingPublicPath, 'assets', 'fonts'),
		stagingImagesPath = path.join(stagingPublicPath, 'assets', 'images'),
		stagingScriptsPath = path.join(stagingPublicPath, 'assets', 'js'),
		stagingScriptsVendorsPath = path.join(stagingScriptsPath, 'vendors'),

		// staging > site
		stagingSitePath = path.join(stagingPublicPath, 'site'),
		stagingSiteStylesPath = path.join(stagingSitePath, 'assets', 'css'),
		stagingSiteScriptsPath = path.join(stagingSitePath, 'assets', 'js'),

		// staging > app
		stagingAppPath = path.join(stagingPublicPath, 'app'),
		stagingAppScriptsPath = path.join(stagingAppPath, 'assets', 'js'),
		stagingAppStylesPath = path.join(stagingAppPath, 'assets', 'css'),
		
		// Angular
		ngSiteAppName = '**********SiteApp',
		ngAppName = '**********App',
		ngDirPrefix = 'ua',
		
		// Views
		viewsSitePrefix = 'site',
		viewsAppPrefix = 'app';

	return {
		
		staging: {

			// Init
			init: {
				
				clean: [
					path.join(stagingPath, '**', '*'),
					'!' + stagingPath
				],
				
				createDirs: [
					
					// staging > public
					stagingPublicPath,

					// staging > assets
					stagingFontsPath,
					stagingImagesPath,
					stagingScriptsVendorsPath,

					// staging > public > site
					stagingSiteStylesPath,
					stagingSiteScriptsPath,
					
					// staging > public > app
					stagingAppStylesPath,
					stagingAppScriptsPath,
					
					// staging > views
					stagingLayoutsPath,
					stagingPartialsPath
					
				]

			},
			
			// Root files
			root: {

				clean: [
					path.join(stagingPublicPath, '*.ico')
				],

				src: path.join(srcPublicPath, '*.ico'),

				dest: stagingPublicPath,

				watch: [
					path.join(srcPublicPath, '*.ico')
				]

			},

			// Fonts
			fonts: {
				
				clean: [
					path.join(stagingFontsPath, '*.*')
				],
				
				src: path.join(srcFontsPath, '*.*'),
				
				dest: stagingFontsPath
			
			},

			// Image files
			images: {

				clean: [
					path.join(stagingImagesPath, '*.*')
				],

				src: path.join(srcImagesPath, '*.*'),

				dest: stagingImagesPath

			},

			// Scripts
			scripts: {

				vendors: {
					
					// Clean vendor scripts
					clean: [
						path.join(stagingScriptsVendorsPath, '*.*')
					],
					
					// Copy separate vendor scripts (not bundled)
					separates: [
						{
							src: path.join(srcScriptsVendorsPath, 'initializr', 'modernizr-2.8.3-respond-1.4.2.min.js'),
							destName: 'modernizr.js'
						}
					],
					
					// Bundle vendor scripts
					bundles: [
						{
							src: [
								path.join(srcScriptsVendorsPath, 'jquery', 'jquery-1.11.2.min.js'),
								path.join(srcScriptsVendorsPath, 'angular', 'angular.min.js'),
								path.join(srcScriptsVendorsPath, 'angular-ui-router', 'angular-ui-router.min.js'),
								path.join(srcScriptsVendorsPath, 'angular-resource', 'angular-resource.min.js'),
								path.join(srcScriptsVendorsPath, 'angular-messages', 'angular-messages.min.js')
							],
							destName: 'main.js'
						}
					],

					dest: stagingScriptsVendorsPath
					
				}
				
			},

			// Site
			site: {

				// CSS (SCSS) files
				styles: {
					
					clean: [
						path.join(stagingSiteStylesPath, '*.css')
					],
					
					entry: path.join(srcSiteStylesPath, 'index.scss'),
					
					dest: stagingSiteStylesPath,
					
					destName: 'main.css',
					
					watch: path.join(srcSiteStylesPath, '**', '*.scss')
				
				},
				
				// Angular
				angular: {
					
					clean: [
						path.join(srcSiteConfigPath, 'module', '{config.json,config.module.js}'),
						path.join(stagingSiteScriptsPath, '*.js')
					],
					
					config: {
                        srcObj: path.join(srcSiteConfigPath, 'module', 'config.js'),
                        destJson: path.join(srcSiteConfigPath, 'module', 'config.json'),
						dest: path.join(srcSiteConfigPath, 'module'),
						destName: 'config.module.js'
					},
					
					src: [
						path.join(srcSitePath, 'app.js'),
						path.join(srcSitePath, '**', '*.{module,component,directive,controller,service,config,states,run}.js'),
						'!' + path.join(srcSitePath, 'assets', '*.*'),
						'!' + path.join(srcSitePath, 'views', '*.*')
					],
					
					appName: ngSiteAppName,

					appNameFindReplace: {
						find: '@appName@',
						replace: ngSiteAppName
					},
					
					dest: stagingSiteScriptsPath,
					
					destName: 'main.js',

					watch: [
						path.join(srcSiteConfigPath, 'module', 'config.js'),
						path.join(srcSitePath, 'app.js'),
						path.join(srcSitePath, '**', '*.{module,component,directive,controller,service,config,states,run}.js'),
						'!' + path.join(srcSiteConfigPath, 'module', '*.js'),
						'!' + path.join(srcSitePath, 'assets', '*.*'),
						'!' + path.join(srcSitePath, 'views', '*.*')
					]
					
				},
				
				// Views (handlebars)
				views: {
					
					clean: [
						path.join(stagingViewsPath, '**', viewsSitePrefix + '-*.hbs')
					],

					copy: {
						
						// Views
						views: {
							src: path.join(srcSiteViewsPath, '*.view.hbs'),
							dest: stagingViewsPath
						},
						
						// Views > layouts
						layouts: {
							src: path.join(srcSiteLayoutsPath, '*.layout.hbs'),
							dest: stagingLayoutsPath
						},
						
						// Views > partials
						partials: {
							src: path.join(srcSiteComponentsPath, '**', '*.partial.hbs'),
							dest: stagingPartialsPath
						}
						
					},

					watch: [
						path.join(srcSiteViewsPath, '**', '*.hbs'),
						path.join(srcSiteComponentsPath, '**', '*.partial.hbs')
					]
				
				},
				
				// Find & replace - Angular & views
				dirPrefixFindReplace: {
					find: '@dirPrefix@',
					replace: ngDirPrefix
				}

			},

			// App
			app: {
				
				// CSS (SCSS) files
				styles: {
					
					clean: [
						path.join(stagingAppStylesPath, '*.css')
					],
					
					entry: path.join(srcAppStylesPath, 'index.scss'),
					
					dest: stagingAppStylesPath,
					
					destName: 'main.css',
					
					watch: path.join(srcAppStylesPath, '**', '*.scss')
				
				},
				
				// Angular
				angular: {
					
					clean: [
						path.join(srcAppConfigPath, 'module', '*.js'),
						path.join(stagingAppScriptsPath, '*.js')
					],
					
					config: {
						src: path.join(srcAppConfigPath, 'module', 'config.json'),
						dest: path.join(srcAppConfigPath, 'module'),
						destName: 'config.module.js'
					},
					
					src: [
						path.join(srcAppPath, 'app.js'),
						path.join(srcAppPath, '**', '*.{module,component,directive,controller,service,config,states,run}.js'),
						'!' + path.join(srcAppPath, 'assets', '*.*'),
						'!' + path.join(srcAppPath, 'views', '*.*')
					],
					
					appName: ngAppName,
					
					appNameFindReplace: {
						find: '@appName@',
						replace: ngAppName
					},
					
					dirPrefixFindReplace: {
						find: '@dirPrefix@',
						replace: ngDirPrefix
					},
					
					dest: stagingAppScriptsPath,
					
					destName: 'main.js',

					watch: [
						path.join(srcAppConfigPath, 'module', 'config.json'),
						path.join(srcAppPath, 'app.js'),
						path.join(srcAppPath, '**', '*.{module,component,directive,controller,service,config,states,run}.js'),
						'!' + path.join(srcAppConfigPath, 'module', '*.js'),
						'!' + path.join(srcAppPath, 'assets', '*.*'),
						'!' + path.join(srcAppPath, 'views', '*.*')
					]
					
				},
				
				// Views (handlebars)
				views: {
					
					clean: [
						path.join(stagingViewsPath, '**', viewsAppPrefix + '-*.hbs')
					],

					copy: {
						
						// Views
						views: {
							src: path.join(srcAppViewsPath, '*.view.hbs'),
							dest: stagingViewsPath
						},
						
						// Views > layouts
						layouts: {
							src: path.join(srcAppLayoutsPath, '*.layout.hbs'),
							dest: stagingLayoutsPath
						},
						
						// Views > partials
						partials: {
							src: path.join(srcAppComponentsPath, '**', '*.partial.hbs'),
							dest: stagingPartialsPath
						}
						
					},

					watch: [
						path.join(srcAppViewsPath, '**', '*.hbs'),
						path.join(srcAppComponentsPath, '**', '*.partial.hbs')
					]
				
				},
				
				// Find & replace - Angular & views
				dirPrefixFindReplace: {
					find: '@dirPrefix@',
					replace: ngDirPrefix
				}
				
			},

			// Server
			server: {
			
				clean: [
					path.join(stagingPath, '**', '*'),
					'!' + stagingPath,
					'!' + stagingPublicPath,
					'!' + path.join(stagingPublicPath, '**', '*'),
					'!' + stagingViewsPath,
					'!' + path.join(stagingViewsPath, '**', '*')
				],
				
				src: [
					path.join(srcPath, '**', '*'),
					'!' + srcPublicPath,
					'!' + path.join(srcPublicPath, '**', '*')
				],

				base: srcPath,

				dest: stagingPath,
				
				watch: [
					path.join(srcPath, '**', '*'),
					'!' + srcPublicPath,
					'!' + path.join(srcPublicPath, '**', '*')
				]

			}
			
		},

		// Filenames
		minSuffix: '.min',
		viewsSitePrefix: viewsSitePrefix,
		viewsAppPrefix: viewsAppPrefix,
		
		// Autoprefixer
		autoprefixerOptions: {
			remove: false
		},
		
		// Clean CSS
		cleanCssOptions: {
			compatibility: 'ie8',
			keepSpecialComments: 0
		},
		
		// Nodemon
		nodemon: {
			script: path.join('staging', 'server.js'),
			watch: [path.join('staging', 'server.js')]
		},
		
		// BrowserSync
		browserSync: {
			proxy: 'http://localhost:3000',
			proxyPort: 4000,
			browsers: ['chrome'],
			reloadDelay: 500
		},
		
		// Default environment settings - override with CLI flags described in './gulpfile.js'
		env: {
			production: false,
			debug: false
		}

	};

};