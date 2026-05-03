import { useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  initial: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'محمد الشمري',
    role: 'صاحب متجر إلكتروني',
    company: 'متجر الشمري',
    text: 'أحمد غيّر طريقة تفكيري في التسويق الرقمي. ليس فقط ينفّذ، بل يفهم مشروعك ويقترح حلولاً لم تخطر على بالك.',
    initial: 'م',
  },
  {
    name: 'نورة العتيبي',
    role: 'مديرة مشاريع',
    company: 'شركة خدمات',
    text: 'التطبيق الذي بناه وفّر علينا ساعات يومياً. محترف، ملتزم بالمواعيد، ويتحمل المسؤولية الكاملة عن نتائجه.',
    initial: 'ن',
  },
  {
    name: 'فهد الحربي',
    role: 'رائد أعمال',
    company: 'مشروع ناشئ',
    text: 'أفضل ما في التعامل مع أحمد هو الوضوح والصراحة. يخبرك ما يمكن فعله وما لا يمكن، ويلتزم بكل ما وعد به.',
    initial: 'ف',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section style={{ paddingBlock: '5rem', backgroundColor: '#F5F5F3' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingInline: '1.5rem' }}>

        {/* Section Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ width: '2rem', height: '1px', backgroundColor: '#088395' }}></div>
          <span style={{ color: '#088395', fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            آراء العملاء
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '700px' }}>

          {/* Quote */}
          <div>
            <div style={{ fontSize: '4rem', lineHeight: 1, color: '#0A4D68', opacity: 0.15, fontFamily: 'serif', marginBottom: '1rem' }}>"</div>
            <blockquote
              key={active}
              style={{
                fontSize: '1.25rem',
                fontWeight: 300,
                color: '#080C10',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}
            >
              {t.text}
            </blockquote>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '44px', height: '44px',
                backgroundColor: '#0A4D68',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FAFAF9', fontSize: '1rem', fontWeight: 300,
              }}>
                {t.initial}
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 400, color: '#080C10' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 300, color: '#6B7280', letterSpacing: '0.1em' }}>
                  {t.role} · {t.company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '2rem' : '0.5rem',
                  height: '2px',
                  backgroundColor: i === active ? '#088395' : '#E5E7EB',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
                aria-label={`شهادة ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
