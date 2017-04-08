'use strict';

var Generator = require('yeoman-generator');

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
            choices: ['Bootstrap','Foundation', 'None']
        },
		{
			type: 'confirm',
            name: 'vue',
            message: 'Do you use Vue?',
            default: false
		}
        ]).then((answers) => {
            this.log('Project Name', answers.name);
            this.log('CSS Framework', answers.cssFramework);
            this.log('Vue', answers.vue);
        });
    }
};
