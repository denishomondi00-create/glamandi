import { GLAMANDI_BRAND } from './brand';

export const glamandiTheme = {
  primary: GLAMANDI_BRAND.colors.brightCyan,
  secondary: GLAMANDI_BRAND.colors.skyBlue,
  accent: GLAMANDI_BRAND.colors.softAqua,
  muted: GLAMANDI_BRAND.colors.icyBlue,
  text: GLAMANDI_BRAND.colors.nearBlack,
  dark: GLAMANDI_BRAND.colors.darkTeal,
  background: GLAMANDI_BRAND.colors.white,
  gradient: `linear-gradient(135deg, ${GLAMANDI_BRAND.colors.brightCyan}, ${GLAMANDI_BRAND.colors.skyBlue})`,
} as const;
