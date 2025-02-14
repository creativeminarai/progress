import { MeetingResponse } from './types';

const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbwZTCY-PLxGXm0ZisvtamS8X2bTLLvDrPmeV0MQdgmHoso6W-0jgNWycqAnPyE6G8op/exec';

export async function fetchMeetings(): Promise<MeetingResponse> {
  try {
    const response = await fetch(GOOGLE_SHEETS_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch meetings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }
}
