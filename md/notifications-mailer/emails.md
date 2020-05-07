## API Notificaciones - Emails

URL stage: https://notifications-api-stage.widergydev.com/api/v1

URL prod : https://notifications-api.widergy.com/api/v1

---

#### Enviar mail sin template:

**POST** /mailer/message

- Headers:

```json
{ "authorization": "Bearer TOKEN" }
```

- Body:

```json
{
  "from_name": "String",
  "recipients": [ // (Requerido)
    {
      "email": "String", // (Requerido) Email válido
      "type": "String" // (Requerido) Valores posibles: "to", "cc", "bcc", "replyTo"
    }
  ],
  "model": { // (Requerido)
    "subject": "String" // (Requerido)
  },
  "text": "String", // (Requerido en caso de no venir html)
  "html": "String", // (Requerido en caso de no venir text)
  "attachments": [
    {
      "content_type": "String", // (Requerido)
      "base64_content": "String", // (Requerido)
      "filename": "String" // (Requerido)
    }
  ],
  "metadata": {
    "sender": "String", // (Requerido) Email válido
    "metadata": [
      {
        "key": "String", // (Requerido)
        "value": "Any" // (Requerido)
      }
    ]
  }
}
```

#### Enviar mail con template:

**POST** /mailer/message/**_{template_name}_**

- Headers:

```json
{ "authorization": "Bearer TOKEN" }
```

- Body:

```json
{
  "from_name": "String",
  "recipients": [ // (Requerido)
    {
      "email": "String", // (Requerido) Email válido
      "type": "String" // (Requerido) Valores posibles: "to", "cc", "bcc", "replyTo"
    }
  ],
  "model": { // (Requerido)
    "subject": "String" // (Requerido)
  },
  "attachments": [
    {
      "content_type": "String", // (Requerido)
      "base64_content": "String", // (Requerido)
      "filename": "String" // (Requerido)
    }
  ],
  "metadata": {
    "sender": "String", // (Requerido) Email válido
    "metadata": [
      {
        "key": "String", // (Requerido)
        "value": "Any" // (Requerido)
      }
    ]
  }
}
```
