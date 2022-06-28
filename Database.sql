-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 23, 2022 at 06:03 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud_links`
--
CREATE DATABASE IF NOT EXISTS `crud_links` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `crud_links`;

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
CREATE TABLE IF NOT EXISTS `links` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `User_id` int(5) DEFAULT NULL,
  `Title` varchar(150) NOT NULL,
  `Url` varchar(255) NOT NULL,
  `Description` text,
  `Created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `fk_links_users` (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`ID`, `User_id`, `Title`, `Url`, `Description`, `Created_at`) VALUES
(2, 1, 'Teaching 14', 'http://localhost/phpmyadmin/sql.php?server=1&db=crud_links&table=sessions&pos=0', 'skdsjkd skdns', '2022-06-02 10:54:16'),
(3, 1, 'Youtube', 'https://github.com/imamhidayat92/nodejs-express-mysql', 'My favorite links', '2022-06-02 10:55:20');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('58mO3fGxcTK4OaDljCK5dhbTYqf6qsMe', 1654636421, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`) VALUES
(1, 'chere', '$2a$10$1yUaNgQ5Gv8uk7MAUXs0aeKrTpS.ZKuFfPzSYmSPeI9DnujAUiTVq', 'Chere Lemm');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `fk_links_users` FOREIGN KEY (`User_id`) REFERENCES `users` (`id`);
--
-- Database: `nodelogin`
--
CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(512) NOT NULL,
  `category` varchar(30) NOT NULL,
  `certificate` varchar(50) NOT NULL,
  `duration` int(30) NOT NULL,
  `cost` decimal(30,0) NOT NULL,
  `imagePath` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `code`, `title`, `description`, `category`, `certificate`, `duration`, `cost`, `imagePath`, `user_id`) VALUES
(46, 'BD5241', 'Backend Development', 'Backend development is one of the web development skills required by the Software Eng.', 'Web Development', 'Professional Certificate', 2, '200', 'None', 0),
(42, 'BW634', 'Web Design and Development', 'Backend development is one of the web development skills required by the Software Eng.', 'Internet Programming', 'Course completion', 2, '220', '/images/Course-BW634-2022-51-22.png', 13),
(47, 'BW634x', 'Basics of Web Design', 'Backend development is one of the web development skills required by the Software Eng.', 'Web Development', 'Course completion', 2, '220', 'None', 0),
(45, 'CN542', 'Computer Networking', 'Computer Networking is a process of connecting computing devices', 'Networking and Communication', 'Professional Certificate', 3, '561', 'None', 13),
(25, 'PM2456', 'Project Management', 'This site can’t be reached', 'Management', 'Participation Certificate', 3, '250', '/images/Course-PM412-2022-51-20.png', 0),
(49, 'PY5214x', 'Python for AI', 'Connect-flash module for Node. js is a web development framework', 'Web Development', 'Course completion', 3, '210', 'None', 0),
(43, 'UI568', 'Software UI/Ux Design', 'This site can’t be reached', 'Management', 'Participation Certificate', 1, '320', 'None', 13),
(48, 'UI568x', 'Software UI/Ux Design', 'This site can’t be reached', 'Management', 'Participation Certificate', 1, '320', 'None', 0),
(21, 'WB14', 'Nodjes', 'Connect-flash module for Node. js is a web development framework', 'Web Development', 'Course completion', 2, '120', '/images/Course-WB14-2022-51-20.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('0bd9nLzzjYc5DKB9YlLiaU69y0Lxs_DI', 1655712771, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-06-20T07:52:30.071Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),
('UP0LEqFc-uVxPn1Jet9RakuX481Z7DL4', 1654252991, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(11) NOT NULL DEFAULT '0',
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `gender`, `email`, `password`, `level`, `token`) VALUES
(10, 'Chere', 'Lemma', 'Male', 'chere.lemma@aastu.edu.et', '$2a$10$YyVz7JfNu.laUR37p5sEzOXr6oIp0etJlvE3GIjDuHeKnYaHYUCam', 1, 'T2v5b8g7QpT4nwvcKXRb'),
(13, 'Yared', 'Tassew', 'Male', 'yared.tassew@aastu.edu.et', '$2a$10$J.lYwYZ26R1cbLRyP8X7H.4LQ.a0kxZ1WRP46mCwg2Z3yiyzPM9P.', 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses` ADD FULLTEXT KEY `code` (`code`,`title`,`description`);
--
-- Database: `onlinestore`
--
CREATE DATABASE IF NOT EXISTS `onlinestore` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `onlinestore`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

DROP TABLE IF EXISTS `tbl_products`;
CREATE TABLE IF NOT EXISTS `tbl_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(500) NOT NULL,
  `price` varchar(500) NOT NULL,
  `category` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `product_name`, `price`, `category`) VALUES
(1, 'Samsung Galaxy S7 Edge', '$600', 'Mobile Phone'),
(2, 'Google nexus', '$450', 'Mobile Phone'),
(3, 'Apple IPhone 6', '$630', 'Mobile Phone'),
(4, 'Sony Vio', '$1200', 'Laptop'),
(5, 'Samsung T.V', '$900', 'T.V'),
(6, 'Apple IPAD', '$710', 'Tablet'),
(7, 'MacBook Pro', '$1000', 'Laptop'),
(8, 'Dell Laptop', '$950', 'Laptop'),
(9, 'Canon EOS 700D DSLR Camera', '$550', 'Camera'),
(10, 'Nikon D7100 DSLR Camera ', '$670', 'Camera'),
(11, 'Nokia Lumia 930', '349', 'Mobile Phone'),
(12, 'HTC Phone', '123', 'Mobile Phone'),
(13, 'LG Monitor', '210', 'Electronics'),
(14, 'Samsung Printer', '120', 'Electronics'),
(15, 'Samsung Gear Live Black - Made for Android', '125', 'Smart Watch'),
(16, 'Apple Watch', '250', 'Smart Watch');
--
-- Database: `phpsamples`
--
CREATE DATABASE IF NOT EXISTS `phpsamples` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `phpsamples`;

-- --------------------------------------------------------

--
-- Table structure for table `registered_users`
--

DROP TABLE IF EXISTS `registered_users`;
CREATE TABLE IF NOT EXISTS `registered_users` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registered_users`
--

INSERT INTO `registered_users` (`id`, `user_name`, `display_name`, `password`, `email`) VALUES
(1, 'aastu', 'AASTU', '1234', 'test@aastu.edu.et');
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `mob_no` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `mob_no`, `user_name`, `password`) VALUES
(4, 'Chere', 'Lemma', 912781654, 'admin', '123');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
