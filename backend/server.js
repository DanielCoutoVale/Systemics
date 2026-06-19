const express = require('express')
const cors = require('cors')
const multer = require('multer')
const AdmZip = require('adm-zip')
const fs = require('fs')
const path = require('path')

const app = express()
const upload = multer({ storage: multer.memoryStorage() })
const PORT = 3000
const storagePath = path.join(__dirname, 'data')

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true })
}

app.use(cors())
app.use(express.json())

function getResourceFile(id) {
  return path.join(storagePath, `${id}.json`)
}

function getResourceData(id) {
  const file = getResourceFile(id)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  return JSON.parse(raw)
}

function saveResourceData(id, data) {
  const file = getResourceFile(id)
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
}

function listResources() {
  return fs.readdirSync(storagePath)
    .filter((file) => file.endsWith('.json'))
    .map((file) => JSON.parse(fs.readFileSync(path.join(storagePath, file), 'utf8')))
}

function unzipJsonBuffer(buffer) {
  const zip = new AdmZip(buffer)
  const entry = zip.getEntries().find((e) => e.entryName.endsWith('.json'))
  if (!entry) return null
  return JSON.parse(entry.getData().toString('utf8'))
}

app.get('/resources', (_req, res) => {
  res.json(listResources())
})

app.get('/resources/:grammarId', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  res.json(data)
})

app.get('/resources/:grammarId/systems', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  res.json(data.systems ?? [])
})

app.get('/resources/:grammarId/vocabules', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  res.json(data.vocabules ?? [])
})

app.get('/resources/:grammarId/examples', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  res.json(data.examples ?? [])
})

app.get('/resources/:grammarId/corpora', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  res.json(data.corpora ?? [])
})

app.post('/resources', upload.single('file'), (req, res) => {
  const bodyData = req.body && Object.keys(req.body).length ? req.body : null
  let resource = bodyData

  if (req.file) {
    const parsed = unzipJsonBuffer(req.file.buffer)
    if (!parsed) return res.status(400).json({ message: 'ZIP did not contain a JSON file' })
    resource = parsed
  }



  if (!resource) {
    return res.status(400).json({ message: 'Request body must be valid JSON or ZIP with JSON file' })
  }

  const id = resource.id || resource.grammarId || `${Date.now()}`
  resource.id = id
  saveResourceData(id, resource)
  res.status(201).json(resource)
})

app.put('/resources/:grammarId/systems', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  data.systems = req.body
  saveResourceData(req.params.grammarId, data)
  res.json(data)
})

app.put('/resources/:grammarId/vocabules', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  data.vocabules = req.body
  saveResourceData(req.params.grammarId, data)
  res.json(data)
})

app.put('/resources/:grammarId/examples', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  data.examples = req.body
  saveResourceData(req.params.grammarId, data)
  res.json(data)
})

app.put('/resources/:grammarId/corpora', (req, res) => {
  const data = getResourceData(req.params.grammarId)
  if (!data) return res.status(404).json({ message: 'Resource not found' })
  data.corpora = req.body
  saveResourceData(req.params.grammarId, data)
  res.json(data)
})

app.delete('/resources/:grammarId', (req, res) => {
  const file = getResourceFile(req.params.grammarId)
  if (!fs.existsSync(file)) return res.status(404).json({ message: 'Resource not found' })
  fs.unlinkSync(file)
  res.status(204).send()
})

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
