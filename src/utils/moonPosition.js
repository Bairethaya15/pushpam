// Moon's ecliptic longitude — computed from a UTC instant.
// Based on Jean Meeus, "Astronomical Algorithms" (2nd ed., 1998), chapter 47.
// Returns the longitude as an integer in milli-arcseconds, range [0, 1_296_000_000).
//
// Accuracy: ~10 arc-seconds (well below the milli-arcsecond resolution we read).
// No external data, no API, no dependencies. Same input → same output, always.

const RAD = Math.PI / 180

function julianDay(date) {
  // JD at Unix epoch (1970-01-01 00:00 UT) is 2440587.5
  return date.getTime() / 86400000 + 2440587.5
}

// Periodic terms for the Moon's longitude (Meeus, Table 47.A — top 35 by amplitude).
// Format: [coef in 0.000001°, D, M, M', F]
const TERMS_L = [
  [6288774,  0,  0,  1,  0],
  [1274027,  2,  0, -1,  0],
  [ 658314,  2,  0,  0,  0],
  [ 213618,  0,  0,  2,  0],
  [-185116,  0,  1,  0,  0],
  [-114332,  0,  0,  0,  2],
  [  58793,  2,  0, -2,  0],
  [  57066,  2, -1, -1,  0],
  [  53322,  2,  0,  1,  0],
  [  45758,  2, -1,  0,  0],
  [ -40923,  0,  1, -1,  0],
  [ -34720,  1,  0,  0,  0],
  [ -30383,  0,  1,  1,  0],
  [  15327,  2,  0,  0, -2],
  [ -12528,  0,  0,  1,  2],
  [  10980,  0,  0,  1, -2],
  [  10675,  4,  0, -1,  0],
  [  10034,  0,  0,  3,  0],
  [   8548,  4,  0, -2,  0],
  [  -7888,  2,  1, -1,  0],
  [  -6766,  2,  1,  0,  0],
  [  -5163,  1,  0, -1,  0],
  [   4987,  1,  1,  0,  0],
  [   4036,  2, -1,  1,  0],
  [   3994,  2,  0,  2,  0],
  [   3861,  4,  0,  0,  0],
  [   3665,  2,  0, -3,  0],
  [  -2689,  0,  1, -2,  0],
  [  -2602,  2,  0, -1,  2],
  [   2390,  2, -1, -2,  0],
  [  -2348,  1,  0,  1,  0],
  [   2236,  2, -2,  0,  0],
  [  -2120,  0,  1,  2,  0],
  [  -2069,  0,  2,  0,  0],
  [   2048,  2, -2, -1,  0],
]

export function moonLongitudeMas(date) {
  const JD = julianDay(date)
  const T = (JD - 2451545.0) / 36525   // centuries from J2000.0
  const T2 = T * T
  const T3 = T2 * T
  const T4 = T3 * T

  // Moon's mean longitude
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000
  // Mean elongation of the Moon from the Sun
  const D  = 297.8501921 + 445267.1114034  * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000
  // Sun's mean anomaly
  const M  = 357.5291092 +  35999.0502909  * T - 0.0001536 * T2 + T3 / 24490000
  // Moon's mean anomaly
  const Mp = 134.9633964 + 477198.8675055  * T + 0.0087414 * T2 + T3 / 69699  - T4 / 14712000
  // Moon's argument of latitude
  const F  =  93.2720950 + 483202.0175233  * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000

  // Eccentricity correction for terms involving M (Meeus eq 47.6)
  const E  = 1 - 0.002516 * T - 0.0000074 * T2
  const E2 = E * E

  let sumL = 0
  for (let i = 0; i < TERMS_L.length; i++) {
    const t = TERMS_L[i]
    const arg = (t[1] * D + t[2] * M + t[3] * Mp + t[4] * F) * RAD
    let term = t[0] * Math.sin(arg)
    const absM = t[2] < 0 ? -t[2] : t[2]
    if (absM === 1) term *= E
    else if (absM === 2) term *= E2
    sumL += term
  }

  // sumL is in micro-degrees. Total longitude in degrees:
  const longitudeDeg = Lp + sumL / 1000000

  // Normalize to [0, 360)
  const norm = ((longitudeDeg % 360) + 360) % 360

  // Convert to milli-arcseconds: 1° = 3,600,000 mas
  // Result fits comfortably in a 31-bit signed int (max ~1.296 × 10⁹).
  return Math.floor(norm * 3600000)
}
