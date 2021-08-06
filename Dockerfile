FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install --save
COPY . .
ENV NODE_ENV production
ENV PORT 1111
#ENV HOST_NAME "localhost"
CMD npm run dev
EXPOSE 1111