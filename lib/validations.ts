import * as z from 'zod';
import { UUIDRegex } from '#/lib/utils';

export const SignInSchema = z.object({
	token: z.string()
		.optional()
		.refine(value => value && value.length > 0, 'Your Hashnode token is required')
		.refine(value => {
			return value && value.length >= 36 && UUIDRegex.test(value);
		}, {
			message: 'Invalid Hashnode token format'
		})
});
