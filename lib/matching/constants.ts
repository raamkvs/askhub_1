export const PRIORITY_18_COUNTRIES = [
  "Angola",
  "Cameroon",
  "Côte d'Ivoire",
  "Egypt",
  "Ethiopia",
  "Ghana",
  "Kenya",
  "Morocco",
  "Mozambique",
  "Nigeria",
  "Rwanda",
  "Senegal",
  "South Africa",
  "Tanzania",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
] as const

export const PRIORITY_18_SET = new Set<string>(PRIORITY_18_COUNTRIES)

export const TIER_ORDER: Record<string, number> = {
  G7: 0,
  Regional: 1,
  Community: 2,
}

export const STARTER_NEED_TYPES = [
  "Compute",
  "Training",
  "Funding",
  "Partners",
  "Accelerator",
] as const

export const NOT_SURE_NEED = "I'm not sure yet"

export const COUNTRY_ALIASES: Record<string, string> = {
  "Ivory Coast": "Côte d'Ivoire",
}
