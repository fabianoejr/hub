-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: hub
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ci_sessions`
--

DROP TABLE IF EXISTS `ci_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) unsigned NOT NULL DEFAULT 0,
  `data` blob NOT NULL,
  KEY `ci_sessions_timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ci_sessions`
--

LOCK TABLES `ci_sessions` WRITE;
/*!40000 ALTER TABLE `ci_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `ci_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `cnpj` varchar(14) NOT NULL,
  `senha` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'SATC','000','123');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financeiro`
--

DROP TABLE IF EXISTS `financeiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financeiro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` int(11) NOT NULL,
  `id_segmento` int(11) NOT NULL,
  `descricao` varchar(256) NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  `status` enum('A','I') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`),
  KEY `financeiro_FK` (`id_empresa`),
  KEY `financeiro_FK_1` (`id_segmento`),
  CONSTRAINT `financeiro_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`),
  CONSTRAINT `financeiro_FK_1` FOREIGN KEY (`id_segmento`) REFERENCES `segmentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financeiro`
--

LOCK TABLES `financeiro` WRITE;
/*!40000 ALTER TABLE `financeiro` DISABLE KEYS */;
INSERT INTO `financeiro` VALUES (1,1,1,'Rotinas Empreendedoras',253.70,'A'),(2,1,2,'Espaço Cobusiness',3987.90,'A'),(3,1,3,'Difração de Raio X – DRX;',478.30,'A'),(4,1,4,'Consultorias Técnicas',8934.20,'A');
/*!40000 ALTER TABLE `financeiro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orcamentos`
--

DROP TABLE IF EXISTS `orcamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orcamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` int(11) NOT NULL,
  `id_segmento` int(11) NOT NULL,
  `descricao` varchar(256) NOT NULL,
  `detalhes` longtext DEFAULT NULL,
  `nome` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `telefone` varchar(32) NOT NULL,
  `dt_sistema` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orcamentos`
--

LOCK TABLES `orcamentos` WRITE;
/*!40000 ALTER TABLE `orcamentos` DISABLE KEYS */;
INSERT INTO `orcamentos` VALUES (1,1,1,'Programa Jovem Aprendiz','1312321','sdafsa','xczvxz','dsvsa','2024-05-20 20:15:34');
/*!40000 ALTER TABLE `orcamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propostas`
--

DROP TABLE IF EXISTS `propostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propostas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` int(11) NOT NULL,
  `id_segmento` int(11) NOT NULL,
  `descricao` varchar(512) NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  `orcamento` enum('S','N') NOT NULL DEFAULT 'N',
  `status` enum('A','I','P') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`),
  KEY `propostas_FK` (`id_empresa`),
  KEY `propostas_FK_1` (`id_segmento`),
  CONSTRAINT `propostas_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`),
  CONSTRAINT `propostas_FK_1` FOREIGN KEY (`id_segmento`) REFERENCES `segmentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propostas`
--

LOCK TABLES `propostas` WRITE;
/*!40000 ALTER TABLE `propostas` DISABLE KEYS */;
INSERT INTO `propostas` VALUES (1,1,1,'NR 11 - Operador de Empilhadeira',251.50,'N','A'),(2,1,1,'NR 13 - Caldeiras',342.60,'N','A'),(3,1,1,'NR 11 - Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis',112.40,'N','A'),(4,1,3,'Analises CONSEMA 181- Lançamento de Efluentes',177.90,'N','A'),(5,1,3,'Analises para Potabilidade',58.90,'N','A'),(6,1,2,'Cobusiness - Alocação de Espaço',5000.00,'N','A'),(7,1,4,'Consultoria em Meio Ambiente:',46000.00,'N','A'),(8,1,4,'Consultoria em Mineralogia e Petrografia;',32000.00,'N','A'),(9,1,1,'Programa Jovem Aprendiz',0.00,'S','P');
/*!40000 ALTER TABLE `propostas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recomendacoes`
--

DROP TABLE IF EXISTS `recomendacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recomendacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` int(11) NOT NULL,
  `id_segmento` int(11) NOT NULL,
  `descricao` varchar(256) NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  `detalhes` varchar(256) DEFAULT NULL,
  `imagem` varchar(1024) DEFAULT NULL,
  `url` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recomendacoes_FK` (`id_segmento`),
  KEY `recomendacoes_FK_1` (`id_empresa`),
  CONSTRAINT `recomendacoes_FK` FOREIGN KEY (`id_segmento`) REFERENCES `segmentos` (`id`),
  CONSTRAINT `recomendacoes_FK_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recomendacoes`
--

LOCK TABLES `recomendacoes` WRITE;
/*!40000 ALTER TABLE `recomendacoes` DISABLE KEYS */;
INSERT INTO `recomendacoes` VALUES (1,1,1,'NR 05 - Comissão Interna de Prevenção de Acidentes (CIPA)',89.90,'<b>Modalidade:</b> Híbrido <br> <b>Carga horária:<b/> 12h (8h online + 04h presencial)','http://localhost:8056/hub/assets/img/1.jpg',NULL),(2,1,1,'NR 10 - Básico',275.40,'<b>Modalidade:</b> Online <br> <b>Carga horária:<b/> 40h','http://localhost:8056/hub/assets/img/2.jpg',NULL),(3,1,1,'NR 20 - Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis',54.00,'<b>Modalidade:</b> Online <br> <b>Carga horária:<b/> 4h','http://localhost:8056/hub/assets/img/3.jpg',NULL),(4,1,1,'Programa Jovem Aprendiz',0.00,'Cursos de formação para jovens aprendizes.','http://localhost:8056/hub/assets/img/4.jpg',NULL),(5,1,1,'Consultoria em Beneficiamento de Minérios',0.00,'Purificar minérios através de métodos físicos ou químicos.','http://localhost:8056/hub/assets/img/6.jpg',NULL),(6,1,1,'Ensaios Laboratoriais de Óleos Isolantes',0.00,'Fazer diagnósticos e emitir laudos sobre as condições dos fluidos isolantes e equipamentos','http://localhost:8056/hub/assets/img/7.jpg',NULL);
/*!40000 ALTER TABLE `recomendacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `segmentos`
--

DROP TABLE IF EXISTS `segmentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `segmentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `segmentos`
--

LOCK TABLES `segmentos` WRITE;
/*!40000 ALTER TABLE `segmentos` DISABLE KEYS */;
INSERT INTO `segmentos` VALUES (1,'Ed. Corporativa'),(2,'Inovação'),(3,'Laboratórios'),(4,'Consultorias');
/*!40000 ALTER TABLE `segmentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_propostas_empresa`
--

DROP TABLE IF EXISTS `view_propostas_empresa`;
/*!50001 DROP VIEW IF EXISTS `view_propostas_empresa`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_propostas_empresa` AS SELECT 
 1 AS `id_empresa`,
 1 AS `nome`,
 1 AS `cnpj`,
 1 AS `id_proposta`,
 1 AS `id_segmento`,
 1 AS `descricao_proposta`,
 1 AS `valor_proposta`,
 1 AS `status_proposta`,
 1 AS `orcamento`,
 1 AS `status_proposta_descricao`,
 1 AS `descricao_segmento`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'hub'
--

--
-- Final view structure for view `view_propostas_empresa`
--

/*!50001 DROP VIEW IF EXISTS `view_propostas_empresa`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_propostas_empresa` AS select `b`.`id` AS `id_empresa`,`b`.`nome` AS `nome`,`b`.`cnpj` AS `cnpj`,`a`.`id` AS `id_proposta`,`c`.`id` AS `id_segmento`,`a`.`descricao` AS `descricao_proposta`,`a`.`valor` AS `valor_proposta`,`a`.`status` AS `status_proposta`,`a`.`orcamento` AS `orcamento`,case `a`.`status` when 'A' then 'Ativa' when 'I' then 'Inativa' when 'C' then 'Concluída' when 'P' then 'Pendente' end AS `status_proposta_descricao`,`c`.`descricao` AS `descricao_segmento` from ((`propostas` `a` join `empresas` `b` on(`a`.`id_empresa` = `b`.`id`)) join `segmentos` `c` on(`c`.`id` = `a`.`id_segmento`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20 22:27:04
