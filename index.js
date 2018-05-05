#!/usr/bin/env node
const path = require('path');
const rl = require('readline');
const cp = require('child_process');
const program = require('commander');
const fs = require("fs");
const chalk = require('chalk');
const copyfileSync = require('./util/copyfileSync');



// 带颜色的命令行输出
const ColorCommand = require('color-command');
const cmder = new ColorCommand();

const CWD = process.cwd();
/**
 * 差命令容错没有做
 * 先按全部正确来做
 */

// 命令注册
program
    .version('0.0.1')
    .usage('mario-bin [options]')
    .command('create-app <dir>')
    .action((dir, cmd) => {
        try {
            fs.mkdirSync(dir);
            const temDir = path.resolve(__dirname, 'tmp', 'mario-app');
            const distDir = path.resolve(CWD, dir);
            copyfileSync(temDir, distDir);
            cmder.info("创建'mario-app'成功");
        } catch (e) {
            cmder.error('ERROR! ' + e.message);
        }
    });

program.parse(process.argv);

// 结束
const cleanup = () => {
    cmder.log('Cleaning up.');
};
// 退出
const handleExit = () => {
    cleanup();
    cmder.log('Exiting without error.');
    process.exit();
};
// 错误监控
const handleError = e => {
    cmder.error('ERROR! An error was encountered while executing\n');
    console.error(e);
    cleanup();
    cmder.log('Exiting with error.');
    process.exit(1);
};

process.on('SIGINT', handleExit);
process.on('uncaughtException', handleError);