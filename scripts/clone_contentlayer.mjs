import { execa } from 'execa';
import fs from 'fs';
import path from 'path';
const contentGitUrl = 'https://github.com/xingBaGan/contentlayer_files';
export async function cloneRepo() {
  const timeout = 5 * 60 * 1000; // 5 minutes in milliseconds
  const end = Date.now() + timeout;
  let success = false;

  // Check if the repository already exists and delete it if it does
  const repoPath = path.join(process.cwd(), 'contentlayer_files');
  try {
    console.log('removing the existing contentlayer_files')
    fs.rmdirSync(repoPath, { recursive: true });
  } catch(e) {
    console.error('remove contentlayer_files failed')
  }

  const contentPath = path.join(process.cwd(), '.contentlayer');
  try {
    console.log('removing the existing .contentlayer')
    fs.rmdirSync(contentPath, { recursive: true });
  } catch(e) {
    console.error('remove .contentlayer failed')
  }

  while (Date.now() < end && !success) {
    try {
      console.log('start cloning content layer')
      await execa('git', ['clone', contentGitUrl], { cwd: process.cwd() });
      console.log('Repository cloned successfully.');
      success = true;
    } catch (error) {
      if (error.stderr.includes('is not an empty directory.')) {
        return;
      }
    
      console.error('Error cloning repository:', error.stderr, '\nand retrying...');
    }
  }

  if (!success) {
    console.error('Cloning operation timed out.');
  }
}

export async function renameRepo() {
  const oldPath = path.join(process.cwd(), '.contentlayer');
  const newPath = path.join(process.cwd(), 'contentlayer_files');
  // Rename cloned repo to .contentlayer
  setTimeout(() => {
    fs.renameSync(newPath, oldPath);
  }, 10000);
}

export async function updateContentLayerFiles() {
  await cloneRepo();
  await renameRepo();
}
