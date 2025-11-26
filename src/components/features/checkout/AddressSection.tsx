/**
 * AddressSection Component
 * Address input with autocomplete for checkout
 */

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type { CheckoutFormState } from '@/hooks/useCheckoutForm';

interface AddressSectionProps {
  formData: CheckoutFormState;
  errors: Record<string, string>;
  onFieldChange: (field: keyof CheckoutFormState, value: any) => void;
  isManualAddress: boolean;
  setIsManualAddress: (value: boolean) => void;
  postalSuggestions: Array<{ postalCode: string; name: string }>;
  showPostalSuggestions: boolean;
  onPostalCodeChange: (value: string) => void;
  onPostalSelect: (postalCode: string, city: string) => void;
  hidePostalSuggestions: () => void;
  streetSuggestions: string[];
  onStreetChange: (value: string) => void;
  onStreetSelect: (street: string) => void;
  isLoadingStreets: boolean;
}

export function AddressSection({
  formData,
  errors,
  onFieldChange,
  isManualAddress,
  setIsManualAddress,
  postalSuggestions,
  showPostalSuggestions,
  onPostalCodeChange,
  onPostalSelect,
  hidePostalSuggestions,
  streetSuggestions,
  onStreetChange,
  onStreetSelect,
  isLoadingStreets,
}: AddressSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-bold">Adresse</h2>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="manualAddress"
          checked={isManualAddress}
          onCheckedChange={(checked) => setIsManualAddress(checked as boolean)}
        />
        <Label htmlFor="manualAddress" className="font-normal cursor-pointer">
          Adresse manuell eingeben
        </Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Postcode */}
        <div className="relative">
          <Label htmlFor="postcode">
            Postleitzahl <span className="text-red-500">*</span>
          </Label>
          <Input
            id="postcode"
            value={formData.postcode}
            onChange={(e) => onPostalCodeChange(e.target.value)}
            className={errors.postcode ? 'border-red-500' : ''}
            disabled={isManualAddress}
          />
          {errors.postcode && <p className="text-sm text-red-500 mt-1">{errors.postcode}</p>}

          {/* Postal Code Suggestions */}
          {showPostalSuggestions && postalSuggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {postalSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onPostalSelect(suggestion.postalCode, suggestion.name);
                    hidePostalSuggestions();
                  }}
                >
                  {suggestion.postalCode} - {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">
            Stadt <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
            className={errors.city ? 'border-red-500' : ''}
            disabled={!isManualAddress && !!formData.postcode}
          />
          {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
        </div>

        {/* Street */}
        <div className="relative">
          <Label htmlFor="street">
            Straße <span className="text-red-500">*</span>
          </Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) => onStreetChange(e.target.value)}
            className={errors.street ? 'border-red-500' : ''}
            list="street-suggestions"
            disabled={isManualAddress || !formData.postcode}
          />
          {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street}</p>}

          {/* Street Suggestions */}
          {!isManualAddress && streetSuggestions.length > 0 && (
            <datalist id="street-suggestions">
              {streetSuggestions.map((street, index) => (
                <option key={index} value={street} />
              ))}
            </datalist>
          )}

          {isLoadingStreets && (
            <p className="text-sm text-muted-foreground mt-1">Lade Straßen...</p>
          )}
        </div>

        {/* House Number */}
        <div>
          <Label htmlFor="houseNumber">
            Hausnummer <span className="text-red-500">*</span>
          </Label>
          <Input
            id="houseNumber"
            value={formData.houseNumber}
            onChange={(e) => onFieldChange('houseNumber', e.target.value)}
            className={errors.houseNumber ? 'border-red-500' : ''}
          />
          {errors.houseNumber && <p className="text-sm text-red-500 mt-1">{errors.houseNumber}</p>}
        </div>
      </div>
    </div>
  );
}
