# [ToDo App](https://app-ui-todo.herokuapp.com)

Todo-App, es una aplicación Web (similar a Trello) que le permitirá al usuario llevar organizadas sus listas de tarea, las cuales podrán ser organizadas a su vez en dashboards. La aplicación Web cuenta con un pequeño y básico sistema de logeo, mediante el cual el usuario podrá acceder a los apartados de la pagina. Algunas de las funcionalidades presentes en la app son las siguientes:


* Crear dashboard.
* Crear lista de tarea.
* Crear tarea/Editar tarea.
* Asignar/Remover usuarios a tarea.
* Asignar/Remover usuario a dashboard
* Pequeño buscar de tareas.
* Drag and Drop de tareas (entre listas)

## Construido con 🛠️

* [Node: 12.14.0](https://nodejs.org/en/)
* [Angular CLI: 9.0.](https://angular.io)
* [MongoDB (Servicio Mlab)](https://mlab.com)

### Pre-requisitos 📋

Para poner en marcha el proyecto debemos tener instalado.

```
NodeJS
Angular
```

### Instalación 🔧

Luego de descargar el código fuente. 
Debemos construir y instalar las dependencias del proyecto (API & Aplicación Web).

Para instalar las dependencias y ejecutar la API mediante linea de comando usamos los siguientes comandos (desde la raiz del proyecto)

```
npm install
npm run dev
ó
npm run prod (not ready), este script hace uso de PM2 para gestionar los procesos.
```

Luego instalaremos las dependencias necesarias para ejecutar la aplicación y seguido ejecutamos el proyecto

```
cd frontend
npm install
ng serve -o 

```

Los puertos correspondientes son los siguientes.
```
API : http://localhost:3000
App : http://localhost:4200
```

# Usuario y contraseña para test (login => ToDo App).
* email: todotest@gmail.com
* password: +123456

Si por alguna razón ocurre un problema al momento de ejecutar el proyecto, se podra acceder mediante la siguiente URL.

[ToDo App](https://app-ui-todo.herokuapp.com), este link los re-dirigirá a una copia del proyecto que se encuentra corriendo en un servidor de HEROKU, para cualquier inquietud podran contactarme via correo electronico.

#### Por el acceso a la base de datos no nos tenemos que preocupar, ya que implementamos una base de datos Online
## Autores 

* **Andrés Villazon** - [acvillazon](https://github.com/acvillazon)
