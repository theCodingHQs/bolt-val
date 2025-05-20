import * as z from 'zod';

export const undefinedOrEmptyToNull = z.string().optional().nullable().transform((val) => (val === undefined || val === '' ? null : val))
export const coerceUndefinedOrEmptyToNull = z.coerce.string().optional().nullable().transform((val) => (val === undefined || val === '' ? null : val))
export const stringNotEmpty = (message: string) => {
    return z.string().nonempty({ message: message })
}

export const coerceStringNotEmpty = (message: string) => {
    return z.coerce.string().nonempty({ message: message })
}

export const coerceStringNotEmptySelect = (message: string) => {
    return z.coerce.string().refine((val) => val !== '' && val !== undefined && val !== 'NaN', { message: message })
}
