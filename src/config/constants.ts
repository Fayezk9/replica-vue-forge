/**
 * Application Constants
 * Single source of truth for all app-wide constants
 */

// Contact Information
export const CONTACT = {
  PHONE: '+49 15238455744',
  EMAIL: 'info@inlinguadortmund.de',
  COMPANY_NAME: 'inlingua Dortmund',
  LOCATION: 'Dortmund, Deutschland',
} as const;

// Course Prices (in EUR)
export const PRICES = {
  TELC_A1: 179.0,
  TELC_A2: 179.0,
  TELC_B1: 189.0,
  TELC_B2: 189.0,
  TELC_C1: 189.0,
  CERTIFICATE_DELIVERY: {
    STANDARD: 0,
    EXPRESS: 15.0,
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  CART_DATA: 'cartData',
  SIDEBAR_STATE: 'sidebar:state',
} as const;

// Cookie Configuration
export const COOKIES = {
  SIDEBAR: {
    NAME: 'sidebar:state',
    MAX_AGE: 60 * 60 * 24 * 7, // 7 days
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  POSTAL_CODES: 'https://openplzapi.org/de/FederalStates/NW/PostalCodes',
  STREETS: (postalCode: string) =>
    `https://openplzapi.org/de/Streets?postalcode=${postalCode}&federalstate=Nordrhein-Westfalen`,
} as const;

// Form Constants
export const FORM_LIMITS = {
  FIRST_NAME_MAX: 100,
  LAST_NAME_MAX: 100,
  STREET_MAX: 200,
  HOUSE_NUMBER_MAX: 20,
  POSTCODE_MAX: 10,
  CITY_MAX: 100,
  PHONE_MAX: 30,
  EMAIL_MAX: 255,
  BIRTH_PLACE_MAX: 100,
  BIRTH_COUNTRY_MAX: 100,
  MOTHER_TONGUE_MAX: 100,
  ORDER_NOTES_MAX: 1000,
} as const;

// Validation Patterns
export const PATTERNS = {
  NO_DIGITS: /\d/,
} as const;

// Gender Options
export const GENDER_OPTIONS = ['Herr', 'Frau', 'Divers'] as const;

export type Gender = typeof GENDER_OPTIONS[number];

// Phone Country Codes
export const PHONE_COUNTRY_CODES = {
  GERMANY: '+49',
  DEFAULT: '+49',
} as const;

// Pagination
export const PAGINATION = {
  POSTAL_API_PAGE_SIZE: 50,
} as const;
