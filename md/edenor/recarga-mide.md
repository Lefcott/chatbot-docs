## Recarga de MIDE - Edenor
---------------------------------------------------------

#### Paso 1. Token:
POST /consumer_api/v1/sessions

Campos del body utilizados:
```json
{ "access_token": "String" }
```
#### Paso 2.:
GET /consumer_api/v1/prepaids/emergency_charge?meter_prepaid_number=*METER_NUMBER_ID*

Campos del body utilizados:
```json
{
  "client_number": "String",
  "address": "String",
  "available": "Boolean",
  "next_available_date": "String"
}
```
##### Si available = true
POST /consumer_api/v1/prepaids/emergency_charge

Campos del body utilizados:
```json
{
  "errors": [
    {
      "message": "String"
    }
  ],
  "message": "String"
}
```
Se muestra el mensaje o el error.