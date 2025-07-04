# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Accept build-time env for Vite
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Nginx to serve built files
FROM nginx:alpine AS frontend
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
