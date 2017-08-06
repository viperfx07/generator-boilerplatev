var helpers = require('yeoman-test');
var yeoman = require('yeoman-generator');
var assert = require('chai').assert;
var path = require('path');
var exec = require('child_process').exec;
var gulp = require('gulp');

describe('generator-boilerplatev:app', function(){
    let hasError = 0;
    let tmpDir;
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
                    tmpDir = dir;
                    
                })
                .on('end', function(){
                    console.log('yarn --production --modules-directory ' + tmpDir);
                    exec('yarn --production --modules-directory ' + tmpDir, function(error, stdout, stderr){
                        if(!!error){
                            console.log(error);
                            hasError = 1;
                            done(error);
                        } else {
                            console.log('yarn done');
                        }
                    })
                    .on('exit', function(){
                        exec('gulp --production=dev --gulpfile ' + path.join(tmpDir, 'gulpfile.babel.js'), function(error, stdout, stderr){
                            if(!!error){
                                console.log(error);
                                hasError = 1;
                                done(error);
                            } else {
                                console.log('gulp done');
                            }
                        })
                        .on('close', function(){
                            console.log('close gullp')
                        })
                        .on('error', function(){
                            console.log('error')
                        })
                        .on('exit', function(){
                            console.log('exit gulp');
                            done();
                        })
                    });
                });
        })
        it('generates and tries to build for production', function(done){
            assert.equal(hasError, 0);
        });
    })
});