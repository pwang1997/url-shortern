'use server';

import { z } from "zod";
import { api } from "~/trpc/server";

function genShortUrl(size: number) {
    return Math.random().toString(36).substring(2, 2 + size);
}

const schema = z.object({
    longUrl: z.string({
        invalid_type_error: 'Invalid Long Url',
    }),
    domain: z.string({
        invalid_type_error: 'Invalid Domain'
    }),
    urlLength: z.string({
        invalid_type_error: 'Invalid Url Length'
    }),
})
export async function generateShortUrl(previousState : unknown, formData: FormData) {
    const rawFormData = {
        longUrl: formData.get('longUrl'),
        domain: formData.get('domain'),
        urlLength: formData.get('urlLength'),
    }
    const validatedFields = schema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const shortUrl = genShortUrl(rawFormData.urlLength as unknown as number);
    console.log({ ...rawFormData, shortUrl });

    try {
        const result = await api.url.createShortUrl({ domain: rawFormData.domain as string, longUrl: rawFormData.longUrl as string, shortUrl: shortUrl });
        return {
            status : 'complete',
            message : result
        }
    } catch (error) {
        console.error(error);
        return {
            status: 'error',
            message: error
        }
    }
}