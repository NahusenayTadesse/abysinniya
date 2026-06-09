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
	packageSelected: text('package_selected'),
	inquiryType: text('inquiry_type'),
	campaignGoal: text('campaign_goal'),
	productType: text('product_type'),
	budgetRange: text('budget_range'),
	launchDate: text('launch_date'),
	message: text('message'),
	source: text('source').default('website'),
	status: text('status').default('new'),
	notes: text('notes'),
	seen: integer('seen', { mode: 'boolean' }).default(false)
});
