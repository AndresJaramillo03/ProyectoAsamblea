use asambleabdp

SELECT * FROM dbo.accionista;
SELECT * FROM dbo.asamblea;
SELECT * FROM dbo.auxilio_bonificacion;
SELECT * FROM dbo.cargo_empleado;
SELECT * FROM dbo.cliente;
SELECT * FROM dbo.conexion_plataforma;
SELECT * FROM dbo.contacto_empresa;
SELECT * FROM dbo.contacto_persona;
SELECT * FROM dbo.datos_empleado;
SELECT * FROM dbo.datos_experiencia;
SELECT * FROM dbo.datos_persona;
SELECT * FROM dbo.detalle_nomina;
SELECT * FROM dbo.documentos;
SELECT * FROM dbo.educacion_empleado;
SELECT * FROM dbo.empresa;
SELECT * FROM dbo.familia_empleado;
SELECT * FROM dbo.mocion;
SELECT * FROM dbo.nomina_empleado;
SELECT * FROM dbo.participante_asamblea;
SELECT * FROM dbo.perfil;
SELECT * FROM dbo.resultados;
SELECT * FROM dbo.total_deducciones;
SELECT * FROM dbo.ubicacion_empleado;
SELECT * FROM dbo.ubicacion_empresa;
SELECT * FROM dbo.usuario;
SELECT * FROM dbo.votos;

EXEC sp_rename 'mocion', 'mocion_old';

CREATE TABLE mocion (
  codigo_mocion INT IDENTITY(1,1) PRIMARY KEY,
  codigo_asamblea_fk INT NOT NULL,
  tipo_votacion VARCHAR(50),
  pregunta VARCHAR(255),
  respuesta_mocion VARCHAR(255),
  descripcion VARCHAR(255)
);
ALTER TABLE mocion ADD activo BIT DEFAULT 1;

select*from mocion
select*from votos
select*from usuario



alter table mocion alter column codigo_asamblea_fk bigint
------------------
ALTER TABLE votos
DROP CONSTRAINT FK__votos__codigo_mo__6FE99F9F;
------------------
ALTER TABLE votos
ALTER COLUMN codigo_mocion_fk INT NOT NULL; -- O el tipo/cambio que necesites
------------------
ALTER TABLE votos
ADD CONSTRAINT FK__votos__codigo_mo__6FE99F9F
FOREIGN KEY (codigo_mocion_fk)
REFERENCES mocion(codigo_mocion); -- Ajusta si el nombre es diferente
------------------
ALTER TABLE Votos
ADD CONSTRAINT FK_Votos_Mocion
FOREIGN KEY (codigo_mocion_fk)
REFERENCES Mocion(codigo_mocion);
------------------
exec sp_rename 'votos.cantidad_votos','voto', 'column'
------------------
alter table votos alter column voto nvarchar(600)
------------------
SELECT COLUMN_NAME, DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Votos' AND COLUMN_NAME = 'voto';
------------------
 

