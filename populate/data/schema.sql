CREATE TABLE `testing` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `drg_definition` VARCHAR(100) NOT NULL,
  `provider_id` INT(10) UNSIGNED NOT NULL,
  `provider_name` VARCHAR(100) NOT NULL,
  `provider_street_address` VARCHAR(100) NOT NULL,
  `provider_city` VARCHAR(50) NOT NULL,
  `provider_state` VARCHAR(50) NOT NULL,
  `provider_zip_code` INT(9) UNSIGNED NOT NULL,
  `hospital_referral_region_description` VARCHAR(50) NOT NULL,
  `total_discharges` INT(10) UNSIGNED NOT NULL,
  `average_covered_charges` INT(10) UNSIGNED NOT NULL,
  `average_total_payments` INT(10) UNSIGNED NOT NULL,
  `average_medicare_payments` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `total_discharges_avg_covered_charges_avg_medicare_payments` (`total_discharges`, `average_covered_charges`, `average_medicare_payments`) USING BTREE,
  INDEX `total_discharges_average_covered_charges` (`total_discharges`, `average_covered_charges`) USING BTREE,
  INDEX `total_discharges_average_medicare_payments` (`total_discharges`, `average_medicare_payments`) USING BTREE,
  INDEX `average_covered_charges_average_medicare_payments` (`average_covered_charges`, `average_medicare_payments`) USING BTREE,
  INDEX `total_discharges` (`total_discharges`) USING BTREE,
  INDEX `average_covered_charges` (`average_covered_charges`) USING BTREE,
  INDEX `average_medicare_payments` (`average_medicare_payments`) USING BTREE,
  INDEX `provider_state` (`provider_state`) USING HASH
)
ENGINE=InnoDB
;
