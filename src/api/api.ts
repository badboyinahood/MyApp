export const fetchEvents = async () => {
  const res = await fetch(
    'https://6a03cd842afe8349b4b58220.mockapi.io/events'
  );
  return res.json();
};