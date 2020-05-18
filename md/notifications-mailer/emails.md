## API Notificaciones - Emails

URL stage: https://notifications-api-stage.widergydev.com/api/v1

URL prod : https://notifications-api.widergy.com/api/v1

---

#### Enviar mail sin template:

**POST** /mailer/message

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- Body:

```json
{
  "from_name": "String",
  "from_email": "String", // Requerido (Email válido)
  "recipients": [
    // Requerido
    {
      "email": "String", // Requerido (Email válido)
      "type": "String" // Requerido (Valores posibles: "to", "cc", "bcc", "replyTo")
    }
  ],
  "model": {
    // Requerido
    "subject": "String" // Requerido
  },
  "html": "String", // Requerido
  "text": "String",
  "attachments": [
    {
      "content_type": "String", // Requerido
      "base64_content": "String", // Requerido
      "filename": "String" // Requerido
    }
  ],
  "metadata": {
    "sender": "String", // Requerido (Email válido)
    "metadata": [
      {
        "key": "String", // Requerido
        "value": "Any" // Requerido
      }
    ]
  }
}
```

- Responses:

  - Status 202:
    - ```json
      {
        "createdResourceId": "String",
        "message": "Email successfully created.",
        "_links": [
          {
            "href": "/api/v1/mailer/delivery/{{ deliveryId }}",
            "description": "Specific delivery"
          }
        ],
        "wontSend": {
          "to": ["String"],
          "cc": ["String"],
          "bcc": ["String"],
          "replyTo": ["String"]
        }
      }
      ```
  - Status 422:

    - ```json
      {
        "error": "Missing properties in field \"metadata\"",
        "missingKeys": ["String"]
      }
      ```

* Status 422:
  - ```json
    {
      "error": "Cannot send email because the 'to' recipient is blocked because of too many bounces or spam marks",
      "wontSend": {
        "to": ["String"],
        "cc": ["String"],
        "bcc": ["String"],
        "replyTo": ["String"]
      }
    }
    ```
* Status 400:
  - ```json
    { "error": "Bad parameters" }
    ```
* Status 401:
  - ```json
    { "error": "Not authorized" }
    ```
* Status 404:
  - ```json
    { "error": "Delivery not found" }
    ```
* Status 500:
  - ```json
    { "error": "{{ error }}" }
    ```

#### Enviar mail con template:

**POST** /mailer/message/**_{template_name}_**

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- Body:

```json
{
  "from_name": "String",
  "from_email": "String", // Requerido (Email válido)
  "recipients": [
    // Requerido
    {
      "email": "String", // Requerido (Email válido)
      "type": "String" // Requerido (Valores posibles: "to", "cc", "bcc", "replyTo")
    }
  ],
  "model": {
    // Requerido
    "subject": "String" // Requerido
  },
  "attachments": [
    {
      "content_type": "String", // Requerido
      "base64_content": "String", // Requerido
      "filename": "String" // Requerido
    }
  ],
  "metadata": {
    "sender": "String", // Requerido (Email válido)
    "metadata": [
      {
        "key": "String", // Requerido
        "value": "Any" // Requerido
      }
    ]
  }
}
```

- Responses:

  - Status 202:
    - ```json
      {
        "createdResourceId": "String",
        "message": "Email successfully created.",
        "_links": [
          {
            "href": "/api/v1/mailer/delivery/{{ deliveryId }}",
            "description": "Specific delivery"
          }
        ],
        "wontSend": {
          "to": ["String"],
          "cc": ["String"],
          "bcc": ["String"],
          "replyTo": ["String"]
        }
      }
      ```
  - Status 422:
    - ```json
      {
        "error": "Missing properties in field \"metadata\"",
        "missingKeys": ["String"]
      }
      ```
  - Status 400:
    - ```json
      { "error": "Bad parameters" }
      ```
  - Status 401:
    - ```json
      { "error": "Not authorized" }
      ```
  - Status 404:
    - ```json
      { "error": "Delivery not found" }
      ```
  - Status 500:
    - ```json
      { "error": "{{ error }}" }
      ```
