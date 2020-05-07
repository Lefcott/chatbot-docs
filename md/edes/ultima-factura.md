## Descarga de última factura Channel Whatsapp - Edes
---------------------------------------------------------

#### Paso 1. Verificar NIS (API Utility):
GET /api/data/ugo/suministro/*ACCOUNTID*

Campos del body utilizados:
```json
{
  "Direccion": "String",
  "EstadoSuministro": "String"
}
```
Verifica el suministro. En caso de no existir, pide que lo vuelva a ingresar.
#### Paso 2. Enlistar facturas (API UGO):

GET /consumer_api/v1/bills?client_number=*accountId*

Campos del body utilizados:
```json
[
  {
    "period": "Number",
    "external_id": "String"
  }
] // Se toma la factura con el máximo periodo
```
Si external_id es null se devuelve un mensaje de "No registramos facturas".
Si no:

GET /consumer_api/v1/printed_bills?client_number=%NIS%&external_id=*EXTERNAL_ID*

Campos del body utilizados:
```json
{ "base64": "String" }
```
Se envía el base64 como attachment.
