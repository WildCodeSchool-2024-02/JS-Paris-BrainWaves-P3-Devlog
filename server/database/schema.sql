-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team` (
  `id` INT NOT NULL,
  `team_Name` VARCHAR(55) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `is_archived` TINYINT NULL,
  `Team_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Team_id`),
  INDEX `fk_Project_Team1_idx` (`Team_id` ASC) VISIBLE,
  CONSTRAINT `fk_Project_Team1`
    FOREIGN KEY (`Team_id`)
    REFERENCES `Team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Task` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `is_achived` TINYINT NULL,
  `Project_id1` INT NOT NULL,
  `Project_Team_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Project_id1`, `Project_Team_id`),
  INDEX `fk_Task_Project1_idx` (`Project_id1` ASC, `Project_Team_id` ASC) VISIBLE,
  CONSTRAINT `fk_Task_Project1`
    FOREIGN KEY (`Project_id1` , `Project_Team_id`)
    REFERENCES `Project` (`id` , `Team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `User_has_Team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User_has_Team` (
  `User_id` INT NOT NULL,
  `Team_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `Team_id`),
  INDEX `fk_User_has_Team_Team1_idx` (`Team_id` ASC) VISIBLE,
  INDEX `fk_User_has_Team_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Team_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Team_Team1`
    FOREIGN KEY (`Team_id`)
    REFERENCES `Team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `User_has_Task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User_has_Task` (
  `User_id` INT NOT NULL,
  `Task_id` INT NOT NULL,
  `Task_Project_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`User_id`, `Task_id`, `Task_Project_id`),
  INDEX `fk_User_has_Task_Task1_idx` (`Task_id` ASC, `Task_Project_id` ASC) VISIBLE,
  INDEX `fk_User_has_Task_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Task_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Task_Task1`
    FOREIGN KEY (`Task_id`)
    REFERENCES `Task` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
