import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { leadSchema } from './schema';
import { db } from '$lib/server/db';
import { leads } from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(leadSchema));

	return {
		form
	};
};

export const actions: Actions = {
	contact: async ({ request }) => {
		const form = await superValidate(request, zod4(leadSchema));

		if (!form.valid) {
			return message(form, {
				type: 'error',
				text: 'Please check the form for errors'
			});
		}

		const {
			fullName,
			email,
			phone,
			company,
			country,
			packageSelected,
			inquiryType,
			campaignGoal,
			productType,
			budgetRange,
			launchDate,
			message: leadMessage,
			source,
			status,
			notes
		} = form.data;

		try {
			await db.insert(leads).values({
				fullName,
				email,
				phone,
				company,
				country,
				packageSelected,
				inquiryType,
				campaignGoal,
				productType,
				budgetRange,
				launchDate,
				message: leadMessage,
				source,
				status,
				notes
			});

			return message(form, {
				type: 'success',
				text: 'Lead successfully submitted!'
			});
		} catch (err) {
			return message(form, {
				type: 'error',
				text: 'Error adding lead: ' + (err instanceof Error ? err.message : 'Unknown error')
			});
		}
	}
};
