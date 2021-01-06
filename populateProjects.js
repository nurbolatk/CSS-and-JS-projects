const fs = require('fs')
const rootFolder = './'

function createProjectCard(name) {
  return `
  <a href="./${name}/index.html">
    <div class="card">
    <img src="https://picsum.photos/id/785/384/216" alt="Voicenator" class="project-img" />
    <div class="card-body">
        <h4>${name}</h4>
      </div>
    </div>
  </a>
`
}

let projectsHTML = ''

try {
  const files = fs.readdirSync(rootFolder)

  const folders = files.filter(file => {
    const stats = fs.statSync(file)
    return stats.isDirectory() && /^\d+/.test(file)
  })

  folders.sort((a, b) => {
    const orderOfA = parseInt(/^(\d+)./.exec(a)[1])
    const orderOfB = parseInt(/^(\d+)./.exec(b)[1])
    return orderOfA - orderOfB
  })

  folders.forEach(folder => {
    projectsHTML += createProjectCard(folder)
  })

  const data = fs.readFileSync('index.html', 'utf8')
  fs.writeFileSync(
    'index.html',
    data.replace(
      /(<div class="project-list">)[\s\S]+(<\/div>)/,
      `<div class="project-list">${projectsHTML}<\/div>`
    )
  )
} catch (err) {
  console.error(err)
}
