FROM node:lts-alpine

WORKDIR /client
# TODO: Copy any relevant file.
COPY ["package.json" , "package-lock.json", "./"]

RUN npm install --production
COPY . .

ENV PORT=8080

EXPOSE 8080
CMD ["npm", "start"]