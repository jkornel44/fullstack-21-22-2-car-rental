export interface Location {
  id?: number;
  name?: string;
  postal_code?: string;
  city?: string;
  street?: string;
  street_type?: StreetType;
  house_no?: number;
}

export enum StreetType {
  Street = 'STREET',
  Road = 'ROAD',
  Square = 'SQUARE'
}
