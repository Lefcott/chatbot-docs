## Consulta de saldo (API UGO, con polling) - Edelap
---------------------------------------------------------

#### Paso 1.:
GET /api/v1/bills/payable?client_number=%NIS

Campos del body utilizados:
```json
{
  "total_debt": "String",
  "error": "String",
  "client_number": "String"
  "address": "String"
}
```
En caso de haber error se muestra y si no se arma un mensaje con:
  - client_number
  - address
  - total_debt