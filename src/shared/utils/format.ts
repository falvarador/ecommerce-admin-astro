export function resizeImage(url: string, height: number, width: number) {
  return url.replace(/\/v[0-9]+/, `/c_lfill,g_center,h_${height},w_${width}`);
}

export function formatDate(date: number) {
  const day = new Date(date * 1000);

  const formattedDate = Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(day);

  return formattedDate;
}
