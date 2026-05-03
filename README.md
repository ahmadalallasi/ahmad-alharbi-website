# Ahmad M. Alallasi — Personal Freelance Website

موقع فريلانس شخصي مبني بـ Astro 6 + React 19 + Tailwind 4

## Stack

- **Framework:** Astro 6 (Static)
- **UI:** React 19 + Tailwind CSS 4
- **Content:** MDX + Astro Content Collections
- **Forms:** React Hook Form + Zod → n8n
- **Deployment:** Docker + Nginx → Coolify

## التشغيل المحلي

```bash
# تثبيت Node 22
nvm use  # يقرأ .nvmrc

# تثبيت المكتبات
npm install

# تشغيل محلي
npm run dev  # → http://localhost:4321

# بناء الإنتاج
npm run build

# معاينة البناء
npm run preview
```

## المتغيرات البيئية

انسخ `.env.example` إلى `.env` وعدّل القيم:

```bash
cp .env.example .env
```

## النشر على Coolify

1. أنشئ تطبيقاً جديداً في Coolify
2. اختر المستودع من GitHub
3. Build Pack: **Dockerfile**
4. Port: **80**
5. أضف متغيرات البيئة من `.env.example`
6. اضغط Deploy

## هيكل المشروع

```
src/
├── components/
│   ├── ui/          # مكونات أساسية (Button, Card, Badge...)
│   ├── layout/      # Header, Footer, MobileMenu
│   ├── sections/    # أقسام الصفحة الرئيسية
│   ├── blog/        # مكونات المدونة
│   └── forms/       # نماذج التواصل
├── content/
│   └── blog/        # مقالات MDX
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── seo.ts       # SEO utilities
│   └── utils.ts     # Helper functions
├── pages/
│   ├── index.astro
│   ├── contact.astro
│   ├── blog/
│   └── api/
└── styles/
    └── globals.css  # Tailwind 4 + Design tokens
```
