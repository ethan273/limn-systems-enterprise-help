#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Recursively clean _meta.json files by removing entries for non-existent pages
 */

function cleanMetaFile(metaPath, dirPath) {
  const metaContent = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const cleanedMeta = {};

  for (const [key, value] of Object.entries(metaContent)) {
    // Check if the page exists as either:
    // 1. A file: pages/section/key.mdx
    // 2. A folder with index: pages/section/key/index.mdx
    const filePath = path.join(dirPath, `${key}.mdx`);
    const folderPath = path.join(dirPath, key, 'index.mdx');

    if (fs.existsSync(filePath) || fs.existsSync(folderPath)) {
      cleanedMeta[key] = value;
      console.log(`✅ Keeping: ${key}`);
    } else {
      console.log(`❌ Removing: ${key} (no content found)`);
    }
  }

  return cleanedMeta;
}

function processDirectory(dir) {
  const metaPath = path.join(dir, '_meta.json');

  if (fs.existsSync(metaPath)) {
    console.log(`\n📝 Processing: ${metaPath}`);
    const cleanedMeta = cleanMetaFile(metaPath, dir);
    fs.writeFileSync(metaPath, JSON.stringify(cleanedMeta, null, 2) + '\n');
    console.log(`✨ Updated: ${metaPath}`);
  }

  // Recursively process subdirectories
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      processDirectory(path.join(dir, entry.name));
    }
  }
}

// Start from pages directory
const pagesDir = path.join(__dirname, '..', 'pages');
console.log('🚀 Cleaning all _meta.json files...\n');
processDirectory(pagesDir);
console.log('\n✅ Done!');
