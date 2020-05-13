## API Notificaciones - Modelo de Template

```json
{
  "subject": "String", // Requerido
  "html": "String", // Requerido
  "text": "String",
  "tags": ["{{", "}}"], // (Tags de apertura y cierre)
  "dataShape": {} // (Indica los campos requeridos y opcionales de la matadata)
}
```

##### Ejemplo de "dataShape":

```json
{
  "subject": "required",
  "userName": "optional",
  "someArray": [ // Describe la estructura de todos los elementos del array
    {
      "imageSource": "required",
      "title": "required",
      "otherArray": [
        {
          "imageSource": "optional",
          "title": "required"
        }
      ]
    }
  ]
}
```
