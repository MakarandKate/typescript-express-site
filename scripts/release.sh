npm i
npm run dr-stamp
npm run build 
cd ../deploy-typescript-express-site
git pull
rm -f -r * 
cd ../typescript-express-site 
cp -r dist/ ../deploy-typescript-express-site/dist 
cp -r node_modules ../deploy-typescript-express-site/node_modules 
cd ../deploy-typescript-express-site 
rm dist/config/Config.js
rm dist/config/Config.js.map
cp dist/config/Config.prod.js dist/config/Config.js
cp dist/config/Config.prod.js.map dist/config/Config.js.map
git add . 
git commit -m \"release\" 
git push