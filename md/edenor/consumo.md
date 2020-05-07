## Consulta de Consumo - Edenor
---------------------------------------------------------

#### Paso 1. Token:
POST /token

Campos del body utilizados:
```json
{ "access_token": "String" }
```
#### Paso 2.:
GET /cuentas/*ACCOUNT_ID*/consumos?periodos=1

Campos del body utilizados:
```json
[
  {
    "periodo": "String",
    "fecha_lectura_desde": "String",
    "fecha_lectura_hasta": "String",
    "unidad_energia_activa": "String",
    "energia_activa": "Number",
    "consumo_periodo_ano_anterior": {
      "energia_activa": "Number"
    }
  }
] // Se toma el primer elemento con concepto = "saldo_total"
```
Se calcula la diferencia de energía y se muestra un mensaje como este:
```
La cuenta ${accountId} presenta los siguientes datos de consumo:
- Mes - Año: ${periodo}\n- Desde: ${desde}\n- Hasta: ${hasta}
- Consumo: ${consumo} ${unidad}
```