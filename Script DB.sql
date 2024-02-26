CREATE DATABASE facturacion;
USE facturacion;

create table factura(
	id_factura int auto_increment primary key,
    cliente varchar(60) not null,
    fecha date not null
);
                        
create table producto(
	id_producto int auto_increment primary key,
    nombre varchar(40) not null,
    valor double not null
);

create table pedido(
	id_pedido int auto_increment primary key,
    id_factura int not null,
    id_producto int not null,
    cantidad int not null,
    foreign key (id_factura) references factura(id_factura),
    foreign key (id_producto) references producto(id_producto)
);

insert into producto (nombre, valor) values 
	("Lapiz", 500),
    ("Cuaderno", 2500),
     ("Esfero", 1000),
     ("Folder", 5000),
    ("Borrador", 800),
    ("Regla", 1500);
    
insert into factura (cliente,fecha) values ('Juan Hernandez','26-02-24');   

insert into pedido(id_factura,id_producto,cantidad) values 
	(1,1,10),
    (1,3,2),
    (1,4,5);
 
 
select * from factura;
select * from producto;
select * from pedido;

SELECT factura.cliente, factura.fecha, producto.nombre,producto.valor,pedido.cantidad
FROM pedido
INNER JOIN producto ON pedido.id_producto = producto.id_producto
INNER JOIN factura ON pedido.id_factura = factura.id_factura
WHERE pedido.id_factura = 15;
