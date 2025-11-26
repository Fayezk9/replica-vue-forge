/**
 * usePostalLookup Hook
 * Provides postal code and street lookup functionality
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { PostalService } from '@/services/api/postal.service';
import type {
  PostalCodeSuggestion,
  StreetSuggestion,
} from '@/services/api/types/postal.types';

const DEBOUNCE_DELAY = 300; // ms

export function usePostalLookup() {
  const [postalSuggestions, setPostalSuggestions] = useState<PostalCodeSuggestion[]>([]);
  const [streetSuggestions, setStreetSuggestions] = useState<string[]>([]);
  const [allStreets, setAllStreets] = useState<StreetSuggestion[]>([]);
  const [isLoadingPostal, setIsLoadingPostal] = useState(false);
  const [isLoadingStreets, setIsLoadingStreets] = useState(false);
  const [showPostalSuggestions, setShowPostalSuggestions] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Search postal codes with debouncing
   */
  const searchPostalCodes = useCallback((searchTerm: string) => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchTerm || searchTerm.length < 2) {
      setPostalSuggestions([]);
      setShowPostalSuggestions(false);
      return;
    }

    setIsLoadingPostal(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await PostalService.fetchPostalCodeSuggestions(searchTerm);
        setPostalSuggestions(results);
        setShowPostalSuggestions(results.length > 0);
      } catch (error) {
        console.error('Error searching postal codes:', error);
        setPostalSuggestions([]);
      } finally {
        setIsLoadingPostal(false);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  /**
   * Fetch streets for a postal code
   */
  const fetchStreetsForPostalCode = useCallback(async (postalCode: string) => {
    if (!postalCode) {
      setAllStreets([]);
      setStreetSuggestions([]);
      return;
    }

    setIsLoadingStreets(true);

    try {
      const streets = await PostalService.fetchStreetsForPostalCode(postalCode);
      setAllStreets(streets);
      const uniqueNames = PostalService.getUniqueStreetNames(streets);
      setStreetSuggestions(uniqueNames);
    } catch (error) {
      console.error('Error fetching streets:', error);
      setAllStreets([]);
      setStreetSuggestions([]);
    } finally {
      setIsLoadingStreets(false);
    }
  }, []);

  /**
   * Search streets by name
   */
  const searchStreets = useCallback(
    (searchTerm: string) => {
      if (!allStreets.length) return;

      const filtered = PostalService.searchStreets(allStreets, searchTerm);
      setStreetSuggestions(filtered);
    },
    [allStreets]
  );

  /**
   * Clear all suggestions
   */
  const clearSuggestions = useCallback(() => {
    setPostalSuggestions([]);
    setStreetSuggestions([]);
    setAllStreets([]);
    setShowPostalSuggestions(false);
  }, []);

  /**
   * Hide postal suggestions
   */
  const hidePostalSuggestions = useCallback(() => {
    setShowPostalSuggestions(false);
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    // Postal code state
    postalSuggestions,
    showPostalSuggestions,
    isLoadingPostal,

    // Street state
    streetSuggestions,
    isLoadingStreets,

    // Actions
    searchPostalCodes,
    fetchStreetsForPostalCode,
    searchStreets,
    clearSuggestions,
    hidePostalSuggestions,
  };
}
