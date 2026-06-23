FROM node:22-alpine AS build

WORKDIR /app

ARG REACT_APP_API_BASE_URL=http://localhost:5000
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV CI=true

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]