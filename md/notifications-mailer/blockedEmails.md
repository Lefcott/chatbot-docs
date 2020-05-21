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
          // Puede venir con "frequency", con "totalTriggers", con los 2 o con "manualBlocking".
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
          },
          "manualBlocking": { "description": "String"}
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

---

#### Bloquear un Email:

**POST** /mailer/blockEmail

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- Body:
```json
{
  "email": "String", // Requerido
  "description": "String"
}
```

- Responses:

  - Status 200:
    - ```json
      {
        "message": "Recipient was blocked successfully!",
        "updatedRecipient": {
          "id": "Number",
          "utility_id": "Number",
          "email": "String",
          "blocked": true,
          "blockingReason": {
            "manualBlocking": {
              "description": "String"
            }
          },
          "createdAt": "String",
          "updatedAt": "String"
        }
      }
      ```
  - Status 400:
    - ```json
      { "error": "Bad parameters" }
      ```
  - Status 409:
    - ```json
      { "error": "That email is aleady blocked" }
      ```
  - Status 401:
    - ```json
      { "error": "Not authorized" }
      ```
  - Status 500:
    - ```json
      { "error": "{error}" }
      ```
      
---

#### Desbloquear un Email:

**POST** /mailer/unblockEmail

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- Body:
```json
{
  "email": "String", // Requerido
}
```

- Responses:

  - Status 200:
    - ```json
      { "message": "Recipient was unblocked successfully!" }
      ```
  - Status 400:
    - ```json
      { "error": "Bad parameters" }
      ```
  - Status 409:
    - ```json
      { "error": "That email was not blocked" }
      ```
  - Status 401:
    - ```json
      { "error": "Not authorized" }
      ```
  - Status 500:
    - ```json
      { "error": "Could not update the recipient" }
      ```