FROM node:24.12-alpine3.22
WORKDIR /home/node/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]