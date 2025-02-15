'use client';

import { useEffect, useState } from 'react';
import { Meeting } from '@/lib/types';
import { fetchMeetings } from '@/lib/api';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown, { Components } from 'react-markdown';
import { Plus, Minus } from 'lucide-react';
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
  const [openItems, setOpenItems] = useState<string[]>([]);

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
    <div className="-mx-4 sm:-mx-8 -mt-8">
      <div className="bg-[#1a1f36] text-white px-4 sm:px-8 py-4 font-semibold text-lg">
        議事録一覧
      </div>
      <div className="px-4 sm:px-8 mt-4">
        <div className="flex justify-end gap-1">
          <button
            onClick={() => setOpenItems(meetings.map((_, index) => `item-${index}`))}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            title="全て開く"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={() => setOpenItems([])}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            title="全て閉じる"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-8">
        <ScrollArea className="h-[600px] w-full">
      <Accordion 
        type="multiple" 
        className="space-y-[0.6rem]" 
        value={openItems}
        onValueChange={setOpenItems}
      >
        {[...meetings].reverse().map((meeting, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 hover:no-underline bg-gray-700 [&[data-state=open]]:bg-gray-800">
              <h3 className="text-base font-semibold text-white">{formatDate(meeting.date)}</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-4">
                <div className="prose prose-stone dark:prose-invert max-w-none prose-h1:text-xl prose-h1:font-semibold prose-h1:mb-3 prose-h1:bg-gray-200 dark:prose-h1:bg-gray-700 prose-h1:p-2 prose-h1:rounded-md prose-h1:mt-3 prose-h2:text-xs prose-h2:font-medium prose-h2:text-muted-foreground prose-h2:uppercase prose-h2:tracking-wide prose-h2:mt-4 prose-h2:mb-2 prose-h3:text-base prose-p:my-1 prose-ul:my-2 prose-ul:pl-5 prose-li:my-0.5 prose-li:text-[0.8em] prose-li:leading-[1.5] prose-ul:space-y-[0.25em] prose-hr:my-[0.7rem]">
                  <ReactMarkdown
                    components={{
                      code: ({ className, children }) => {
                        return (
                          <code
                            className={cn(
                              'rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
                              className
                            )}

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
      </div>
    </div>
  );
}
