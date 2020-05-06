## Consulta de saldo (API Utility) - Edenor
---------------------------------------------------------

#### Paso 1. Token:
POST /token

Campos del body utilizados:
```js
{ "access_token": "String" }
```
#### Paso 2.:
GET /cuentas/%ACCOUNT_ID/saldos

Campos del body utilizados:
```js
[
  {
    "mensaje": "String",
    "concepto": "String",
    "monto": "String"
  }
] // Se toma el primer elemento con concepto = "saldo_total"
```
Se pasa el mensaje a minúsculas sin acentos y se compara con "la cuenta es invalida"
#### Si es diferente, status = 200, y body no vacío
### Si monto = 0
#### Paso 3.1. Morosidad:
GET /morosidad?cuenta_id=%ACCOUNT_ID

Request Headers:
{
  Authorization: access_token
}

Campos del body utilizados:
```js
{
  "codigo_morosidad": "String"
}
```
### Casos para codigo_morosidad (minúsculas, sin tildes):
#### "cortado por falta de pago":
#### Paso 3.1.1. Detalle de morosidad
GET /morosidad/detalle?cuenta_id=%ACCOUNT_ID

Request Headers:
{
  Authorization: access_token
}

Campos del body utilizados:
```js
{
  "suspendido_falta_pago": {
    "cortado_falta_pago": "Boolean"
  }
}
```
##### Si suspendido_falta_pago.cortado_falta_pago = true
Mostrar "Te informamos que hemos procedido a retirar el medidor por la falta de pago"
#### "suspendido por falta pago rehabilitacion en curso mayor 24":
Mostrar "Te informamos que el servicio se encuentra suspendido."
#### "suspendido por falta pago rehabilitacion en curso menor24":
Mostrar "Te informamos que el servicio se encuentra suspendido."
#### Caso default:
Mostrar el saldo total y el saldo vencido filtrando por concepto
### Si monto != 0
Mostrar el saldo total y el saldo vencido filtrando por concepto
