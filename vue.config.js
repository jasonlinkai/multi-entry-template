const { VUE_APP_TEMPLATE_TYPE, VUE_APP_TEMPLATE_NUMBER } = process.env;
const TEMPLATE = VUE_APP_TEMPLATE_TYPE + VUE_APP_TEMPLATE_NUMBER;
console.log('[TEMPLATE]', TEMPLATE);

module.exports = {
  configureWebpack: config => {
    config.entry.app[0] = `./src/entry/${TEMPLATE}.js`;
  },
};
