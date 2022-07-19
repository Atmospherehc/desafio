# Backend App - Hiring Coders #3 - Casa Atmosphere 03

App responsável por observar novos pedidos, calcular quantos pontos de recompensa o cliente receberá e consumir uma API para atualizar este valor no Master Data da VTEX.

## Executando o app

1. Acesse a pasta 'backend' pelo terminal/console.
2. `$ vtex login atmosphere`
3. `$ vtex use general`
4. `$ vtex link`

Levando em conta o número limitado de workspaces nesta fase, o order hook acaba ficando disponível para todos os grupos, então é preciso linkar a loja em outro workspace, onde está o nosso tema.

### Após linkar o backend, você precisará:

5. Abrir outro terminal, mantendo o anterior aberto
6. Acessar a pasta raíz do repositório ('hiring-coders-atmosphere-03' por padrão)
7. `$ vtex use squad3`
8. `$ vtex link`

Aguarde de 10 a 15 segundos após o fechamento do pedido para que o pagamento seja autorizado.

**Por não ser uma loja real, recomendamos pagar via "Promissória"**, configurada para autorizar o pagamento.
