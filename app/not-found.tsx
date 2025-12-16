import { headers } from 'next/headers';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default async function NotFoundPage() {
  const headersList = await headers();
  const referer = headersList.get('referer');

  return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <h1 className="text-4xl font-extrabold mb-4">404 - Page Not Found</h1>

      <p className="text-lg text-gray-500 mb-10">The page you are looking for doesn&apos;t exist or has been moved.</p>

      <div className="flex flex-wrap justify-center gap-4">
        {/* Go Back (server-safe) */}
        {referer ? (
          <Link
            href={referer}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent-foreground hover:text-accent"
          >
            <FaArrowLeft size={16} />
            Go Back
          </Link>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent-foreground hover:text-accent"
          >
            <FaArrowLeft size={16} />
            Go Home
          </Link>
        )}

        {/* Go Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent-foreground hover:text-accent"
        >
          Go Home
        </Link>

        {/* Refresh */}
        <Link
          href=""
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent-foreground hover:text-accent"
        >
          Refresh Page
        </Link>
      </div>
    </div>
  );
}
