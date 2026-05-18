export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);

  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (dateStr: string) => {
  const d = new Date(dateStr);

  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};