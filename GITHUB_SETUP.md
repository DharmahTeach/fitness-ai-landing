# Настройка GitHub репозитория

## ✅ Выполнено

1. **Инициализирован Git репозиторий** в папке landing
2. **Создан .gitignore** для исключения ненужных файлов
3. **Добавлены все файлы** в Git
4. **Создан первый коммит** с сообщением "Initial commit: FitnessAI Bot Landing Page"

## 📋 Следующие шаги

### 1. Создайте репозиторий на GitHub

1. **Перейдите на** [github.com](https://github.com)
2. **Нажмите** "New repository" (зеленая кнопка)
3. **Заполните данные**:
   - Repository name: `fitness-ai-landing`
   - Description: `Лендинг-воронка для FitnessAI Bot - персонального ИИ-тренера в Telegram`
   - Visibility: **Public** ✅
   - НЕ добавляйте README, .gitignore или лицензию (уже есть)
4. **Нажмите** "Create repository"

### 2. Подключите локальный репозиторий к GitHub

После создания репозитория GitHub покажет команды. Выполните:

```bash
# Добавьте удаленный репозиторий (замените YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/fitness-ai-landing.git

# Переименуйте ветку в main (современный стандарт)
git branch -M main

# Загрузите код на GitHub
git push -u origin main
```

### 3. Включите GitHub Pages

1. **Перейдите в Settings** вашего репозитория
2. **Найдите раздел** "Pages" в левом меню
3. **В Source** выберите "Deploy from a branch"
4. **Выберите branch**: main
5. **Выберите folder**: / (root)
6. **Нажмите** "Save"

### 4. Получите URL сайта

После настройки Pages ваш сайт будет доступен по адресу:
```
https://YOUR_USERNAME.github.io/fitness-ai-landing
```

## 🔧 Альтернативные команды

Если у вас настроен SSH ключ:

```bash
git remote add origin git@github.com:YOUR_USERNAME/fitness-ai-landing.git
git branch -M main
git push -u origin main
```

## 📁 Структура репозитория

```
fitness-ai-landing/
├── index.html              # Основная страница
├── assets/
│   ├── css/style.css       # Стили
│   ├── js/main.js          # JavaScript
│   └── images/             # Изображения
├── robots.txt              # SEO
├── sitemap.xml             # Карта сайта
├── README.md               # Документация
├── .gitignore              # Исключения Git
└── *.md                    # Документация
```

## 🚀 Результат

После выполнения всех шагов:
- ✅ Код загружен на GitHub
- ✅ Репозиторий публичный
- ✅ GitHub Pages включен
- ✅ Сайт доступен по URL
- ✅ Можно подключить домен fitness-ai.ru

## 🔗 Полезные ссылки

- [GitHub Pages](https://pages.github.com)
- [Настройка домена](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions](https://github.com/features/actions) (для автоматического развертывания)
