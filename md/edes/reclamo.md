## Reclamo técnico Channel Whatsapp (Via Utility) - Edes

---

#### Paso 1. Verificar NIS:

GET /api/data/ugo/suministro/**_{ACCOUNTID}_**

Campos del body utilizados:

```json
{
  "Direccion": "String",
  "EstadoSuministro": "String"
}
```

Verifica el suministro. En caso de no existir, pide que lo vuelva a ingresar.

- **EstadoSuministro**: "Activo" --> **Paso 2**

- **EstadoSuministro**: "SuspendidoImpago" --> Muestra "Tu suministro se encuentra cortado por falta de pago. Regularizá tu situación pagando con sucursalvirtual.infoedes.com"

- **EstadoSuministro**: "BajaVoluntaria" --> Muestra "Tu suministro fue dado de baja. Por favor, comunicate al 08109993337 o acercate a la sucursal más cercana https://www.infoedes.com/empresa/sucursales"

- **EstadoSuministro**: "BajaImpago" --> Muestra "Tu suministro fue dado de baja por impago. Por favor, comunicate al 08109993337 o acercate a la sucursal más cercana https://www.infoedes.com/empresa/sucursales"

#### Paso 2. Estado técnico:

GET /api/data/ugo/suministro/**_{ACCOUNTID}_**/estadotecnico

Campos del body utilizados:

```json
{
  "EstadoTecnico": "String"
}
```

- **EstadoTecnico**: "SinInterrupcion" --> Seleccionar tipo de reclamo

  - Corte de luz --> **Paso 3**

  - Oscilaciones -->

  - Baja tensión -->

  - Alta tensión -->

- **EstadoTecnico**: "CorteProgramado" --> Informar suspensión del suministro y dar a elegir.

  - Realizarlo --> **Paso 3**
  - No realizarlo --> Mostrar "Ok, muchas gracias"

- **EstadoTecnico**: "PosibleIncidencia" ---> Mostrar "Estamos evaluando una falla en el sector de tu suministro" e ir al **Paso 3**

- **EstadoTecnico**: "InterrupcionNoPlanificada": Informar falla en el suministro y dar a elegir

  - Realizarlo --> **Paso 3**
  - No realizarlo --> Mostrar "Ok, muchas gracias"

#### Paso 3. Obtener formType (UGO):

GET /api/v1/form_categories?forms_type=claim

Campos del body utilizados:

```json
[
  {
    "forms": [
      {
        "id": "String",
        "name": "String"
      }
    ] // Se busca el que tenga name: "Reclamo Sin Luz"
  }
] // Se toma el primer elemento
```

#### Paso 4. Generar reclamo (UGO):

POST /api/v1/form_responses

Campos del body utilizados:

```json
{
  "external_id": "String",
  "message": "String"
}
```

Se mustra el mensaje con external_id
