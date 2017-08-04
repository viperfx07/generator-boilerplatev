var helpers = require('yeoman-test');
var path = require('path');
var exec = require('child_process').exec;
var gulp = require('gulp');

var fn = function(error, stdout, stderr){
    console.log(error);
    if(!!error) done(error);
};

describe('generator-boilerplatev:app', function(){
    
    it('generates and tries to build for production', function(done){
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
                exec('yarn --production', fn)
                    .on('exit', function(){
                        exec('gulp --production=dev', fn)
                        .on('exit', function(){
                            done();
                        })
                    });
            })
    });
});