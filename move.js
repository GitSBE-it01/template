import { promises as fs } from 'fs';
import { join } from 'path';

async function copyFiles(srcDir, destDir) {
  try {
    // Read all files in the source directory
    const files = await fs.readdir(srcDir);

    // Ensure the destination directory exists
    await fs.mkdir(destDir, { recursive: true });

    // Copy each file
    for (const file of files) {
      const srcFile = join(srcDir, file);
      const destFile = join(destDir, file);

      // Overwrite the file if it exists
      await fs.copyFile(srcFile, destFile);
      console.log(`Copied ${srcFile} to ${destFile}`);
    }
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

const srcDir = './sourceFolder'; // Source folder path
const destDir = './destinationFolder'; // Destination folder path

copyFiles(srcDir, destDir);