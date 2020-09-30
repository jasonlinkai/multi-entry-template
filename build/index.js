const argv = require('minimist')(process.argv.slice(2));
const { spawn } = require('child_process');

const plat = argv.p || 'demo';
const env = {
  ...Object.create(process.env),
  NODE_ENV: 'production',
  PATH: process.env.PATH,
};

const ls = spawn('vue-cli-service', ['build', '--mode', plat, '--color'], { env });
ls.stdout.on('data', data => {
  console.log(`${data}`);
});
ls.stderr.on('data', err => {
  console.error(`${err}`);
});
ls.on('close', code => {
  console.log(`error code: ${code}`);
});
