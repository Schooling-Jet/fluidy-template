export interface ApiResponse<T> {
  success: boolean;
  code: number;
  data?: T;
  message?: string;
  stackTrace?: any;
  timestamp: Date;
}

export interface Map<T> {
  [key: string]: T;
}

export interface PaginatedQueryOptions {
  search?: string;
  itemsPerPage?: number;
  page?: number;
  sortField?: string; // defaults to 'id'
  sortOrder?: 'asc' | 'desc'; // defaults to 'desc';
}

export interface PaginatedQueryResult<T> {
  page: number;
  itemsPerPage: number;
  itemsCount: number;
  result: T[];
}

export interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string; // comma-separated words
}

export interface Photo {
  thumbnail: string;
  uri: string;
}

export interface Album {
  title: string;
  summary: string;
  date: Date;
  Photos: Photo[];
}

export interface ContactMessage {
  name: string;
  email: string;
  content: string;
  subject: string;
  phone?: string;
}

export interface PaginatedQueryResult<T> {
  page: number;
  itemsPerPage: number;
  itemsCount: number;
  result: T[];
}

export interface FAQ {
  question: string;
  answer: string; // HTMl-based
  order: number; // lower number is more important
}
