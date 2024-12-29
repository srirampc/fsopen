
##  Development -> Deployment

1. Manage  CORS(Cross-Origin Resource Sharing). Install `cors`
```sh
npm install cors
```
Update cors as a middleware in server:
```javascript
const cors = require('cors')

app.use(cors())
```
2. Front end should be served as  a static resource
```javascript
app.use(express.static('dist'))
```
3. Make sure the frontend uses relative url
```javascript
import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// ...
```
4. Add scripts in the backend project to build front end and deploy
```json
{
  "scripts": {
    // ...
    "build:ui": "rm -rf dist && cd ../notes-frontend/ && npm run build && cp -r dist ../notes-backend",
    "deploy": "fly deploy",
    "deploy:full": "npm run build:ui && npm run deploy",    
    "logs:prod": "fly logs"
  }
}
```

## Fly commands

1. login
```sh
fly auth login
```
2. launch : generate the fly.toml and prepare for deployment
```sh
fly launch --no-deploy
```
3. Update fly.toml to have prope PORT
```toml
[build]

[env]
  PORT = "3000" # add this

[http_service]
  internal_port = 3000 # ensure that this is same as PORT
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]
```
Also make sure the app is using the same port as given in fly.toml
```javascript
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```
4. deploy
```sh
fly deploy
```
5. open app
```sh
fly apps open
```

Verify if fly is connected 
```sh
$ flyctl ping -o personal
35 bytes from fdaa:0:8a3d::3 (gateway), seq=0 time=65.1ms
35 bytes from fdaa:0:8a3d::3 (gateway), seq=1 time=28.5ms
35 bytes from fdaa:0:8a3d::3 (gateway), seq=2 time=29.3ms
...
```
6. List apps
```sh
fly apps list
```
6. destroy app
```sh
fly destory ${APP_ID}
```

