# node-api

API responsável por obter ou debitar os pontos de recompensa de um usuário a partir do e-mail.

## Endpoints:

URL: https://hc3-node-api.herokuapp.com/rewards

- **GET /rewards**

```json
body (json):
{
  "email": "johndoe@company.com"
}

response:
{
  "id": "a63a83f0-bbfd-4026-9ff4-c29687a9106b",
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
