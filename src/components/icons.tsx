import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 11 11 5" />
      <path d="M5.5 5H11v5.5" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 8h-11" />
      <path d="M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 13.5v-11" />
      <path d="M3.5 7 8 2.5 12.5 7" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3 5 8l5 5" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function Expand(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2.5H2.5V6" />
      <path d="M10 13.5h3.5V10" />
      <path d="M2.5 2.5 6.5 6.5" />
      <path d="M13.5 13.5 9.5 9.5" />
    </svg>
  );
}

export function GitHub(props: IconProps) {
  return (
    <svg {...base} strokeWidth={0} fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path d="M8 .5a7.5 7.5 0 0 0-2.37 14.62c.37.07.51-.16.51-.36l-.01-1.24c-2.09.45-2.53-1-2.53-1-.34-.87-.84-1.1-.84-1.1-.68-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.67 1.15 1.76.82 2.19.63.07-.48.26-.82.48-1-1.67-.19-3.42-.83-3.42-3.71 0-.82.29-1.49.77-2.02-.08-.19-.34-.95.07-1.98 0 0 .63-.2 2.06.77a7.1 7.1 0 0 1 3.75 0c1.43-.97 2.06-.77 2.06-.77.41 1.03.15 1.79.07 1.98.48.53.77 1.2.77 2.02 0 2.89-1.76 3.52-3.43 3.7.27.23.51.69.51 1.4l-.01 2.07c0 .2.13.43.51.36A7.5 7.5 0 0 0 8 .5Z" />
    </svg>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <svg {...base} strokeWidth={0} fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path d="M3.2 2.2A1.2 1.2 0 1 0 3.2 4.6a1.2 1.2 0 0 0 0-2.4ZM2.2 5.6h2v8.2h-2V5.6Zm3.4 0h1.92v1.12h.03c.27-.5.92-1.03 1.9-1.03 2.03 0 2.4 1.34 2.4 3.08v5.03h-2V9.1c0-.86-.02-1.97-1.2-1.97-1.2 0-1.38.94-1.38 1.9v4.77h-2V5.6Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="1.6" y="3.2" width="12.8" height="9.6" rx="1.2" />
      <path d="m2.4 4.4 5.6 4 5.6-4" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2.5v7.5" />
      <path d="M4.5 7 8 10.5 11.5 7" />
      <path d="M2.5 13h11" />
    </svg>
  );
}
