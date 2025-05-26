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
ALTER TABLE mocion ADD COLUMn activo TINYINT(1) DEFAULT 1;

select*from mocion