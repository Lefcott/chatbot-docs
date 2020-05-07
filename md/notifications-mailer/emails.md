## API Notificaciones - Emails

URL stage: https://notifications-api-stage.widergydev.com

URL prod : https://notifications-api.widergy.com

---

#### Paso 1.Token:

GET /consumer_api/v1/sessions

Campos del body utilizados:

```json
{ "access_token": "String" }
```

#### Paso 2. Suministros:

GET /consumer_api/v1/accounts?document_type=%DOCUMENTTYPE%&document_number=_DOCUMENTNUMBER_

Campos del body utilizados:

```json
{
  "accounts": [
    {
      "client_number": "String",
      "address": "String"
    }
  ]
}
```

Muestra el NIS asociado a cada suministro.
