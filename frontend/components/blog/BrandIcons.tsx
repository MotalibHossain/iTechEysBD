// Minimal brand-mark SVGs (lucide-react no longer ships brand icons).

type Props = { size?: number; className?: string };

export function XIcon({ size = 14, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.77-6.24L4.8 22H2.04l6.98-7.98L2 2h6.914l4.33 5.72L18.244 2Zm-1.196 18h1.71L7.06 4H5.24l11.808 16Z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 14, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 .01 5 2.5 2.5 0 0 1-.01-5ZM3 9.75h4V21H3V9.75ZM10 9.75h3.83v1.53h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" />
    </svg>
  );
}

export function FacebookIcon({ size = 14, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.93.26-1.56 1.6-1.56h1.7V4.27A22.6 22.6 0 0 0 14.32 4c-2.47 0-4.16 1.51-4.16 4.28v2.52H7.5V14h2.66v8h3.34Z" />
    </svg>
  );
}
