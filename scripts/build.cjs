/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// build frontend

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const build = async () => {
  // pnpm build
  const build = exec('pnpm build', { cwd: path.resolve(__dirname, '../client') });
  build.stdout.pipe(process.stdout);
  build.stderr.pipe(process.stderr);
  await new Promise((resolve) => build.on('exit', resolve));
  console.log('frontend build done');

  // pnpm build for backend
  const buildBackend = exec('pnpm build', { cwd: path.resolve(__dirname, '../server') });
  buildBackend.stdout.pipe(process.stdout);
  buildBackend.stderr.pipe(process.stderr);
  await new Promise((resolve) => buildBackend.on('exit', resolve));
  console.log('backend build done');
};

const copy = async () => {
  // copy ../client/dist/** to ../server/dist/web/** (use fs)
  const srcDir = path.resolve(__dirname, '../client/dist');
  const destDir = path.resolve(__dirname, '../server/dist/web');
  try {
    fs.rmSync(destDir, { recursive: true });
  } catch (e) {}
  try {
    fs.mkdirSync(destDir, { recursive: true });
  } catch (e) {}
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('copy files done');
};

const main = async () => {
  console.log('start build');
  await build();
  console.log('start copy');
  await copy();

  // how to start ?
  // cd ./server/dist && node app.cjs
};

main();
