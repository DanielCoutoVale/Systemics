# Systemics Backend

A simple Node.js backend for managing resources.

## Install

```bash
cd backend
npm install
```

## Run

```bash
cd backend
npm start
```

The server runs on `http://localhost:3000`.

## API

GET /resources
GET /resources/{grammar-id}
GET /resources/{grammar-id}/systems
GET /resources/{grammar-id}/vocabules
GET /resources/{grammar-id}/examples
GET /resources/{grammar-id}/corpora

POST /resources
PUT /resources/{grammar-id}/systems
PUT /resources/{grammar-id}/vocabules
PUT /resources/{grammar-id}/examples
PUT /resources/{grammar-id}/corpora
DELETE /resources/{grammar-id}

### POST /resources with ZIP

Send a `multipart/form-data` request with `file` containing a ZIP archive that includes a JSON file.
