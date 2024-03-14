FROM node:18.16
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .
COPY db.sqlite      .
RUN npm i
RUN npm i tsx pnpm -g
RUN npm cache clean --force
RUN npm run build

EXPOSE 3000 

CMD ["npm", "run", "start"]
