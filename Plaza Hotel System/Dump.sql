-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hotel_rooms
-- ------------------------------------------------------
-- Server version	5.6.24

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
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `colour` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'green'),(2,'green'),(3,'green'),(4,'green'),(5,'green'),(6,'green'),(7,'green'),(8,'red'),(9,'green'),(10,'green'),(11,'green'),(12,'green'),(13,'green'),(14,'green'),(15,'red'),(16,'green'),(17,'green'),(18,'green'),(19,'green'),(20,'green'),(21,'green'),(22,'green'),(23,'green'),(24,'red'),(25,'green'),(26,'green'),(27,'red'),(28,'green'),(29,'red'),(30,'green'),(31,'green'),(32,'red'),(33,'green'),(34,'green'),(35,'green'),(36,'red'),(37,'green'),(38,'green'),(39,'red'),(40,'green'),(41,'yellow'),(42,'red'),(43,'yellow'),(44,'red'),(45,'yellow'),(46,'yellow'),(47,'yellow'),(48,'red'),(49,'red'),(50,'yellow');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('Catalina','12345'),('Bogdan','23456'),('Alexandru','34567'),('Stefan','45678');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `room` int(11) NOT NULL,
  `customer_name` varchar(45) DEFAULT NULL,
  `checkin` varchar(45) DEFAULT NULL,
  `checkout` varchar(45) DEFAULT NULL,
  `total_sum` double DEFAULT NULL,
  PRIMARY KEY (`room`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Catalina Boznea','21/06/2015','30/06/2015',2574),(2,'Bogdan Nedelea','21/06/2015','30/06/2015',0),(3,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(4,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(5,'Bogdan Nedela','25/05/2015','30/06/2015',350),(6,'Catalina Boznea','25/05/2015','30/06/2015',350),(7,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(8,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(9,'Bogdan Nedela','25/05/2015','30/06/2015',350),(10,'Catalina Boznea','25/05/2015','30/06/2015',350),(11,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(12,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(13,'Bogdan Nedela','25/05/2015','30/06/2015',350),(14,'Catalina Boznea','25/05/2015','30/06/2015',350),(15,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(16,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(17,'Bogdan Nedela','25/05/2015','30/06/2015',350),(18,'Catalina Boznea','25/05/2015','30/06/2015',350),(19,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(20,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(21,'Bogdan Nedela','25/05/2015','30/06/2015',350),(22,'Catalina Boznea','25/05/2015','30/06/2015',350),(23,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(24,'Bogdan Nedela','25/05/2015','30/06/2015',350),(25,'Catalina Boznea','25/05/2015','30/06/2015',350),(26,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(27,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(28,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(29,'Bogdan Nedela','25/05/2015','30/06/2015',350),(30,'Catalina Boznea','25/05/2015','30/06/2015',350),(31,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(32,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(33,'Bogdan Nedela','25/05/2015','30/06/2015',350),(34,'Catalina Boznea','25/05/2015','30/06/2015',350),(35,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(36,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(37,'Bogdan Nedela','25/05/2015','30/06/2015',350),(38,'Catalina Boznea','25/05/2015','30/06/2015',350),(39,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(40,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(41,'Bogdan Nedela','25/05/2015','30/06/2015',350),(42,'Catalina Boznea','25/05/2015','30/06/2015',350),(43,'Stefan Dimitriu','25/05/2015','30/06/2015',350),(44,'Bogdan Nedela','25/05/2015','30/06/2015',350),(45,'Catalina Boznea','25/05/2015','30/06/2015',350),(46,'Alexandru Lazaroiu','25/05/2015','30/06/2015',350),(47,'Bogdan Nedela','25/05/2015','30/06/2015',350),(48,'Stefan Dimitriu','25/05/2015','30/06/2015',0),(49,'Catalina Bozmea','25/05/2015','30/06/2015',0),(50,'Bogdan Nedela','25/05/2015','30/06/2015',350);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-21  5:32:33
