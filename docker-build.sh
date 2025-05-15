#!/bin/bash

# Script para construir e executar a imagem Docker

# Construir a imagem
echo "Construindo a imagem Docker..."
docker build -t amigo-secreto-frontend .

# Executar o contêiner
echo "Iniciando o contêiner..."
docker run -p 3000:3000 --name amigo-secreto-app amigo-secreto-frontend

# Para parar o contêiner, execute:
# docker stop amigo-secreto-app
