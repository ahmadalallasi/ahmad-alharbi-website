import { useState, useEffect } from 'react';

interface Heading { id: string; text: string; level: number; }
interface Props { headings: Heading[]; }

export default function TableOfContents({ headings }: Props) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-20% 0% -70% 0%' }
    );
    headings.forEach(h => { const el = document.getElementById(h.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="جدول المحتويات" style={{ position: 'sticky', top: '5rem' }}>
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'rgba(8,12,16,0.4)', marginBottom: '1rem', fontWeight: 300, textTransform: 'uppercase' }}>المحتويات</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {headings.map(h => (
          <li key={h.id}>
            <a href={`#${h.id}`} style={{ display: 'block', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.5, paddingRight: h.level === 3 ? '1rem' : '0', color: active === h.id ? '#088395' : 'rgba(8,12,16,0.6)', borderRight: active === h.id ? '2px solid #088395' : '2px solid transparent', paddingBlock: '0.125rem', transition: 'all 0.2s ease', textDecoration: 'none' }}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
