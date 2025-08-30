-- Database Reset Script for Aqua Note
-- 外部キー制約を考慮した削除順序で全テーブルを削除
-- 詳細テーブル（外部キー制約あり）を最初に削除
DROP TABLE IF EXISTS additive_records;
DROP TABLE IF EXISTS feeding_records;
DROP TABLE IF EXISTS water_changes;
DROP TABLE IF EXISTS observation_records;
DROP TABLE IF EXISTS record_photos;
-- メンテナンス関連テーブル
DROP TABLE IF EXISTS maintenance_records;
DROP TABLE IF EXISTS maintenance_schedules;
-- 水槽関連テーブル
DROP TABLE IF EXISTS aquarium_tag_relations;
DROP TABLE IF EXISTS aquarium_livestock;
DROP TABLE IF EXISTS aquarium_photos;
DROP TABLE IF EXISTS aquarium_specs;
DROP TABLE IF EXISTS water_parameters;
DROP TABLE IF EXISTS aquariums;
-- 通知・決済関連
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS payment_histories;
DROP TABLE IF EXISTS subscriptions;
-- 認証関連
DROP TABLE IF EXISTS oauth_accounts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS multi_factor_auth;
-- ユーザー関連
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS audit_logs;
-- 基本テーブル
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tags;
-- Stripe関連（外部キーなし）
DROP TABLE IF EXISTS stripe_webhook_events;
-- マイグレーション履歴をクリア（完全リセットのため）
DELETE FROM d1_migrations;
