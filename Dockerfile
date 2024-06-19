FROM node:18:18-alpine
# set working directory
WORKDIR /peanut_butter_api

# package and package lock files
ADD package*.json .
ADD build.sh .
# make build file executable
RUN chmod +x build.sh

# copy everything else
ADD . .
# execute commands
CMD ["sh", "build.sh", "&&", "node", "src/index.js"]