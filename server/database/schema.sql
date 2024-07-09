-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema devlog
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `devlog` ;
-- -----------------------------------------------------
-- Schema devlog
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `devlog` DEFAULT CHARACTER SET utf8 ;
USE `devlog` ;
-- -----------------------------------------------------
-- Table `devlog`.`Team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`Team` ;
CREATE TABLE IF NOT EXISTS `devlog`.`Team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(55) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `devlog`.`Project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`Project` ;
CREATE TABLE IF NOT EXISTS `devlog`.`Project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `is_archived` TINYINT NOT NULL,
  `Team_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Project_Team1_idx` (`Team_id` ASC) VISIBLE,
  CONSTRAINT `fk_Project_Team1`
    FOREIGN KEY (`Team_id`)
    REFERENCES `devlog`.`Team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `devlog`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`User` ;
CREATE TABLE IF NOT EXISTS `devlog`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT NOT NULL,
  `Project_id` INT NOT NULL,
  `Project_Team_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_User_Project1_idx` (`Project_id` ASC, `Project_Team_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Project1`
    FOREIGN KEY (`Project_id` , `Project_Team_id`)
    REFERENCES `devlog`.`Project` (`id` , `Team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `devlog`.`Task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`Task` ;
CREATE TABLE IF NOT EXISTS `devlog`.`Task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `is_achived` TINYINT NOT NULL,
  `Project_id1` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Task_Project1_idx` (`Project_id1` ASC) VISIBLE,
  CONSTRAINT `fk_Task_Project1`
    FOREIGN KEY (`Project_id1`)
    REFERENCES `devlog`.`Project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `devlog`.`User_has_Team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`User_has_Team` ;
CREATE TABLE IF NOT EXISTS `devlog`.`User_has_Team` (
  `User_id` INT NOT NULL,
  `Team_id` INT NOT NULL,
  `role` ENUM("ADMIN", "PO", "SM", "DEV") NOT NULL,
  PRIMARY KEY (`User_id`, `Team_id`),
  INDEX `fk_User_has_Team_Team1_idx` (`Team_id` ASC) VISIBLE,
  INDEX `fk_User_has_Team_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Team_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `devlog`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Team_Team1`
    FOREIGN KEY (`Team_id`)
    REFERENCES `devlog`.`Team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `devlog`.`User_has_Task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`User_has_Task` ;
CREATE TABLE IF NOT EXISTS `devlog`.`User_has_Task` (
  `User_id` INT NOT NULL,
  `Task_id` INT NOT NULL,
  `status` ENUM("todo", "process", "finish") NOT NULL,
  PRIMARY KEY (`User_id`, `Task_id`),
  INDEX `fk_User_has_Task_Task1_idx` (`Task_id` ASC) VISIBLE,
  INDEX `fk_User_has_Task_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Task_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `devlog`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Task_Task1`
    FOREIGN KEY (`Task_id`)
    REFERENCES `devlog`.`Task` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;