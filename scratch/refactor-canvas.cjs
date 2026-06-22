const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules')) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
files.forEach(file => {
  if (file.includes('GlobalCanvas.tsx')) return;
  if (file.includes('SharedCanvas.tsx')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const replaceMap = [
    {
      from: 'import { Canvas } from "@react-three/fiber";',
      to: 'import { SharedCanvas as Canvas } from "@/components/SharedCanvas";'
    },
    {
      from: 'import { Canvas, useFrame } from "@react-three/fiber";',
      to: 'import { SharedCanvas as Canvas } from "@/components/SharedCanvas";\nimport { useFrame } from "@react-three/fiber";'
    },
    {
      from: 'import { Canvas, useFrame, useThree } from "@react-three/fiber";',
      to: 'import { SharedCanvas as Canvas } from "@/components/SharedCanvas";\nimport { useFrame, useThree } from "@react-three/fiber";'
    }
  ];

  for (const r of replaceMap) {
    if (content.includes(r.from)) {
      content = content.replace(r.from, r.to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
