ALTER TABLE `leads` ADD `applicant_type` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `topics_interested` text DEFAULT '[]';--> statement-breakpoint
ALTER TABLE `leads` ADD `main_goal` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `experience_level` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `package_includes` text DEFAULT '[]';--> statement-breakpoint
ALTER TABLE `leads` ADD `participant_count` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `preferred_training_mode` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `preferred_start_date` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `recommended_package` text;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `inquiry_type`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `campaign_goal`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `product_type`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `launch_date`;