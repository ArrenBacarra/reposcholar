-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 08, 2024 at 01:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `superduperappdev`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `lastname` varchar(155) NOT NULL,
  `firstname` varchar(155) NOT NULL,
  `m_initial` varchar(2) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `degree_program` varchar(155) NOT NULL,
  `year_level` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `student_status` varchar(50) NOT NULL,
  `birthday` date DEFAULT NULL,
  `zipcode` varchar(10) NOT NULL,
  `unit` varchar(5) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `verification_token` varchar(255) DEFAULT NULL,
  `scholar_count` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `lastname`, `firstname`, `m_initial`, `gender`, `degree_program`, `year_level`, `email`, `phone_number`, `student_status`, `birthday`, `zipcode`, `unit`, `password`, `is_verified`, `verification_token`, `scholar_count`) VALUES
(6, 'Bacarra', 'Arrem Stefhen', 'R.', 'Female', 'CCJE', '4', 'arrenbacarra442@gmail.com', '09999999999', 'hehe', '0000-00-00', '5200', '23', '$2b$10$UdGDUM6wgRgdV8PPU3wVCOjXZ2iQ5MN9kjL2YWouMGKEZwqh/hJPi', 1, NULL, 1),
(7, '', '', '', '', '', '', 'rjaybalinton833@gmail.com', '', '', NULL, '', '', '$2b$10$GB3Bo9BYpPzsS1Bthw2VmeEGOV53WeWp6LNLc6hq/KGi.SQVfvDUm', 0, '3893235ea494d2f62400ffb21dfd6722fa7f096be5fe4570693123514ab80138', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
