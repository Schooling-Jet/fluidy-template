import { Photo } from "./commons.model";

export interface School {
  name: string;
  squareLogo: string;
  horizLogo: string;
  bannerImage: string;
  primaryColor: string;
  secondaryColor: string;
  motto: string;
  about: string;
  emailContact: string;
  phoneContact: string;
  vision: string;
  mission: string;
  subdomain: string;
  domain: string;
  address: string;
  previewStatus: string;

  // social profiles
  whatsapp?: string;
  facebook?: string;
  linkedIn?: string;
  twitter?: string;
  youtube?: string;
  instagram?: string;
  images: Photo[];
}
