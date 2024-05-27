# Dockerfile for SvelteKit

# Stage 1: Build the Vite application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built application with nginx
FROM nginx:stable-alpine

COPY --from=build /app/.svelte-kit/output/client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
