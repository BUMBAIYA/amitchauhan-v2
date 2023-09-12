export function verifyEmailAddress(email: string) {
  // This regex is not up to the standard of Google's RFC200 email regex this is a soft verification
  let regex = /^[^@]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{1,}$/;
  return regex.test(email);
}
