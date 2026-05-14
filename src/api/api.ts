const API_URL =
  'https://6a03cd842afe8349b4b58220.mockapi.io/events';

export const fetchEvents = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('API error');
  }

  return response.json();
};