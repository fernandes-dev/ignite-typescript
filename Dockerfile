FROM node

WORKDIR /usr/app

COPY package.json ./
COPY .env ./

RUN npm install --force

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
