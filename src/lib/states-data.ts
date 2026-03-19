export interface StateData {
  slug: string;
  name: string;
  avgHomePrice: number;
  medianIncome: number;
  propertyTaxRate: number;
  costOfLivingIndex: number;
  cities: Array<{
    name: string;
    avgHomePrice: number;
    costOfLivingIndex: number;
  }>;
}

export const statesData: StateData[] = [
  {
    slug: "california",
    name: "California",
    avgHomePrice: 793000,
    medianIncome: 91905,
    propertyTaxRate: 0.71,
    costOfLivingIndex: 142,
    cities: [
      { name: "Los Angeles", avgHomePrice: 920000, costOfLivingIndex: 166 },
      { name: "San Francisco", avgHomePrice: 1350000, costOfLivingIndex: 189 },
      { name: "San Diego", avgHomePrice: 875000, costOfLivingIndex: 160 },
      { name: "Sacramento", avgHomePrice: 510000, costOfLivingIndex: 121 },
      { name: "San Jose", avgHomePrice: 1280000, costOfLivingIndex: 183 },
    ],
  },
  {
    slug: "texas",
    name: "Texas",
    avgHomePrice: 345000,
    medianIncome: 73035,
    propertyTaxRate: 1.60,
    costOfLivingIndex: 93,
    cities: [
      { name: "Houston", avgHomePrice: 325000, costOfLivingIndex: 96 },
      { name: "Dallas", avgHomePrice: 390000, costOfLivingIndex: 102 },
      { name: "Austin", avgHomePrice: 520000, costOfLivingIndex: 112 },
      { name: "San Antonio", avgHomePrice: 280000, costOfLivingIndex: 88 },
      { name: "Fort Worth", avgHomePrice: 340000, costOfLivingIndex: 94 },
    ],
  },
  {
    slug: "florida",
    name: "Florida",
    avgHomePrice: 405000,
    medianIncome: 67917,
    propertyTaxRate: 0.86,
    costOfLivingIndex: 103,
    cities: [
      { name: "Miami", avgHomePrice: 580000, costOfLivingIndex: 128 },
      { name: "Orlando", avgHomePrice: 385000, costOfLivingIndex: 101 },
      { name: "Tampa", avgHomePrice: 370000, costOfLivingIndex: 99 },
      { name: "Jacksonville", avgHomePrice: 330000, costOfLivingIndex: 94 },
      { name: "Fort Lauderdale", avgHomePrice: 490000, costOfLivingIndex: 118 },
    ],
  },
  {
    slug: "new-york",
    name: "New York",
    avgHomePrice: 420000,
    medianIncome: 81386,
    propertyTaxRate: 1.40,
    costOfLivingIndex: 139,
    cities: [
      { name: "New York City", avgHomePrice: 750000, costOfLivingIndex: 187 },
      { name: "Buffalo", avgHomePrice: 225000, costOfLivingIndex: 89 },
      { name: "Rochester", avgHomePrice: 210000, costOfLivingIndex: 87 },
      { name: "Albany", avgHomePrice: 275000, costOfLivingIndex: 96 },
      { name: "Syracuse", avgHomePrice: 195000, costOfLivingIndex: 86 },
    ],
  },
  {
    slug: "illinois",
    name: "Illinois",
    avgHomePrice: 275000,
    medianIncome: 78433,
    propertyTaxRate: 1.97,
    costOfLivingIndex: 93,
    cities: [
      { name: "Chicago", avgHomePrice: 340000, costOfLivingIndex: 107 },
      { name: "Aurora", avgHomePrice: 290000, costOfLivingIndex: 95 },
      { name: "Naperville", avgHomePrice: 440000, costOfLivingIndex: 112 },
      { name: "Rockford", avgHomePrice: 165000, costOfLivingIndex: 82 },
      { name: "Springfield", avgHomePrice: 155000, costOfLivingIndex: 84 },
    ],
  },
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    avgHomePrice: 265000,
    medianIncome: 73170,
    propertyTaxRate: 1.36,
    costOfLivingIndex: 94,
    cities: [
      { name: "Philadelphia", avgHomePrice: 305000, costOfLivingIndex: 102 },
      { name: "Pittsburgh", avgHomePrice: 230000, costOfLivingIndex: 91 },
      { name: "Allentown", avgHomePrice: 255000, costOfLivingIndex: 93 },
      { name: "Erie", avgHomePrice: 150000, costOfLivingIndex: 83 },
      { name: "Reading", avgHomePrice: 175000, costOfLivingIndex: 87 },
    ],
  },
  {
    slug: "ohio",
    name: "Ohio",
    avgHomePrice: 215000,
    medianIncome: 65720,
    propertyTaxRate: 1.36,
    costOfLivingIndex: 88,
    cities: [
      { name: "Columbus", avgHomePrice: 285000, costOfLivingIndex: 96 },
      { name: "Cleveland", avgHomePrice: 175000, costOfLivingIndex: 86 },
      { name: "Cincinnati", avgHomePrice: 240000, costOfLivingIndex: 91 },
      { name: "Toledo", avgHomePrice: 130000, costOfLivingIndex: 79 },
      { name: "Akron", avgHomePrice: 145000, costOfLivingIndex: 82 },
    ],
  },
  {
    slug: "georgia",
    name: "Georgia",
    avgHomePrice: 350000,
    medianIncome: 71355,
    propertyTaxRate: 0.83,
    costOfLivingIndex: 93,
    cities: [
      { name: "Atlanta", avgHomePrice: 420000, costOfLivingIndex: 107 },
      { name: "Savannah", avgHomePrice: 320000, costOfLivingIndex: 95 },
      { name: "Augusta", avgHomePrice: 210000, costOfLivingIndex: 86 },
      { name: "Athens", avgHomePrice: 290000, costOfLivingIndex: 93 },
      { name: "Macon", avgHomePrice: 175000, costOfLivingIndex: 80 },
    ],
  },
  {
    slug: "north-carolina",
    name: "North Carolina",
    avgHomePrice: 340000,
    medianIncome: 66186,
    propertyTaxRate: 0.77,
    costOfLivingIndex: 95,
    cities: [
      { name: "Charlotte", avgHomePrice: 390000, costOfLivingIndex: 102 },
      { name: "Raleigh", avgHomePrice: 420000, costOfLivingIndex: 105 },
      { name: "Durham", avgHomePrice: 370000, costOfLivingIndex: 100 },
      { name: "Greensboro", avgHomePrice: 255000, costOfLivingIndex: 88 },
      { name: "Wilmington", avgHomePrice: 365000, costOfLivingIndex: 99 },
    ],
  },
  {
    slug: "michigan",
    name: "Michigan",
    avgHomePrice: 230000,
    medianIncome: 66986,
    propertyTaxRate: 1.38,
    costOfLivingIndex: 89,
    cities: [
      { name: "Detroit", avgHomePrice: 105000, costOfLivingIndex: 82 },
      { name: "Grand Rapids", avgHomePrice: 290000, costOfLivingIndex: 92 },
      { name: "Ann Arbor", avgHomePrice: 420000, costOfLivingIndex: 108 },
      { name: "Lansing", avgHomePrice: 185000, costOfLivingIndex: 85 },
      { name: "Kalamazoo", avgHomePrice: 210000, costOfLivingIndex: 87 },
    ],
  },
  {
    slug: "washington",
    name: "Washington",
    avgHomePrice: 580000,
    medianIncome: 90325,
    propertyTaxRate: 0.87,
    costOfLivingIndex: 118,
    cities: [
      { name: "Seattle", avgHomePrice: 825000, costOfLivingIndex: 152 },
      { name: "Tacoma", avgHomePrice: 460000, costOfLivingIndex: 108 },
      { name: "Spokane", avgHomePrice: 370000, costOfLivingIndex: 96 },
      { name: "Bellevue", avgHomePrice: 1150000, costOfLivingIndex: 168 },
      { name: "Vancouver", avgHomePrice: 430000, costOfLivingIndex: 105 },
    ],
  },
  {
    slug: "arizona",
    name: "Arizona",
    avgHomePrice: 395000,
    medianIncome: 72581,
    propertyTaxRate: 0.62,
    costOfLivingIndex: 103,
    cities: [
      { name: "Phoenix", avgHomePrice: 415000, costOfLivingIndex: 105 },
      { name: "Tucson", avgHomePrice: 310000, costOfLivingIndex: 94 },
      { name: "Scottsdale", avgHomePrice: 680000, costOfLivingIndex: 125 },
      { name: "Mesa", avgHomePrice: 390000, costOfLivingIndex: 101 },
      { name: "Chandler", avgHomePrice: 440000, costOfLivingIndex: 107 },
    ],
  },
  {
    slug: "colorado",
    name: "Colorado",
    avgHomePrice: 530000,
    medianIncome: 87598,
    propertyTaxRate: 0.49,
    costOfLivingIndex: 115,
    cities: [
      { name: "Denver", avgHomePrice: 560000, costOfLivingIndex: 122 },
      { name: "Colorado Springs", avgHomePrice: 430000, costOfLivingIndex: 102 },
      { name: "Boulder", avgHomePrice: 780000, costOfLivingIndex: 148 },
      { name: "Fort Collins", avgHomePrice: 500000, costOfLivingIndex: 109 },
      { name: "Aurora", avgHomePrice: 450000, costOfLivingIndex: 104 },
    ],
  },
  {
    slug: "virginia",
    name: "Virginia",
    avgHomePrice: 380000,
    medianIncome: 87249,
    propertyTaxRate: 0.75,
    costOfLivingIndex: 103,
    cities: [
      { name: "Virginia Beach", avgHomePrice: 340000, costOfLivingIndex: 98 },
      { name: "Arlington", avgHomePrice: 680000, costOfLivingIndex: 142 },
      { name: "Richmond", avgHomePrice: 320000, costOfLivingIndex: 96 },
      { name: "Norfolk", avgHomePrice: 270000, costOfLivingIndex: 92 },
      { name: "Alexandria", avgHomePrice: 620000, costOfLivingIndex: 138 },
    ],
  },
  {
    slug: "massachusetts",
    name: "Massachusetts",
    avgHomePrice: 590000,
    medianIncome: 96505,
    propertyTaxRate: 1.12,
    costOfLivingIndex: 135,
    cities: [
      { name: "Boston", avgHomePrice: 750000, costOfLivingIndex: 152 },
      { name: "Cambridge", avgHomePrice: 880000, costOfLivingIndex: 162 },
      { name: "Worcester", avgHomePrice: 370000, costOfLivingIndex: 107 },
      { name: "Springfield", avgHomePrice: 240000, costOfLivingIndex: 94 },
      { name: "Lowell", avgHomePrice: 420000, costOfLivingIndex: 112 },
    ],
  },
];

export const allStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

export function getStateBySlug(slug: string): StateData | undefined {
  return statesData.find((s) => s.slug === slug);
}

export function getStateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export const featuredStates = statesData.filter((s) =>
  ["california", "texas", "florida", "new-york"].includes(s.slug)
);
