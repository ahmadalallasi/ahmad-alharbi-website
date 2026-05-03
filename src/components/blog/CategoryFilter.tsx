import { useState, useMemo } from 'react';

interface Category { value: string; label: string; }
interface Post { slug: string; title: string; description: string; pubDate: string; category: string; tags: string[]; featured: boolean; }
interface Props { categories: Category[]; posts: Post[]; }

const categoryLabels: Record<string, string> = { ecommerce: 'تجارة إلكترونية', marketing: 'تسويق', automation: 'أتمتة', seo: 'SEO', general: 'عام' };

function formatDateAr(iso: string) {
  return new Date(iso).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function CategoryFilter({ categories, posts }: Props) {
  const [active, setActive] = useState('all');
  const filtered = useMemo(() => active === 'all' ? posts : posts.filter(p => p.category === active), [active, posts]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button key={cat.value} onClick={() => setActive(cat.value)} style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.35em', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: active === cat.value ? '#0A4D68' : 'transparent', color: active === cat.value ? '#FAFAF9' : 'rgba(8,12,16,0.6)', borderColor: active === cat.value ? '#0A4D68' : '#E5E7EB' }}>
            {cat.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', backgroundColor: '#E5E7EB' }}>
        {filtered.map(post => (
          <a key={post.slug} href={`/blog/${post.slug}`} style={{ display: 'block', backgroundColor: '#FAFAF9', padding: '1.5rem', textDecoration: 'none', transition: 'background-color 0.3s' }}>
            {post.featured && <div style={{ height: '2px', backgroundColor: '#088395', marginBottom: '1rem' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', color: '#088395', textTransform: 'uppercase', fontWeight: 300 }}>{categoryLabels[post.category] ?? post.category}</span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(8,12,16,0.4)', fontWeight: 300 }}>{formatDateAr(post.pubDate)}</span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 300, color: '#080C10', lineHeight: 1.5, marginBottom: '0.75rem' }}>{post.title}</h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(8,12,16,0.6)', fontWeight: 300, lineHeight: 1.7, marginBottom: '1.25rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{post.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {post.tags.slice(0, 2).map(tag => (<span key={tag} style={{ fontSize: '0.65rem', padding: '2px 8px', backgroundColor: 'rgba(10,77,104,0.05)', color: 'rgba(10,77,104,0.7)', fontWeight: 300 }}>{tag}</span>))}
              </div>
              <span style={{ color: '#088395' }}>←</span>
            </div>
          </a>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(8,12,16,0.4)', fontWeight: 300 }}>لا توجد مقالات في هذا التصنيف</div>}
    </div>
  );
}
