export function formatPropertyLocation(location: { area?: string; town?: string; county?: string; country?: string }) {
  return [location.area, location.town, location.county, location.country].filter(Boolean).join(", ");
}

export function formatUnitLabel(unit: { blockName?: string; floor?: string; doorNumber?: string }) {
  return [unit.blockName, unit.floor, unit.doorNumber].filter(Boolean).join(" • ");
}
