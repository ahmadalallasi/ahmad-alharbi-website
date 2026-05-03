FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .nvmrc ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# ── Production image ──
FROM nginx:alpine AS runner

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx config for SPA/static with Arabic RTL support
RUN echo 'server { \
  listen 80; \
  server_name _; \
  root /usr/share/nginx/html; \
  index index.html; \
  charset utf-8; \
  gzip on; \
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml; \
  location / { try_files $uri $uri/ $uri.html =404; } \
  location ~* \.(js|css|png|svg|ico|woff2)$ { expires 1y; add_header Cache-Control "public, immutable"; } \
  error_page 404 /404.html; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
