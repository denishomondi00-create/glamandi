import type { AuditStamped, MoneyAmount, ObjectIdString } from './api';

export interface WebsiteListingView extends AuditStamped {
  id: ObjectIdString;
  propertyId: ObjectIdString;
  unitId?: ObjectIdString;
  slug: string;
  title: string;
  description: string;
  locationLabel: string;
  rent?: MoneyAmount;
  images: string[];
  amenities: string[];
  status: 'available' | 'reserved' | 'occupied' | 'hidden';
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface WebsitePageContent {
  pageKey: 'home' | 'about' | 'services' | 'contact' | 'privacy' | 'terms';
  title: string;
  body: string;
  seoTitle?: string;
  seoDescription?: string;
}
