# node-api

API responsável por obter ou debitar os pontos de recompensa de um usuário a partir do e-mail.

Não é necessário executar localmente, mas se for o caso, adicione um arquivo .env dentro da pasta "node-api" com as variáveis "VTEX_APPKEY" e "VTEX_APPTOKEN" e seus respectivos valores para a autenticação.

## Endpoints:

URL: https://hc3-node-api.herokuapp.com/rewards

- **GET /rewards**

```json
Exemplos:

query:
/rewards?email="johndoe@company.com"


response:
{
  "id": "a63a83f0-bbfd-4026-9ff4-c29687a9106b", // ID do usuário
  "rewardPoints": 150
}
```

- **POST /rewards**

```json
body (json):
{
  "email": "johndoe@company.com",
  "pointsSpent": 100
}

response:
204 No Content
```
