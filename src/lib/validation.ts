/**
 * Validation Schemas
 * Zod schemas for form validation
 */

import { z } from 'zod';
import { FORM_LIMITS, PATTERNS, GENDER_OPTIONS } from '@/config/constants';

/**
 * Checkout Form Schema
 */
export const checkoutSchema = z.object({
  gender: z.enum(GENDER_OPTIONS, {
    errorMap: () => ({ message: 'Bitte wählen' }),
  }),
  firstName: z
    .string()
    .min(1, 'Vorname ist erforderlich')
    .max(FORM_LIMITS.FIRST_NAME_MAX),
  lastName: z
    .string()
    .min(1, 'Nachname ist erforderlich')
    .max(FORM_LIMITS.LAST_NAME_MAX),
  street: z
    .string()
    .min(1, 'Straße ist erforderlich')
    .max(FORM_LIMITS.STREET_MAX)
    .refine((val) => !PATTERNS.NO_DIGITS.test(val), {
      message: 'Bitte geben Sie nur den Straßennamen ein, keine Hausnummer',
    }),
  houseNumber: z
    .string()
    .min(1, 'Hausnummer ist erforderlich')
    .max(FORM_LIMITS.HOUSE_NUMBER_MAX),
  postcode: z
    .string()
    .min(1, 'Postleitzahl ist erforderlich')
    .max(FORM_LIMITS.POSTCODE_MAX),
  city: z
    .string()
    .min(1, 'Stadt ist erforderlich')
    .max(FORM_LIMITS.CITY_MAX),
  phone: z
    .string()
    .min(1, 'Telefon ist erforderlich')
    .max(FORM_LIMITS.PHONE_MAX),
  email: z
    .string()
    .email('Ungültige E-Mail-Adresse')
    .max(FORM_LIMITS.EMAIL_MAX),
  birthDate: z.date({ required_error: 'Geburtsdatum ist erforderlich' }),
  birthPlace: z
    .string()
    .min(1, 'Geburtsort ist erforderlich')
    .max(FORM_LIMITS.BIRTH_PLACE_MAX),
  birthCountry: z
    .string()
    .min(1, 'Geburtsland ist erforderlich')
    .max(FORM_LIMITS.BIRTH_COUNTRY_MAX),
  motherTongue: z
    .string()
    .min(1, 'Muttersprache ist erforderlich')
    .max(FORM_LIMITS.MOTHER_TONGUE_MAX),
  orderNotes: z.string().max(FORM_LIMITS.ORDER_NOTES_MAX).optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

/**
 * Email Schema
 */
export const emailSchema = z
  .string()
  .email('Ungültige E-Mail-Adresse')
  .max(FORM_LIMITS.EMAIL_MAX);

/**
 * Phone Schema
 */
export const phoneSchema = z
  .string()
  .min(1, 'Telefon ist erforderlich')
  .max(FORM_LIMITS.PHONE_MAX);
