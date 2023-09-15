#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git branch -m main
git add -A
git commit -m 'deploy'

git push -f https://github.com/KUOCHIUHSIANG/taiwan-tourist-attractions-guide.git main:gh-pages


cd -