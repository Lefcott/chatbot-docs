## Descarga de Facturas - Camuzzi

GET /api/Suministro/**_ACCOUNTID_**/FacturasChatBot

Campos del body utilizados:

```json
{
  "results": [
    {
      "Estado": "Number",
      "NumeroFactura": "String",
      "Periodo": "String",
      "UrlVer": "String",
      "UrlDescarga": "String"
    }
  ]
}
```

### Flujo:

Muestra las facturas del array **results** filtrando por **results[i].Estado != 0**.
