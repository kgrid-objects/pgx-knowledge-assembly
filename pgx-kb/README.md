## API Service
Run the API service using

```shell
node src/api-service.js
```

from the cpic-kb folder and access the api through swagger editor using `http://localhost:3000/api-docs` or send a post request to `http://localhost:3000/run`.

Here is a sample input
```json
{
    "patient": {
        "name": "Hank Hill",
        "id": "1"
    },
    "diplotype": {
      "CYP2C19": "*1/*11",
      "CYP2C9": "",
      "CYP2D6": "*3/*3",
      "CYP3A5": "",
      "HLA-B": "*1/*1",
      "SLCO1B1": "",
      "TPMT": "",
      "UGT1A1": "*1/*1"
    },
    "prescriptions": "atazanavir codeine abacavir"
  }

```

## Plugin Service

### Client Side
To import and use pgx-kb on the client side js files that execute on the beroswer without any need for server side processing install the pgx-kb package as a dependency in your node.js app using

```batch
npm install /path/to/pgx-kb
```

To be able to load pgx-kb metadata in the browser of the app, copy it to the public folder by adding the following script to the package.json
```json
  "scripts": {
    "prebuild": "mkdir -p public/pgx-kb && cp node_modules/pgx-kb/metadata.json public/pgx-kb/metadata.json",
    "build": "npm run prebuild && vite build"
  }
```

and running the following command in the shell
```shell
npm run build  
```

In your client side js import the pgx-kb package using

```javascript
import pgx from 'pgx-kb';

```

then initialize the package and run the service using

```javascript
import pgx from 'pgx-kb';

async function initialize() {
  await pgx.initialize();
}


initialize();

let result = await pgx.run({
    "patient": {
        "name": "Hank Hill",
        "id": "1"
    },
    "diplotype": {
      "CYP2C19": "*1/*11",
      "CYP2C9": "",
      "CYP2D6": "*3/*3",
      "CYP3A5": "",
      "HLA-B": "*1/*1",
      "SLCO1B1": "",
      "TPMT": "",
      "UGT1A1": "*1/*1"
    },
    "prescriptions": "atazanavir codeine abacavir"
  }
);
```

Note that your client side js file needs to be imported with type="module" like the following example
```html
<script type="module" src="static/js/cpic.js"> </script>
```

Then add a `vite.config.js` as the build config for vite with the following content
```javascript
export default {
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  }
}
```  

Then run the application using the following command
```shell
npx vite   
```

For production, build the app using
```
npx vite build 
```

To run a built version in dev environment use serve
```shell
npm install -g serve
serve dist
```

See the [demo app](/pgx-demos/pgx-demo_plugin-service_client_side_load/) that uses plugin service from [pgx-kb](/pgx-kb/) on the client side for a complete demo example.

### Server Side
To use library service on server side, install the pgx-kb package as a dependency in your node.js app using

```batch
npm install /path/to/pgx-kb
```

Then import the initialize and run methods from pgx-kb package in your serverside code (node.js) using

```javascript
const { run, initialize } = require('pgx-kb');
// or import {run, initialize} from 'pgx-kb';
```

Then initialize the package and run the service using

```javascript
await initialize();
let result = await run({
    "patient": {
        "name": "Hank Hill",
        "id": "1"
    },
    "diplotype": {
      "CYP2C19": "*1/*11",
      "CYP2C9": "",
      "CYP2D6": "*3/*3",
      "CYP3A5": "",
      "HLA-B": "*1/*1",
      "SLCO1B1": "",
      "TPMT": "",
      "UGT1A1": "*1/*1"
    },
    "prescriptions": "atazanavir codeine abacavir"
  }
);
```

See the [demo app](/pgx-demos/pgx-demo_plugin-service_server_side_load/) that uses plugin service from [pgx-kb](/pgx-kb/) on the server side for a complete example.