# Chat With Socket.io

## O projeto foi construido com Socket.io, utilizei nodejs para o backend e react para o frontend, o chat possui realTime entre as mensagens de maneira que não precisa reiniciar para vizualizar as mensagens, para facilitar a estilização foi usado Tailwind.css por causa do tempo de entrega.

### Setup para desenvolvedor

## 1 backend

### Criar um .env com base no exemplo e colocar:

```FRONT_URL = "http://localhost:3000"```

### Instalar as dependencias:

```cd backend && npm install```

### Iniciar o projeto

```npm start```

## 2 frontend

### Instalar as dependencias:

```cd frontend && npm install```

### Iniciar o projeto

```npm start```

# Configuração de deploy:

### Para o deploy foi utilizado o render para o backend e a vercel para o react no frontend como mostra a imagem abaixo:

<img src="./imagesReadme/deployConfig.png">

# Docker Configuração

## Para facilitar o deploy do projeto foi configurado um setup no docker-compose para rodar é só digitar:

```docker-compose up```

### Para isso o projeto foi dividido em dois containers com duas imagens em comunicação

- O frontend está no Dockerfile apontando para a porta 3000 
- O backend para a porta 8080 
- Repare que o frontend é uma imagem dependente do backend então primeiro vai subir o backend para depois o frontend