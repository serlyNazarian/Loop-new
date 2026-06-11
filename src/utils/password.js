export function scorePassword(pw) {
  if (!pw) return { score: 0, label: '' };
  let s = 0;
  if (pw.length >= 8) s += 1;
  if (pw.length >= 12) s += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 1;
  if (/\d/.test(pw)) s += 1;
  if (/[^A-Za-z0-9]/.test(pw)) s += 1;
  if (/(.)\1{3,}/.test(pw)) s = Math.max(0, s - 1);
  if (/^(password|qwerty|123456|abc123|letmein|welcome)/i.test(pw)) s = 0;
  const score = Math.min(s, 4);
  const label =
    score <= 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Strong' : 'Very strong';
  return { score, label };
}

export function passwordChecks(pw) {
  return [
    { ok: pw.length >= 8, label: '8+ characters' },
    { ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw), label: 'Upper and lower case' },
    { ok: /\d/.test(pw), label: 'A number' },
    { ok: /[^A-Za-z0-9]/.test(pw), label: 'A special character' },
  ];
}
