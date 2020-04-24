## Consulta de Nises Channel Whatsapp (API UGO) - Edes
---------------------------------------------------------

#### Paso 1.Token:
GET /consumer_api/v1/sessions

Campos del body utilizados:
```js
{ "access_token": "String" }
```
#### Paso 2. Suministros:

GET /consumer_api/v1/accounts?document_type=%DOCUMENTTYPE%&document_number=*DOCUMENTNUMBER*

Campos del body utilizados:
```js
{
  "accounts": [
    {
      "client_number": "String",
      "address": "String"
    }
  ]
}
```
Muestra el NIS asociado a cada suministro.
