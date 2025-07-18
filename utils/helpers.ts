// ~/utils/formatCurrency.ts
export function formatCurrency(value: number, locale = 'id-ID', currency = 'IDR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value)
}

// utils/formatDate.ts
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const tanggal = date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const jam = date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  });

  return `${tanggal}, ${jam} WIB`;
}