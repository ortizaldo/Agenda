CREATE DATABASE  IF NOT EXISTS `grupoti` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `grupoti`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: grupoti
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agenda` (
  `idagenda` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `apellidos` varchar(250) DEFAULT NULL,
  `DirArchivo` text,
  `direccion` text,
  `FecCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `FecActualizacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `Habilitado` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idagenda`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonosagenda`
--

DROP TABLE IF EXISTS `telefonosagenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefonosagenda` (
  `idTelefonosAgenda` int(11) NOT NULL AUTO_INCREMENT,
  `IdAgenda` int(11) DEFAULT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `FecCreacion` datetime DEFAULT NULL,
  `Habilitado` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idTelefonosAgenda`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonosagenda`
--

LOCK TABLES `telefonosagenda` WRITE;
/*!40000 ALTER TABLE `telefonosagenda` DISABLE KEYS */;
INSERT INTO `telefonosagenda` VALUES (4,NULL,'8446780321','2018-03-23 08:15:06',1);
/*!40000 ALTER TABLE `telefonosagenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'grupoti'
--

--
-- Dumping routines for database 'grupoti'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-23  8:36:16
