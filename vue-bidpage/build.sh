#!/bin/bash
/home/shsiao/.nvm/versions/node/v20.16.0/bin/npm run build
/usr/bin/cp -r dist/* ../
/usr/bin/cp ../index.html ../404.html