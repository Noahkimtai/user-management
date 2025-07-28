FROM node:20-bookworm

WORKDIR /TESTS/

RUN rm -rf node_modules

RUN npm cache clean --force

RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libxkbcommon0 \
    libasound2

COPY package.json .

RUN npm i @playwright/test -D

RUN npx playwright install chromium

COPY . .

CMD ["npx", "playwright", "test", "--trace", "on"]