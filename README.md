

# >> APP TASKS << 

Se trata de una App tipo CRUD (Create, Read, Update and Delete). Es una agenda que permite crear, leer, modificar y eliminar tareas ..
También permite asignarle un estado actual a la taréa agendada (Pending - In Progress - Done)..


### Tecnologías integradas en el proyecto: 
      >> Docker
      >> MongoDB
      >> Flask
      >> React.js
      
La arquitectura del software recae en 3 contenedores Docker, dentro de los cuales albergamos la DB (MongoDB) por un lado, la API (Flask) por otro y finalmente la interfaz de usuario (React.js).. Los mismos son orquestados por el archivo >> docker-compose.yml << que se encuentra en la raíz del proyecto. Para comprender la construcción de los contenedores de forma individuales visite el archivo >> Dockerfile << ubicados en las carpetas backend y frontend.


### Una vez clonado el repositorio, seguir los siguientes pasos para la correcta ejecución de la app:

1- En línea de comandos ejecutar --> $ **docker-compose up -d** <-- (Levantamos los contenedores y los hacemos correr en segundo plano)

2- Modificar usuario y contraseña para acceder a la DB Mongo, para ello ejecutar en línea de comandos:

      --> docker exec -it mongo bash <-- (Ejecutamos terminal bash dentro del contenedor mongo)
      
      --> mongo -u admin -p <-- (Acceso con el usuario definido por defecto)
      
      --> password: passwrod <-- (Contraseña de dicho usuario)
      
      --> use webapp <-- (Indicamos el nombre de la DB)
      
      --> db.createUser({user: 'apiuser', pwd: 'apipassword', roles: [{role: 'readWrite', db: 'webapp'}]}) <-- (Creamos un nuevo usuario)
      
3- Ya tenemos corriendo la app en contenedores independientes y acceso a la DB..

4- Comprobación en "POSTMAN" del funcionamiento backend de la app:

      --> [GET] http://localhost:5000/tasks  (Obtenemos la lista completa de tareas almacenadas)..
      
      --> [POST] http://localhost:5000/tasks
        - body: {
                  "title": "Creando desde postman",
                  "description": "Probando desde postman",
                  "status": "In Progress"
                }
        - copiar ID de la tarea creada para utilizar en siguientes pasos..
                
      --> [PUT] http://localhost:5000/tasks/<<Colocar aquí el ID que copiamos>>
        - body: {
                  "title": "Actualizando desde postman",
                  "description": "Descipción desde postman actualizada",
                  "status": "Done"
                }

      --> [GET] http://localhost:5000/tasks (Veremos la tarea con los valores actualizados)..
      
      --> [DELETE] http://localhost:5000/tasks/<<Colocar aquí el ID que copiamos>>
      
      --> [GET] http://localhost:5000/tasks (La tarea se eliminó y tenemos un Array vacío)..
