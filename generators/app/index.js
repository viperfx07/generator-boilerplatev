'use strict';

var Generator = require('yeoman-generator');
var underscore = require('underscore.string');
var path = require('path');
var updateNotifier = require('update-notifier');
var pkg = require('../../package.json');
var templatePackage = require('./templates/package.json');
require('colors');


module.exports = class extends Generator {
    initializing(){
        updateNotifier({
            pkg:pkg,
            updateCheckInterval: 0
        }).notify();
    }
    prompting() {
    	this.log('----------------------------------------------------'.green);
    	this.log('    --------------------------------------------  '.cyan);
    	this.log('                                                ');
    	this.log('                 BOILERPLATE V         '.yellow);
    	this.log('                 v' + pkg.version.yellow);
    	this.log('                                                ');
    	this.log('    --------------------------------------------  '.cyan);
    	this.log('----------------------------------------------------'.green);


        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Project Name',
            default: this.appname // Default to current folder name
        },{
            type: 'list',
            name: 'dirStructure',
            message: 'Directory structure standard',
            choices: ['Kentico', 'Umbraco', 'None'],
            default: 'Kentico'
        },
        {
            type: 'input',
            name: 'baseline',
            message: 'Baseline (in px size)',
            default: '6' // Default to current folder name
        },{
            type: 'confirm',
            name: 'skipInstall',
            message: 'Do you want to skip yarn install?',
            default: false
        }
        ]).then((answers) => {
            this.projectName =  answers.name;
            this.baseline =  answers.baseline;
            this.skipInstall = answers.skipInstall;
            this.dirStructure = answers.dirStructure;
        });
    }
    writing() {
        var dirByStructures = {
            "Kentico":{
                assets: '/www_shared/assets',
                otherWWW: '../'
            },
            "Umbraco":{
                assets: '/static',
                otherWWW: '../XXX.Web'
            },
            "None":{
                assets: '/assets',
                otherWWW: '',
            }
        }

        var config = {
            projectName: this.projectName,
            skipInstall: this.skipInstall,
            assetsDir: dirByStructures[this.dirStructure].assets,
            otherWWW: dirByStructures[this.dirStructure].otherWWW,
            _ : underscore,
            pkg: pkg,
            templatePackage: templatePackage
        };

        var src = this.templatePath();
        var dest = this.destinationPath();

        // Files
        this.fs.copyTpl(src, dest, config);

        this.fs.copy(this.templatePath('.*'), this.destinationRoot());
    }
    install(){
        if(!this.skipInstall){
            this.yarnInstall();
        }
    }
};