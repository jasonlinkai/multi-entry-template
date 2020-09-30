const argv = require('minimist')(process.argv.slice(2));
const prompts = require('prompts');
const chalk = require('chalk');
const { spawn } = require('child_process');

const questions = [
  {
    name: 'VUE_APP_PLAT_ID',
    type: 'text',
    message: '请输入站点ID ex: 6003',
    validate: val => /^\d{4}$/.test(val),
    initial: '6003',
  },
  {
    name: 'VUE_APP_TEMPLATE_TYPE',
    type: 'text',
    message: '输入模板类型 ex: Lottery、Sports、Complex',
    validate: val => /^(Lottery|Sports|Complex)$/.test(val),
    initial: 'Lottery',
  },
  {
    name: 'VUE_APP_TEMPLATE_NUMBER',
    type: 'text',
    message: '输入模板编号 ex: 001、002',
    validate: val => /^\d{3}$/.test(val),
    initial: '001',
  },
  {
    type: 'text',
    name: 'VUE_APP_USERCENTRE_TEMPLATE_NUMBER',
    message: '输入个人中心模板编号 ex: 001、002',
    validate: val => /^\d{3}$/.test(val),
    initial: '001',
  },
];

(async () => {
  const result = await prompts(questions);
  Object.keys(result).forEach(key => {
    console.log(chalk.green(`[${key}]:`), result[key]);
  });
  const command = argv.c || 'serve';
  const env = {
    ...result,
    PATH: process.env.PATH,
  };

  const ls = spawn(`vue-cli-service`, [command, '--color'], { env });
  ls.stdout.on('data', data => {
    console.log(`${data}`);
  });
  // ls.stderr.on('data', data => {
  //   console.log(`${data}`);
  // });
  ls.on('close', code => {
    console.log(chalk.red('[ERROR CODE]:'), code);
  });
})();
