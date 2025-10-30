Este proyecto trata de una pagina web que tenga un formulario que pueda guardar los usuarios 
con una imagen y que haga un listado de los usuarios ya creados  
La idea es que **cree,edite,elimine y liste los usarios**

Está dividido en dos partes:
- **Frontend:** ReactJS  
- **Backend:** Spring Boot con Spring Data JPA

La estructura de archivos que sigue el proyecto es la siguiente:

backend/

├── src/main/java/org/example/backend/ 

│ ├── controller/

│ │ └── UserController.java

│ ├── model/

│ │ └── User.java

│ ├── repository/

│ │ └── UserRepository.java

│ └── BackendApplication.java

└── resources/

└── application.properties

frontend/

├── src/components/

│ ├── UserList.jsx

│ ├── UserEdit.jsx

│ └── UserForm.jsx

└── App.js

## 🚀 Funcionalidades principales

### 🔸 Backend (Spring Boot)

#### Endpoints REST

| Método | Endpoint            | Descripción                     |
|:-------|:--------------------|:--------------------------------|
| GET    | `/user`             | Lista todos los usuarios.       |
| GET    | `/user/{id}`        | Obtiene un usuario por ID.      |
| POST   | `/user`             | Crea un nuevo usuario.          |
| PUT    | `/user/{id}`        | Actualiza un usuario existente. |
| DELETE | `/user/{id}`        | Elimina un usuario.             |