# Aqua Note データベーススキーマ

## スキーマ概要

Aqua Noteの完全なデータベーススキーマが実装されました。水槽管理アプリケーションに必要な全機能をサポートする包括的な設計となっています。

## 主要テーブル構成

### ユーザー管理系

- **users**: ユーザー基本情報（ULID、email、username、Stripe連携）
- **userProfiles**: ユーザープロフィール詳細情報
- **userPreferences**: ユーザー設定（言語、通知設定等）
- **sessions**: セッション管理（Lucia Auth）
- **oauthAccounts**: OAuth認証アカウント
- **multiFactorAuth**: 多要素認証設定

### サブスクリプション系

- **subscriptions**: サブスクリプションプラン管理
- **paymentHistories**: 支払い履歴
- **stripeWebhookEvents**: Stripe Webhook イベント

### 水槽管理系

- **aquariums**: 水槽基本情報（名前、容量、公開設定）
- **aquariumSpecs**: 水槽仕様（サイズ、フィルター、ライト等）
- **aquariumLivestock**: 水槽内生体管理
- **aquariumPhotos**: 水槽写真
- **aquariumTagRelations**: 水槽タグ関連

### メンテナンス系

- **maintenanceRecords**: メンテナンス実行記録
- **maintenanceSchedules**: メンテナンススケジュール
- **waterChanges**: 水換え記録
- **feedingRecords**: 給餌記録
- **additiveRecords**: 添加剤記録
- **waterParameters**: 水質パラメータ記録
- **observationRecords**: 観察記録

### システム系

- **tags**: タグマスタ
- **notifications**: 通知管理
- **auditLogs**: 監査ログ
- **recordPhotos**: 記録関連写真

## 重要な設計決定

### データ型の統一

- **日時フィールド**: 全てTEXT型（ISO 8601形式）で統一
- **ID**: ULID形式を採用
- **Boolean**: INTEGER型のmode: 'boolean'を使用

### インデックス設計

- 頻繁にクエリされるカラムには適切なインデックスを配置
- 複合インデックスも必要に応じて定義

### 外部キー制約

- 適切な参照整合性を保つための外部キー制約を設定
- カスケード削除は慎重に設計

## 型定義

Drizzleの$inferSelectを使用して、以下の型が自動生成されます。

- 各テーブルのSelect型（例: User, Aquarium等）
- 各テーブルのInsert型（例: NewUser, NewAquarium等）

## マイグレーション

- Drizzle Kitを使用したマイグレーション管理
- 本番、プレビュー、ローカル環境それぞれ対応

## 今後の拡張ポイント

1. 水質パラメータの種類拡張
2. 生体詳細情報の拡充
3. アラート・通知機能の詳細化
4. レポート機能のための集計テーブル検討

この完全なスキーマにより、Aqua Noteの全機能実装の基盤が整いました。
