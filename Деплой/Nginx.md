https://www.digitalocean.com/community/tutorials/how-to-run-nginx-in-a-docker-container-on-ubuntu-22-04


```Dockerfile
FROM node:18 as build  
  
# Set the working directory in the container  
WORKDIR /app  
  
# Copy package.json and package-lock.json to the working directory  
COPY package*.json ./app  
  
# Install dependencies  
RUN npm install  
  
# Copy the entire application code to the container  
COPY . .  
  
# Build the React app for production  
RUN npm run build  
  
# Use Nginx as the production server  
FROM nginx:alpine  
  
# Copy the built React app to Nginx's web server directory  
COPY --from=build /app/build /usr/share/nginx/html  
  
# Expose port 80 for the Nginx server  
EXPOSE 80  
  
# Start Nginx when the container runs  
CMD ["nginx", "-g", "daemon off;"]
```

меняем `/etc/nginx/conf.d`