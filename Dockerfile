# ── PHASE 1 : Build TwoShips ──
FROM node:18-alpine AS build-twoships
WORKDIR /app
COPY jeux/TwoShips/package*.json ./
RUN npm install --ignore-scripts
COPY jeux/TwoShips/ ./
RUN npm run build

# ── PHASE 2 : Build SpaceInvaders ──
FROM node:18 AS build-spaceinvaders
WORKDIR /app
RUN apt-get update && apt-get install -y python3 make g++
COPY jeux/SpaceInvaders/package*.json ./
RUN npm install
COPY jeux/SpaceInvaders/ ./
RUN npm run build

# ── PHASE 3 : Image finale Nginx ──
FROM nginx:alpine
COPY app-web/ /usr/share/nginx/html/
COPY --from=build-twoships /app/dist/ /usr/share/nginx/html/TwoShips/
COPY --from=build-spaceinvaders /app/build/ /usr/share/nginx/html/SpaceInvaders/
EXPOSE 80