To run this demo app 
1. Have [node.js](https://nodejs.org/en/download) installed
2. Install dependencies using 

```shell
npm install
```

You may need to uninstall `pgx-kb` using

```shell
npm uninstall pgx-kb
```

and then install it from a local place or published version if any, using

```shell
npm install /home/path/to/pgx-knowledge-base/pgx-kb
```

If you are installing pgx-kb from a local place, make sure all its dependencies are installed there by running `npm install` in the root of that local place.

Then run the following command to copy the pgx-kb locally to the public folder of this app so that it could be accessed by the knowledge base code in the browser 
```shell
npm run build  
```

3. Then run the application using the following command
```shell
npx vite   
```

For production build the app using
```
npx vite build 
```

To run a built version in dev environment use serve
```shell
npm install -g serve
serve dist
```
