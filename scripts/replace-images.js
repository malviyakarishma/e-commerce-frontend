const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/Karishma/Downloads/e-commerce/src';

const replacements = {
  '1583496661160-c5dcb4c6579c': '1591369822096-ffd140ec948f',
  '1485230895905-eb56bace50a2': '1595777457583-95e059d581b8',
  '1550614000-4b95d4edfa22': '1584370848010-d7fe6bc767ec',
  '1534126416832-a88fdf23f178': '1620799139507-2a76f79a2f4d',
  '1524041255072-7da0525d6b34': '1584916201218-f4242ceb4809',
  '1515886657613-9f3515b0c78f': '1591369822368-7c87c9ec7d57',
  '1543163521-1bf539c55dd2': '1591369822096-ffd140ec948f',
  '1551028719-00167b16eac5': '1595777457583-95e059d581b8'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk(directory);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [oldId, newId] of Object.entries(replacements)) {
    if (content.includes(oldId)) {
      content = content.split(oldId).join(newId);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated images in ${file}`);
  }
});

console.log('Image replacements complete.');
