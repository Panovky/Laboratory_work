FROM node

WORKDIR /students

COPY package.json /students

COPY . .

RUN npm install

EXPOSE 8094

CMD [ "node", "index.js"]