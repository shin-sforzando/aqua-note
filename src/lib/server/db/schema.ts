import { sqliteTable, integer, text, real, index, primaryKey } from 'drizzle-orm/sqlite-core';

// ============================================
// 認証・決済システム
// ============================================

// 1. ユーザー
export const users = sqliteTable(
	'users',
	{
		id: text('id').primaryKey(), // ULID
		email: text('email').notNull().unique(),
		username: text('username').notNull().unique(),
		displayName: text('display_name'),
		profilePhotoUrl: text('profile_photo_url'),
		passwordHash: text('password_hash'), // OAuth専用ユーザーはNULL
		stripeCustomerId: text('stripe_customer_id').unique(),
		emailVerifiedAt: text('email_verified_at'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		emailIdx: index('idx_users_email').on(table.email),
		usernameIdx: index('idx_users_username').on(table.username),
		stripeCustomerIdIdx: index('idx_users_stripe_customer_id').on(table.stripeCustomerId)
	})
);

// 2. セッション
export const sessions = sqliteTable(
	'sessions',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		expiresAt: text('expires_at').notNull(),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_sessions_user_id').on(table.userId),
		expiresAtIdx: index('idx_sessions_expires_at').on(table.expiresAt)
	})
);

// 3. OAuth連携
export const oauthAccounts = sqliteTable(
	'oauth_accounts',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		provider: text('provider').notNull(), // google/github/twitter
		providerUserId: text('provider_user_id').notNull(),
		providerEmail: text('provider_email'),
		accessToken: text('access_token'), // 暗号化推奨
		refreshToken: text('refresh_token'), // 暗号化推奨
		expiresAt: text('expires_at'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_oauth_accounts_user_id').on(table.userId)
	})
);

// 4. サブスクリプション
export const subscriptions = sqliteTable(
	'subscriptions',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.unique()
			.references(() => users.id),
		stripeSubscriptionId: text('stripe_subscription_id').unique(),
		stripePriceId: text('stripe_price_id'),
		planType: text('plan_type').notNull().default('free'), // free/basic/premium
		status: text('status').notNull(), // active/canceled/past_due/trialing
		currentPeriodStart: text('current_period_start'),
		currentPeriodEnd: text('current_period_end'),
		cancelAtPeriodEnd: integer('cancel_at_period_end', { mode: 'boolean' }).default(false),
		canceledAt: text('canceled_at'),
		trialStart: text('trial_start'),
		trialEnd: text('trial_end'),
		aquariumLimit: integer('aquarium_limit').default(1),
		photoStorageMb: integer('photo_storage_mb').default(100),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_subscriptions_user_id').on(table.userId),
		stripeSubscriptionIdIdx: index('idx_subscriptions_stripe_subscription_id').on(
			table.stripeSubscriptionId
		),
		statusIdx: index('idx_subscriptions_status').on(table.status)
	})
);

// 5. 支払い履歴
export const paymentHistories = sqliteTable(
	'payment_histories',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		stripePaymentIntentId: text('stripe_payment_intent_id').unique(),
		stripeInvoiceId: text('stripe_invoice_id').unique(),
		amount: integer('amount').notNull(), // 円単位
		currency: text('currency').default('jpy'),
		status: text('status').notNull(), // succeeded/failed/pending
		description: text('description'),
		paidAt: integer('paid_at'),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_payment_histories_user_id').on(table.userId),
		paidAtIdx: index('idx_payment_histories_paid_at').on(table.paidAt)
	})
);

// 6. Stripeウェブフック
export const stripeWebhookEvents = sqliteTable(
	'stripe_webhook_events',
	{
		id: text('id').primaryKey(), // ULID
		stripeEventId: text('stripe_event_id').notNull().unique(),
		type: text('type').notNull(),
		processed: integer('processed', { mode: 'boolean' }).default(false),
		errorMessage: text('error_message'),
		payload: text('payload', { mode: 'json' }).notNull(),
		createdAt: text('created_at').notNull(),
		processedAt: integer('processed_at')
	},
	(table) => ({
		stripeEventIdIdx: index('idx_stripe_webhook_events_stripe_event_id').on(table.stripeEventId),
		processedIdx: index('idx_stripe_webhook_events_processed').on(table.processed)
	})
);

// 7. 多要素認証
export const multiFactorAuth = sqliteTable(
	'multi_factor_auth',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		type: text('type').notNull(), // totp/sms/backup_codes
		secret: text('secret'), // 暗号化必須
		verified: integer('verified', { mode: 'boolean' }).default(false),
		lastUsedAt: integer('last_used_at'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_multi_factor_auth_user_id').on(table.userId)
	})
);

// 8. ユーザー設定
export const userPreferences = sqliteTable(
	'user_preferences',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.unique()
			.references(() => users.id),
		language: text('language').default('ja'), // ja/en
		timezone: text('timezone').default('Asia/Tokyo'),
		emailNotifications: integer('email_notifications', { mode: 'boolean' }).default(true),
		pushNotifications: integer('push_notifications', { mode: 'boolean' }).default(false),
		notificationSettings: text('notification_settings', { mode: 'json' }),
		theme: text('theme').default('light'), // light/dark/auto
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_user_preferences_user_id').on(table.userId)
	})
);

// 9. ユーザープロフィール
export const userProfiles = sqliteTable(
	'user_profiles',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.unique()
			.references(() => users.id),
		location: text('location'),
		biography: text('biography'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_user_profiles_user_id').on(table.userId)
	})
);

// 10. 監査ログ
export const auditLogs = sqliteTable(
	'audit_logs',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id').references(() => users.id), // システム操作はNULL
		action: text('action').notNull(),
		entityType: text('entity_type'),
		entityId: text('entity_id'),
		oldValues: text('old_values', { mode: 'json' }),
		newValues: text('new_values', { mode: 'json' }),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_audit_logs_user_id').on(table.userId),
		entityIdx: index('idx_audit_logs_entity').on(table.entityType, table.entityId),
		createdAtIdx: index('idx_audit_logs_created_at').on(table.createdAt)
	})
);

// ============================================
// アクアリウム管理システム
// ============================================

// 11. タグマスタ
export const tags = sqliteTable(
	'tags',
	{
		id: text('id').primaryKey(), // ULID
		name: text('name').notNull().unique(),
		displayName: text('display_name'),
		usageCount: integer('usage_count').default(0),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		nameIdx: index('idx_tags_name').on(table.name),
		usageCountIdx: index('idx_tags_usage_count').on(table.usageCount)
	})
);

// 12. 水槽
export const aquariums = sqliteTable(
	'aquariums',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		name: text('name').notNull(),
		description: text('description'),
		volumeLiters: integer('volume_liters').notNull(),
		isActive: integer('is_active', { mode: 'boolean' }).default(true),
		isPublic: integer('is_public', { mode: 'boolean' }).default(false),
		viewCount: integer('view_count').default(0),
		publishedAt: integer('published_at'),
		photoUrl: text('photo_url'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_aquariums_user_id').on(table.userId),
		isActiveIdx: index('idx_aquariums_is_active').on(table.isActive),
		isPublicIdx: index('idx_aquariums_is_public').on(table.isPublic),
		publishedAtIdx: index('idx_aquariums_published_at').on(table.publishedAt)
	})
);

// 13. 水槽タグ関連
export const aquariumTagRelations = sqliteTable(
	'aquarium_tag_relations',
	{
		aquariumId: text('aquarium_id')
			.notNull()
			.references(() => aquariums.id),
		tagId: text('tag_id')
			.notNull()
			.references(() => tags.id),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		primaryKey: primaryKey({ columns: [table.aquariumId, table.tagId] }),
		aquariumIdIdx: index('idx_aquarium_tag_relations_aquarium_id').on(table.aquariumId),
		tagIdIdx: index('idx_aquarium_tag_relations_tag_id').on(table.tagId)
	})
);

// 14. 水槽仕様
export const aquariumSpecs = sqliteTable(
	'aquarium_specs',
	{
		id: text('id').primaryKey(), // ULID
		aquariumId: text('aquarium_id')
			.notNull()
			.unique()
			.references(() => aquariums.id),
		tankType: text('tank_type'), // freshwater/saltwater/brackish
		setupDate: text('setup_date'),
		substrateType: text('substrate_type'), // sand/gravel/soil/bare
		substrateBrand: text('substrate_brand'),
		substrateDepthCm: real('substrate_depth_cm'),
		lightingType: text('lighting_type'), // led/fluorescent/metal_halide
		lightingHoursDaily: integer('lighting_hours_daily'),
		lightingBrand: text('lighting_brand'),
		lightingWattage: integer('lighting_wattage'),
		co2Type: text('co2_type'), // none/pressurized/diy/liquid
		co2Bps: integer('co2_bps'), // bubbles per second
		filterType: text('filter_type'), // external/internal/sump/hang_on_back
		filterBrand: text('filter_brand'),
		filterFlowRate: integer('filter_flow_rate'), // L/h
		heaterWattage: integer('heater_wattage'),
		targetTemperatureC: real('target_temperature_c'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		aquariumIdIdx: index('idx_aquarium_specs_aquarium_id').on(table.aquariumId),
		tankTypeIdx: index('idx_aquarium_specs_tank_type').on(table.tankType)
	})
);

// 15. 飼育生体
export const aquariumLivestock = sqliteTable(
	'aquarium_livestock',
	{
		id: text('id').primaryKey(), // ULID
		aquariumId: text('aquarium_id')
			.notNull()
			.references(() => aquariums.id),
		speciesName: text('species_name').notNull(),
		commonName: text('common_name'),
		livestockType: text('livestock_type'), // fish/shrimp/snail/coral/plant/other
		quantity: integer('quantity').default(1),
		addedDate: text('added_date').notNull(),
		removedDate: text('removed_date'),
		removalReason: text('removal_reason'),
		notes: text('notes'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		aquariumIdIdx: index('idx_aquarium_livestock_aquarium_id').on(table.aquariumId),
		addedDateIdx: index('idx_aquarium_livestock_added_date').on(table.addedDate),
		typeIdx: index('idx_aquarium_livestock_type').on(table.livestockType)
	})
);

// 16. メンテナンス記録
export const maintenanceRecords = sqliteTable(
	'maintenance_records',
	{
		id: text('id').primaryKey(), // ULID
		aquariumId: text('aquarium_id')
			.notNull()
			.references(() => aquariums.id),
		performedAt: integer('performed_at').notNull(),
		category: text('category').notNull(), // water_change/feeding/additives/cleaning/observation/other
		title: text('title'),
		description: text('description'),
		notes: text('notes'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		aquariumIdIdx: index('idx_maintenance_records_aquarium_id').on(table.aquariumId),
		performedAtIdx: index('idx_maintenance_records_performed_at').on(table.performedAt),
		categoryIdx: index('idx_maintenance_records_category').on(table.category)
	})
);

// 17. 水換え詳細
export const waterChanges = sqliteTable(
	'water_changes',
	{
		id: text('id').primaryKey(), // ULID
		maintenanceRecordId: text('maintenance_record_id')
			.notNull()
			.unique()
			.references(() => maintenanceRecords.id),
		volumeLiters: real('volume_liters').notNull(),
		percentage: real('percentage'),
		waterConditioner: text('water_conditioner'),
		waterConditionerMl: real('water_conditioner_ml'),
		oldTemperatureC: real('old_temperature_c'),
		newTemperatureC: real('new_temperature_c'),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		maintenanceRecordIdIdx: index('idx_water_changes_maintenance_record_id').on(
			table.maintenanceRecordId
		)
	})
);

// 18. 給餌詳細
export const feedingRecords = sqliteTable(
	'feeding_records',
	{
		id: text('id').primaryKey(), // ULID
		maintenanceRecordId: text('maintenance_record_id')
			.notNull()
			.unique()
			.references(() => maintenanceRecords.id),
		foodType: text('food_type').notNull(),
		amountGrams: real('amount_grams'),
		notes: text('notes'),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		maintenanceRecordIdIdx: index('idx_feeding_records_maintenance_record_id').on(
			table.maintenanceRecordId
		)
	})
);

// 19. 添加剤投入詳細
export const additiveRecords = sqliteTable(
	'additive_records',
	{
		id: text('id').primaryKey(), // ULID
		maintenanceRecordId: text('maintenance_record_id')
			.notNull()
			.references(() => maintenanceRecords.id),
		additiveName: text('additive_name').notNull(),
		amountMl: real('amount_ml').notNull(),
		purpose: text('purpose'),
		notes: text('notes'),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		maintenanceRecordIdIdx: index('idx_additive_records_maintenance_record_id').on(
			table.maintenanceRecordId
		),
		additiveNameIdx: index('idx_additive_records_additive_name').on(table.additiveName)
	})
);

// 20. 観察記録詳細
export const observationRecords = sqliteTable(
	'observation_records',
	{
		id: text('id').primaryKey(), // ULID
		maintenanceRecordId: text('maintenance_record_id')
			.notNull()
			.unique()
			.references(() => maintenanceRecords.id),
		mood: text('mood'), // good/normal/concern/problem
		weather: text('weather'),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		maintenanceRecordIdIdx: index('idx_observation_records_maintenance_record_id').on(
			table.maintenanceRecordId
		),
		moodIdx: index('idx_observation_records_mood').on(table.mood)
	})
);

// 21. 水質パラメータ
export const waterParameters = sqliteTable(
	'water_parameters',
	{
		id: text('id').primaryKey(), // ULID
		aquariumId: text('aquarium_id')
			.notNull()
			.references(() => aquariums.id),
		measuredAt: integer('measured_at').notNull(),
		temperatureC: real('temperature_c'),
		ph: real('ph'),
		ammoniaPpm: real('ammonia_ppm'),
		nitritePpm: real('nitrite_ppm'),
		nitratePpm: real('nitrate_ppm'),
		ghDh: real('gh_dh'),
		khDh: real('kh_dh'),
		phosphatePpm: real('phosphate_ppm'),
		salinityPpt: real('salinity_ppt'),
		notes: text('notes'),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		aquariumIdIdx: index('idx_water_parameters_aquarium_id').on(table.aquariumId),
		measuredAtIdx: index('idx_water_parameters_measured_at').on(table.measuredAt)
	})
);

// 22. 水槽写真
export const aquariumPhotos = sqliteTable(
	'aquarium_photos',
	{
		id: text('id').primaryKey(), // ULID
		aquariumId: text('aquarium_id')
			.notNull()
			.references(() => aquariums.id),
		photoUrl: text('photo_url').notNull(),
		thumbnailUrl: text('thumbnail_url'),
		caption: text('caption'),
		takenDate: text('taken_date'),
		fileSizeKb: integer('file_size_kb').notNull(),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		aquariumIdIdx: index('idx_aquarium_photos_aquarium_id').on(table.aquariumId)
	})
);

// 23. 記録写真
export const recordPhotos = sqliteTable(
	'record_photos',
	{
		id: text('id').primaryKey(), // ULID
		maintenanceRecordId: text('maintenance_record_id')
			.notNull()
			.references(() => maintenanceRecords.id),
		photoUrl: text('photo_url').notNull(),
		thumbnailUrl: text('thumbnail_url'),
		caption: text('caption'),
		fileSizeKb: integer('file_size_kb').notNull(),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		maintenanceRecordIdIdx: index('idx_record_photos_maintenance_record_id').on(
			table.maintenanceRecordId
		)
	})
);

// 24. メンテナンススケジュール
export const maintenanceSchedules = sqliteTable(
	'maintenance_schedules',
	{
		id: text('id').primaryKey(), // ULID
		aquariumId: text('aquarium_id')
			.notNull()
			.references(() => aquariums.id),
		scheduleName: text('schedule_name').notNull(),
		categories: text('categories', { mode: 'json' }).notNull(), // array of strings
		intervalDays: integer('interval_days').notNull(),
		preferredTime: text('preferred_time'), // TIME型をTEXTで表現
		lastPerformedDate: text('last_performed_date'),
		nextDueDate: text('next_due_date').notNull(),
		isActive: integer('is_active', { mode: 'boolean' }).default(true),
		notificationEnabled: integer('notification_enabled', { mode: 'boolean' }).default(true),
		notificationHoursBefore: integer('notification_hours_before').default(24),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull()
	},
	(table) => ({
		aquariumIdIdx: index('idx_maintenance_schedules_aquarium_id').on(table.aquariumId),
		nextDueDateIdx: index('idx_maintenance_schedules_next_due_date').on(table.nextDueDate),
		isActiveIdx: index('idx_maintenance_schedules_is_active').on(table.isActive)
	})
);

// 25. 通知
export const notifications = sqliteTable(
	'notifications',
	{
		id: text('id').primaryKey(), // ULID
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		scheduleId: text('schedule_id').references(() => maintenanceSchedules.id),
		type: text('type'), // schedule/alert/reminder/system
		title: text('title').notNull(),
		message: text('message').notNull(),
		status: text('status'), // pending/sent/read/cancelled
		scheduledFor: integer('scheduled_for'),
		sentAt: integer('sent_at'),
		readAt: integer('read_at'),
		createdAt: text('created_at').notNull()
	},
	(table) => ({
		userIdIdx: index('idx_notifications_user_id').on(table.userId),
		scheduleIdIdx: index('idx_notifications_schedule_id').on(table.scheduleId),
		statusIdx: index('idx_notifications_status').on(table.status),
		scheduledForIdx: index('idx_notifications_scheduled_for').on(table.scheduledFor)
	})
);

// ============================================
// 型推論用のエクスポート
// ============================================

// 認証・決済系テーブルの型
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type OAuthAccount = typeof oauthAccounts.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type PaymentHistory = typeof paymentHistories.$inferSelect;
export type StripeWebhookEvent = typeof stripeWebhookEvents.$inferSelect;
export type MultiFactorAuth = typeof multiFactorAuth.$inferSelect;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;

// アクアリウム管理系テーブルの型
export type Tag = typeof tags.$inferSelect;
export type Aquarium = typeof aquariums.$inferSelect;
export type AquariumTagRelation = typeof aquariumTagRelations.$inferSelect;
export type AquariumSpec = typeof aquariumSpecs.$inferSelect;
export type AquariumLivestock = typeof aquariumLivestock.$inferSelect;
export type MaintenanceRecord = typeof maintenanceRecords.$inferSelect;
export type WaterChange = typeof waterChanges.$inferSelect;
export type FeedingRecord = typeof feedingRecords.$inferSelect;
export type AdditiveRecord = typeof additiveRecords.$inferSelect;
export type ObservationRecord = typeof observationRecords.$inferSelect;
export type WaterParameter = typeof waterParameters.$inferSelect;
export type AquariumPhoto = typeof aquariumPhotos.$inferSelect;
export type RecordPhoto = typeof recordPhotos.$inferSelect;
export type MaintenanceSchedule = typeof maintenanceSchedules.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

// Insert用の型
export type NewUser = typeof users.$inferInsert;
export type NewSession = typeof sessions.$inferInsert;
export type NewOAuthAccount = typeof oauthAccounts.$inferInsert;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type NewPaymentHistory = typeof paymentHistories.$inferInsert;
export type NewStripeWebhookEvent = typeof stripeWebhookEvents.$inferInsert;
export type NewMultiFactorAuth = typeof multiFactorAuth.$inferInsert;
export type NewUserPreferences = typeof userPreferences.$inferInsert;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type NewAuditLog = typeof auditLogs.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewAquarium = typeof aquariums.$inferInsert;
export type NewAquariumTagRelation = typeof aquariumTagRelations.$inferInsert;
export type NewAquariumSpec = typeof aquariumSpecs.$inferInsert;
export type NewAquariumLivestock = typeof aquariumLivestock.$inferInsert;
export type NewMaintenanceRecord = typeof maintenanceRecords.$inferInsert;
export type NewWaterChange = typeof waterChanges.$inferInsert;
export type NewFeedingRecord = typeof feedingRecords.$inferInsert;
export type NewAdditiveRecord = typeof additiveRecords.$inferInsert;
export type NewObservationRecord = typeof observationRecords.$inferInsert;
export type NewWaterParameter = typeof waterParameters.$inferInsert;
export type NewAquariumPhoto = typeof aquariumPhotos.$inferInsert;
export type NewRecordPhoto = typeof recordPhotos.$inferInsert;
export type NewMaintenanceSchedule = typeof maintenanceSchedules.$inferInsert;
export type NewNotification = typeof notifications.$inferInsert;
