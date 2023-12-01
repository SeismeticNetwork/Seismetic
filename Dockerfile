FROM node:20.8.1-bullseye-slim

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

# Define metadata for the image
LABEL maintainer="SeismeticServices" \
      description="A Docker image for Seismetic"

CMD ["npm", "start"]
