'use strict';

var Generator = require('yeoman-generator');
var path = require('path');

module.exports = class extends Generator {
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Project Name',
            default: this.appname // Default to current folder name
        }, {
            type: 'list',
            name: 'cssFramework',
            message: 'What CSS Framework would you like to use?',
            choices: ['bootstrap', 'foundation', 'none']
        }, {
            type: 'confirm',
            name: 'vue',
            message: 'Do you use VueJs?',
            default: false
        }, {
            type: 'confirm',
            name: 'useNotif',
            message: 'Do you want notification for Gulp process?',
            default: true
        }, {
            type: 'confirm',
            name: 'skipInstall',
            message: 'Do you want to skip install?',
            default: true
        }
        ]).then((answers) => {
            this.projectName =  answers.name;
            this.cssFramework = answers.cssFramework;
            this.vue = answers.vue;
            this.useNotif = answers.useNotif;
            this.skipInstall = answers.skipInstall;

        });
    }
    writing() {
        var config = {
            projectName: this.projectName,
            cssFramework: this.cssFramework,
            vue: this.vue,
            useNotif: this.useNotif,
            skipInstall: this.skipInstall,
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