'use client' // Error boundaries must be Client Components

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M2 - Error",
  description: "Something went wrong on M2. Please try again.",
  openGraph: {
    title: "M2 - Error",
    description: "Something went wrong on M2. Please try again.",
    images: ["/M2.jpg"],
  },
};
 

 
import { useEffect } from 'react'
 
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => retry()
        }
      >
        Try again
      </button>
    </div>
  )
}