import { Suspense } from 'react';
import { MeetingList } from '@/components/MeetingList';

export default function MeetingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">議事録一覧</h1>
      <Suspense fallback={<div className="flex justify-center items-center min-h-[200px]">Loading...</div>}>
        <MeetingList />
      </Suspense>
    </div>
  );
}
