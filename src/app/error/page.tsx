// app/error/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Error: Invalid Date</h1>
      <p className="mb-4">You cannot select a future date.</p>
      <Link href="/">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}
