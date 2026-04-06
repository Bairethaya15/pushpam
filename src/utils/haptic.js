export function haptic(style = 'light') {
  if (!navigator.vibrate) return
  switch (style) {
    case 'light': navigator.vibrate(10); break
    case 'medium': navigator.vibrate(20); break
    case 'heavy': navigator.vibrate(40); break
  }
}
