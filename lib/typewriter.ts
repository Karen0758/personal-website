export function getTypewriterText(message: string, visibleCharacters: number) {
  return message.slice(0, Math.max(0, visibleCharacters));
}
