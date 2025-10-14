To run this demo app 
1. Have [node.js](https://nodejs.org/en/download) installed
2. Install dependencies using 

```shell
npm install
```

You may need to uninstall `pgx-ka` using

```shell
npm uninstall pgx-ka
```

and then install it from a local place or published version if any, using

```shell
npm install /home/path/to/pgx-knowledge-assembly/pgx-ka
```

If you are installing pgx-ka from a local place, make sure all its dependencies are installed there by running `npm install` in the root of that local place.

3. Then run the application using the following command
```shell
npx vite   
```

For production first build the app and then copy the pgx-ka information page to the demo folder using
```shell
npx vite build 
cp ../../pgx-ka/index.html dist/pgx_ka_info_page.html
cp ../../collection/CPICRec_codeine_CYP2D6/index.html dist/CPICRec_Codeine_CYP2D6.html
cp ../../collection/CPIC_Phenotype_CYP2D6/index.html dist/CPIC_Phenotype_CYP2D6.html
cp ../../collection/CPIC_Phenotype_CYP2C9/index.html dist/CPIC_Phenotype_CYP2C9.html
cp ../../collection/CPIC_Phenotype_CYP2C19/index.html dist/CPIC_Phenotype_CYP2C19.html
cp ../../collection/CPIC_Phenotype_CYP3A5/index.html dist/CPIC_Phenotype_CYP3A5.html
cp ../../collection/CPIC_Phenotype_SLCO1B1/index.html dist/CPIC_Phenotype_SLCO1B1.html
cp ../../collection/CPIC_Phenotype_TPMT/index.html dist/CPIC_Phenotype_TPMT.html
cp ../../collection/CPIC_Phenotype_UGT1A1/index.html dist/CPIC_Phenotype_UGT1A1.html


```

To run a built version in dev environment use serve
```shell
npm install -g serve
serve dist
```

To deploy the build on GitHub pages (push the dist folder to gh-pages branch) use the following command:
```shell
npm run deploy
```
