#!/bin/bash

echo "installing"
npm install

npm install -g forever

echo "starting"
# forever server.js

forever -m 100 --spinSleepTime 1000 -f -v -w server.js
