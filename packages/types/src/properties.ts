import type { AuditStamped, ObjectIdString } from './api';

export interface PropertyLocation {
  country: string;
  county: string;
  town: string;
  area: string;
  estate?: string;
  street?: string;
  buildingName?: string;
  landmark?: string;
  postalAddress?: string;
  latitude?: number;
  longitude?: number;
  googleMapUrl?: string;
  directionsNote?: string;
  publicAddressLabel: string;
}

export interface PropertyView extends AuditStamped {
  id: ObjectIdString;
  name: string;
  slug: string;
  landlordId?: ObjectIdString;
  location: PropertyLocation;
  description?: string;
  amenities: string[];
  published: boolean;
  featured: boolean;
  totalUnits: number;
  occupiedUnits: number;
}

export interface CreatePropertyInput {
  name: string;
  landlordId?: ObjectIdString;
  location: PropertyLocation;
  description?: string;
  amenities?: string[];
}
