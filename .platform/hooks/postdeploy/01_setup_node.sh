#!/bin/bash

TASKS_DIR=/opt/elasticbeanstalk/tasks

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install 15.0.1

node -e "console.log('Running Node.js ' + process.version)"

# create log
touch nodelog.log
chmod +wr nodelog.log

# install devdependencies
npm install |& tee nodelog.log

ls -a -l

# permission
chmod +x package.json
chmod +x node_modules/.bin/webpack
chmod +wr -R /frontend

ls -a -l


# create static
npm run build |& tee -a nodelog.log

# print for logs
npm list --depth=0 --json |& tee -a nodelog.log
nodelog.log > "$TASKS_DIR/bundlelogs.d/01-app-log.conf"
nodelog.log > "$TASKS_DIR/taillogs.d/01-app-log.conf"