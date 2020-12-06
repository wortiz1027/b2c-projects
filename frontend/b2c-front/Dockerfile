# Stage compilacion de aplicacion angular
FROM node:10.15.3 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage compilacion de ejecucion aplicacion angular
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/b2c-application /usr/share/nginx/html
