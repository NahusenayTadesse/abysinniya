import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export * from './auth.schema';

export const leads = sqliteTable('leads', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),

	createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),

	fullName: text('full_name').notNull(),
	email: text('email'),
	phone: text('phone'),
	company: text('company'),
	country: text('country'),

	// AI intake / recommendation fields
	applicantType: text('applicant_type'),
	packageSelected: text('package_selected'),

	// Store multiple selections as JSON arrays
	topicsInterested: text('topics_interested', { mode: 'json' })
		.$type<string[]>()
		.default(sql`'[]'`),

	mainGoal: text('main_goal'),
	experienceLevel: text('experience_level'),

	packageIncludes: text('package_includes', { mode: 'json' })
		.$type<string[]>()
		.default(sql`'[]'`),

	participantCount: text('participant_count'),
	preferredTrainingMode: text('preferred_training_mode'),
	budgetRange: text('budget_range'),
	preferredStartDate: text('preferred_start_date'),

	// Optional recommendation/result fields
	recommendedPackage: text('recommended_package'),

	message: text('message'),

	source: text('source').default('website'),
	status: text('status').default('new'),
	notes: text('notes'),
	seen: integer('seen', { mode: 'boolean' }).default(false)
});
