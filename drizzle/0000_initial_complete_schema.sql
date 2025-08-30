CREATE TABLE `additive_records` (
  `id` text PRIMARY KEY NOT NULL,
  `maintenance_record_id` text NOT NULL,
  `additive_name` text NOT NULL,
  `amount_ml` real NOT NULL,
  `purpose` text,
  `notes` text,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`maintenance_record_id`) REFERENCES `maintenance_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_additive_records_maintenance_record_id` ON `additive_records` (`maintenance_record_id`);
--> statement-breakpoint
CREATE INDEX `idx_additive_records_additive_name` ON `additive_records` (`additive_name`);
--> statement-breakpoint
CREATE TABLE `aquarium_livestock` (
  `id` text PRIMARY KEY NOT NULL,
  `aquarium_id` text NOT NULL,
  `species_name` text NOT NULL,
  `common_name` text,
  `livestock_type` text,
  `quantity` integer DEFAULT 1,
  `added_date` text NOT NULL,
  `removed_date` text,
  `removal_reason` text,
  `notes` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`aquarium_id`) REFERENCES `aquariums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aquarium_livestock_aquarium_id` ON `aquarium_livestock` (`aquarium_id`);
--> statement-breakpoint
CREATE INDEX `idx_aquarium_livestock_added_date` ON `aquarium_livestock` (`added_date`);
--> statement-breakpoint
CREATE INDEX `idx_aquarium_livestock_type` ON `aquarium_livestock` (`livestock_type`);
--> statement-breakpoint
CREATE TABLE `aquarium_photos` (
  `id` text PRIMARY KEY NOT NULL,
  `aquarium_id` text NOT NULL,
  `photo_url` text NOT NULL,
  `thumbnail_url` text,
  `caption` text,
  `taken_date` text,
  `file_size_kb` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`aquarium_id`) REFERENCES `aquariums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aquarium_photos_aquarium_id` ON `aquarium_photos` (`aquarium_id`);
--> statement-breakpoint
CREATE TABLE `aquarium_specs` (
  `id` text PRIMARY KEY NOT NULL,
  `aquarium_id` text NOT NULL,
  `tank_type` text,
  `setup_date` text,
  `substrate_type` text,
  `substrate_brand` text,
  `substrate_depth_cm` real,
  `lighting_type` text,
  `lighting_hours_daily` integer,
  `lighting_brand` text,
  `lighting_wattage` integer,
  `co2_system` integer DEFAULT false,
  `co2_type` text,
  `co2_bps` integer,
  `filter_type` text,
  `filter_brand` text,
  `filter_flow_rate` integer,
  `heater_wattage` integer,
  `target_temperature_c` real,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`aquarium_id`) REFERENCES `aquariums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `aquarium_specs_aquarium_id_unique` ON `aquarium_specs` (`aquarium_id`);
--> statement-breakpoint
CREATE INDEX `idx_aquarium_specs_aquarium_id` ON `aquarium_specs` (`aquarium_id`);
--> statement-breakpoint
CREATE INDEX `idx_aquarium_specs_tank_type` ON `aquarium_specs` (`tank_type`);
--> statement-breakpoint
CREATE TABLE `aquarium_tag_relations` (
  `aquarium_id` text NOT NULL,
  `tag_id` text NOT NULL,
  `created_at` integer NOT NULL,
  PRIMARY KEY(`aquarium_id`, `tag_id`),
  FOREIGN KEY (`aquarium_id`) REFERENCES `aquariums`(`id`) ON UPDATE no action ON DELETE no action,
  FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aquarium_tag_relations_aquarium_id` ON `aquarium_tag_relations` (`aquarium_id`);
--> statement-breakpoint
CREATE INDEX `idx_aquarium_tag_relations_tag_id` ON `aquarium_tag_relations` (`tag_id`);
--> statement-breakpoint
CREATE TABLE `aquariums` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `name` text NOT NULL,
  `description` text,
  `volume_liters` integer NOT NULL,
  `is_active` integer DEFAULT true,
  `is_public` integer DEFAULT false,
  `view_count` integer DEFAULT 0,
  `published_at` integer,
  `photo_url` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aquariums_user_id` ON `aquariums` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_aquariums_is_active` ON `aquariums` (`is_active`);
--> statement-breakpoint
CREATE INDEX `idx_aquariums_is_public` ON `aquariums` (`is_public`);
--> statement-breakpoint
CREATE INDEX `idx_aquariums_published_at` ON `aquariums` (`published_at`);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text,
  `action` text NOT NULL,
  `entity_type` text,
  `entity_id` text,
  `old_values` text,
  `new_values` text,
  `ip_address` text,
  `user_agent` text,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_audit_logs_user_id` ON `audit_logs` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_audit_logs_entity` ON `audit_logs` (`entity_type`, `entity_id`);
--> statement-breakpoint
CREATE INDEX `idx_audit_logs_created_at` ON `audit_logs` (`created_at`);
--> statement-breakpoint
CREATE TABLE `feeding_records` (
  `id` text PRIMARY KEY NOT NULL,
  `maintenance_record_id` text NOT NULL,
  `food_type` text NOT NULL,
  `amount_grams` real,
  `notes` text,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`maintenance_record_id`) REFERENCES `maintenance_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `feeding_records_maintenance_record_id_unique` ON `feeding_records` (`maintenance_record_id`);
--> statement-breakpoint
CREATE INDEX `idx_feeding_records_maintenance_record_id` ON `feeding_records` (`maintenance_record_id`);
--> statement-breakpoint
CREATE TABLE `maintenance_records` (
  `id` text PRIMARY KEY NOT NULL,
  `aquarium_id` text NOT NULL,
  `performed_at` integer NOT NULL,
  `category` text NOT NULL,
  `title` text,
  `description` text,
  `notes` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`aquarium_id`) REFERENCES `aquariums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_maintenance_records_aquarium_id` ON `maintenance_records` (`aquarium_id`);
--> statement-breakpoint
CREATE INDEX `idx_maintenance_records_performed_at` ON `maintenance_records` (`performed_at`);
--> statement-breakpoint
CREATE INDEX `idx_maintenance_records_category` ON `maintenance_records` (`category`);
--> statement-breakpoint
CREATE TABLE `maintenance_schedules` (
  `id` text PRIMARY KEY NOT NULL,
  `aquarium_id` text NOT NULL,
  `schedule_name` text NOT NULL,
  `categories` text NOT NULL,
  `interval_days` integer NOT NULL,
  `preferred_time` text,
  `last_performed_date` text,
  `next_due_date` text NOT NULL,
  `is_active` integer DEFAULT true,
  `notification_enabled` integer DEFAULT true,
  `notification_hours_before` integer DEFAULT 24,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`aquarium_id`) REFERENCES `aquariums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_maintenance_schedules_aquarium_id` ON `maintenance_schedules` (`aquarium_id`);
--> statement-breakpoint
CREATE INDEX `idx_maintenance_schedules_next_due_date` ON `maintenance_schedules` (`next_due_date`);
--> statement-breakpoint
CREATE INDEX `idx_maintenance_schedules_is_active` ON `maintenance_schedules` (`is_active`);
--> statement-breakpoint
CREATE TABLE `multi_factor_auth` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `type` text NOT NULL,
  `secret` text,
  `verified` integer DEFAULT false,
  `last_used_at` integer,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_multi_factor_auth_user_id` ON `multi_factor_auth` (`user_id`);
--> statement-breakpoint
CREATE TABLE `notifications` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `schedule_id` text,
  `type` text,
  `title` text NOT NULL,
  `message` text NOT NULL,
  `status` text,
  `scheduled_for` integer,
  `sent_at` integer,
  `read_at` integer,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
  FOREIGN KEY (`schedule_id`) REFERENCES `maintenance_schedules`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_notifications_user_id` ON `notifications` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_notifications_schedule_id` ON `notifications` (`schedule_id`);
--> statement-breakpoint
CREATE INDEX `idx_notifications_status` ON `notifications` (`status`);
--> statement-breakpoint
CREATE INDEX `idx_notifications_scheduled_for` ON `notifications` (`scheduled_for`);
--> statement-breakpoint
CREATE TABLE `oauth_accounts` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `provider` text NOT NULL,
  `provider_user_id` text NOT NULL,
  `provider_email` text,
  `access_token` text,
  `refresh_token` text,
  `expires_at` integer,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_oauth_accounts_user_id` ON `oauth_accounts` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_oauth_accounts_provider` ON `oauth_accounts` (`provider`, `provider_user_id`);
--> statement-breakpoint
CREATE TABLE `observation_records` (
  `id` text PRIMARY KEY NOT NULL,
  `maintenance_record_id` text NOT NULL,
  `mood` text,
  `weather` text,
  `tags` text,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`maintenance_record_id`) REFERENCES `maintenance_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `observation_records_maintenance_record_id_unique` ON `observation_records` (`maintenance_record_id`);
--> statement-breakpoint
CREATE INDEX `idx_observation_records_maintenance_record_id` ON `observation_records` (`maintenance_record_id`);
--> statement-breakpoint
CREATE INDEX `idx_observation_records_mood` ON `observation_records` (`mood`);
--> statement-breakpoint
CREATE TABLE `payment_histories` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `stripe_payment_intent_id` text,
  `stripe_invoice_id` text,
  `amount` integer NOT NULL,
  `currency` text DEFAULT 'jpy',
  `status` text NOT NULL,
  `description` text,
  `paid_at` integer,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_histories_stripe_payment_intent_id_unique` ON `payment_histories` (`stripe_payment_intent_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_histories_stripe_invoice_id_unique` ON `payment_histories` (`stripe_invoice_id`);
--> statement-breakpoint
CREATE INDEX `idx_payment_histories_user_id` ON `payment_histories` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_payment_histories_paid_at` ON `payment_histories` (`paid_at`);
--> statement-breakpoint
CREATE TABLE `record_photos` (
  `id` text PRIMARY KEY NOT NULL,
  `maintenance_record_id` text NOT NULL,
  `photo_url` text NOT NULL,
  `thumbnail_url` text,
  `caption` text,
  `file_size_kb` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`maintenance_record_id`) REFERENCES `maintenance_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_record_photos_maintenance_record_id` ON `record_photos` (`maintenance_record_id`);
--> statement-breakpoint
CREATE TABLE `sessions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `expires_at` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_sessions_user_id` ON `sessions` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_sessions_expires_at` ON `sessions` (`expires_at`);
--> statement-breakpoint
CREATE TABLE `stripe_webhook_events` (
  `id` text PRIMARY KEY NOT NULL,
  `stripe_event_id` text NOT NULL,
  `type` text NOT NULL,
  `processed` integer DEFAULT false,
  `error_message` text,
  `payload` text NOT NULL,
  `created_at` integer NOT NULL,
  `processed_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_webhook_events_stripe_event_id_unique` ON `stripe_webhook_events` (`stripe_event_id`);
--> statement-breakpoint
CREATE INDEX `idx_stripe_webhook_events_stripe_event_id` ON `stripe_webhook_events` (`stripe_event_id`);
--> statement-breakpoint
CREATE INDEX `idx_stripe_webhook_events_processed` ON `stripe_webhook_events` (`processed`);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `stripe_subscription_id` text,
  `stripe_price_id` text,
  `plan_type` text DEFAULT 'free' NOT NULL,
  `status` text NOT NULL,
  `current_period_start` integer,
  `current_period_end` integer,
  `cancel_at_period_end` integer DEFAULT false,
  `canceled_at` integer,
  `trial_start` integer,
  `trial_end` integer,
  `aquarium_limit` integer DEFAULT 1,
  `photo_storage_mb` integer DEFAULT 100,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_user_id_unique` ON `subscriptions` (`user_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_stripe_subscription_id_unique` ON `subscriptions` (`stripe_subscription_id`);
--> statement-breakpoint
CREATE INDEX `idx_subscriptions_user_id` ON `subscriptions` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_subscriptions_stripe_subscription_id` ON `subscriptions` (`stripe_subscription_id`);
--> statement-breakpoint
CREATE INDEX `idx_subscriptions_status` ON `subscriptions` (`status`);
--> statement-breakpoint
CREATE TABLE `tags` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `display_name` text,
  `usage_count` integer DEFAULT 0,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);
--> statement-breakpoint
CREATE INDEX `idx_tags_name` ON `tags` (`name`);
--> statement-breakpoint
CREATE INDEX `idx_tags_usage_count` ON `tags` (`usage_count`);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `language` text DEFAULT 'ja',
  `timezone` text DEFAULT 'Asia/Tokyo',
  `email_notifications` integer DEFAULT true,
  `push_notifications` integer DEFAULT false,
  `notification_settings` text,
  `theme` text DEFAULT 'light',
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_preferences_user_id_unique` ON `user_preferences` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_user_preferences_user_id` ON `user_preferences` (`user_id`);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `location` text,
  `biography` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_profiles_user_id_unique` ON `user_profiles` (`user_id`);
--> statement-breakpoint
CREATE INDEX `idx_user_profiles_user_id` ON `user_profiles` (`user_id`);
--> statement-breakpoint
CREATE TABLE `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `username` text NOT NULL,
  `display_name` text,
  `profile_photo_url` text,
  `password_hash` text,
  `stripe_customer_id` text,
  `email_verified_at` integer,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_stripe_customer_id_unique` ON `users` (`stripe_customer_id`);
--> statement-breakpoint
CREATE INDEX `idx_users_email` ON `users` (`email`);
--> statement-breakpoint
CREATE INDEX `idx_users_username` ON `users` (`username`);
--> statement-breakpoint
CREATE INDEX `idx_users_stripe_customer_id` ON `users` (`stripe_customer_id`);
--> statement-breakpoint
CREATE TABLE `water_changes` (
  `id` text PRIMARY KEY NOT NULL,
  `maintenance_record_id` text NOT NULL,
  `volume_liters` real NOT NULL,
  `percentage` real,
  `water_conditioner` text,
  `water_conditioner_ml` real,
  `old_temperature_c` real,
  `new_temperature_c` real,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`maintenance_record_id`) REFERENCES `maintenance_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `water_changes_maintenance_record_id_unique` ON `water_changes` (`maintenance_record_id`);
--> statement-breakpoint
CREATE INDEX `idx_water_changes_maintenance_record_id` ON `water_changes` (`maintenance_record_id`);
--> statement-breakpoint
CREATE TABLE `water_parameters` (
  `id` text PRIMARY KEY NOT NULL,
  `aquarium_id` text NOT NULL,
  `measured_at` integer NOT NULL,
  `temperature_c` real,
  `ph` real,
  `ammonia_ppm` real,
  `nitrite_ppm` real,
  `nitrate_ppm` real,
  `gh_dh` real,
  `kh_dh` real,
  `phosphate_ppm` real,
  `salinity_ppt` real,
  `notes` text,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`aquarium_id`) REFERENCES `aquariums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_water_parameters_aquarium_id` ON `water_parameters` (`aquarium_id`);
--> statement-breakpoint
CREATE INDEX `idx_water_parameters_measured_at` ON `water_parameters` (`measured_at`);
