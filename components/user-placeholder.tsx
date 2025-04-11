interface UserPlaceholderProps {
  size?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export default function UserPlaceholder({
  size = 40,
  color = "#6b7280",
  backgroundColor = "#e5e7eb",
  className = "",
}: UserPlaceholderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="User placeholder"
    >
      <rect width="64" height="64" rx="4" fill="#183d3d" />
      <path
        d="M32 32C37.5228 32 42 27.5228 42 22C42 16.4772 37.5228 12 32 12C26.4772 12 22 16.4772 22 22C22 27.5228 26.4772 32 32 32Z"
        fill="#aeccc1"
      />
      <path
        d="M18 48C18 40.268 24.268 34 32 34C39.732 34 46 40.268 46 48V52H18V48Z"
        fill="#aeccc1"
      />
    </svg>
  );
}
