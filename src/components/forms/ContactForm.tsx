import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  fullName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  phone: z.string().regex(/^(\+966|0)?5\d{8}$/, 'رقم جوال سعودي غير صحيح'),
  email: z.email('بريد إلكتروني غير صحيح'),
  service: z.enum(['marketing', 'tech', 'automation', 'seo', 'other'], { message: 'اختر الخدمة' }),
  message: z.string().min(20, 'اشرح طلبك بإيجاز (20 حرف على الأقل)'),
});

type FormData = z.infer<typeof schema>;

const services = [
  { value: 'marketing',  label: 'التسويق الإلكتروني' },
  { value: 'tech',       label: 'تطوير موقع أو تطبيق' },
  { value: 'automation', label: 'أتمتة الأعمال (n8n)' },
  { value: 'seo',        label: 'SEO وتحسين محركات البحث' },
  { value: 'other',      label: 'أخرى' },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', backgroundColor: 'transparent',
  border: '1px solid #E5E7EB', fontSize: '0.875rem', fontWeight: 300,
  outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', letterSpacing: '0.35em',
  color: 'rgba(8,12,16,0.5)', marginBottom: '0.5rem', fontWeight: 300, textTransform: 'uppercase',
};

const errorStyle: React.CSSProperties = {
  fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', fontWeight: 300,
};

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    const webhookUrl = import.meta.env.PUBLIC_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('PUBLIC_N8N_WEBHOOK_URL is not set; redirecting to /thank-you without sending.');
      reset();
      window.location.href = '/thank-you';
      return;
    }

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: 'ahmadalallasi.com/contact',
        }),
      });
      if (res.ok) { setStatus('success'); reset(); window.location.href = '/thank-you'; }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      <div>
        <label style={labelStyle}>الاسم الكامل</label>
        <input {...register('fullName')} placeholder="أحمد محمد" style={inputStyle} />
        {errors.fullName && <p style={errorStyle}>{errors.fullName.message}</p>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>رقم الجوال</label>
          <input {...register('phone')} placeholder="05XXXXXXXX" style={inputStyle} dir="ltr" />
          {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>البريد الإلكتروني</label>
          <input {...register('email')} placeholder="email@example.com" style={inputStyle} dir="ltr" />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label style={labelStyle}>الخدمة المطلوبة</label>
        <select {...register('service')} style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="">
          <option value="" disabled>— اختر الخدمة —</option>
          {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        {errors.service && <p style={errorStyle}>{errors.service.message}</p>}
      </div>

      <div>
        <label style={labelStyle}>تفاصيل المشروع</label>
        <textarea {...register('message')} placeholder="اشرح مشروعك أو طلبك باختصار..." rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
        {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', fontSize: '0.875rem', fontWeight: 300 }}>
          حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{ padding: '0.875rem 2rem', backgroundColor: status === 'loading' ? '#088395' : '#0A4D68', color: '#FAFAF9', border: 'none', fontSize: '0.875rem', fontWeight: 300, letterSpacing: '0.2em', cursor: status === 'loading' ? 'wait' : 'pointer', transition: 'background-color 0.2s', fontFamily: 'inherit' }}
      >
        {status === 'loading' ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
      </button>

    </form>
  );
}
