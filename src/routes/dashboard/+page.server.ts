import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';

import { deleteTestimonial, markRead } from './schema.js';
import { db } from '$lib/server/db';
import { leads } from '$lib/server/db/schema';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	const readForm = await superValidate(zod4(markRead));
	const deleteForm = await superValidate(zod4(deleteTestimonial));

	const allLeads = await db.select().from(leads);

	return {
		readForm,
		deleteForm,
		leads: allLeads
	};
};

export const actions: Actions = {
	read: async ({ request }) => {
		const form = await superValidate(request, zod4(markRead));

		console.log('Server received form data:', form);

		if (!form.valid) {
			console.log('Validation failed details:', form.errors);
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.update(leads).set({ seen: true }).where(eq(leads.id, id));
			return message(form, { type: 'success', text: 'Leads Successfully Marked as Read' });
		} catch (err: any) {
			return message(
				form,
				{ type: 'error', text: 'Error while marking leads as read.' },
				{ status: 500 }
			);
		}
	},
	delete: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(leads).where(eq(leads.id, id));
			return message(form, { type: 'success', text: 'Leads Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting leads.'
				},
				{ status: 500 }
			);
		}
	}
};
