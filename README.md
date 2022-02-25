# appZarego
App tipo CRUD. Es una agenda que permite crear, leer, modificar y eliminar tareas ..

Una vez clonado el repositorio, seguir los siguientes pasos para la correcta ejecución de la app:


1- En línea de comandos ejecutar --> $ docker-compose up <-- (Levantamos los contenedores)

2- Modificar usuario y contraseña para acceder a la DB Mongo, para ello realizar en línea de comandos:

      --> $ docker exec -it mongo bash <-- (Ejecutamos terminal bash dentro del contenedor mongo)
      --> # mongo -u admin -p <-- (Acceso con el usuario definido por defecto)
      --> # password: passwrod <-- (Contraseña de dicho usuario)
      --> > use webapp <-- (Indicamos el nombre de la DB)
      --> > db.createUser({user: 'apiuser', pwd: 'apipassword', roles: [{role: 'readWrite', db: 'webapp'}]}) <-- (Creamos un nuevo usuario)
      
3- Ya tenemos corriendo la app en contenedores independientes..  
