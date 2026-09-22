export default function WhatsAppIcon({ className, size = 22 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3.5 20.5l1.4-4.25A8.5 8.5 0 1 1 20.5 11.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.05 7.55c.18-.4.37-.41.55-.42h.47c.16 0 .36.06.47.35l.75 1.8c.08.2.03.4-.08.56l-.56.7c-.12.15-.16.29-.05.48.32.55.76 1.08 1.31 1.56.6.52 1.16.86 1.75 1.08.2.08.34.04.47-.1l.82-.95c.14-.17.31-.2.5-.13l1.9.9c.2.1.33.16.36.25.04.1.04.55-.2 1.07-.24.52-1.18 1-1.64 1.06-.43.06-.98.09-1.59-.1-.36-.12-.83-.27-1.43-.53-.25-.1-4.18-1.55-5.7-5.37-.43-1.07-.04-1.82.16-2.15Z" fill="currentColor" />
    </svg>
  );
}
