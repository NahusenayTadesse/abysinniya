import { z } from 'zod/v4';
export const leadSchema = z.object({
	fullName: z.string().min(2, {
		message: 'Full name must be at least 2 characters'
	}),

	email: z
		.email({
			message: 'Please enter a valid email address'
		})
		.optional(),

	phone: z.string().optional(),

	company: z.string().optional(),

	country: z.string().optional(),

	applicantType: z.string().optional(),

	packageSelected: z.string().optional(),

	topicsInterested: z.array(z.string()).default([]),

	mainGoal: z.string().optional(),

	experienceLevel: z.string().optional(),

	packageIncludes: z.array(z.string()).default([]),

	participantCount: z.string().optional(),

	preferredTrainingMode: z.string().optional(),

	budgetRange: z.string().optional(),

	preferredStartDate: z.string().optional(),

	recommendedPackage: z.string().optional(),

	message: z.string().optional(),

	source: z.string().default('website'),

	status: z.string().default('new'),

	notes: z.string().optional()
});
