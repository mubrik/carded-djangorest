#!/bin/bash

TASKS_DIR=/opt/elasticbeanstalk/tasks

echo "${NODE_LOG_PATH//.log/*}" > "$TASKS_DIR/bundlelogs.d/01-app-log.conf"
# include current app log file in tail logs
echo $NODE_LOG_PATH > "$TASKS_DIR/taillogs.d/01-app-log.conf"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install 15.0.1

node -e "console.log('Running Node.js ' + process.version)"

# install devdependencies
npm install --production=false |& tee -a $NODE_LOG_PATH

pwd

ls -a -l

# create static
npm run build |& tee -a $NODE_LOG_PATH

# print for logs
npm list --depth=0 --json |& tee -a $NODE_LOG_PATH