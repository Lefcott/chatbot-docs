## Consulta de tarifa Social - Camuzzi
---------------------------------------------------------

GET /api/Suministro/GetTarifaSocial?NumeroDocumento=%DOCUMENT_NUMBER&Sexo=%SEX_CHOICE

Campos del body utilizados:
```js
{
  "SuministroExiste": "Boolean",
  "DocumentoErroneo": "Boolean",
  "Suministros": [
    {
      "Domicilio": "String",
      "TieneTarifaSocial": "Boolean"
    }
  ]
}
```
### Flujo:
#### status = 200, SuministroExiste = true, DocumentoErroneo = false
Iterar Suministros mostrando un mensaje dependiendo de Suministros[i].TieneTarifaSocial:
Mostrar Suministros[i].Domicilio + " es beneficiario del programa Tarifa Social"
Mostrar Suministros[i].Domicilio + " no es beneficiario del programa Tarifa Social"
#### En otro caso
Mostrar "Lo sentimos pero no registramos ningún cliente con el documento y género informado."
