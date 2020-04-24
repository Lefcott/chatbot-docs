## Consulta de Saldo Channel Web (Via UGO) - Edes
---------------------------------------------------------

#### Paso 1. Deuda:
GET /api/v1/accounts/balance?client_number=*CLIENT_NUMBER*&email=*EMAIL*

Campos del body utilizados:
```js
{ "message": "String" }
```
Devuelve el mensaje.

## Consulta de Saldo Channel Whatsapp (Via Utility) - Edes
---------------------------------------------------------

#### Paso 1. Verificar NIS:
GET /api/data/ugo/suministro/*ACCOUNTID*

Campos del body utilizados:
```js
{
  "Direccion": "String",
  "DebitoAutomatico": "Boolean",
  "EstadoSuministro": "String"
}
```
Verifica el suministro. En caso de no existir, pide que lo vuelva a ingresar.
Si está adherido a débito automático se lo informa al usuario y termina la transacción.
Si no, ejecuta el siguiente paso:

#### Paso 2. Deuda:

GET /api/data/sgc/pagosinfactura/consultadeuda
Campos del body utilizados:
```js
{
  "Deudas": [
    {
      "Vto": "String",
      "Imp": "Number"
    }
  ]
}
```
Por cada deuda calcula el próximo vencimiento, el saldo vencido y por vencer.
Si el estado del suministro es "SuspendidoImpago", "BajaVoluntaria" o "BajaImpago" muestra mensajes.
Si es "Activo" se muestra el saldo vencido y por vencer.
