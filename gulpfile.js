var gulp         =    require('gulp'),
    sass         =    require('gulp-sass'),
    autoprefixer =    require('gulp-autoprefixer'),
    sourcemaps   =    require('gulp-sourcemaps'),
    browserSync  =    require('browser-sync'),
    useref       =    require('gulp-useref'),
    uglify       =    require('gulp-uglify'),
    gulpIf       =    require('gulp-if'),
    cssnano      =    require('gulp-cssnano'),
    imagemin     =    require('gulp-imagemin'),
    cache        =    require('gulp-cache'),
    notify       =    require('gulp-notify'),
    bower        =    require('gulp-bower'),
    del          =    require('del'),
    include      =    require('gulp-html-tag-include'),
    runSequence  =    require('run-sequence');

var config = {
  sassPath: './app/scss',
  bowerDir: './bower_components'
}

var bowerJSPaths = [
    config.bowerDir+'/jquery/dist/jquery.slim.min.js',
    config.bowerDir+'/material-design-lite/material.min.js',
    config.bowerDir+'/material-design-lite/material.min.js.map'
  ];

var bowerCSSPaths = [
    config.bowerDir+'/animate.css/animate.min.css',
    config.bowerDir+'/fontawesome/css/font-awesome.min.css',
    config.bowerDir+'/material-design-lite/material.min.css',
    config.bowerDir+'/material-design-lite/material.min.css.map'
  ];

var bowerFontPaths = [
    config.bowerDir+'/fontawesome/fonts/**/*'
  ];

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass({
      includePaths: [
        //config.bowerDir+"/fontawesome/scss", // if you want to use the fontawesome SASS sheets
        config.sassPath
      ]
    })) // Passes it through a gulp-sass
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})


// HTML include
// ------------
//
// The way this works is to make a 'dev' folder at the root of
// project. The base file is 'index.html' and then the syntax to
// include other HTML sections is:
// <include src="filename.html></include>
gulp.task('fileinclude', function() {
  return gulp.src('./dev/index.html')
    .pipe(include())
    .pipe(gulp.dest('./app/'));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// adding bower components
gulp.task('bowerJSCopy', function(){
  return gulp.src(bowerJSPaths)
        .pipe(gulp.dest('./app/js'))
})

gulp.task('bowerCSSCopy', function() {
  return gulp.src(bowerCSSPaths)
    .pipe(gulp.dest('./app/css'))
})

gulp.task('bowerFonts', function() {
  return gulp.src(bowerFontPaths)
    .pipe(gulp.dest('./app/fonts'))
})

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Config Setup
// ------------

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('config.bowerDir'))
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['bowerJSCopy','bowerCSSCopy','bowerFonts','sass', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})
