FROM node:latest

WORKDIR /tests


COPY package.json .

RUN npm i

RUN npx playwright install chromium --with-deps

COPY . .

CMD ["npx", "playwright", "test"]