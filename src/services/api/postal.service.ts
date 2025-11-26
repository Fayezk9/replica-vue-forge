/**
 * Postal Service
 * Handles postal code and street lookups via openplzapi.org
 */

import { API_ENDPOINTS, PAGINATION } from '@/config/constants';
import type {
  PostalCodeSuggestion,
  StreetSuggestion,
  PostalCodeApiResponse,
  StreetApiResponse,
} from './types/postal.types';

export class PostalService {
  /**
   * Fetch postal code suggestions based on search term
   */
  static async fetchPostalCodeSuggestions(
    search: string
  ): Promise<PostalCodeSuggestion[]> {
    if (!search || search.length < 2) {
      return [];
    }

    try {
      let allResults: PostalCodeSuggestion[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages && allResults.length < 200) {
        const response = await fetch(
          `${API_ENDPOINTS.POSTAL_CODES}?name=${encodeURIComponent(search)}&page=${currentPage}&pageSize=${PAGINATION.POSTAL_API_PAGE_SIZE}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: PostalCodeApiResponse[] = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          hasMorePages = false;
          break;
        }

        const mappedResults: PostalCodeSuggestion[] = data.map((item) => ({
          postalCode: item.postalcode,
          name: item.name,
        }));

        allResults = [...allResults, ...mappedResults];

        if (data.length < PAGINATION.POSTAL_API_PAGE_SIZE) {
          hasMorePages = false;
        } else {
          currentPage++;
        }
      }

      return allResults;
    } catch (error) {
      console.error('Error fetching postal codes:', error);
      return [];
    }
  }

  /**
   * Fetch all streets for a given postal code
   */
  static async fetchStreetsForPostalCode(
    postalCode: string
  ): Promise<StreetSuggestion[]> {
    if (!postalCode) {
      return [];
    }

    try {
      let allStreets: StreetSuggestion[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await fetch(
          `${API_ENDPOINTS.STREETS(postalCode)}&page=${currentPage}&pageSize=${PAGINATION.POSTAL_API_PAGE_SIZE}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: StreetApiResponse[] = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          hasMorePages = false;
          break;
        }

        const mappedStreets: StreetSuggestion[] = data.map((item) => ({
          name: item.name,
          postalCode: item.postalcode,
          locality: item.locality,
          borough: item.borough,
        }));

        allStreets = [...allStreets, ...mappedStreets];

        if (data.length < PAGINATION.POSTAL_API_PAGE_SIZE) {
          hasMorePages = false;
        } else {
          currentPage++;
        }
      }

      return allStreets;
    } catch (error) {
      console.error('Error fetching streets:', error);
      return [];
    }
  }

  /**
   * Get unique street names from suggestions
   */
  static getUniqueStreetNames(streets: StreetSuggestion[]): string[] {
    const uniqueNames = new Set(streets.map((s) => s.name));
    return Array.from(uniqueNames).sort();
  }

  /**
   * Search streets by name
   */
  static searchStreets(
    streets: StreetSuggestion[],
    searchTerm: string
  ): string[] {
    if (!searchTerm) {
      return this.getUniqueStreetNames(streets);
    }

    const filtered = streets.filter((street) =>
      street.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return this.getUniqueStreetNames(filtered);
  }
}
