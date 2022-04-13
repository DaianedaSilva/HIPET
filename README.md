# HIPET

## Pré Requisitos
- [MongoBD](https://downloads.mongodb.com/compass/mongodb-compass-1.30.1-win32-x64.zip "MongoBD")
- [Node 16.14.x](https://nodejs.org/en/ "Node 16.14.x")

## Inicialização
Para instalar todos os pacote de o seguinte comando, com o projeto já deve estar configurado e pronto para ser testado.
``` shell
npm i
```
Para subir o servidor local de o comando abaixo na raiz do projeto, o servidro será inicializado em http://localhost:5050/ 
``` shell
npm start
```
Todas as rotas estão configuradas dentro de `/api`
- Rota de apresentação (teste) - GET http://localhost:5050/api/version
- Rota para Criar Usuário - POST http://localhost:5050/api/user/create
- Rota para Logar Usuário - POST http://localhost:5050/api/user/clogin

## Testes
### Instalando mock do MongoDB

Para instalar o mock do MongoBD rode o comando, e o download deve começar de forma automatica
``` shell
npm test
```
### Rodando testes
***Obs: Os teste vão rodar automaticamente a cada modificação***

#### Testes unitários
Para rodar os testes unitarios rode o comando abaixo
``` shell
npm run test:unit
```
#### Testes de integração
Para rodar os testes unitarios rode o comando abaixo
``` shell
npm run test:integration
```
#### Todos os testes
Para rodar os testes unitarios rode o comando abaixo
``` shell
npm run test
```
#### Teste de cobertura
Para rodar os testes unitarios rode o comando abaixo
``` shell
npm run test:ci
```

### Conectar ao banco
Para conectar ao banco, adicione no arquivo .env na raiz do projeto a linha de conexão com o banco:
``` 
Arquivo .env>-: NODE_ENV=dev
SERVER_PORT=5050
**MONGO_URL=mongodb+srv://hipetUser:<SENHA>@cluster0.ghnnu.mongodb.net/hipet?retryWrites=true&w=majority**
```
Não esqueça de substituir : <SENHA> pela senha do banco