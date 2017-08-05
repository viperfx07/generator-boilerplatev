var helpers = require('yeoman-test');
var path = require('path');
var exec = require('child_process').exec;
var gulp = require('gulp');
var assert = yeoman.assert;

describe('generator-boilerplatev:app', function(){
    let hasError = 0;
    describe('standard build', function(){
        before(function(done){
            this.timeout(300000);
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    cssFramework: 'bootstrap',
                    vue: false,
                    useNotif: true,
                    skipInstall: false
                }) // Mock the prompt answers
                .inTmpDir(function(dir){
                    console.log(dir);
                    exec('yarn --production', function(error, stdout, stderr){
                        console.log(error);
                        if(!!error){
                            hasError = 1;
                            done(error);
                        }
                    })
                    .on('exit', function(){
                        exec('gulp --production=dev', function(error, stdout, stderr){
                            console.log(error);
                            if(!!error){
                                hasError = 1;
                                done(error);
                            }
                        })
                        .on('exit', function(){
                            done();
                        })
                    });
                })
        
        })
        it('generates and tries to build for production', function(done){
            assert(!!hasError);
        });
    })
});