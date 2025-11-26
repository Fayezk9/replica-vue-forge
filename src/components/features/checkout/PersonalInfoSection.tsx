/**
 * PersonalInfoSection Component
 * Personal information fields for checkout
 */

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { GENDER_OPTIONS, PHONE_COUNTRY_CODES } from '@/config/constants';
import type { CheckoutFormState } from '@/hooks/useCheckoutForm';

interface PersonalInfoSectionProps {
  formData: CheckoutFormState;
  errors: Record<string, string>;
  onFieldChange: (field: keyof CheckoutFormState, value: any) => void;
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
}

export function PersonalInfoSection({
  formData,
  errors,
  onFieldChange,
  calendarOpen,
  setCalendarOpen,
}: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-bold">Persönliche Informationen</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender */}
        <div>
          <Label htmlFor="gender">
            Anrede <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.gender} onValueChange={(value) => onFieldChange('gender', value)}>
            <SelectTrigger id="gender" className={errors.gender ? 'border-red-500' : ''}>
              <SelectValue placeholder="Wählen Sie" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
        </div>

        {/* First Name */}
        <div>
          <Label htmlFor="firstName">
            Vorname <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onFieldChange('firstName', e.target.value)}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <Label htmlFor="lastName">
            Nachname <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onFieldChange('lastName', e.target.value)}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">
            E-Mail-Adresse <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">
            Telefon <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Select
              value={formData.phoneCountryCode}
              onValueChange={(value) => onFieldChange('phoneCountryCode', value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PHONE_COUNTRY_CODES.GERMANY}>
                  {PHONE_COUNTRY_CODES.GERMANY}
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              className={errors.phone ? 'border-red-500 flex-1' : 'flex-1'}
            />
          </div>
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Birth Date */}
        <div>
          <Label htmlFor="birthDate">
            Geburtsdatum <span className="text-red-500">*</span>
          </Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !formData.birthDate && 'text-muted-foreground',
                  errors.birthDate && 'border-red-500'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.birthDate ? (
                  format(formData.birthDate, 'PPP', { locale: de })
                ) : (
                  <span>Datum wählen</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.birthDate}
                onSelect={(date) => {
                  onFieldChange('birthDate', date);
                  setCalendarOpen(false);
                }}
                initialFocus
                locale={de}
              />
            </PopoverContent>
          </Popover>
          {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>}
        </div>

        {/* Birth Place */}
        <div>
          <Label htmlFor="birthPlace">
            Geburtsort <span className="text-red-500">*</span>
          </Label>
          <Input
            id="birthPlace"
            value={formData.birthPlace}
            onChange={(e) => onFieldChange('birthPlace', e.target.value)}
            className={errors.birthPlace ? 'border-red-500' : ''}
          />
          {errors.birthPlace && <p className="text-sm text-red-500 mt-1">{errors.birthPlace}</p>}
        </div>

        {/* Birth Country */}
        <div>
          <Label htmlFor="birthCountry">
            Geburtsland <span className="text-red-500">*</span>
          </Label>
          <Input
            id="birthCountry"
            value={formData.birthCountry}
            onChange={(e) => onFieldChange('birthCountry', e.target.value)}
            className={errors.birthCountry ? 'border-red-500' : ''}
          />
          {errors.birthCountry && <p className="text-sm text-red-500 mt-1">{errors.birthCountry}</p>}
        </div>

        {/* Mother Tongue */}
        <div>
          <Label htmlFor="motherTongue">
            Muttersprache <span className="text-red-500">*</span>
          </Label>
          <Input
            id="motherTongue"
            value={formData.motherTongue}
            onChange={(e) => onFieldChange('motherTongue', e.target.value)}
            className={errors.motherTongue ? 'border-red-500' : ''}
          />
          {errors.motherTongue && <p className="text-sm text-red-500 mt-1">{errors.motherTongue}</p>}
        </div>
      </div>
    </div>
  );
}
