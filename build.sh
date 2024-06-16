#!/usr/bin/env bash
# Exit on error
set -o errexit
npm install -D ts-node
npm install -D typescript

# ts-node script.ts
# install packages
npm install
# build
npm run build