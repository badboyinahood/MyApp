const API_URL =
  'https://6a03cd842afe8349b4b58220.mockapi.io/events';

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
    const response = await fetch(API_URL);

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
        item.title &&
        item.location &&
        item.date
    );

    return validData.map((item: any) => ({
      ...item,
      id: Number(item.id), 
    }));

  } catch (error: any) {
    if (error.message === 'Network request failed') {
      throw new Error('No internet connection');
    }

    if (error.message.includes('Failed to fetch')) {
      throw new Error('Failed to fetch events (server error)');
    }

    if (error.message.includes('Invalid data')) {
      throw new Error('Received invalid data from server');
    }

    throw new Error('Failed to fetch events');
  }
}