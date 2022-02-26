# Imagen inicial del contenedor..
FROM node:16-alpine

# Exponer puertos..
EXPOSE 3000
EXPOSE 35729

# Establece el directorio de trabajo..
WORKDIR /app

# Agrega /app/node_modules/.bin a las variables de entorno..
ENV PATH /app/node_modules/.bin:$PATH

# Copiar archivos de paquetes e instalar dependencias necesarias..
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
RUN npm install react-scripts -g

# Agrega la aplicación React al directorio de trabajo..
ADD . /app

# Inicia la aplicación React..
CMD [ "npm", "start"]
