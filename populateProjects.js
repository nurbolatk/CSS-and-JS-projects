const fs = require('fs')
const rootFolder = './'

// let body = document.querySelector('body')
const template = `
  <div class="card">
    <img src="./23-voiceinator/23.png" alt="Voicenator" class="project-img" />
    <div class="card-body">
      <a href="./23-voiceinator/index.html">Project 23 - Voicenator</a>
    </div>
  </div>
`
function createProjectCard(name) {
  return `
  <div class="card">
    <img src="./23-voiceinator/23.png" alt="Voicenator" class="project-img" />
    <div class="card-body">
      <a href="./${name}/index.html">Project 23 - name</a>
    </div>
  </div>
`
}
let projectsHTML = ''

const files = fs.readdirSync(rootFolder)
files.forEach(file => {
  const stats = fs.statSync(file)
  if (stats.isDirectory() && /^\d+/.test(file)) {
    projectsHTML += createProjectCard(file)
  }
})

try {
  const data = fs.readFileSync('index.html', 'utf8')
  fs.writeFileSync(
    'index.html',
    data.replace(
      /(<div class="project-list">)[\s\S]+(<\/div>)/,
      `<div class="project-list">${projectsHTML}<\/div>`
    )
  )
  //file written successfully
} catch (err) {
  console.error(err)
}
