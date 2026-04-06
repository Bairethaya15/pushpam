/**
 * Astronomical calculations — Moon & Sun ecliptic longitude
 * Based on Jean Meeus "Astronomical Algorithms"
 * Pure math. No tables. No expiry. Works for any date.
 */

// Julian Day Number from a JS Date
function toJD(date) {
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth() + 1
  const d = date.getUTCDate() +
    date.getUTCHours() / 24 +
    date.getUTCMinutes() / 1440 +
    date.getUTCSeconds() / 86400

  let Y = y, M = m
  if (M <= 2) { Y -= 1; M += 12 }

  const A = Math.floor(Y / 100)
  const B = 2 - A + Math.floor(A / 4)

  return Math.floor(365.25 * (Y + 4716)) +
    Math.floor(30.6001 * (M + 1)) + d + B - 1524.5
}

// Centuries since J2000.0
function toT(jd) {
  return (jd - 2451545.0) / 36525.0
}

function rad(deg) { return deg * Math.PI / 180 }
function norm360(deg) { return ((deg % 360) + 360) % 360 }

/**
 * Sun's ecliptic longitude (degrees) — accurate to ~0.01°
 */
export function sunLongitude(date) {
  const T = toT(toJD(date))

  // Geometric mean longitude
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T)

  // Mean anomaly
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T)
  const Mrad = rad(M)

  // Equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad)

  // Sun's true longitude
  const sunTrueLong = norm360(L0 + C)

  // Apparent longitude (nutation correction)
  const omega = 125.04 - 1934.136 * T
  return norm360(sunTrueLong - 0.00569 - 0.00478 * Math.sin(rad(omega)))
}

/**
 * Moon's ecliptic longitude (degrees) — accurate to ~0.5°
 * Simplified Meeus with major correction terms
 */
export function moonLongitude(date) {
  const T = toT(toJD(date))

  // Moon's mean longitude
  const Lp = norm360(218.3165 + 481267.8813 * T)

  // Moon's mean elongation
  const D = norm360(297.8502 + 445267.1115 * T)

  // Sun's mean anomaly
  const M = norm360(357.5291 + 35999.0503 * T)

  // Moon's mean anomaly
  const Mp = norm360(134.9634 + 477198.8676 * T)

  // Moon's argument of latitude
  const F = norm360(93.2721 + 483202.0175 * T)

  const Drad = rad(D), Mrad = rad(M), Mprad = rad(Mp), Frad = rad(F)

  // Principal correction terms for longitude
  const dL =
    + 6.289 * Math.sin(Mprad)
    - 1.274 * Math.sin(2 * Drad - Mprad)
    - 0.658 * Math.sin(2 * Drad)
    + 0.214 * Math.sin(2 * Mprad)
    - 0.186 * Math.sin(Mrad)
    - 0.114 * Math.sin(2 * Frad)
    + 0.059 * Math.sin(2 * Drad - 2 * Mprad)
    + 0.057 * Math.sin(2 * Drad - Mrad - Mprad)
    + 0.053 * Math.sin(2 * Drad + Mprad)
    + 0.046 * Math.sin(2 * Drad - Mrad)
    - 0.041 * Math.sin(Mrad - Mprad)
    - 0.035 * Math.sin(Drad)
    - 0.031 * Math.sin(Mprad + Mrad)

  return norm360(Lp + dL)
}

/**
 * Nakshatra (1-27) from Moon longitude
 * Each Nakshatra = 13°20' = 13.3333°
 */
export function getNakshatra(moonLong) {
  const index = Math.floor(moonLong / (360 / 27))
  return index + 1 // 1-based
}

/**
 * Rashi (1-12) from Moon longitude
 * Each Rashi = 30°
 */
export function getRashi(moonLong) {
  return Math.floor(moonLong / 30) + 1
}

/**
 * Tithi (1-30) — angular distance Moon - Sun divided by 12°
 * Tithis 1-15 = Shukla Paksha, 16-30 = Krishna Paksha
 */
export function getTithi(date) {
  const moonLong = moonLongitude(date)
  const sunLong = sunLongitude(date)
  let diff = norm360(moonLong - sunLong)
  return Math.floor(diff / 12) + 1
}

/**
 * Paksha — Shukla (waxing) or Krishna (waning)
 */
export function getPaksha(tithi) {
  return tithi <= 15 ? 'shukla' : 'krishna'
}

/**
 * Vara — day of the week (0=Sun, 1=Mon, ... 6=Sat)
 * Using IST (UTC+5:30) since this is an Indian app
 */
export function getVara(date) {
  const ist = new Date(date.getTime() + (5.5 * 60 * 60 * 1000))
  return ist.getUTCDay() // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
}

/**
 * Hora — planetary hour
 * Day starts at sunrise (~6am IST simplified)
 * Each hora = 1 hour, cycles through planet order
 * Day hora sequence starts from the day lord
 *
 * Day lords: Sun=0, Moon=1, Mars=2, Mercury=3, Jupiter=4, Venus=5, Saturn=6
 * Hora cycle: Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars (Chaldean order)
 */
export function getHora(date) {
  const ist = new Date(date.getTime() + (5.5 * 60 * 60 * 1000))
  const hour = ist.getUTCHours()

  // Approximate hours since sunrise (6 AM)
  const hoursSinceSunrise = ((hour - 6) + 24) % 24

  // Day lord (vara lord)
  const vara = ist.getUTCDay()
  const dayLords = [0, 1, 2, 3, 4, 5, 6] // Sun Mon Mars Merc Jup Ven Sat

  // Chaldean order for hora cycle
  const chaldean = [6, 4, 2, 0, 5, 3, 1] // Sat Jup Mars Sun Venus Mercury Moon

  // Find starting index in Chaldean order for the day lord
  const dayLord = dayLords[vara]
  const startIdx = chaldean.indexOf(dayLord)

  // Current hora planet
  const horaIdx = (startIdx + hoursSinceSunrise) % 7
  return chaldean[horaIdx]
}

/**
 * Nakshatra names (1-indexed)
 */
export const NAKSHATRA_NAMES = [
  '', // 0 unused
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
  'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
]

export const RASHI_NAMES = [
  '', 'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
]

export const VARA_NAMES = [
  'Ravivara', 'Somavara', 'Mangalavara', 'Budhavara',
  'Guruvara', 'Shukravara', 'Shanivara'
]

export const HORA_PLANET_NAMES = [
  'Surya', 'Chandra', 'Mangal', 'Budh', 'Guru', 'Shukra', 'Shani'
]
