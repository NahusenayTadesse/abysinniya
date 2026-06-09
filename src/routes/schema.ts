import { z } from 'zod/v4';

export const leadSchema = z.object({
	fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),

	email: z.email({ message: 'Please enter a valid email address' }).optional(),

	phone: z.string().optional(),

	company: z.string().optional(),

	country: z.string().optional(),

	packageSelected: z.string().optional(),

	inquiryType: z.string().optional(),

	campaignGoal: z.string().optional(),

	productType: z.string().optional(),

	budgetRange: z.string().optional(),

	launchDate: z.string().optional(),

	message: z.string().optional(),

	source: z.string().default('website'),

	status: z.string().default('new'),

	notes: z.string().optional()
});
