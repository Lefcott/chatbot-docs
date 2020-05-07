## Descarga de última factura (API UGO) - Edelap
---------------------------------------------------------

#### Paso 1. Token:
POST /consumer_api/v1/sessions

Campos del body utilizados:
```json
{ "access_token": "String" }
```
#### Paso 2.:
GET /consumer_api/v1/bills?client_number=*NIS*

Campos del body utilizados:
```json
[
  {
    "period": "Number",
    "external_id": "String"
  }
] // Se toma la factura con el máximo periodo
```
#### Si external_id es null se devuelve un mensaje de "No registramos facturas".
#### Si no:
GET /consumer_api/v1/printed_bills?client_number=*NIS*&external_id=*EXTERNAL_ID*
```json
  { "url": "String" }
```
#### Se envía un botón con la url para descargar la factura