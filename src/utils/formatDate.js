export function formatDateTimeFr(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', {
    day:   '2-digit',
    month: 'long',
    year:  'numeric',
    hour:   '2-digit',
    minute: '2-digit'
  });
}
