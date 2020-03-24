export function loadExternalScript(url: string, callback?: (e: Event) => void) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  if (callback) {
    script.onload = callback
  }
  script.src = url
  document.body.appendChild(script)
}
