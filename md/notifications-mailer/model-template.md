## API Notificaciones - Modelo de Template

```json
{
  "subject": "String", // Requerido
  "html": "String", // Requerido
  "text": "String",
  "templateConfig": {
    "html": {
      "braces": "String", // Length: 2, solo símbolos
      "braceRepeat": "Number" // Min: 1, Max: 50
    },
    "text": {
      "braces": "String", // Length: 2, solo símbolos
      "braceRepeat": "Number" // Min: 1, Max: 50
    }
  }
}
```
