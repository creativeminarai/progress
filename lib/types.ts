export interface Meeting {
  date?: string;
  title?: string;
  content?: string;
  participants?: string;
  [key: string]: any; // その他のフィールドも許容
}

export type MeetingResponse = Meeting[] | { meetings: Meeting[] };
