FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -f

EXPOSE 8000

CMD ["npm", "start"]