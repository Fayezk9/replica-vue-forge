/**
 * Postal API Type Definitions
 * Types for openplzapi.org responses
 */

export interface PostalCodeResponse {
  postalCode: string;
  name: string;
}

export interface StreetResponse {
  name: string;
  postalCode: string;
  locality: string;
  borough?: string;
}

export interface PostalCodeSuggestion {
  postalCode: string;
  name: string;
}

export interface StreetSuggestion {
  name: string;
  postalCode: string;
  locality: string;
  borough?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface PostalCodeApiResponse {
  postalcode: string;
  name: string;
}

export interface StreetApiResponse {
  name: string;
  postalcode: string;
  locality: string;
  borough?: string;
}
