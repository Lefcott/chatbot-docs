## API Notificaciones - Configuración de Bloqueos

URL stage: https://notifications-api-stage.widergydev.com/api/v1

URL prod : https://notifications-api.widergy.com/api/v1

---

#### Obtener la lista de Emails Verificados:

##### Nivel de autenticación: Administrador

**GET** /mailer/verifiedEmails

- Headers:

```json
{
  "Authorization": "Bearer TOKEN",
  "UtilityID": "Number"
}
```

- No requiere Body.

- Responses:

  - Status 200:
    - ```json
      { "verifiedEmails": ["String"] }
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
      { "error": "Utility not found" }
      ```
  - Status 500:
    - ```json
      { "error": "Error getting Utility" }
      ```

---

#### Agregar un Email Verificado:

##### Nivel de autenticación: Administrador

**POST** /mailer/verifiedEmail

- Headers:

```json
{
  "Authorization": "Bearer TOKEN",
  "UtilityID": "Number"
}
```

- Body:

  ```json
  {
    "email": "String" // (Email válido)
  }
  ```

- Responses:

  - Status 200:
    - ```json
      {
        "message": "Email was successfully added",
        "utilitiesUpdated": "Number",
        "redis": {
          "status": "String"
        }
      }
      ```
  - Status 400:
    - ```json
      { "error": "Bad parameters" }
      ```
  - Status 409:
    - ```json
      { "error": "Email is already verified" }
      ```
  - Status 401:
    - ```json
      { "error": "Not authorized" }
      ```
  - Status 404:
    - ```json
      { "error": "Utility not found" }
      ```
  - Status 500:
    - ```json
      { "error": "Error getting Utility" }
      ```
  - Status 500:
    - ```json
      { "error": "Could not update Utility with new email list" }
      ```

---

#### Eliminar un Email Verificado:

##### Nivel de autenticación: Administrador

**DELETE** /mailer/verifiedEmail

- Headers:

```json
{
  "Authorization": "Bearer TOKEN",
  "UtilityID": "Number"
}
```

- Body:

  ```json
  {
    "email": "String" // (Email válido)
  }
  ```

- Responses:

  - Status 200:
    - ```json
      {
        "message": "Email was successfully deleted",
        "utilitiesUpdated": "Number",
        "redis": {
          "status": "String"
        }
      }
      ```
  - Status 400:
    - ```json
      { "error": "Bad parameters" }
      ```
  - Status 404:
    - ```json
      { "error": "Email is not verified" }
      ```
  - Status 404:
    - ```json
      { "error": "Utility not found" }
      ```
  - Status 401:
    - ```json
      { "error": "Not authorized" }
      ```
  - Status 500:
    - ```json
      { "error": "Error getting Utility" }
      ```
  - Status 500:
    - ```json
      { "error": "Could not update Utility with new email list" }
      ```
