-- Database Reset Script for Aqua Note
-- Delete all tables in proper order considering foreign key constraints
-- Delete detail tables first due to foreign key constraints
-- This order prevents constraint violation errors during cleanup
DROP TABLE IF EXISTS additive_records;
DROP TABLE IF EXISTS feeding_records;
DROP TABLE IF EXISTS water_changes;
DROP TABLE IF EXISTS observation_records;
DROP TABLE IF EXISTS record_photos;
-- Maintenance-related tables
DROP TABLE IF EXISTS maintenance_records;
DROP TABLE IF EXISTS maintenance_schedules;
-- Aquarium-related tables
DROP TABLE IF EXISTS aquarium_tag_relations;
DROP TABLE IF EXISTS aquarium_livestock;
DROP TABLE IF EXISTS aquarium_photos;
DROP TABLE IF EXISTS aquarium_specs;
DROP TABLE IF EXISTS water_parameters;
DROP TABLE IF EXISTS aquariums;
-- Notification & payment-related
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS payment_histories;
DROP TABLE IF EXISTS subscriptions;
-- Authentication-related
DROP TABLE IF EXISTS oauth_accounts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS multi_factor_auth;
-- User-related
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS audit_logs;
-- Basic tables
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tags;
-- Stripe-related (no foreign keys)
DROP TABLE IF EXISTS stripe_webhook_events;
-- Clear migration history (for complete reset)
DELETE FROM d1_migrations;
