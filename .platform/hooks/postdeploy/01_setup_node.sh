#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install 15.0.1

node -e "console.log('Running Node.js ' + process.version)"

# install devdependencies
npm install --production=false

pwd

# create static
npm run build

# print for logs
npm list --depth=0 --json