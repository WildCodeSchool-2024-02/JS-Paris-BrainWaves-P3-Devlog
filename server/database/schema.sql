-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET FOREIGN_KEY_CHECKS=0;
-- -----------------------------------------------------
-- Schema devlog
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema devlog
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `devlog` DEFAULT CHARACTER SET utf8mb3 ;
USE `devlog` ;

-- -----------------------------------------------------
-- Table `devlog`.`team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`team` ;
CREATE TABLE IF NOT EXISTS `devlog`.`team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(55) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `devlog`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`user` ;

CREATE TABLE IF NOT EXISTS `devlog`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `devlog`.`project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`project` ;

CREATE TABLE IF NOT EXISTS `devlog`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `is_archived` TINYINT NOT NULL,
  `Team_id` INT NULL DEFAULT NULL,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Project_Team1_idx` (`Team_id` ASC) VISIBLE,
  INDEX `fk_project_user1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_Project_Team1`
    FOREIGN KEY (`Team_id`)
    REFERENCES `devlog`.`team` (`id`),
  CONSTRAINT `fk_project_user1`
    FOREIGN KEY (`User_id`)
    REFERENCES `devlog`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `devlog`.`task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`task` ;

CREATE TABLE IF NOT EXISTS `devlog`.`task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `is_archived` TINYINT NOT NULL,
  `Project_id` INT NULL,
  `section` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Task_Project1_idx` (`Project_id` ASC) VISIBLE,
  CONSTRAINT `fk_Task_Project1`
    FOREIGN KEY (`Project_id`)
    REFERENCES `devlog`.`project` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `devlog`.`user_has_task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`user_has_task` ;

CREATE TABLE IF NOT EXISTS `devlog`.`user_has_task` (
  `User_id` INT NOT NULL,
  `Task_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `Task_id`),
  INDEX `fk_User_has_Task_Task1_idx` (`Task_id` ASC) VISIBLE,
  INDEX `fk_User_has_Task_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Task_Task1`
    FOREIGN KEY (`Task_id`)
    REFERENCES `devlog`.`task` (`id`),
  CONSTRAINT `fk_User_has_Task_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `devlog`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `devlog`.`user_has_team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devlog`.`user_has_team` ;
CREATE TABLE IF NOT EXISTS `devlog`.`user_has_team` (
  `User_id` INT NOT NULL,
  `Team_id` INT NOT NULL,
  `role` ENUM('ADMIN', 'PO', 'SM', 'DEV') NOT NULL,
  PRIMARY KEY (`User_id`, `Team_id`),
  INDEX `fk_User_has_Team_Team1_idx` (`Team_id` ASC) VISIBLE,
  INDEX `fk_User_has_Team_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Team_Team1`
    FOREIGN KEY (`Team_id`)
    REFERENCES `devlog`.`team` (`id`),
  CONSTRAINT `fk_User_has_Team_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `devlog`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;