-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: dtd_db
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-0+deb12u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Membership`
--

DROP TABLE IF EXISTS `Membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Membership` (
  `MembershipID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `ActivationToken` varchar(255) NOT NULL,
  `TokenExpiry` timestamp NOT NULL,
  `IsActivated` tinyint(1) DEFAULT 0,
  `ActivatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`MembershipID`),
  UNIQUE KEY `ActivationToken` (`ActivationToken`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `Membership_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Membership`
--

LOCK TABLES `Membership` WRITE;
/*!40000 ALTER TABLE `Membership` DISABLE KEYS */;
/*!40000 ALTER TABLE `Membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT current_timestamp(),
  `LastLogin` timestamp NULL DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
(1,'arkiteq','amit@themobidev.org','$2b$10$kxs0NIRxDzP7KTv44B1Pm.dXrnHSMVinydZ2yyazQQPsA8cPwzwaG','2024-12-25 15:43:40',NULL,0),
(2,'arkiteq2','amit+2@themobidev.org','$2b$10$jRrR23FTkRBmSAzZsT6/g.wTkMNsJuYwJVY.uu63MPBJqHBC9L9ve','2024-12-28 16:55:43',NULL,0),
(3,'arkiteq3','amit+3@themobidev.org','$2b$10$xvNMuTVmfe4olEUHSYeACOHj0ceKLrbSM8CuQqIMOtjZBJtQWk9gK','2024-12-28 17:06:15',NULL,0),
(4,'arkiteq4','amit+4@themobidev.org','$2b$10$SuZRylWv8UHsw8t.sUB6hOlB/HKE9ivicE371R03d2Kds4rEV5dnS','2024-12-28 17:07:48',NULL,0),
(5,'arkiteq5','amit+5@themobidev.org','$2b$10$TKy1QhVvSFSYUsQ8aNj8qelHNHD7UlKjODq4UanPSv0F2XfHds2VC','2024-12-28 17:12:53',NULL,0),
(6,'arkiteq6','amit+6@themobidev.org','$2b$10$0cVqR022r9UaH2tCmuHGyujpEWHKlakpEjTMlPS2o6CxapmJeALw6','2024-12-28 17:13:21',NULL,0),
(7,'arkiteq7','amit+7@themobidev.org','$2b$10$a6y3h3LKhnpc0y0hrgMa3OAQSLF0ExlPiYLna2dxEz1gvaU1iBniW','2024-12-28 17:24:44',NULL,0),
(9,'arkiteq8','amit+8@themobidev.org','$2b$10$0KxWTFxqR3YeBl2jnKfEOONJIfRFDEIIhxbqyPa0SnQir4B3Kiut2','2024-12-28 17:25:34',NULL,0),
(10,'arkiteq11','amit+11@themobidev.org','$2b$10$u.yDqr2tiHUr6R/1jlTpyuUoHv2tDS9eRAdCYBoHTOAfr6MdGfNeK','2024-12-28 17:27:11',NULL,0),
(11,'arkiteq12','amit+12@themobidev.org','$2b$10$ZT2fvT2cprhpGuxWZTcrHuwCKggcHtnBeMrj20NcQe4ZHc3HNX6Ga','2024-12-28 17:31:42',NULL,0),
(12,'arkiteq13','amit+13@themobidev.org','$2b$10$W7i1WxwvEY/qkvjNQdphF.p6pdRmOtTYHzwNygws.T96kGcYGyAD.','2024-12-28 17:35:55',NULL,0),
(13,'arkiteq14','amit+14@themobidev.org','$2b$10$j7qsOofsVv.YDUBvBzub9ubG7bxtjhA.oRri8gVKIu3aO0y/bsiCG','2024-12-28 17:37:12',NULL,0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-29 11:55:01
