## API Notificaciones - Configuración de Bloqueos

URL stage: https://notifications-api-stage.widergydev.com/api/v1

URL prod : https://notifications-api.widergy.com/api/v1

---

#### Obtener la lista de Configuraciones de Bloqueos:

##### Nivel de autenticación: Administrador

**GET** /mailer/blockingConfigs

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
      {
        "message": "Got Blocking Configurations",
        "blockingConfigs": [
          {
            "id": "Number",
            "utility_id": "Number",
            "bounceTypes": ["String"],
            "configType": "String",
            "maxTriggers": "Number",
            "time": "Number",
            "unit": "String",
            "createdAt": "String",
            "updatedAt": "String"
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
      { "error": "Blocking Configurations not found" }
      ```
  - Status 500:
    - ```json
      { "error": "Error getting Blocking Configuration" }
      ```

---

#### Obtener una Configuración de Bloqueo:

##### Nivel de autenticación: Administrador

**GET** /mailer/blockingConfig/**_{ID}_**

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
      {
        "message": "Got Blocking Configuration",
        "blockingConfig": {
          "id": "Number",
          "utility_id": "Number",
          "bounceTypes": ["String"],
          "configType": "String",
          "maxTriggers": "Number",
          "time": "Number",
          "unit": "String",
          "createdAt": "String",
          "updatedAt": "String"
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
      { "error": "Blocking Configuration not found" }
      ```
  - Status 500:
    - ```json
      { "error": "Error getting Blocking Configuration" }
      ```

---

#### Eliminar una Configuración de Bloqueo:

##### Nivel de autenticación: Administrador

**DELETE** /mailer/blockingConfig/**_{ID}_**

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
      { "message": "Blocking Configuration deleted" }
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
      { "error": "Blocking Configuration not found" }
      ```
  - Status 500:
    - ```json
      { "error": "Error deleting Blocking Configuration" }
      ```

---

#### Crear una Configuración de Bloqueo:

##### Nivel de autenticación: Administrador

**DELETE** /mailer/blockingConfig/**_{ID}_**

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
  "bounceTypes": ["String"],
  "configType": "String", // Valores posibles: "MaxFrequency" y "MaxTotal"
  "maxTriggers": "Number",
  "time": "Number",
  "unit": "String"
}
```

- Responses:

  - Status 200:
    - ```json
      {
        "message": "Blocking Configuration created",
        "blockingConfig": {
          "id": "Number",
          "utility_id": "Number",
          "bounceTypes": ["String"],
          "configType": "String",
          "maxTriggers": "Number",
          "time": "Number",
          "unit": "String",
          "createdAt": "String",
          "updatedAt": "String"
        }
      }
      ```
  - Status 400:
    - ```json
      { "errors": ["String"] }
      ```
  - Status 401:
    - ```json
      { "error": "Not authorized" }
      ```
  - Status 404:
    - ```json
      { "error": "Blocking Configuration not found" }
      ```
  - Status 500:
    - ```json
      { "error": "Error deleting Blocking Configuration" }
      ```
