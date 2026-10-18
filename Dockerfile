# Imagen base
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar manifiestos primero para aprovechar el caché de Docker
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --omit=dev

# Copiar todo el código de tu proyecto al contenedor
# (Es vital tener el archivo .dockerignore para que no copie node_modules ni el .env local)
COPY . .

# Exponer el puerto
EXPOSE 3000

# Punto de entrada corregido (apunta a server.js en la raíz)
CMD ["node", "server.js"]