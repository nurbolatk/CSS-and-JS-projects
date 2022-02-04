const fs = require('fs')
const rootFolder = './'

function createProjectCard(name) {
  return `
  <div class="card">
    <a href="./${name}/index.html" class="block">
      <img src="https://picsum.photos/id/785/384/216" alt="${name}" class="rounded mb-4" />
    </a>
    <div class="flex items-baseline justify-between">
      <h4 class="text-xl flex-1">
        <a href="./${name}/index.html" class="block hover:underline">${name}</a>
      </h4>
      <a href="https://github.com/nurbolatk/CSS-and-JS-projects/tree/master/${name}" target="_blank" rel="noopener noreferrer" class="underline text-lg hover:text-indigo-500">Github</a>
    </div>
  </div>
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
