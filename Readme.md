# Plantilla de Webserver Node.js

Una plantilla de un webserver utilizando Express y cors. A partir de este este esqueleto 💀 ⚒️ podemos dearrollar todo lo necesario para desplegar una aplicación de NodeJS.

Las rutas y la lógica se encuentran separadas.

En la versión actual se añaden un par de Schemas para que sirvan de referencia en futuras aplicaciones

## Dependencias

1. [Express](https://github.com/expressjs/express, "express") Nos permite manejar las rutas de nuestro servidor. 
2. [cors](https://github.com/expressjs/cors, "cors") Es un middleware que nos permite solicitar recursos a una página web que se encuentre en otro dominio. Si no tenemos el [cors](https://es.wikipedia.org/wiki/Intercambio_de_recursos_de_origen_cruzado, "corsWiki") configurado.
3. [dotenv](https://www.npmjs.com/package/dotenv, "dotenv") Este módulo carga como variables globales lo que introduzcamos en el archivo `.env`. En esta aplicación se utiliza para indicar en número de puerto.
4. [Mongoose](https://mongoosejs.com/, "mongoose")
5. [BcryptJS](https://www.npmjs.com/package/bcryptjs, "bcrypt") Utilizamos este paquete para encriptar las contraseñas de los usuarios.
6. [Express-validator](https://express-validator.github.io/docs/, "express-validator") Paquete utilizado para validar el email
7. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken, "jsonwebtoken") Utilizamos este paquete para la creación de los tokens necesarios en el proceso de autentificación con la base de datos. En esta web [JWT](https://jwt.io/, "JWT") podemos simular tokens.

## Algunos tips 📌

 - Es habitual encontrar toda la lógica en el app.js. Aqui se ha creado la clase server para que quede todo más pulcro. Son formas de trabajar, yo prefiero dejar el inicio de mi aplicación lo más limpio posible.

 - La funcion `usersGet` espera 3 parámetros `{id, limit, name}` Se les da un valor por defecto en caso de que la petición lo los contenga para ayudar a evitar errores de ejecución.

 - En `router.put` paso la variable `id`. Será en el controlador correspondiente se gestionará. En este ejemplo tan solo lo muestro.

 - Normalmente no es una buena práctica pasar el archivo `.env` pero en este caso hago una excepción ya que será donde definamos el puerto por el que funcionará el servidor. Aunque lo correcto sería subir un archivo `.example_env`.

 - En `models/server.js` está dividida la lógica necesaria para levantar el server en las   
 
    - La función `middleware()` donde incluiremos los middlewares que necesite el serviodr.
    - La función `routes()` donde incluimos la ruta del html público (normalmente el directorio public).
    - El proceso `listen()` necesita el puerto que va a utilizar el servidor

👈 [Venimos de](https://es.wikipedia.org/wiki/Intercambio_de_recursos_de_origen_cruzado)

