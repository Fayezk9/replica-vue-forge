/**
 * User Type Definitions
 */

import type { Gender } from '@/config/constants';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
  country?: string;
}

export interface PersonalInfo {
  gender: Gender;
  firstName: string;
  lastName: string;
  birthDate: Date;
  birthPlace: string;
  birthCountry: string;
  motherTongue: string;
}

export interface ContactInfo {
  phone: string;
  phoneCountryCode: string;
  email: string;
  address: Address;
}
