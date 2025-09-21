# Обновление домена лендинга

## Выполненные изменения

Домен лендинга обновлен с `https://fitnessai-bot.com` на `http://fitness-ai.ru/`.

### Обновленные файлы:

#### 1. landing/index.html
- **Open Graph URL**: `og:url` обновлен на `http://fitness-ai.ru/`
- **Email поддержки**: `support@fitnessai-bot.com` → `support@fitness-ai.ru`

#### 2. landing/sitemap.xml
- **5 URL** обновлены:
  - Главная страница: `http://fitness-ai.ru/`
  - Секция возможностей: `http://fitness-ai.ru/#features`
  - Секция тарифов: `http://fitness-ai.ru/#pricing`
  - Секция отзывов: `http://fitness-ai.ru/#reviews`
  - Секция FAQ: `http://fitness-ai.ru/#faq`

#### 3. landing/robots.txt
- **Sitemap URL**: обновлен на `http://fitness-ai.ru/sitemap.xml`

#### 4. landing/nginx.conf
- **Server name**: добавлен `fitness-ai.ru www.fitness-ai.ru`

#### 5. landing/README.md
- **SSL сертификат**: команда обновлена для `fitness-ai.ru` и `www.fitness-ai.ru`
- **Nginx конфигурация**: примеры обновлены с новым доменом
- **Email поддержки**: `support@fitnessai-bot.com` → `support@fitness-ai.ru`
- **Документация**: ссылка обновлена на `docs.fitness-ai.ru`

### Обновленные контакты:

- **Домен**: `http://fitness-ai.ru/`
- **Email**: `support@fitness-ai.ru`
- **Документация**: `http://docs.fitness-ai.ru`
- **Sitemap**: `http://fitness-ai.ru/sitemap.xml`

### Настройки для продакшена:

1. **DNS**: Настройте A-запись для `fitness-ai.ru` и `www.fitness-ai.ru`
2. **SSL**: Получите сертификат для домена
3. **Nginx**: Обновите конфигурацию для HTTPS
4. **Email**: Настройте почтовый ящик `support@fitness-ai.ru`

### Проверка:

✅ Open Graph теги обновлены  
✅ Sitemap обновлен  
✅ Robots.txt обновлен  
✅ Nginx конфигурация обновлена  
✅ Email адреса обновлены  
✅ Документация обновлена  

Лендинг готов к развертыванию на домене `fitness-ai.ru`!
