#!/usr/bin/env bash
# Exit on error
set -o errexit
npm install typescript
# install packages
npm install
# build
npm run build