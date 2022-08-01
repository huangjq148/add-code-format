/* eslint-disable import/no-extraneous-dependencies */
/*
 * @Author: zhaojiongyang
 * @Date: 2021-06-08 10:18:34
 * @Last Modified by: zhaojiongyang
 * @Last Modified time: 2021-06-08 13:41:26
 */

const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();
const config = require('./.cz-config.js');
const { validateCommitMsg } = require('./utils');

try {
    validateCommitMsg(msg, config);
} catch (error) {
    console.error("error", error);
    process.exit(1);
}