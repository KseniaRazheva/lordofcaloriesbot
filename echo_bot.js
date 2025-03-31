require("dotenv").config(); // Загружаем переменные окружения из .env
const { Telegraf } = require("telegraf");

// Чтение токена из переменной окружения
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Создаем экземпляр бота
const bot = new Telegraf(TOKEN);
console.log("bot started");

// Обработчик команды /start
bot.start((ctx) => {
	ctx.reply("Привет! Я эхо-бот. Отправь мне сообщение, и я его повторю.");
});

// Обработчик текстовых сообщений
bot.on("text", (ctx) => {
	// Не отвечаем на команды (начинающиеся с /)
	if (!ctx.message.text.startsWith("/")) {
		ctx.reply(ctx.message.text);
	}
});

// Запуск бота
bot.launch()
	.then(() => console.log("Бот успешно запущен"))
	.catch((err) => console.error("Ошибка запуска бота:", err));

// Элегантная обработка завершения работы
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
