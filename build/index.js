const fs = require('fs');
const pathResolve = require('path').resolve;
const argv = require('minimist')(process.argv.slice(2));
const prompts = require('prompts');
const chalk = require('chalk');
const { spawn } = require('child_process');

const askPlat = async () => {
  const checkPlat = [
    {
      name: 'VUE_APP_PLAT_ID',
      type: 'text',
      message: '请输入站点ID ex: 6003',
      validate: val => /^\d{4}$/.test(val),
      initial: '6003',
    },
  ];
  return await prompts(checkPlat);
};

const askDetails = async () => {
  const checkDetails = [
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
  return await prompts(checkDetails);
};

const diliver = str => console.log(chalk.cyan(str));
const hint = str => console.log(chalk.magenta(str));

const run = answers => {
  diliver('<========== build/index.js ==========>');
  Object.keys(answers).forEach(key => {
    console.log(chalk.green(`[${key}]:`), answers[key]);
  });
  diliver('<========== build/index.js ==========>');

  const env = {
    ...answers,
    PATH: process.env.PATH,
  };
  const command = argv.c || 'serve';

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
};

const main = async () => {
  let answers = {};
  const { VUE_APP_PLAT_ID } = await askPlat();
  try {
    const settingPath = pathResolve(`./settings/${VUE_APP_PLAT_ID}.json`);
    const isSettingExist = fs.existsSync(settingPath);
    if (isSettingExist) {
      hint('Setting is finded!');
      const jsonStr = fs.readFileSync(settingPath);
      const jsonObj = JSON.parse(jsonStr);
      answers = {
        ...answers,
        ...jsonObj,
      };
    } else {
      hint('Setting is not finded, use propmts!');
      const details = await askDetails();
      answers = {
        ...answers,
        ...details,
      };
    }
  } catch (err) {
    console.error(err);
  }
  run(answers);
};

main();
