"use client"
import { useEffect } from "react"

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string },
    reset: () => void
}) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="page-shell flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
            <h2>Something went wrong!</h2>
            <button onClick={reset}>
                Try again
            </button>
        </main>
    );
}