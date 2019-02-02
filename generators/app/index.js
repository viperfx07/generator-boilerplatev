'use strict';

var Generator = require('yeoman-generator');
var underscore = require('underscore.string');
var path = require('path');
var updateNotifier = require('update-notifier');
var pkg = require('../../package.json');
require('colors');


module.exports = class extends Generator {
	initializing() {
		updateNotifier({
			pkg: pkg,
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
			},
			{
				type: 'list',
				name: 'jsFramework',
				message: 'Framework',
				choices: ['Vue', 'React'],
				default: 'Vue'
			},
			{
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
			}, {
				type: 'confirm',
				name: 'skipInstall',
				message: 'Do you want to skip yarn install?',
				default: false
			}
		]).then((answers) => {
			this.projectName = answers.name;
			this.baseline = answers.baseline;
			this.skipInstall = answers.skipInstall;
			this.dirStructure = answers.dirStructure;
			this.jsFramework = answers.jsFramework;
		});
	}
	writing() {
		var dirByStructures = {
			"Kentico": {
				assets: '/www_shared/assets',
				otherWWW: '../'
			},
			"Umbraco": {
				assets: '/static',
				otherWWW: '../XXX.Web'
			},
			"None": {
				assets: '/assets',
				otherWWW: '',
			}
		}

		var config = {
			projectName: this.projectName,
			skipInstall: this.skipInstall,
			jsFramework: this.jsFramework,
			assetsDir: dirByStructures[this.dirStructure].assets,
			otherWWW: dirByStructures[this.dirStructure].otherWWW,
			baseline: this.baseline,
			_: underscore,
			pkg: pkg,
		};

		// Files
		const copyTplDirs = [
			`${this.jsFramework}/`,
			'gulp/*',
			'src/*',
			'src/_css/',
			'src/_data/',
			'src/_fonts/',
			'src/_img/',
			'src/_js/',
			'src/_layouts/',
			'src/_mixins/',
			'src/_partials/',
		];

		const copyDirs = [
			'src/_icons/',
		]

		copyTplDirs.forEach(dir => {
			this.fs.copyTpl(this.templatePath(dir), this.destinationPath(dir.replace(`${this.jsFramework}/`, '').replace('*', '')), config);
		});

		copyDirs.forEach(dir => {
			this.fs.copy(this.templatePath(dir), this.destinationPath(dir.replace(`${this.jsFramework}/`, '').replace('*', '')));
		})

		// Copy all the files in the root
		this.fs.copyTpl(this.templatePath('*.*'), this.destinationRoot(), config);
		this.fs.copy(this.templatePath('.*'), this.destinationRoot());
	}
	install() {
		if (!this.skipInstall) {
			this.yarnInstall();
		}
	}
};