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
        "utility_id": "Number",
        "errorMessage": "String",
        "errorCode": "String",
        "from": "String",
        "sender": "String",
        "to": ["String"],
        "cc": ["String"],
        "bcc": ["String"],
        "replyTo": ["String"],
        "metadata": [{}], // Datos custom usados para renderizar el mail
        "statuses": [
          {
            "name": "String", // Nombre del evento, puede ser null, "Rejected", "AcceptedBySES", "Delivered", "Opened", "MarkedAsSpam", "UserClickedLink", "Bounced"
            "bounceType": "String", // Tipo de rechazo, puede ser null, "unknown", "hardGeneral", "hardNoEmail", "hardSuppressionList", "hardSuppressed", "softGeneral", "softMailboxFull", "softMessageTooLarge", "softContentRejected", "softAttachmentRejected"
            "timestamp": "Number", // Tiemstamp en milisegundos
            "link": "String", // Es null en eventos distintos de "UserClickedLink"
            "isGroup": "Boolean", // true si el evento afecta a todos los destinatarios
            "mail_recipient_id": "Number", // Es null para eventos grupales
            "delaySeconds": "Number" // Cantidad de segundos que pasaron desde el evento anterior
          }
        ]
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
