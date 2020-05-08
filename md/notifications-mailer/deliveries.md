## API Notificaciones - Deliveries

URL stage: https://notifications-api-stage.widergydev.com/api/v1

URL prod : https://notifications-api.widergy.com/api/v1

---

#### Obtener el estado de un Delivery:

**GET** /mailer/delivery/**_{resourceId}_**

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- No requiere Body.

- Responses:

  - Status 200:
    - ```json
      {
        "id": "String",
        "utility_id": "Number",
        "errorMessage": "String",
        "errorCode": "String",
        "from": "String",
        "sender": "String",
        "to": ["String"],
        "cc": ["String"],
        "bcc": ["String"],
        "replyTo": ["String"],
        "constant_mapping": [{}]
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