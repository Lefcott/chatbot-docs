## Generación de reclamos (API Utility) - Edenor
---------------------------------------------------------

#### Paso 1. Token:
POST /token

Campos del body utilizados:
```json
{ "access_token": "String" }
```
#### Paso 2.:
POST /reclamos

Campos del body utilizados:
```json
{
  "mensaje": "String",
  "error": "String"
}
```
Se muestra "mensaje" o "error" dependiendo el caso.
