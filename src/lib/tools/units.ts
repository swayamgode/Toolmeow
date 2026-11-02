export type UnitCategory =
  | 'length'
  | 'mass'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'speed'
  | 'time'
  | 'data'
  | 'pressure';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (baseVal: number) => number;
}

export interface UnitCategoryConfig {
  id: UnitCategory;
  name: string;
  baseUnit: string;
  units: UnitDefinition[];
}

export const UNIT_CATEGORIES: Record<UnitCategory, UnitCategoryConfig> = {
  length: {
    id: 'length',
    name: 'Length',
    baseUnit: 'Meter (m)',
    units: [
      { id: 'm', name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', toBase: (v) => v * 0.01, fromBase: (v) => v / 0.01 },
      { id: 'mm', name: 'Millimeter', symbol: 'mm', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: 'mi', name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'ft', name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'in', name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: 'nmi', name: 'Nautical Mile', symbol: 'nmi', toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
    ],
  },
  mass: {
    id: 'mass',
    name: 'Weight & Mass',
    baseUnit: 'Gram (g)',
    units: [
      { id: 'g', name: 'Gram', symbol: 'g', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'mg', name: 'Milligram', symbol: 'mg', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: 't', name: 'Metric Tonne', symbol: 't', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'lb', name: 'Pound', symbol: 'lb', toBase: (v) => v * 453.59237, fromBase: (v) => v / 453.59237 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', toBase: (v) => v * 28.349523125, fromBase: (v) => v / 28.349523125 },
    ],
  },
  temperature: {
    id: 'temperature',
    name: 'Temperature',
    baseUnit: 'Celsius (°C)',
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
      {
        id: 'f',
        name: 'Fahrenheit',
        symbol: '°F',
        toBase: (v) => ((v - 32) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 + 32,
      },
      { id: 'k', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  area: {
    id: 'area',
    name: 'Area',
    baseUnit: 'Square Meter (m²)',
    units: [
      { id: 'sqm', name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      { id: 'sqkm', name: 'Square Kilometer', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'sqft', name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
      { id: 'sqyd', name: 'Square Yard', symbol: 'yd²', toBase: (v) => v * 0.83612736, fromBase: (v) => v / 0.83612736 },
      { id: 'acre', name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    ],
  },
  volume: {
    id: 'volume',
    name: 'Volume',
    baseUnit: 'Liter (L)',
    units: [
      { id: 'l', name: 'Liter', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      { id: 'ml', name: 'Milliliter', symbol: 'mL', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: 'cu_m', name: 'Cubic Meter', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'gal_us', name: 'US Gallon', symbol: 'gal', toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      { id: 'qt_us', name: 'US Quart', symbol: 'qt', toBase: (v) => v * 0.946352946, fromBase: (v) => v / 0.946352946 },
      { id: 'pt_us', name: 'US Pint', symbol: 'pt', toBase: (v) => v * 0.473176473, fromBase: (v) => v / 0.473176473 },
      { id: 'fl_oz_us', name: 'US Fluid Ounce', symbol: 'fl oz', toBase: (v) => v * 0.0295735295625, fromBase: (v) => v / 0.0295735295625 },
    ],
  },
  speed: {
    id: 'speed',
    name: 'Speed',
    baseUnit: 'Meters per Second (m/s)',
    units: [
      { id: 'ms', name: 'Meters per Second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kmh', name: 'Kilometers per Hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'mph', name: 'Miles per Hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'knot', name: 'Knot', symbol: 'kn', toBase: (v) => v * 0.514444444, fromBase: (v) => v / 0.514444444 },
    ],
  },
  time: {
    id: 'time',
    name: 'Time',
    baseUnit: 'Second (s)',
    units: [
      { id: 's', name: 'Second', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
      { id: 'ms', name: 'Millisecond', symbol: 'ms', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: 'min', name: 'Minute', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: 'h', name: 'Hour', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'd', name: 'Day', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: 'wk', name: 'Week', symbol: 'wk', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    ],
  },
  data: {
    id: 'data',
    name: 'Data Storage',
    baseUnit: 'Byte (B)',
    units: [
      { id: 'b', name: 'Byte', symbol: 'B', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kb', name: 'Kilobyte (decimal)', symbol: 'KB', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'mb', name: 'Megabyte (decimal)', symbol: 'MB', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'gb', name: 'Gigabyte (decimal)', symbol: 'GB', toBase: (v) => v * 1000000000, fromBase: (v) => v / 1000000000 },
      { id: 'tb', name: 'Terabyte (decimal)', symbol: 'TB', toBase: (v) => v * 1000000000000, fromBase: (v) => v / 1000000000000 },
      { id: 'kib', name: 'Kibibyte (binary)', symbol: 'KiB', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: 'mib', name: 'Mebibyte (binary)', symbol: 'MiB', toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { id: 'gib', name: 'Gibibyte (binary)', symbol: 'GiB', toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      { id: 'tib', name: 'Tebibyte (binary)', symbol: 'TiB', toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
    ],
  },
  pressure: {
    id: 'pressure',
    name: 'Pressure',
    baseUnit: 'Pascal (Pa)',
    units: [
      { id: 'pa', name: 'Pascal', symbol: 'Pa', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'bar', name: 'Bar', symbol: 'bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      { id: 'psi', name: 'Pounds per Square Inch', symbol: 'psi', toBase: (v) => v * 6894.757293168, fromBase: (v) => v / 6894.757293168 },
      { id: 'atm', name: 'Standard Atmosphere', symbol: 'atm', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
    ],
  },
};

export function convertUnit({
  category,
  fromUnitId,
  toUnitId,
  value,
}: {
  category: UnitCategory;
  fromUnitId: string;
  toUnitId: string;
  value: number;
}): number {
  const catConfig = UNIT_CATEGORIES[category];
  if (!catConfig) return value;

  const fromUnit = catConfig.units.find((u) => u.id === fromUnitId);
  const toUnit = catConfig.units.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return value;

  const baseVal = fromUnit.toBase(value);
  return toUnit.fromBase(baseVal);
}

