-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.33-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando datos para la tabla histmedico.agenda: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
INSERT INTO `agenda` (`idagenda`, `nombre`, `apellidos`, `DirArchivo`, `direccion`, `FecCreacion`, `FecActualizacion`, `Habilitado`) VALUES
	(1, 'Aldo Francisco', 'Ortiz Garcia', NULL, 'Ejido la Angostura Saltillo Coahuila', '2018-07-25 18:08:21', '2018-07-25 18:08:21', 1),
	(2, 'aldo', 'aldo', NULL, 'aldo', '2018-07-31 18:05:53', '2018-07-31 18:05:53', 1),
	(3, 'alan', 'alan', NULL, 'alan', '2018-07-31 18:06:17', '2018-07-31 18:06:17', 1),
	(4, 'Agapito', 'Ortiz Guevara', NULL, 'Ejido La Angostura', '2018-08-07 13:40:37', '2018-08-07 13:40:37', 1);
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.areasplanta: ~20 rows (aproximadamente)
/*!40000 ALTER TABLE `areasplanta` DISABLE KEYS */;
INSERT INTO `areasplanta` (`idAreasPlanta`, `Area`) VALUES
	(8, 'MATERIALS MANAG AND STOCK SPRI'),
	(9, 'QUALITY PRODUCTION SEATS'),
	(10, 'Ing. De Pruebas'),
	(11, 'CALIDAD'),
	(12, 'FEHRER'),
	(13, 'DTNA'),
	(14, 'RESORTES'),
	(15, 'MATERIALES'),
	(16, 'MANTENIMIENTO'),
	(17, 'PROMASTER'),
	(18, 'BODEGA '),
	(19, 'DQS'),
	(20, 'EMBARQUES'),
	(21, 'COMPRAS'),
	(22, 'LIMPEZA'),
	(23, 'RESIDENTE'),
	(24, 'FTQ'),
	(25, 'FEHRER P3'),
	(26, 'SPOT'),
	(27, 'SOLDADURA');
/*!40000 ALTER TABLE `areasplanta` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.bitacoraconsulta: ~42 rows (aproximadamente)
/*!40000 ALTER TABLE `bitacoraconsulta` DISABLE KEYS */;
INSERT INTO `bitacoraconsulta` (`idBitacoraConsulta`, `IdSupervisor`, `IdEnfDoc`, `IdClasificacion`, `IdEmpleado`, `Diagnostico`, `Turno`, `CreationDate`, `ModifiedAt`, `IsEnabled`) VALUES
	(1, 3, 1, 2, 1, 'GEPI', 1, '2018-02-07 07:33:00', '2018-08-21 18:08:39', 1),
	(2, 4, 1, 2, 2, 'GEPI', 1, '2018-02-07 08:36:00', '2018-08-21 18:08:39', 1),
	(3, 5, 1, 2, 3, 'DOLO ABDOMINAL', 1, '2018-02-07 12:08:00', '2018-08-21 18:08:39', 1),
	(4, 4, 1, 4, 4, 'DOLOR A NIVEL LUMBAR POR CANSANCIO', 1, '2018-02-07 13:07:00', '2018-08-21 18:08:40', 1),
	(5, 50, 1, 5, 5, 'DOLOR DE GARGANTA  + TOS + EAP', 1, '2018-02-07 13:14:00', '2018-08-21 18:08:40', 1),
	(6, 5, 1, 1, 6, 'CEFALEA', 1, '2018-02-07 14:12:00', '2018-08-21 18:08:40', 1),
	(7, 4, 1, 6, 7, 'HERIDA MAS CONTUSI?N EN RODILLA IZQUIERDA POR CAIDA EN MOTO AYER', 1, '2018-02-07 14:29:00', '2018-08-21 18:08:41', 1),
	(8, 7, 1, 1, 8, 'CEFALEA + DOLOR TORACICO', 1, '2018-02-07 15:34:00', '2018-08-21 18:08:41', 1),
	(9, 8, 1, 2, 9, 'GEPI', 1, '2018-02-07 15:38:00', '2018-08-21 18:08:41', 1),
	(10, 51, 1, 7, 10, 'TOS SECA', 1, '2018-02-07 16:21:00', '2018-08-21 18:08:41', 1),
	(11, 10, 2, 4, 11, 'DOLOR A NIVEL LUMBAR, CANSANCIO', 2, '2018-02-06 22:43:00', '2018-08-21 18:08:42', 1),
	(12, 10, 2, 7, 12, 'DOLOR DE GARGANTA  ', 2, '2018-03-07 00:54:00', '2018-08-21 18:08:42', 1),
	(13, 11, 2, 1, 13, 'CEFALEA', 2, '2018-03-07 01:11:00', '2018-08-21 18:08:42', 1),
	(14, 5, 3, 8, 14, 'ALERGIA (NO REFIERE EL MOTIVO POR EL CUAL LE SALIO LA ALERGIA)', 3, '2018-03-07 06:59:00', '2018-08-21 18:08:42', 1),
	(15, 12, 3, 7, 15, 'GRIPE+DOLOR DE GARGANTA ', 3, '2018-03-07 07:41:00', '2018-08-21 18:08:42', 1),
	(16, 13, 3, 4, 16, 'DOLOR EN DORSAL Y PECHO NO RFIERE EL CUAL SEA EL DOLOR ', 3, '2018-03-07 07:44:00', '2018-08-21 18:08:42', 1),
	(17, 5, 3, 9, 17, 'COLICO MENSTRUAL', 3, '2018-03-07 07:51:00', '2018-08-21 18:08:42', 1),
	(18, 14, 1, 2, 18, 'COLON IRRITABLE', 1, '2018-03-07 09:14:00', '2018-08-21 18:08:43', 1),
	(19, 15, 1, 10, 19, 'DOLOR MOLAR', 1, '2018-03-07 10:22:00', '2018-08-21 18:08:43', 1),
	(20, 16, 1, 2, 20, 'EAP', 1, '2018-03-07 10:27:00', '2018-08-21 18:08:43', 1),
	(21, 52, 1, 9, 18, 'COLICOS MENSTRUALES', 1, '2018-03-07 11:39:00', '2018-08-21 18:08:43', 1),
	(22, 4, 1, 4, 21, 'DOLOR EN MU?ECA DERECHA Y PULGAR POR FORRADO DE DESCANZABRAZOS FORD', 1, '2018-03-07 11:51:00', '2018-08-21 18:08:43', 1),
	(23, 18, 2, 2, 22, 'RETORTIJOES + NAUCEAS.', 2, '2018-03-07 17:31:00', '2018-08-21 18:08:43', 1),
	(24, 19, 2, 1, 23, 'CEFALEA', 2, '2018-03-07 18:10:00', '2018-08-21 18:08:43', 1),
	(25, 20, 2, 1, 24, 'CEFALEA', 2, '2018-03-07 18:52:00', '2018-08-21 18:08:43', 1),
	(26, 13, 2, 4, 25, 'DOLOR EN ESPALDA BAJA POR CANSANCIO', 2, '2018-03-07 19:18:00', '2018-08-21 18:08:44', 1),
	(27, 19, 2, 4, 26, 'DOLOR EN CUELLO POR DORMIR MAL', 2, '2018-03-07 19:28:00', '2018-08-21 18:08:44', 1),
	(28, 19, 2, 2, 27, 'GASTRITIS', 2, '2018-03-07 20:12:00', '2018-08-21 18:08:44', 1),
	(29, 21, 2, 2, 28, 'AGRURAS', 2, '2018-04-07 00:12:00', '2018-08-21 18:08:44', 1),
	(30, 19, 2, 2, 29, 'RETORTIJOES + FLATULECIAS', 2, '2018-04-07 01:15:00', '2018-08-21 18:08:45', 1),
	(31, 14, 2, 1, 30, 'CEFALE', 2, '2018-04-07 01:53:00', '2018-08-21 18:08:45', 1),
	(32, 22, 3, 2, 31, 'GASTRITIS', 3, '2018-04-07 06:00:00', '2018-08-21 18:08:45', 1),
	(33, 23, 3, 1, 32, 'CEFALEA', 3, '2018-04-06 07:38:00', '2018-08-21 18:08:45', 1),
	(34, 16, 3, 2, 33, 'EAP', 3, '2018-04-06 07:41:00', '2018-08-21 18:08:45', 1),
	(35, 4, 1, 2, 34, 'GEPI', 1, '2018-04-07 09:09:00', '2018-08-21 18:08:45', 1),
	(36, 14, 1, 8, 35, 'PICADURA DE INSECTO EN REGI?N LUMBAR', 1, '2018-04-07 12:55:00', '2018-08-21 18:08:46', 1),
	(37, 4, 1, 1, 36, 'MAREO +  SENSACI?N DE DESVANECIMIENTO (TA 90/50)', 1, '2018-04-07 13:05:00', '2018-08-21 18:08:46', 1),
	(38, 24, 1, 4, 37, 'DOLOR EN BRAZO IZQUIERDO POR MAL MOVIMIENTO AL TOMAR RESPALDO DE FOAM', 1, '2018-04-07 15:38:00', '2018-08-21 18:08:46', 1),
	(39, 4, 1, 7, 38, 'TOS PRODUCTIVA + ESCURRIMIENTO NASAL', 1, '2018-04-07 16:18:00', '2018-08-21 18:08:46', 1),
	(40, 25, 2, 4, 39, 'DOLOR DE CINTURA POR CANSANCIO+', 2, '2018-04-06 19:06:00', '2018-08-21 18:08:46', 1),
	(41, 19, 2, 10, 40, 'DOLOR DE MUELA DEL JUICIO', 2, '2018-04-06 19:20:00', '2018-08-21 18:08:47', 1),
	(42, 25, 2, 4, 41, 'DOLOR EN RODILLA TIPO REUMA', 2, '2018-04-07 22:09:00', '2018-08-21 18:08:47', 1);
/*!40000 ALTER TABLE `bitacoraconsulta` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.clasificaciondolor: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `clasificaciondolor` DISABLE KEYS */;
INSERT INTO `clasificaciondolor` (`idClasificacionDolor`, `ClasifDesc`) VALUES
	(1, 'NEUROLOGICO'),
	(2, 'GASTROINTESTINAL'),
	(3, 'ESTOMACAL'),
	(4, 'MUSCULOESQUELETICO'),
	(5, 'RESPIRATORIO/GASTROINTESTINAL'),
	(6, 'LESION'),
	(7, 'RESPIRATORIO'),
	(8, 'DERMATOLOGICO'),
	(9, 'GINECOLOGICO'),
	(10, 'ODONTOLOGICO');
/*!40000 ALTER TABLE `clasificaciondolor` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.clasificacionmedicamento: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `clasificacionmedicamento` DISABLE KEYS */;
INSERT INTO `clasificacionmedicamento` (`idClasificacionMedicamento`, `ClasifMedDescripcion`) VALUES
	(1, 'PROCEDIMIENTOS'),
	(2, 'JARABE/SOLUCIÓN'),
	(3, 'VÍA ORAL'),
	(130, 'INYECTABLES');
/*!40000 ALTER TABLE `clasificacionmedicamento` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.departamento: ~18 rows (aproximadamente)
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` (`IdDepto`, `NombreDepto`) VALUES
	(1, 'Materiales'),
	(2, 'Calidad'),
	(3, 'Electronicos'),
	(4, 'FEHRER'),
	(5, 'DTNA'),
	(6, 'RESORTES'),
	(7, 'MANTENIMIENTO'),
	(8, 'PROMASTER'),
	(9, 'BODEGA '),
	(10, 'DQS'),
	(11, 'EMBARQUES'),
	(12, 'COMPRAS'),
	(13, 'LIMPEZA'),
	(14, 'RESIDENTE'),
	(15, 'FTQ'),
	(16, 'FEHRER P3'),
	(17, 'SPOT'),
	(18, 'SOLDADURA');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.empleados: ~41 rows (aproximadamente)
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` (`IdEmpleado`, `NumEmpleado`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `Area`, `IdDpto`, `sexo`, `actividad`, `FecAntiguedad`, `IsEnabled`, `CreatedAt`, `ModifiedAt`) VALUES
	(1, '1325', 'JESUS MIGUEL', 'SANTOS', 'GARCA', 11, 2, 'M', 'CALIDAD', '2018-08-21 18:08:39', 1, '2018-08-21 18:08:39', '2018-08-21 18:08:39'),
	(2, '6843', 'NOHEMI', 'GOMEZ', 'ARIAS', 12, 4, 'F', 'FEHRER', '2018-08-21 18:08:39', 1, '2018-08-21 18:08:39', '2018-08-21 18:08:39'),
	(3, '5978', 'HECTOR DANIEL', 'CORDERO', 'ROCHA', 13, 5, 'M', 'DTNA', '2018-08-21 18:08:39', 1, '2018-08-21 18:08:39', '2018-08-21 18:08:39'),
	(4, '6963', 'YOVANI', 'SAUCEDA', 'GARAY', 12, 4, 'F', 'FEHRER', '2018-08-21 18:08:39', 1, '2018-08-21 18:08:39', '2018-08-21 18:08:39'),
	(5, '6887', 'CARMEN', 'RODRIGUEZ', 'MARTINEZ', 14, 6, 'F', 'RESORTES', '2018-08-21 18:08:40', 1, '2018-08-21 18:08:40', '2018-08-21 18:08:40'),
	(6, '6839', 'JOSE ARMANDO', ' REYNOSO ', 'CAMPA', 13, 5, 'M', 'DTNA', '2018-08-21 18:08:40', 1, '2018-08-21 18:08:40', '2018-08-21 18:08:40'),
	(7, '6382', 'EVELY ', 'MORELOS ', 'ESCOBEDO', 12, 4, 'F', 'FEHRER', '2018-08-21 18:08:41', 1, '2018-08-21 18:08:41', '2018-08-21 18:08:41'),
	(8, '6467', 'LUIS ALFONSO', 'GARCIA', 'RODRIGUEZ', 15, 1, 'M', 'MATERIALES', '2018-08-21 18:08:41', 1, '2018-08-21 18:08:41', '2018-08-21 18:08:41'),
	(9, '1182', 'OCTAVIO', 'MARTINEZ', 'PEREZ', 16, 7, 'M', 'MANTENIMIENTO', '2018-08-21 18:08:41', 1, '2018-08-21 18:08:41', '2018-08-21 18:08:41'),
	(10, '5443', 'JAIME GUSTAVO', 'HERNANDEZ', 'VITELA', 14, 6, 'M', 'RESORTES', '2018-08-21 18:08:41', 1, '2018-08-21 18:08:41', '2018-08-21 18:08:41'),
	(11, '5491', 'ROSA MARIA', 'OLMEDO', 'MORALES', 17, 8, 'F', 'PROMASTER', '2018-08-21 18:08:42', 1, '2018-08-21 18:08:42', '2018-08-21 18:08:42'),
	(12, '5489', 'ELIUD', 'GARCIA', 'GARCIA', 17, 8, 'M', 'PROMASTER', '2018-08-21 18:08:42', 1, '2018-08-21 18:08:42', '2018-08-21 18:08:42'),
	(13, '6295', 'PEDRO', 'MAGAYANES', 'NIETO', 15, 1, 'M', 'MATERIALES', '2018-08-21 18:08:42', 1, '2018-08-21 18:08:42', '2018-08-21 18:08:42'),
	(14, '5947', 'MARIA', 'URBINA', 'NA', 13, 5, 'M', 'DTNA ', '2018-08-21 18:08:42', 1, '2018-08-21 18:08:42', '2018-08-21 18:08:42'),
	(15, '6208', 'FRANCISCO', 'CALES', 'MORALES', 18, 9, 'M', 'BODEGA ', '2018-08-21 18:08:42', 1, '2018-08-21 18:08:42', '2018-08-21 18:08:42'),
	(16, '7073', 'EVERARDO', 'CEPEDA', 'ENRIQUES', 17, 8, 'M', 'PROMASTER', '2018-08-21 18:08:42', 1, '2018-08-21 18:08:42', '2018-08-21 18:08:42'),
	(17, '5792', 'ALMA CECILIA', 'TORRES', 'PEREZ', 13, 5, 'F', 'DTNA', '2018-08-21 18:08:42', 1, '2018-08-21 18:08:42', '2018-08-21 18:08:42'),
	(18, '----', 'CAMILA', 'HERNANDEZ', 'VELAZQUEZ', 19, 10, 'F', 'DQS', '2018-08-21 18:08:43', 1, '2018-08-21 18:08:43', '2018-08-21 18:08:43'),
	(19, '1283', 'ALFONSO', 'DIAZ', 'MEDINA', 15, 1, 'M', 'MATERIALES', '2018-08-21 18:08:43', 1, '2018-08-21 18:08:43', '2018-08-21 18:08:43'),
	(20, '6128', 'VERONICA', 'ESPINOZA', 'CARREON', 20, 11, 'F', 'EMBARQUES', '2018-08-21 18:08:43', 1, '2018-08-21 18:08:43', '2018-08-21 18:08:43'),
	(21, '6955', 'JORGE', 'GARCIA', 'RODRIGUEZ', 12, 4, 'M', 'FEHRER', '2018-08-21 18:08:43', 1, '2018-08-21 18:08:43', '2018-08-21 18:08:43'),
	(22, '-----', 'CRISTIAN YAHIR', 'LOPEZ', 'RANGEL', 22, 13, 'M', 'LIMPEZA', '2018-08-21 18:08:43', 1, '2018-08-21 18:08:43', '2018-08-21 18:08:43'),
	(23, '6722', 'ISABEL GUADALUPE', 'FUENTES', 'ROBLEDO', 13, 5, 'F', 'DTNA', '2018-08-21 18:08:43', 1, '2018-08-21 18:08:43', '2018-08-21 18:08:43'),
	(24, '6389', 'JOSE LUIS', 'CASTILLO', 'GAYTAN', 17, 8, 'F', 'PROMASTER', '2018-08-21 18:08:43', 1, '2018-08-21 18:08:43', '2018-08-21 18:08:43'),
	(25, '6134', 'JUANA MARIA', 'GOMEZ', 'NA', 15, 1, 'F', 'MATERIALES', '2018-08-21 18:08:44', 1, '2018-08-21 18:08:44', '2018-08-21 18:08:44'),
	(26, '5837', 'JUAN ANTONIO', 'GARCIA', 'NAVEJAR', 13, 5, 'M', 'DTNA', '2018-08-21 18:08:44', 1, '2018-08-21 18:08:44', '2018-08-21 18:08:44'),
	(27, '6610', 'MIGUEL ANGEL', 'YEPE', 'DIAZ', 13, 5, 'M', 'DTNA', '2018-08-21 18:08:44', 1, '2018-08-21 18:08:44', '2018-08-21 18:08:44'),
	(28, '5504', 'JUAN CARLOS', 'BRIONES', 'NA', 20, 11, 'M', 'EMBARQUES', '2018-08-21 18:08:44', 1, '2018-08-21 18:08:44', '2018-08-21 18:08:44'),
	(29, '6737', 'MIGUE ANGEL', 'OVALLE', 'NA', 13, 5, 'M', 'DTNA', '2018-08-21 18:08:44', 1, '2018-08-21 18:08:44', '2018-08-21 18:08:44'),
	(30, '5253', 'JULIO', 'HERNANDEZ', 'NA', 11, 2, 'M', 'CALIDAD', '2018-08-21 18:08:45', 1, '2018-08-21 18:08:45', '2018-08-21 18:08:45'),
	(31, '6242', 'EDUARDO', 'NAVA', 'NA', 23, 14, 'M', 'RESIDENTE', '2018-08-21 18:08:45', 1, '2018-08-21 18:08:45', '2018-08-21 18:08:45'),
	(32, '6137', 'CINTIA', 'CASTILLO', 'HERNANDEZ', 12, 4, 'F', 'FEHRER', '2018-08-21 18:08:45', 1, '2018-08-21 18:08:45', '2018-08-21 18:08:45'),
	(33, '6542', 'EDGAR', 'LUGO', 'NA', 20, 11, 'M', 'EMBARQUES', '2018-08-21 18:08:45', 1, '2018-08-21 18:08:45', '2018-08-21 18:08:45'),
	(34, '6510', 'MARIA DE LAS MERCEDES', 'RUBIO', 'MOTA', 12, 4, 'F', 'FEHRER', '2018-08-21 18:08:45', 1, '2018-08-21 18:08:45', '2018-08-21 18:08:45'),
	(35, '---', 'JESUS ANTONIO', 'VALDEZ', 'ALVARADO', 24, 15, 'M', 'FTQ', '2018-08-21 18:08:46', 1, '2018-08-21 18:08:46', '2018-08-21 18:08:46'),
	(36, '6496', 'PERLA ELIZABETH', 'ROCHA', 'CALZADA', 12, 4, 'F', 'FEHRER', '2018-08-21 18:08:46', 1, '2018-08-21 18:08:46', '2018-08-21 18:08:46'),
	(37, '6857', 'EDITH', 'GONZALEZ', 'GERESANO', 25, 16, 'F', 'FEHRER P3', '2018-08-21 18:08:46', 1, '2018-08-21 18:08:46', '2018-08-21 18:08:46'),
	(38, '6812', 'LAURA MARTHA', 'GARCIA', 'JUAREZ', 12, 4, 'F', 'FEHRER', '2018-08-21 18:08:46', 1, '2018-08-21 18:08:46', '2018-08-21 18:08:46'),
	(39, '6052', 'ELIDA', 'BUSTOS', 'NA', 26, 17, 'F', 'SPOT', '2018-08-21 18:08:46', 1, '2018-08-21 18:08:46', '2018-08-21 18:08:46'),
	(40, '6146', 'CARLOS IVAN', 'MIRANDA', 'NA', 13, 5, 'M', 'DTNA', '2018-08-21 18:08:47', 1, '2018-08-21 18:08:47', '2018-08-21 18:08:47'),
	(41, '5876', 'JOSE HUBERTO', 'ROCHA', 'NA', 27, 18, 'M', 'SOLDADURA', '2018-08-21 18:08:47', 1, '2018-08-21 18:08:47', '2018-08-21 18:08:47');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.enfdoctable: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `enfdoctable` DISABLE KEYS */;
INSERT INTO `enfdoctable` (`IdDoc`, `Nombre`, `ApellidoMaterno`, `ApellidoPaterno`, `Titulo`, `Usuario`, `Password`, `PathImg`, `CreatedAt`, `IsEnabled`) VALUES
	(1, 'ADRIANA', 'MONROY', 'MARTINEZ', 'Dra.', '', '', '', '2018-08-21 18:08:39', 1),
	(2, 'RAFAEL', 'SOTO', 'LOPEZ', 'Enfermero/a', '', '', '', '2018-08-21 18:08:42', 1),
	(3, 'DULCE', 'NA', 'ESTRELLO', 'Enfermero/a', '', '', '', '2018-08-21 18:08:42', 1),
	(4, 'ALDO', 'GARCIA', 'ORTIZ', 'Dr.', 'ortizaldo14', 'saleroso01', '', '2018-08-28 18:40:09', 1),
	(5, 'Francisco', 'Garcia', 'Ortiz', 'Dr.', 'ortizaldolarglo', 'saleroso01', '../../images/ImgsPMed/Profile_File_txK0YsQfQZF1SobUexLW38u90.png', '2018-08-30 13:26:24', 1);
/*!40000 ALTER TABLE `enfdoctable` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.medicamentos: ~37 rows (aproximadamente)
/*!40000 ALTER TABLE `medicamentos` DISABLE KEYS */;
INSERT INTO `medicamentos` (`idMedicamento`, `IdClasificacion`, `Descripcion`, `CantidadMinima`, `Total`, `Presentacion`, `CantidadPresentacion`, `CantidadTempo`, `CreatedAt`, `ModifiedAt`, `IsEnabled`) VALUES
	(1, 3, 'AMPICILINA 500 MG CAPSULA', 10, 120, 'cap', 20, 20, '2018-08-13 13:52:27', '2018-08-13 13:52:27', 1),
	(2, 3, 'AMBROXOL TABLETA', 10, 60, 'tab', 20, 20, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(3, 3, 'ANTIFLUDES CAPSULAS', 10, 146, 'cap', 24, 24, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(4, 3, 'BENZONATATO 100 MG PERLA', 10, 138, 'mg', 20, 20, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(5, 3, 'BUTILHIOSCINA COMPUESTA 10 MG TABLETA', 10, 70, 'tab', 10, 10, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(6, 3, 'CAFIASPIRINA 500 MG TABLETA', 10, 0, 'tab', 100, 100, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(7, 3, 'CAPTOPRIL 25 MG TABLETA', 10, 44, 'tab', 30, 30, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(8, 3, 'DICLOFENACO 100 MG TABLETA', 10, 71, 'cap', 20, 20, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(9, 3, 'DICLOXACILINA 500 MG CAPSULA', 10, 166, 'tab', 20, 20, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(10, 3, 'DIFENIDOL 25 MG TABLETA', 10, 72, 'tab', 30, 30, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(11, 3, 'FENAZOPIRDINA 100 MG TABLETA', 10, 149, 'tab', 20, 20, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(12, 3, 'GRANEODIN TABLETA', 10, 150, 'tab', 24, 24, '2018-08-13 13:52:28', '2018-08-13 13:52:28', 1),
	(13, 3, 'IBUPROFENO 800 MG TABLETA', 10, 0, 'tab', 10, 10, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(14, 3, 'IBUPROFENO 600 MG TABLETA', 10, 98, 'tab', 10, 10, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(15, 3, 'KETOROLACO 10 MG TABLETA', 10, 74, 'tab', 10, 10, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(16, 3, 'LOPERAMIDA 2 MG TABLETA', 10, 84, 'tab', 12, 12, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(17, 3, 'LORATADINA10 MG TABLETA', 10, 52, 'tab', 10, 10, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(18, 3, 'METFORMINA 500 MG TABLETA', 10, 57, 'tab', 30, 30, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(19, 3, 'OMPERAZOL 20 MG CAPSULA', 10, 49, 'cap', 14, 14, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(20, 3, 'PARACETAMOL 500 MG TABLETA', 10, 81, 'tab', 10, 10, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(21, 3, 'PIROXICAM 20 MG TABLETA', 10, 102, 'tab', 20, 20, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(22, 3, 'METOCLOPRAMIDA TABLETA', 10, 107, 'tab', 20, 20, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(23, 3, 'RANITIDINA TABLETA', 10, 94, 'tab', 20, 20, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(24, 130, 'BENCILPENICILINA 1200 UL AMP', 10, 6, 'pza', 1, 1, '2018-08-13 13:52:29', '2018-08-13 13:52:29', 1),
	(25, 130, 'BUTILHIOSCINA 20 MG AMP ', 10, 25, 'mg', 3, 3, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(26, 130, 'DEXAMETASONA 8 MG  AMP', 10, 10, 'mg', 1, 1, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(27, 130, 'DICLOFENACO 75 MG INYECTABLE  ', 10, 13, 'mg', 2, 2, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(28, 130, 'DIFENIDOL 40 MG AMP ', 10, 0, 'mg', 2, 2, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(29, 130, 'HIDROXACOBALAMINA INY', 10, 0, 'pza', 0, 0, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(30, 130, 'KETOROLACO 30 MG AMP', 10, 2, 'mg', 3, 3, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(31, 130, 'MECLIZINA /PIRIDOXINA 1 MG AMP', 10, 13, 'mg', 5, 5, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(32, 130, 'METAMIZOL SODICO INYECTABLE ', 10, 7, 'pza', 3, 3, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(33, 130, 'OMEPRAZOL 40 MG  INYECTABLE ', 10, 3, 'mg', 1, 1, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(34, 130, 'TRIBEDOCE CON DEXAMETASONA', 10, 1, 'pza', 3, 3, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(35, 130, 'TRIBEDOCE', 10, 13, 'pza', 5, 5, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(36, 130, 'CEFTRIAXONA 1 GRAMO', 10, 14, 'pza', 1, 1, '2018-08-13 13:52:30', '2018-08-13 13:52:30', 1),
	(37, 130, 'AVAPENA', 10, 11, 'pza', 5, 5, '2018-08-13 13:52:31', '2018-08-28 16:19:27', 1);
/*!40000 ALTER TABLE `medicamentos` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.supervisor: ~46 rows (aproximadamente)
/*!40000 ALTER TABLE `supervisor` DISABLE KEYS */;
INSERT INTO `supervisor` (`idSupervisor`, `SupervisorName`) VALUES
	(1, 'Aldo Ortiz'),
	(2, 'Pedrito Sola'),
	(3, 'ARNOLDO GUAJARDO'),
	(4, 'ADAN OLGUIN'),
	(5, 'VICTOR LOPEZ'),
	(6, 'EDUARDO  QUI?ONES'),
	(7, 'JULIO ROMAN'),
	(8, 'ALAN RIVAS'),
	(9, 'EDUARDO  QUI?ONES'),
	(10, 'FREDY '),
	(11, 'ERICK'),
	(12, 'VIRGILIO LEDEZMA '),
	(13, 'ERICK CARDENAS '),
	(14, 'DANIEL NAVARRO'),
	(15, 'MARCELO CASTRO'),
	(16, 'JUAN CANDIDO'),
	(17, 'EDGAR NI?O'),
	(18, 'MARIA '),
	(19, 'CANDELARIO IBARRA'),
	(20, 'FREDY RAMIREZ'),
	(21, 'ISISDRO CHACON'),
	(22, 'ALFONSO DIAZ'),
	(23, 'ADAN OLGIN'),
	(24, 'RICARDO RENTERIA'),
	(25, 'RAUL RODARTE'),
	(26, 'EDUARDO  QUI?ONES'),
	(27, 'EDUARDO  QUI?ONES'),
	(28, 'EDGAR NI?O'),
	(29, 'EDUARDO  QUI?ONES'),
	(30, 'EDUARDO  QUI?ONES'),
	(31, 'EDGAR NI?O'),
	(32, 'EDUARDO  QUI?ONES'),
	(33, 'EDUARDO  QUI?ONES'),
	(34, 'EDGAR NI?O'),
	(35, 'EDUARDO  QUI?ONES'),
	(36, 'EDUARDO  QUI?ONES'),
	(37, 'EDGAR NI?O'),
	(38, 'EDUARDO  QUI?ONES'),
	(39, 'EDUARDO  QUI?ONES'),
	(40, 'EDGAR NI?O'),
	(41, 'EDUARDO  QUI?ONES'),
	(42, 'EDUARDO  QUI?ONES'),
	(43, 'EDGAR NI?O'),
	(44, 'EDUARDO  QUI?ONES'),
	(45, 'EDUARDO  QUI?ONES'),
	(46, 'EDGAR NI?O'),
	(47, 'EDUARDO  QUI?ONES'),
	(48, 'EDUARDO  QUI?ONES'),
	(49, 'EDGAR NI?O'),
	(50, 'EDUARDO  QUI?ONES'),
	(51, 'EDUARDO  QUI?ONES'),
	(52, 'EDGAR NI?O');
/*!40000 ALTER TABLE `supervisor` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.telefonosagenda: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `telefonosagenda` DISABLE KEYS */;
INSERT INTO `telefonosagenda` (`idTelefonosAgenda`, `IdAgenda`, `Telefono`, `FecCreacion`, `Habilitado`) VALUES
	(1, 1, '8442640072', '2018-07-25 18:08:21', 1),
	(2, 2, '8443640098', '2018-07-31 18:05:53', 1),
	(3, 3, '8443640098', '2018-07-31 18:06:17', 1),
	(4, 4, '8444172299', '2018-08-07 13:40:37', 1);
/*!40000 ALTER TABLE `telefonosagenda` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.tratamientobitacora: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tratamientobitacora` DISABLE KEYS */;
INSERT INTO `tratamientobitacora` (`IdTratBitacora`, `IdBitacora`, `IdMedicamento`, `CantidadMed`, `CreationDate`, `ModifiedDate`) VALUES
	(70, 27, 9, '3', '2018-08-07 17:25:54', '2018-08-07 17:25:54');
/*!40000 ALTER TABLE `tratamientobitacora` ENABLE KEYS */;

-- Volcando datos para la tabla histmedico.tratamientos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tratamientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tratamientos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
