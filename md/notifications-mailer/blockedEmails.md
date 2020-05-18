## API Notificaciones - Emails Bloqueados

URL stage: https://notifications-api-stage.widergydev.com/api/v1

URL prod : https://notifications-api.widergy.com/api/v1

---

#### Obtener la lista de Emails bloqueados:

**GET** /mailer/blockedEmails

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- No requiere Body.

- Responses:

  - Status 200:
    - ```json
      { "blockedEmails": ["String"] }
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
      { "error": "Congrats! There are no blocked emails yet" }
      ```
  - Status 500:
    - ```json
      { "error": "{{ error }}" }
      ```

---

#### Obtener el detalle de bloqueo de un Email:

**GET** /mailer/blockingDetails/**_{email}_**

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- No requiere Body.

- Responses:

  - Status 200:
    - ```json
      {
        "details": {
          // Puede venir con "frequency", con "totalTriggers" o con los 2.
          "frequency": {
            "reached": {
              "time": "Number",
              "unit": "String",
              "triggers": "Number"
            },
            "bounceType": "String",
            "maxAllowed": {
              "time": "Number",
              "unit": "String",
              "maxTriggers": "Number"
            }
          },
          "totalTriggers": {
            "reached": "Number",
            "bounceType": "String",
            "maxAllowed": "Number"
          }
        }
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
      { "error": "The specified email is not blocked" }
      ```
  - Status 500:
    - ```json
      { "error": "Error getting Blocked Emails" }
      ```
