export type EventType = {
  id: number;
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
  price: number;
  category: string;
  venue: string;
  duration: string;
  age: string;
  ticketInfo: string;
};

export async function fetchEvents(): Promise<EventType[]> {
  try {
    const response = await fetch(
      'https://6a03cd842afe8349b4b58220.mockapi.io/events'
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch events: ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        'Invalid data format: expected array of events'
      );
    }

    const validData = data.filter(
      (item: any) =>
        item &&
        typeof item.id === 'number' &&
        typeof item.title === 'string' &&
        typeof item.date === 'string'
    );

    return validData;
  } catch (error: any) {
    if (error.message === 'Network request failed') {
      throw new Error('No internet connection');
    }

    throw new Error(
      error.message || 'Failed to fetch events'
    );
  }
}