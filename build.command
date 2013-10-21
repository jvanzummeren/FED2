#!/bin/sh
cd `dirname $0`/source/js

r.js -o app.build.js

#fix bug in optimizer wich leaves empty folders
cd ../../build/js
rm -r libs
rm -r models
rm -r templates
rm app.build.js

osascript -e 'tell application "Terminal" to quit' &
exit