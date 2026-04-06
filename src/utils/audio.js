let audioCtx = null
let ambientGain = null
let ambientNodes = []
let ambientPlaying = false

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

/**
 * Temple bell — synthesized with Web Audio API
 * Two detuned sine waves + gentle decay = realistic metallic bell
 */
export function playBell() {
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    // Deep temple bell fundamental
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 280 // Low brass bell

    // Warm overtone
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 560 // Octave above

    // Metallic shimmer — high, quiet
    const osc3 = ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = 1120

    // Soft attack, long decay — not sudden
    const gain1 = ctx.createGain()
    gain1.gain.setValueAtTime(0, now)
    gain1.gain.linearRampToValueAtTime(0.12, now + 0.05) // gentle attack
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 3.5) // long ring

    const gain2 = ctx.createGain()
    gain2.gain.setValueAtTime(0, now)
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.04)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 2.5)

    const gain3 = ctx.createGain()
    gain3.gain.setValueAtTime(0, now)
    gain3.gain.linearRampToValueAtTime(0.02, now + 0.03)
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 1.8)

    osc1.connect(gain1).connect(ctx.destination)
    osc2.connect(gain2).connect(ctx.destination)
    osc3.connect(gain3).connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc3.start(now)
    osc1.stop(now + 3)
    osc2.stop(now + 3)
    osc3.stop(now + 3)
  } catch {
    // Audio not available — silent fallback
  }
}

/**
 * Ambient temple drone — soft, continuous, meditative
 * Low sine + filtered noise = incense-like atmosphere
 */
export function startAmbient() {
  if (ambientPlaying) return
  try {
    const ctx = getCtx()

    // Master gain for ambient
    ambientGain = ctx.createGain()
    ambientGain.gain.value = 0
    ambientGain.connect(ctx.destination)

    // Low drone — fundamental
    const drone1 = ctx.createOscillator()
    drone1.type = 'sine'
    drone1.frequency.value = 136.1 // OM frequency (C#3)
    const droneGain1 = ctx.createGain()
    droneGain1.gain.value = 0.06
    drone1.connect(droneGain1).connect(ambientGain)
    drone1.start()
    ambientNodes.push(drone1)

    // Soft fifth above
    const drone2 = ctx.createOscillator()
    drone2.type = 'sine'
    drone2.frequency.value = 204.15 // Perfect fifth
    const droneGain2 = ctx.createGain()
    droneGain2.gain.value = 0.03
    drone2.connect(droneGain2).connect(ambientGain)
    drone2.start()
    ambientNodes.push(drone2)

    // Very subtle breathing modulation
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.08 // Very slow ~12s cycle
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.015
    lfo.connect(lfoGain).connect(ambientGain.gain)
    lfo.start()
    ambientNodes.push(lfo)

    // Fade in over 3 seconds
    ambientGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 3)

    ambientPlaying = true
  } catch {
    // Audio not available
  }
}

export function stopAmbient() {
  if (!ambientPlaying || !ambientGain) return
  try {
    const ctx = getCtx()
    ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2)
    setTimeout(() => {
      ambientNodes.forEach(n => { try { n.stop() } catch { /* ignore */ } })
      ambientNodes = []
      ambientPlaying = false
    }, 2500)
  } catch { /* audio cleanup failed — safe to ignore */ }
}

export function isAmbientPlaying() {
  return ambientPlaying
}
