## API Notificaciones - Templates

URL stage: https://notifications-api-stage.widergydev.com/api/v1

URL prod : https://notifications-api.widergy.com/api/v1

---

#### Crear un Template:

**POST** /mailer/template/**_{name}_**

- Headers:

```json
{ "authorization": "Bearer TOKEN" }
```

- Body: [Modelo de Template](model-template)

#### Actualizar un Template:

**PUT** /mailer/template/**_{name}_**

- Headers:

```json
{ "authorization": "Bearer TOKEN" }
```

- Body: [Modelo de Template](model-template)

#### Eliminar un Template:

**DELETE** /mailer/template/**_{name}_**

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- No requiere Body.

#### Obtener un Template:

**GET** /mailer/template/**_{name}_**

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- No requiere Body.

- Responses:

  - Status 200 ([Ver modelo de Template](model-template)):

    - ```json
      {
        "message": "getTemplate OK.",
        "template": Modelo de Template
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
      { "error": "Template not found" }
      ```
  - Status 500:
    - ```json
      { "error": "{{ error }}" }
      ```

#### Obtener todos los Templates:

**GET** /mailer/templates

- Headers:

```json
{ "Authorization": "Bearer TOKEN" }
```

- No requiere Body.

- Responses:

  - Status 200 ([Ver modelo de Template](model-template)):

    - ```json
      {
        "errors": [],
        "templates": [Modelo de Template]
      }
      ```

  - Status 207 ([Ver modelo de Template](model-template)):

    - ```json
      {
        "errors": ["String"],
        "templates": [Modelo de Template]
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
      { "error": "Template not found" }
      ```
  - Status 500:
    - ```json
      { "error": "{{ error }}" }
      ```
  - Status 500:

    - ```json
      {
        "errors": ["String"],
        "templates": []
      }
      ```
