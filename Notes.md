# Notes
## React Beginners Guide Course Notes 
Notes from the egghead.io course [React Beginners Guide](https://egghead.io/courses/the-beginner-s-guide-to-react) with [source code](https://github.com/kentcdodds/beginners-guide-to-react).

- Lazy initialization of state from useState with a function [Part 14 code](https://github.com/kentcdodds/beginners-guide-to-react)
- Example of useRef to refer [Part 17 code](https://github.com/kentcdodds/beginners-guide-to-react)
- Dynamic For example in [Part 20 code](https://github.com/kentcdodds/beginners-guide-to-react)
- Controlled Form Fields to restrict values in input fields of a form: [documentation](https://reactjs.org/docs/forms.html#controlled-components) Example in [Part 21](https://github.com/kentcdodds/beginners-guide-to-react)
- Error boundary in React [documentation](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary); [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) library
- 

## [Learn React](https://react.dev/learn) from React.dev

- Updater function to queue a [series of state updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- Ways to [NOT mutate arrays in useState](https://react.dev/learn/updating-arrays-in-state)
- Sate v. Position in the [DOM tree](https://react.dev/learn/preserving-and-resetting-state) 
    - State tied to position in DOM tree **NOTE: position in the DOM tree, not in the JSX**
    - Same component at the same position preserves state
    - Different component at the same position reset state
    - DO NOT nest component function definitions. When nested, a different 
      child component will be created every render of the parent component, thus
      resetting the child's state. 
- Ref is sort of a pointer to a object can be anything
- Ref is used as a pointer to the DOM element .
- Also the following from [here](https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback)
> Hooks must only be called at the top-level of your component. You can’t call useRef in a loop, in a condition, or inside a map() call.

Solution when we have multiple components as ref is to use a ref callback

- Use of imperative handle to [expose the API of a component](https://react.dev/learn/manipulating-the-dom-with-refs#exposing-a-subset-of-the-api-with-an-imperative-handle)
- Effects:
> Effects let you specify side effects that are caused by rendering itself, rather than by a particular event.

## Linting 

1. Install linter
```sh
npm install eslint @eslint/js --save-dev
```
2. Initialize lint settings
```sh
npx eslint --init
```
3. Code style lint plugin
```sh
npm install --save-dev @stylistic/eslint-plugin-js
```
5. Add to package.json
```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    // ...

    "lint": "eslint ."
  },
  // ...
}
```
6. Update eslint.config.mjs as required. 
 - Ignore dist in eslint.config.mjs
 - Equality checking only with ==== and other useful rules for eslint.config.js
```javascript
export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
    },
  },
  {
    ignores: ['dist/**'],
  },
]
```
7. eslint default for switch-case is not good add the following above switch-case
```javascript
    /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
    switch (event.target.id) {
      case 'title':
        setNewBlog({ ...newBlog, title: event.target.value })
        break
       // ...
      default:
        break
    }
```

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
7. destroy app
```sh
fly destory ${APP_ID}
```
8. Add secrets
```sh
fly secrets set MONGODB_URI="mongodb+srv://fullstack:thepasswordishere@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority"
```

## Using Typescript

0. Initialize ts config
1. mongodb with Typescript [doc](https://mongoosejs.com/docs/typescript.html)
2. typescript specific libraries we need
```
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2",
    "typescript-eslint": "^8.19.0"
```
2. All the types npm we need
```
    "@stylistic/eslint-plugin-js": "^2.12.1",
    "@types/assert": "^1.5.11",
    "@types/cors": "^2.8.17",
    "@types/dotenv": "^6.1.1",
    "@types/express": "^4.17.21",
    "@types/mongoose": "^5.11.96",
    "@types/morgan": "^1.9.9",
    "@types/node": "^22.10.3",
    "@types/supertest": "^6.0.2",
```
3. Scripts
```
    "start": "NODE_ENV=production node build/index.js",
    "build": "tsc",
    "dev": "NODE_ENV=development nodemon index.ts",
    "test": "npm run build && NODE_ENV=test node --test",
```

### Typescript with react

- Types notes in [cheat sheet](https://react-typescript-cheatsheet.netlify.app/)
- React.FunctionComponent for function components or React.FC<AppProps>
- Table for typing different form events is [here](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events)
- Futher reading on conditional types: [ts spec](https://github.com/swyxio/ts-spec/blob/master/conditional-types.md)


## Frontend Testing

Libraries for installing:

```sh
npm install --save-dev vitest jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev eslint-plugin-vitest-globals
npm install --save-dev @testing-library/user-event
npm install --save-dev @vitest/coverage-v8
```

## E2E Testing

1. Init Commands
```sh
npm init playwright@latest
sudo npx playwright install-deps
sudo apt-get install libnss3 libnspr4 libasound2t64
```
2. After the init command, playwright will notify the missing system dependencies
for some of the browsers. In this case, either install the dependencies or
remove the offending browser from the list in playwright.config.json.
3. Add scripts in package.json for e2e testing
```json
{
  // ...
  "scripts": {
    "test": "playwright test",
    "test:report": "playwright show-report"
  },
  // ...
}
```
4. Update backend package.json

```json
{
    // ...
    "scripts" : {
        // ...
        "start:test": "NODE_ENV=test ts-node index.ts",
        // ...
    } 
    // ...
}
```
5. Start server and frontend. Write tests. Run 
```sh
npm test -- --project chromium
```
6. Config playwright to make run sequential
```js
{
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,


}
```
7. Open playwright in UI mode
```sh
npm test -- --ui
```
8. Use data-testid to indicate the form elements to select by getByTestId
9. Debug a test
```sh
npm test -- -g'importance can be changed' --debug
```
10. Use of trace viewer
```sh
npm run test -- --trace on
```
11. playwright test generator by recording tests
```sh
npx playwright codegen http://localhost:5173/
```

## Typescript + ts-jest setting up
Reference [here](https://jestjs.io/docs/getting-started#using-typescript) and
[here](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file)
1. creating the app
```sh
npm create vite@latest notes_redux -- --template react-ts
```
2. Update tsconfig.json. Copy from tsconfig.app.json to tsconfig.json
```json
{
  "compilerOptions": {
     // ...   
     "esModuleInterop": true,
  }
}
```
3. Jest packages
```sh
npm install --save-dev jest
npm install --save-dev ts-jest @types/jest eslint-plugin-jest
```
4. Generate a ts-jest config and set appropriate values
```sh
npm init jest@latest
```
5. Add the following in jest.config.ts
```json
{
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
}
```
6. install ts-node
```sh
npm install --save-dev ts-node
```
7. Other dependencies
```sh
npm install --save-dev deep-freeze @types/deep-freeze
```
8. jest/globals? in eslint.config.js I am not sure about this
```js
languageOptions: {
  // ...
  globals: { browser: true, 'jest/globals': true },
}
```
