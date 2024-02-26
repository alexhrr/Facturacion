# Facturacion
## Desarrollado por: Alex Humberto Rodriguez Rueda
API REST que permite la creacion de facturas. Haciendo uso de un listado de productos se crea una factura y mediante un pedido se agregan los correspondientes productos, asi mismo se calcula el valor neto de cada producto teniendo en cuenta la cantidad y finalmente se calcula el valor total de la factura.

## Lenguajes y Tecnologías utilizadas
- JavaScript
- Typescript
- Node.JS
- Express.JS

### Otras tecnologías implementadas
- TS-Nodemon
- body-parser
- Dotenv
- Eslint
- MySQL2

## Instalación y arranque del API
**1. Clonar este repositorio con el siguiente comando :-**
```bash
 git clone https://github.com/alexhrr/Facturacion.git
 cd Facturacion
```
**2. Instalar los paquetes requeridos :-**
```bash
 npm install
```
**3. Crear el archivo `.env` con las siguientes variables de entorno :-**
```bash
  HOST #Host donde se ejecuta la API
  PORT #Puerto donde se ejecuta la API
  DB_HOST #Host donde se ubica la base de datos 
  DB_USER #Usuario de la base de daots
  DB_PWD #Contraseña de la base de datos
  DB_NAME #Nombre de la base de datos
```

**4. Para ejecutar el proyecto, usar el siguiente comando :-**
```bash
 npm start
```

**5. Ya se puede consumir el API REST desde Postman! :-**

También se incluye al script para la creación de la base de datos junto con sus tablas y los valores iniciales

## Acerca del proyecto

### Modelo de Datos
Para la persistencia del aplicativo, se realizó hizo uso de una base de datos relacional, en la cual se implementó el siguiente modelo de datos
<div align="center">
  <img src="![Entidad relacion](https://github.com/alexhrr/Facturacion/assets/42241322/2cd84f3d-8e74-4b0b-aff3-008da7821ca2)" alt="Modelo de Datos">
</div>

### Servicios empleados
- Consulta de los productos creados para la factura.
- Creacion de un pedido, enviando el nombre del cliente, la fecha, el id de los productos y la cantidad de cada uno
- Consultar las facturas creadas.
- consultar el pedido con el id de la factura creada.

## Evidencia de Funcionamiento
- Consulta de los productos creados para la factura.
```bash
 GET 127.0.0.1:4100/producto
```
![Productos](https://github.com/alexhrr/Facturacion/assets/42241322/b20a7111-31dd-4b25-92fb-bdd190212d6e)

  
- Creacion de un pedido, enviando el nombre del cliente, la fecha, el id de los productos y la cantidad de cada uno
```bash
 POST 127.0.0.1:4100/pedido
```
![Creacion-Pedido](https://github.com/alexhrr/Facturacion/assets/42241322/5bf0a246-7ade-43f4-bf3b-30e54915fa4d)



- Consultar las facturas creadas.
```bash
 GET 127.0.0.1:4100/factura
```
![Consulta-facturas](https://github.com/alexhrr/Facturacion/assets/42241322/d01a13a7-f35b-4c94-a242-a19618bb1b9d)


- consultar el pedido con el id de la factura creada.
```bash
 GET 127.0.0.1:4100/pedido/:id_factura
```
![Consulta-pedido](https://github.com/alexhrr/Facturacion/assets/42241322/e6914b51-751e-4481-8fbd-4ecdd1f9f196)

