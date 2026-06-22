import fs from 'fs';
import path from 'path';

const srcVercel = '.vercel/output';
const srcNitro = '.output';
const dest = 'output';

console.log(`Checking build output...`);

if (fs.existsSync(srcVercel)) {
  console.log(`Copying build output from ${srcVercel} to ${dest}...`);
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(srcVercel, dest, { recursive: true });
  console.log(`Successfully copied ${srcVercel} to ${dest}.`);
} else if (fs.existsSync(srcNitro)) {
  console.log(`Copying build output from ${srcNitro} to ${dest}...`);
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(srcNitro, dest, { recursive: true });
  console.log(`Successfully copied ${srcNitro} to ${dest}.`);
} else if (fs.existsSync(dest) && fs.existsSync(path.join(dest, 'config.json'))) {
  console.log(`Build output already exists in ${dest} (generated directly by Nitro). Skipping copy.`);
} else {
  console.error(`Error: Neither ${srcVercel} nor ${srcNitro} nor a valid ${dest} directory was found!`);
  process.exit(1);
}
