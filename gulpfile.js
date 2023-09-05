/**
 * 
 * Requirement 
 * $npm install --save-dev ...
 *  - gulp gulp-postcss 
 *  - gulp-sass 
 *  - postcss gulp-postcss 
 *  - autoprefixer 
 *  - cssnano  
 *  - gulp-sourcemaps  
 *  - browser-sync 
 *  - gulp-environments     
 *  - gulp-uglify
 *  - panini
 *  - fs-extra
 *  - gulp-html 
 * 
 *    This is primary uses for bootstrap design for front-end
 * 
 *  - bootstrap
 * 
 *    Optional
 * 
 *  - jquery 
 *  - popper.js
 *  - tether
 *  - bulma
 *  - @fortawesome/fontawesome-free    
 *  
 * 
 *  - gulp-sass no longer contain sass install $npm install -g sass and $npm --save-dev sass
 */
// gulp
const gulp = require("gulp");
// gulp-sass require sass
const sass = require("gulp-sass")(require('sass'));
// gulp-postcss
const postcss = require("gulp-postcss");
//autoprefixer
const autoprefixer = require("autoprefixer");
//cssnano
const cssnano = require("cssnano");
// gulp-sourcemaps
const sourcemaps = require("gulp-sourcemaps");
//browser-sync
const browserSync = require("browser-sync").create();
// gulp-enviroments
const environments = require('gulp-environments');
// gulp-uglify use in js
const uglify = require('gulp-uglify');
// panini
const panini = require('panini');
//clean
const fse = require('fs-extra');
//gulp-html
const validator = require('gulp-html');



// main directory
var main = "./";
/*
enviroments
*/

var development = environments.development;
var production = environments.production;

/* JS paths*/
var jspaths = {
    bootstrap: "node_modules/bootstrap/dist/js/bootstrap.min.js",
    popper : "node_modules/@popperjs/core/dist/umd/popper.min.js",
    tether: "node_modules/tether/dist/js/tether.min.js",
    jquery: "node_modules/jquery/dist/jquery.min.js",
    fontawesome: "node_modules/@fortawesome/fontawesome-free/js/all.min.js",
    prism: "src/js/prism.js",
    main: "src/js",
    mainDesc: "build/js"
};

/* JS Destination */
var jsdes = "build/js/inc";

// gulp information
gulp.task('hello', function() {
  console.log('========================');
  console.log('Gulp File RR Version v1.0.0');
  console.log('========================');
});


gulp.task('clean', function () {
  return fse.remove('./build');

});


/*
Setting enviroments (has an issue)
*/

gulp.task('set-dev', development.task);
gulp.task('set-prod', production.task);


/*
JS compile user define
*/
gulp.task ( 'js-compile', function (){
  return gulp
    .src(jspaths.main + '/**/*.js')
    .pipe(production(uglify()))
    .pipe(gulp.dest(jspaths.mainDesc))
    .pipe(browserSync.stream());
});

/* 
compile js jquery
*/

gulp.task ('compile-jquery', function () {
  return gulp
    // js paths source
    .src(jspaths.jquery)
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(jsdes))
    .pipe(browserSync.stream());
});


/* 
compile js popper
*/

gulp.task ('compile-popper', function () {
  return gulp
    // js paths source
    .src(jspaths.popper)
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(jsdes))
    .pipe(browserSync.stream());
});

/* 
compile js tether
*/

gulp.task ('compile-tether', function () {
  return gulp
    // js paths source
    .src(jspaths.tether)
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(jsdes))
    .pipe(browserSync.stream());
});

/* 
compile js bootstrap
*/

gulp.task ('compile-bootstrapjs', function () {
  return gulp
    // js paths source
    .src(jspaths.bootstrap)
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(jsdes))
    .pipe(browserSync.stream());
});
/*
compile bootstrap-icon
*/



/* 
compile js prism
*/

gulp.task ('compile-prismjs', function () {
  return gulp
    // js paths source
    .src(jspaths.prism)
    // write to destination
    //uglify
    .pipe(production(uglify()))
    .pipe(gulp.dest(jsdes))
    .pipe(browserSync.stream());
});


/* Compile Bootstrap for Optinal Javascript 

Removed Jquery - Bootstrap 5 only uses Popper.js, then Bootstrap JS 

*/

gulp.task ('bootstrap-optionaljs', gulp.parallel('compile-popper','compile-bootstrapjs'));

/*
JS to complile
*/
gulp.task ('compile-js', function () {
  return gulp
    // js paths source
    .src([jspaths.bootstrap])
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(jsdes))
    .pipe(browserSync.stream());
});

/*
  Font Awesome JS
*/

gulp.task ('addon-fontawesome', function () {
  return gulp
    // js paths source
    .src(jspaths.fontawesome)
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(jsdes))
    .pipe(browserSync.stream());
});

// webfont URL 
var webfont = "node_modules/@fortawesome/fontawesome-free/webfonts/**/*";

/* 
 Webfont for Fontawesome
*/
gulp.task ('addon-fontawesome-font', function () {
  return gulp
    // get the webfont
    .src([webfont])
    // need the webfont
    .pipe(gulp.dest("build/webfonts"));
    
});

// add both css, js and webfont

gulp.task('addon-fontawesome-all', gulp.parallel('addon-fontawesome-font','addon-fontawesome'));

/* bootstrap  and bulma path*/
var paths = {
    bootstrap: {
      src: "node_modules/bootstrap/scss/bootstrap.scss",
      dest: "build/css/inc"
    },
    bootstrapIcon: {
      src: "node_modules/bootstrap-icons/font/bootstrap-icons.scss",
      dest: "build/css/inc"
    },
    styles: {
      src: "src/scss/**/*.scss",
      dest: "build/css/"
    },
    bulma: {
      src: "node_modules/bulma/bulma.sass",
      dest: "build/css/inc"
    },
    prism: {
      src: "src/css/prism.css",
      dest: "build/css/inc",
    }
};
/* Bootstrap */

/*
Bootstrap to complie
*/
gulp.task('compile-bootstrap', function (){
  return gulp
    .src(paths.bootstrap.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    .pipe(gulp.dest(paths.bootstrap.dest))
    .pipe(browserSync.stream());
});

/*
Bootstrap to complie
*/
gulp.task('compile-bootstrapIcon', function (){
  return gulp
    .src(paths.bootstrapIcon.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    .pipe(gulp.dest(paths.bootstrap.dest))
    .pipe(browserSync.stream());
});


/*
Prism to complie
*/
gulp.task('compile-prismcss', function (){
  return gulp
    .src(paths.prism.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    .pipe(gulp.dest(paths.prism.dest))
    .pipe(browserSync.stream());
});

// Compile prism 
gulp.task('addon-prism', gulp.parallel('compile-prismcss','compile-prismjs'));

/* Bulma */

/*
Bulma to compile
*/

gulp.task('compile-bulma', function (){
  return gulp
    .src(paths.bulma.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    .pipe(gulp.dest(paths.bulma.dest))
    .pipe(browserSync.stream());
});

/*
Sass to compile
*/
gulp.task('compile-scss', function () {
  return gulp
    // sass location
    .src(paths.styles.src)
    //sourcemaps
    .pipe(development(sourcemaps.init()))
    //sass error log
    .pipe(sass().on('error', sass.logError))
    // Use postcss with autoprefixer and compress the compiled file using cssnano
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    // Now add/write the sourcemaps
    .pipe(development(sourcemaps.write()))
    // sass destination
    .pipe(gulp.dest(paths.styles.dest))
    // Add browsersync stream pipe after compilation
    .pipe(browserSync.stream());
});

/* panini links */
var pages = {
    src : "./",
    desc: "build",
    devPanini: './html/**/*',
};

/*
panini tasks
*/
gulp.task('compile-html', function () {
  var url = 'html/',
    root = pages.src + url;

  return gulp
    .src(pages.src + url + 'pages/' + '**/*.html')
    .pipe(panini({
      root: root + 'pages/',
      layouts: root + 'layouts/',
      partials: root + 'partials/',
      helpers: root + 'helpers/',
      data: root + 'data/'
    }))
    .pipe(gulp.dest(pages.desc))
    // Add browsersync stream pipe after compilation
    .pipe(browserSync.stream());
});

/* Watch */
// A simple task to reload the page
function reload() {
    console.log('Refresh page');
    browserSync.reload();
};

// panini reset
function resetPanini(done) {
  console.log('Refresh panini');
  panini.refresh();
  done();
}

/*
 Images
*/

// image paths
var img = {
  src : "src/images/**/*",
  desc: "build/img"
}

// tranfer images
gulp.task('compile-img', function(){
  return gulp.src(img.src)
  .pipe(gulp.dest(img.desc));
});

/*
Minify content
*/

/*
Html Validator (Figuring out how this works)
*/

gulp.task('validate' , function () {
  return gulp.src('/build/**/*')
    .pipe(validator());
});


// Add browsersync initialization at the start of the watch task
gulp.task('watch', function () {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./build"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    // invoke gulp complile scss
    gulp.watch(paths.styles.src).on('change',gulp.series('compile-scss',reload,resetPanini));
    // panini
    gulp.watch('./html/{pages,layouts,partials,helpers,data}/**/*.html').on('change',gulp.series('compile-html',resetPanini, reload));

    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    // js Watch
    gulp.watch('src/js/**/*.js').on('change', gulp.series('js-compile',reload,resetPanini));
    //watch images
    gulp.watch('src/images/**/*').on('change', gulp.series('compile-img'));
});
// start the process without any dependencies
gulp.task('watch-default', gulp.parallel('hello','js-compile', 'compile-scss','compile-html','compile-img','watch'));

// start the process default
gulp.task('default', gulp.parallel('hello','js-compile','bootstrap-optionaljs','compile-bootstrap','compile-scss','compile-html','compile-img','watch'));

/* Compile without the bootstrap, to use bootstrap in includes under scss this will only have the style containing all */
gulp.task('compile-nobs', gulp.parallel('hello','js-compile','bootstrap-optionaljs', 'compile-scss','compile-html','compile-img','watch'));

/* Compile Bs no additional JS */

gulp.task('compile-bs-min', gulp.parallel('hello', 'compile-scss', 'compile-bootstrap', 'compile-bootstrapjs', 'compile-popper', 'compile-scss','compile-html','compile-img','watch'));

/* using bulma on inc */
gulp.task('watch-bulma-min', gulp.parallel('hello','js-compile','compile-bulma', 'compile-scss','compile-html','compile-img','watch'));

/* bulma on style , to use bulma in includes under scss  */
gulp.task('watch-bulma', gulp.parallel('hello','js-compile', 'compile-scss','compile-html','compile-img','watch'));

/* Vue.js */

/* Distribution Build ** update 3.6.20 */


/* Gulp Task build SCSS to Drupal Theme page */

/*
  Document Paths
*/

/* bootstrap  and bulma path*/
var path_drupal = {
  // main folder
  main: {
    dest: "../" 
  },

  css: {
    dest: "../css"
  },

  js: {
    dest: "../js"
  },

  images: {
    dest: "../images"
  },

};

/*
Drupal Sass to compile
*/

gulp.task('drupal-compile-scss', function () {
  return gulp
    // sass location
    .src(paths.styles.src)
    //sourcemaps
    .pipe(development(sourcemaps.init()))
    //sass error log
    .pipe(sass().on('error', sass.logError))
    // Use postcss with autoprefixer and compress the compiled file using cssnano
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    // Now add/write the sourcemaps
    .pipe(development(sourcemaps.write()))
    // sass destination
    .pipe(gulp.dest(path_drupal.css.dest))
    // Add browsersync stream pipe after compilation
    .pipe(browserSync.stream());
});

/* CSS */

/*
Bootstrap to compile
*/
gulp.task('drupal-compile-bootstrap', function (){
  return gulp
    .src(paths.bootstrap.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    .pipe(gulp.dest(path_drupal.css.dest));
    
});

/*
Prism to compile
*/
gulp.task('drupal-compile-prismcss', function (){
  return gulp
    .src(paths.prism.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    .pipe(gulp.dest(path_drupal.css.dest));
    
});

/*
Bulma to compile
*/

gulp.task('drupal-compile-bulma', function (){
  return gulp
    .src(paths.bulma.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    .pipe(gulp.dest(path_drupal.css.dest));
});


/* JS */

/*
JS compile user define
*/
gulp.task ('drupal-js-compile', function (){
  return gulp
    .src(jspaths.main + '/**/*.js')
    .pipe(production(uglify()))
    .pipe(gulp.dest(path_drupal.js.dest))
});


gulp.task ('drupal-compile-js', function () {
  return gulp
    // js paths source
    .src([jspaths.bootstrap, jspaths.popper, jspaths.tether, jspaths.jquery])
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(path_drupal.js.dest));
});


// prism
gulp.task ('drupal-compile-prismjs', function () {
  return gulp
    // js paths source
    .src(jspaths.prism)
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(path_drupal.js.dest));
    
});

gulp.task ('drupal-compile-fontawesomejs', function () {
  return gulp
    // js paths source
    .src(jspaths.fontawesome)
    //uglify
    .pipe(production(uglify()))
    // write to destination
    .pipe(gulp.dest(path_drupal.js.dest));
    
});


/* Web Font */

/* 
 Webfont for Fontawesome
*/

gulp.task ('drupal-fontawesome-webfont', function () {
  return gulp
    // webfont source   
    .src([webfont])
    // webfont dis
    .pipe(gulp.dest(path_drupal.main.dest));
    
});
// combine prism 
gulp.task('drupal-prism-compile', gulp.parallel('drupal-compile-prismcss','drupal-compile-prismjs'));

// combine fontawesome
gulp.task('drupal-fontawesome-compile', gulp.parallel('drupal-fontawesome-webfont','drupal-compile-fontawesomejs'));

/* Images */

// tranfer images
gulp.task('drupal-compile-img', function(){
  return gulp.src(img.src)
  .pipe(gulp.dest(path_drupal.images.dest));
});

// build to drupal
gulp.task('drupal-build', gulp.parallel('drupal-js-compile','drupal-compile-scss','drupal-compile-js','drupal-compile-img'));
