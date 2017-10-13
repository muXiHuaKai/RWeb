var gulp = require('gulp');
var rev = require('gulp-rev');  //添加版本号，防止缓存
var revReplace = require('gulp-rev-replace');  //更新index里面的引用
var useref = require('gulp-useref'); //资源文件整合
var filter = require('gulp-filter'); //过滤器  筛选-  恢复（restore）
var uglify = require('gulp-uglify'); //压缩js代码
var csso = require('gulp-csso');     //压缩css代码

gulp.task('default',function(){
    var jsFilter = filter('**/*.js',{restore:!0});
    var cssFilter = filter('**/*.css',{restore:!0});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:!0});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});