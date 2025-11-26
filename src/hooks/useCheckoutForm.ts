/**
 * useCheckoutForm Hook
 * Manages checkout form state and validation
 */

import { useState, useCallback } from 'react';
import { checkoutSchema, type CheckoutFormData } from '@/lib/validation';
import { PHONE_COUNTRY_CODES } from '@/config/constants';
import type { Gender } from '@/config/constants';

export interface CheckoutFormState {
  gender: Gender | '';
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
  phone: string;
  phoneCountryCode: string;
  email: string;
  birthDate: Date | undefined;
  birthPlace: string;
  birthCountry: string;
  motherTongue: string;
  orderNotes: string;
}

const initialFormState: CheckoutFormState = {
  gender: '',
  firstName: '',
  lastName: '',
  street: '',
  houseNumber: '',
  postcode: '',
  city: '',
  phone: '',
  phoneCountryCode: PHONE_COUNTRY_CODES.DEFAULT,
  email: '',
  birthDate: undefined,
  birthPlace: '',
  birthCountry: '',
  motherTongue: '',
  orderNotes: '',
};

export function useCheckoutForm() {
  const [formData, setFormData] = useState<CheckoutFormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isManualAddress, setIsManualAddress] = useState(false);

  /**
   * Update form field
   */
  const updateField = useCallback(
    (field: keyof CheckoutFormState, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error for this field
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  /**
   * Update multiple fields at once
   */
  const updateFields = useCallback(
    (updates: Partial<CheckoutFormState>) => {
      setFormData((prev) => ({
        ...prev,
        ...updates,
      }));

      // Clear errors for updated fields
      const updatedFields = Object.keys(updates);
      setErrors((prev) => {
        const newErrors = { ...prev };
        updatedFields.forEach((field) => {
          delete newErrors[field];
        });
        return newErrors;
      });
    },
    []
  );

  /**
   * Validate form
   */
  const validateForm = useCallback((): boolean => {
    try {
      checkoutSchema.parse({
        gender: formData.gender,
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        houseNumber: formData.houseNumber,
        postcode: formData.postcode,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        birthDate: formData.birthDate,
        birthPlace: formData.birthPlace,
        birthCountry: formData.birthCountry,
        motherTongue: formData.motherTongue,
        orderNotes: formData.orderNotes || '',
      });

      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};

      if (error.errors) {
        error.errors.forEach((err: any) => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });
      }

      setErrors(newErrors);
      return false;
    }
  }, [formData]);

  /**
   * Reset form
   */
  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors({});
    setIsManualAddress(false);
  }, []);

  /**
   * Get form data for submission
   */
  const getFormData = useCallback((): CheckoutFormData & { phoneCountryCode: string } => {
    return {
      gender: formData.gender as Gender,
      firstName: formData.firstName,
      lastName: formData.lastName,
      street: formData.street,
      houseNumber: formData.houseNumber,
      postcode: formData.postcode,
      city: formData.city,
      phone: formData.phone,
      phoneCountryCode: formData.phoneCountryCode,
      email: formData.email,
      birthDate: formData.birthDate!,
      birthPlace: formData.birthPlace,
      birthCountry: formData.birthCountry,
      motherTongue: formData.motherTongue,
      orderNotes: formData.orderNotes,
    };
  }, [formData]);

  return {
    // State
    formData,
    errors,
    isManualAddress,

    // Actions
    updateField,
    updateFields,
    validateForm,
    resetForm,
    getFormData,
    setIsManualAddress,
  };
}
