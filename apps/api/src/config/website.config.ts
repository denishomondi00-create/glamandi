import { registerAs } from '@nestjs/config';

export default registerAs('website', () => ({
  publicName: 'Glamandi Homes',
  tagline: 'We turn houses into homes',
  colors: {
    brightCyan: '#17DEFE',
    skyBlue: '#3AC4FA',
    softAqua: '#32D2F7',
    lightIcyBlue: '#C5F0F8',
    darkTeal: '#145F6B',
    nearBlack: '#181918',
    background: '#FFFFFF',
  },
  listingDefaultCounty: process.env.WEBSITE_DEFAULT_COUNTY ?? 'Kilifi',
  listingDefaultTown: process.env.WEBSITE_DEFAULT_TOWN ?? 'Mtwapa',
}));
