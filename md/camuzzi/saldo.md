## Consulta de Saldo - Camuzzi
---------------------------------------------------------

GET /api/Suministro/GetConsultaDeudaByCuenta?numeroCuenta=%ACCOUNT_ID&canal=311|WY2qa2wscgsd

Campos del body utilizados:
```json
{
  "SuministroExiste": "Boolean",
  "DocumentoErroneo": "Boolean",
  "Suministros": [
    {
      "Domicilio": "String",
      "Facturas": [
        {
          "importe": "String"
        }
      ]
    }
  ]
}
```
### Flujo:
#### status = 200, SuministroExiste = true, DocumentoErroneo = false
Por cada Suministros[i] sumar el saldo de Suministros[i].Facturas[j].importe
Luego dependiendo de si tiene saldo o no:
Mostrar Suministros[i].Domicilio + " registra un saldo de " + total
Mostrar Suministros[i].Domicilio + " no registra saldo pendiente"
