#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix nested TOC structure by removing "index" entries from _meta.json files
 * that only contain the index entry (causing "Section > Overview > Overview" nesting)
 */

function fixMetaFile(metaPath) {
  const metaContent = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const keys = Object.keys(metaContent);

  // If this _meta.json file ONLY has "index" entry, remove it to prevent nesting
  if (keys.length === 1 && keys[0] === 'index') {
    console.log(`✅ Fixing: ${metaPath}`);
    console.log(`   Before: ${JSON.stringify(metaContent)}`);

    // Replace with empty object (Nextra will use default behavior)
    fs.writeFileSync(metaPath, '{}\n');
    console.log(`   After: {}`);
    return true;
  }

  return false;
}

function processDirectory(dir) {
  let fixedCount = 0;
  const metaPath = path.join(dir, '_meta.json');

  if (fs.existsSync(metaPath)) {
    if (fixMetaFile(metaPath)) {
      fixedCount++;
    }
  }

  // Recursively process subdirectories
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      fixedCount += processDirectory(path.join(dir, entry.name));
    }
  }

  return fixedCount;
}

// Start from pages directory
const pagesDir = path.join(__dirname, '..', 'pages');
console.log('🚀 Fixing nested TOC structure...\n');

const fixedCount = processDirectory(pagesDir);

console.log(`\n✅ Done! Fixed ${fixedCount} _meta.json files`);
console.log('\nThis removes the extra "Overview" nesting level, so:');
console.log('  ❌ Before: Dashboards > Overview > Overview > Common Features');
console.log('  ✅ After:  Dashboards > Common Features, Executive Dashboard, etc.\n');
