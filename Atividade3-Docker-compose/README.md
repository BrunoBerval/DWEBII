## Atividade Docker - Docker-compose


### ▶️ Subindo os Containers

1. Clonar o repositório e instalar dependências:
```bash
git clone https://github.com/BrunoBerval/DWEBII/Atividade3-Docker-compose/atividade .
cd Atividade3-Docker-compose/atividade
```

2. Como o projeto roda com bind mount no container, então será necessário instalar as dependências nas pasta `/front` e `/server`:
```bash
cd server
npm i
cd ..
cd front
npm i
```
Certifique-se de que exista a pasta `node_modules` nas pastas `front` e `/server`.

3. Para inicializar todo o ambiente (bancos de dados, servidor e front-end):
```bash
docker compose -f docker-compose.dev.yml up --build -d
```
- A flag `--build` força a reconstrução das imagens (aplica alterações recentes).
- Certifique-se de executar o comando na raiz do projeto, ou seja, no diretório onde está localizado o arquivo `docker-compose.dev.yml`. Caso contrário, o Docker não encontrará as definições dos serviços.
- Para parar os containers:
```bash
docker compose -f docker-compose.dev.yml down
```

