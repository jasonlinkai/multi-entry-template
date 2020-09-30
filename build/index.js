const argv = require('minimist')(process.argv.slice(2));
const prompt = require('prompt');
const chalk = require('chalk');
const { spawn } = require('child_process');

const schema = {
  properties: {
    VUE_APP_PLAT_ID: {
      description: '请输入站点ID ex: 6003',
      pattern: /^(demo|[\d]{4})$/,
      message: '请重新输入，常为四位数字!',
      default: 'demo',
      requried: true,
    },
    VUE_APP_TEMPLATE_TYPE: {
      description: '输入模板类型 ex: Lottery、Sports、Complex',
      validator: /^(Lottery|Sports|Complex)$/,
      message: '请重新输入，Lottery、Sports、Complex其一!',
      default: 'Lottery',
      requried: true,
    },
    VUE_APP_TEMPLATE_NUMBER: {
      description: '输入模板编号 ex: 001、002',
      validator: /^[\d]{3}$/,
      message: '请重新输入，001、002⋯等!',
      default: '001',
      requried: true,
    },
  },
};

prompt.start();

prompt.get(schema, function (err, result) {
  if (err) {
    process.exit(1);
  } else {
    const { VUE_APP_PLAT_ID, VUE_APP_TEMPLATE_TYPE, VUE_APP_TEMPLATE_NUMBER } = result;

    console.log(chalk.green('[PLAT_ID]:'), VUE_APP_PLAT_ID);
    console.log(chalk.green('[TEMPLATE_TYPE]:'), VUE_APP_TEMPLATE_TYPE);
    console.log(chalk.green('[TEMPLATE_NUMBER]:'), VUE_APP_TEMPLATE_NUMBER);

    const command = argv.c || 'serve';
    const env = {
      ...result,
      PATH: process.env.PATH,
    };

    const ls = spawn(`vue-cli-service`, [command, '--color'], { env });
    ls.stdout.on('data', data => {
      console.log(`${data}`);
    });
    ls.on('close', code => {
      console.log(chalk.red('[ERROR CODE]:'), code);
    });
  }
});
