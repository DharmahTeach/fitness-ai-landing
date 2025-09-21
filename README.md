# FitnessAI Bot Landing Page

Лендинг-воронка для Telegram-бота FitnessAI Bot с персональным ИИ-тренером.

## Особенности

- 🎨 Современный адаптивный дизайн
- 🚀 Оптимизированная производительность
- 📱 Мобильная оптимизация
- 🔍 SEO-оптимизация
- 📊 Аналитика и отслеживание
- 🌐 Многоязычность (RU/EN)

## Структура проекта

```
landing/
├── index.html              # Основная страница
├── assets/
│   ├── css/
│   │   └── style.css       # Стили
│   ├── js/
│   │   └── main.js         # JavaScript
│   └── images/             # Изображения
├── robots.txt              # SEO
├── sitemap.xml             # Карта сайта
├── marketing-strategy.md   # Маркетинговая стратегия
├── seo-strategy.md         # SEO-стратегия
└── README.md               # Документация
```

## Быстрый старт

### Локальная разработка

```bash
# Запуск локального сервера
python -m http.server 8000

# Или с Node.js
npx serve .

# Или с PHP
php -S localhost:8000
```

### Доступ к сайту

Откройте браузер и перейдите по адресу: `http://localhost:8000`

## Развертывание в продакшене

### 1. Netlify (Рекомендуется)

1. **Создайте архив** папки `landing`
2. **Перейдите на** [netlify.com](https://netlify.com)
3. **Перетащите архив** в область "Deploy manually"
4. **Получите URL** типа `https://fitness-ai-123456.netlify.app`

### 2. Vercel

1. **Перейдите на** [vercel.com](https://vercel.com)
2. **Загрузите файлы** через drag & drop
3. **Получите URL** типа `https://fitness-ai-123456.vercel.app`

### 3. GitHub Pages

1. **Создайте репозиторий** на GitHub
2. **Загрузите файлы** лендинга
3. **Включите Pages** в Settings → Pages
4. **Получите URL** `https://username.github.io/repository-name`

### 4. Firebase Hosting

1. **Установите Firebase CLI**
2. **Инициализируйте проект**
3. **Разверните**: `firebase deploy`

## Настройка домена

После развертывания:

1. **Купите домен** `fitness-ai.ru` (от 100₽/год)
2. **Настройте DNS** записи:
   ```
   A: 75.2.60.5 (для Netlify)
   CNAME: www → your-site.netlify.app
   ```
3. **Добавьте домен** в настройки хостинга

## Настройка аналитики

### Google Analytics 4

1. Создайте аккаунт GA4
2. Получите Measurement ID
3. Добавьте в `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Яндекс.Метрика

1. Создайте счетчик в Яндекс.Метрике
2. Добавьте в `index.html`:

```html
<!-- Yandex.Metrica counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(COUNTER_ID, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
```

## Оптимизация производительности

### 1. Сжатие изображений

```bash
# Установка imagemin
npm install -g imagemin-cli

# Сжатие изображений
imagemin assets/images/*.{jpg,png} --out-dir=assets/images/optimized
```

### 2. Минификация CSS/JS

```bash
# Установка инструментов
npm install -g clean-css-cli uglify-js

# Минификация CSS
cleancss -o assets/css/style.min.css assets/css/style.css

# Минификация JS
uglifyjs assets/js/main.js -o assets/js/main.min.js
```

### 3. Lazy Loading

Добавьте `data-src` атрибуты к изображениям:

```html
<img data-src="image.jpg" class="lazy" alt="Description">
```

## Тестирование

### 1. Локальное тестирование

```bash
# Тестирование производительности
lighthouse http://localhost:8000 --output html

# Тестирование доступности
axe-core http://localhost:8000
```

### 2. Проверка SEO

- **Google PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev)
- **GTmetrix**: [gtmetrix.com](https://gtmetrix.com)
- **WebPageTest**: [webpagetest.org](https://webpagetest.org)

## Безопасность

### 1. HTTPS

Все современные хостинги предоставляют бесплатный SSL сертификат.

### 2. Заголовки безопасности

Добавьте в `.htaccess` (для Apache):

```apache
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"
```

## Поддержка

- **Email**: support@fitness-ai.ru
- **Telegram**: @FitnessPlusAI_support
- **Документация**: [docs.fitness-ai.ru](http://docs.fitness-ai.ru)

## Лицензия

MIT License - см. файл LICENSE для деталей.