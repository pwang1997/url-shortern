'use server';

import { z } from "zod";
import { api } from "~/trpc/server";

function genShortUrl(size: number) {
    return Math.random().toString(36).substring(2, 2 + size);
}
function getDomain(url: string) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname; // Extracts the domain
    } catch (error) {
        throw new Error(`Invalid URL: ${url}`); // Handle invalid URL case
    }
}

const schema = z.object({
    longUrl: z.string({
        invalid_type_error: 'Invalid Long Url',
    }),
    urlLength: z.string({
        invalid_type_error: 'Invalid Url Length'
    }),
})
export async function generateShortUrl(previousState: unknown, formData: FormData) {
    const rawFormData = {
        longUrl: formData.get('longUrl'),
        urlLength: formData.get('urlLength'),
    }

    const validatedFields = schema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        const domain = getDomain(rawFormData.longUrl as string);
        const shortUrl = genShortUrl(rawFormData.urlLength as unknown as number);
        console.debug({ ...rawFormData, shortUrl });
        const result = await api.url.createShortUrl({ domain: domain, longUrl: rawFormData.longUrl as string, shortUrl: shortUrl });
        return { status: 'complete', message: result }
    } catch (error) {
        console.error(error);
        return { status: 'error', message: error }
    }
}