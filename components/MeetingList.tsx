'use client';

import { useEffect, useState } from 'react';
import { Meeting } from '@/lib/types';
import { fetchMeetings } from '@/lib/api';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '日付なし';
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

export function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetings() {
      try {
        const response = await fetchMeetings();
        console.log('API Response:', response);
        const meetingsData = Array.isArray(response) ? response : response.meetings || [];
        setMeetings(meetingsData);
        setError(null);
      } catch (err) {
        console.error('Error details:', err);
        setError('議事録の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    }

    loadMeetings();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[200px]">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <Accordion type="multiple" className="space-y-2">
        {meetings.map((meeting, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 hover:no-underline">
              <h3 className="text-base font-semibold">{formatDate(meeting.date)}</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-4">
                <div className="prose prose-stone dark:prose-invert max-w-none prose-headings:font-semibold prose-h1:text-[2rem] prose-h2:text-[0.7rem] prose-h2:bg-muted prose-h2:px-2 prose-h2:py-0.5 prose-h2:rounded-md prose-h2:inline-block prose-h3:text-base prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                  <ReactMarkdown
                    components={{
                      code: ({ node, inline, className, children, ...props }) => {
                        return (
                          <code
                            className={cn(
                              'rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
                              className
                            )}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {meeting.content || '内容なし'}
                  </ReactMarkdown>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}
