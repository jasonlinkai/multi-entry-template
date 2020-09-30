const chalk = require('chalk');
const { VUE_APP_TEMPLATE_TYPE, VUE_APP_TEMPLATE_NUMBER, VUE_APP_USERCENTRE_TEMPLATE_NUMBER } = process.env;

const TEMPLATE = `${VUE_APP_TEMPLATE_TYPE}${VUE_APP_TEMPLATE_NUMBER}`;
const USETCENTRE_TERMPLATE_NUMBER = VUE_APP_USERCENTRE_TEMPLATE_NUMBER;
const VIEWS_TEMPLATE_PATH = `@/views/${TEMPLATE}`;
const VIEWS_USERCENTRE_PATH = `@/views/UserCentre${USETCENTRE_TERMPLATE_NUMBER}`;

console.log(chalk.green('[TEMPLATE]:'), TEMPLATE);
console.log(chalk.green('[USETCENTRE_TERMPLATE_NUMBER]:'), USETCENTRE_TERMPLATE_NUMBER);
console.log(chalk.green('[VIEWS_TEMPLATE_PATH]:'), VIEWS_TEMPLATE_PATH);
console.log(chalk.green('[VIEWS_USERCENTRE_PATH]:'), VIEWS_USERCENTRE_PATH);

module.exports = {
  configureWebpack: config => {
    process.env.NODE_ENV === 'production' && (config.devtool = false);
    config.resolve.alias = Object.assign(config.resolve.alias, {
      '@VIEWS/TEMPLATE': VIEWS_TEMPLATE_PATH,
      '@VIEWS/USERCENTRE': VIEWS_USERCENTRE_PATH,
    });
  },
};
