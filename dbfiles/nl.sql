-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2022 at 07:20 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_login`
--

-- --------------------------------------------------------

--
-- Table structure for table `rtokens`
--

CREATE TABLE `rtokens` (
  `token` text NOT NULL,
  `id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rtokens`
--

INSERT INTO `rtokens` (`token`, `id`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBwaiIsInBhc3N3b3JkIjoiODU5eTczNSIsImlkIjoiZGFhMzRiNGMtNjM1YS00YzRmLWIxZjAtODEyZjZjMzJhZmNlIiwiaWF0IjoxNjQyNjEwNTA4fQ.cUlzm_rFZYMz4YEFb9wMiLrEibTX2ShNRdlputZunrc', 'daa34b4c-635a-4c4f-b1f0-812f6c32afce'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvbW0iLCJwYXNzd29yZCI6Ijg1OXk3MzUiLCJpZCI6IjEzZDc5OTExLTdmMDgtNDg1My1hYTg5LTliMjY0ZTg1ZmY3YSIsImlhdCI6MTY0MjYxMDQ4Nn0.5-WbA7FxIP-m0B_XZVS9NsCiZWvZEkGrw455Uri88RU', '13d79911-7f08-4853-aa89-9b264e85ff7a');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` text NOT NULL,
  `username` text NOT NULL,
  `fullname` text NOT NULL,
  `password` text NOT NULL,
  `dp` text NOT NULL,
  `dob` text NOT NULL,
  `bio` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `password`, `dp`, `dob`, `bio`) VALUES
('13d79911-7f08-4853-aa89-9b264e85ff7a', 'romm', 'Peter Paul', '$2b$10$hOmScOQOOVmQO7ReVG8FU.EVPTsL9xzI7VeixRV7Y318GvCPx1h7e', 'location', '26/09/1997', 'iuri iuhoue iw;ojpijro oiwpijepfij elijpeijpeifhp[q olojwfioeij'),
('5dd2a9cf-08ff-43dd-9022-04a65b948987', 'ppmunga', 'Peter the hy', '$2b$10$GK3ATXyfgVkuHx7mfSSNa.wzRtR6pseyH2u5DRoGYQZ9qUehomWVC', 'location', '26/09/1997', 'iuri iuhoue iw;ojpijro oiwpijepfij elijpeijpeifhp[q olojwfioeij'),
('d5dfd64b-7856-49f0-9724-77a29eca5277', 'pijiromm', 'Peter Paul', '$2b$10$wg3Q8iK4EWY484f72cVYyeSid6xF1cjo4yViN8Wq4mnaomF9tHIRW', 'location', '26/09/1997', 'iuri iuhoue iw;ojpijro oiwpijepfij elijpeijpeifhp[q olojwfioeij'),
('daa34b4c-635a-4c4f-b1f0-812f6c32afce', 'ppj', 'Peter the hy', '$2b$10$iUL8kVQvEGmrQa0pSht53uMBMTPq6jFauWFsUDK.JP34pQxpLo4W6', 'location', '26/09/1997', 'iuri iuhoue iw;ojpijro oiwpijepfij elijpeijpeifhp[q olojwfioeij'),
('db6262e9-51fe-4863-bfdd-210f49fced43', 'pp', 'Peter Paul', '$2b$10$cf7MIu8tdg2/FKr7paibl.kQUPuiCK47GZgEQlvLlRXfSjsnOE3bm', 'location', '26/09/1997', 'iuri iuhoue iw;ojpijro oiwpijepfij elijpeijpeifhp[q olojwfioeij');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rtokens`
--
ALTER TABLE `rtokens`
  ADD PRIMARY KEY (`token`(100)),
  ADD UNIQUE KEY `id` (`id`) USING HASH;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`(100)),
  ADD UNIQUE KEY `username` (`username`) USING HASH;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
