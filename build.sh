#!/usr/bin/env bash
# Exit on error
set -o errexit
# install packages
npm install
# build
npm run build