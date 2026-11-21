import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  label: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/** A document lifted off the desk: dims the desk, closes on Escape or backdrop click. */
export function Overlay({ label, onClose, children, className }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="overlay" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panel} className={`overlay__panel ${className ?? ''}`} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        <button type="button" className="px-btn px-btn--icon overlay__close" onClick={onClose} aria-label="Put it back on the desk">
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}
