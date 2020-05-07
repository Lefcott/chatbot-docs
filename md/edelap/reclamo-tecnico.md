## Reclamo sin luz (API UGO) - Edelap
---------------------------------------------------------

#### Paso 1:
GET /api/v1/form_categories?forms_type=claim

Campos del body utilizados:
```json
[
  {
    "forms": [
      {
        id: "String",
        name: "String"
      }
    ] // Se toma el form con name = "Reclamo sin luz"
  }
] // Se toma el primer registro
```
##### Con el id del form se genera un reclamo:
POST /api/v1/form_responses
Campos del body utilizados:
```json
  {
    "Errors": [],
    "message": "String",
    "external_id": "String"
  }
```
##### Se devuelve un mensaje con el external_id obtenido