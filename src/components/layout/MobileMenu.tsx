import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
}

export default function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-navy hover:text-teal transition-colors"
        aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
        aria-expanded={open}
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-16 inset-x-0 bg-cream border-b border-border z-50 md:hidden">
            <nav className="flex flex-col py-4">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-6 py-3 text-sm font-light tracking-widest text-ink/80 hover:text-teal hover:bg-teal/5 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="px-6 pt-3 pb-4 border-t border-border mt-2">
                <a
                  href="/contact"
                  className="flex items-center justify-center px-5 py-3 text-xs font-light tracking-widest border border-navy text-navy hover:bg-navy hover:text-cream transition-all"
                  onClick={() => setOpen(false)}
                >
                  تواصل معي
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
