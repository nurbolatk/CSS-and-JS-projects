const rootFolder = './';
const fs = require('fs');

let body = ''

function createProjectCard(name) {
  return `
    <a href="./${name}/index.html">${name}</a>
  `
}

const files = fs.readdirSync(rootFolder);
files.forEach(file => {
  const stats = fs.statSync(file)
  if(stats.isDirectory() && /^\d+/.test(file)) {
    body += (createProjectCard(file))
  }
});

console.log(body)

