CREATE TABLE `random_names` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPRESSED;

INSERT INTO `random_names` (`name`) VALUES ("Robert De Niro"), ("Jordan Pickford"), ("Bill Bailey");
