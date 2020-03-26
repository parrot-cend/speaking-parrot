const axios = require('axios')
const fs = require('fs')
const path = require('path')

axios.get('http://localhost:3000/node-utils').then((res: any) => {
  const targetDir = path.join(__dirname, '..', 'src', 'utils', 'nodeUtils/')
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }
  if (Array.isArray(res.data)) {
    res.data.forEach((file: any) => {
      const filePath = path.join(__dirname, '..', 'src', 'utils', 'nodeUtils', file.name)
      fs.writeFileSync(filePath, file.content, 'utf-8')
    })
  }
})
