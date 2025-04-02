// require("dotenv").config();
// const { Telegraf, Markup } = require("telegraf");

// const bot = new Telegraf(process.env.BOT_TOKEN);
// const userData = {};
// //
// const STAGES = {
// 	MENU: "menu",
// 	WEIGHT: "current_weight",
// 	TARGET: "target_weight",
// 	HEIGHT: "height",
// 	AGE: "age",
// 	GENDER: "gender",
// 	ACTIVITY: "activity",
// 	GOAL: "goal", // Добавлен новый этап
// };

// // Главное меню
// const mainMenu = Markup.keyboard([
// 	["📊 Узнать свою норму калорий"],
// 	["ℹ️ О боте"],
// ]).resize();

// // Функция для показа главного меню
// function showMainMenu(ctx) {
// 	return ctx.reply("Выберите действие:", mainMenu);
// }

// // Коэффициенты активности
// const ACTIVITY_FACTORS = {
// 	sedentary: 1.2,
// 	light: 1.375,
// 	moderate: 1.55,
// 	active: 1.725,
// 	athlete: 1.9,
// };

// // Клавиатура для выбора активности
// const activityKeyboard = Markup.keyboard([
// 	["🏠 Сидячий образ жизни", "🚶 Легкая активность"],
// 	["🏋️ Умеренные нагрузки", "🔥 Высокая активность"],
// 	["🏆 Профессиональный спорт"],
// ])
// 	.oneTime()
// 	.resize();

// // Клавиатура для выбора цели
// const goalKeyboard = Markup.keyboard([
// 	["📉 Похудение", "📈 Набор массы"],
// 	["⚖️ Поддержание веса"],
// ])
// 	.oneTime()
// 	.resize();

// // Клавиатура для выбора пола
// const genderKeyboard = Markup.keyboard([["♂ Мужской", "♀ Женский"]])
// 	.oneTime()
// 	.resize();

// const calculateBMR = ({ currentWeight, height, age, gender }) => {
// 	const base = 10 * currentWeight + 6.25 * height - 5 * age;
// 	return gender === "male" ? base + 5 : base - 161;
// };

// const validateNumber = (value, name, min = 0) => {
// 	const num = parseFloat(value);
// 	if (isNaN(num) || num <= min)
// 		throw new Error(`Введите корректный ${name} (число > ${min})`);
// 	return num;
// };

// bot.start((ctx) => {
// 	return showMainMenu(ctx);
// });

// bot.hears("📊 Узнать свою норму калорий", (ctx) => {
// 	userData[ctx.from.id] = { stage: STAGES.WEIGHT };
// 	return ctx.reply(
// 		"Давайте рассчитаем вашу суточную норму калорий!\nВведите ваш текущий вес в кг:",
// 		Markup.removeKeyboard()
// 	);
// });

// bot.hears("ℹ️ О боте", (ctx) => {
// 	return ctx.reply(
// 		"Этот бот поможет вам рассчитать суточную норму калорий по формуле Миффлина-Сан Жеора.\n\n" +
// 			"Нажмите '📊 Узнать свою норму калорий' чтобы начать расчет.",
// 		mainMenu
// 	);
// });

// bot.on("text", (ctx) => {
// 	const userId = ctx.from.id;
// 	if (!userData[userId] || userData[userId].stage === STAGES.MENU) return;

// 	const { stage } = userData[userId];
// 	const { text } = ctx.message;

// 	try {
// 		if (stage === STAGES.WEIGHT) {
// 			userData[userId] = {
// 				currentWeight: validateNumber(text, "вес"),
// 				stage: STAGES.TARGET,
// 			};
// 			return ctx.reply("Теперь введите ваш желаемый вес в кг:");
// 		} else if (stage === STAGES.TARGET) {
// 			userData[userId].targetWeight = validateNumber(
// 				text,
// 				"желаемый вес"
// 			);
// 			userData[userId].stage = STAGES.HEIGHT;
// 			return ctx.reply("Теперь введите ваш рост в см:");
// 		} else if (stage === STAGES.HEIGHT) {
// 			userData[userId].height = validateNumber(text, "рост");
// 			userData[userId].stage = STAGES.AGE;
// 			return ctx.reply("Введите ваш возраст:");
// 		} else if (stage === STAGES.AGE) {
// 			userData[userId].age = validateNumber(text, "возраст", 1);
// 			userData[userId].stage = STAGES.GENDER;
// 			return ctx.reply("Выберите ваш пол:", genderKeyboard);
// 		} else if (stage === STAGES.GENDER) {
// 			let gender, genderText;
// 			if (text.includes("♂")) {
// 				gender = "male";
// 				genderText = "♂ Мужской";
// 			} else if (text.includes("♀")) {
// 				gender = "female";
// 				genderText = "♀ Женский";
// 			} else {
// 				throw new Error(
// 					"Пожалуйста, выберите пол из предложенных вариантов"
// 				);
// 			}

// 			userData[userId].gender = gender; // Для расчетов
// 			userData[userId].genderText = genderText; // Для вывода
// 			userData[userId].stage = STAGES.ACTIVITY;
// 			return ctx.reply(
// 				"Выберите ваш уровень физической активности:",
// 				activityKeyboard
// 			);
// 		} else if (stage === STAGES.ACTIVITY) {
// 			let activityLevel, activityText;
// 			if (text.includes("Сидячий")) {
// 				activityLevel = "sedentary";
// 				activityText = text;
// 			} else if (text.includes("Легкая")) {
// 				activityLevel = "light";
// 				activityText = text;
// 			} else if (text.includes("Умеренные")) {
// 				activityLevel = "moderate";
// 				activityText = text;
// 			} else if (text.includes("Высокая")) {
// 				activityLevel = "active";
// 				activityText = text;
// 			} else if (text.includes("Профессиональный")) {
// 				activityLevel = "athlete";
// 				activityText = text;
// 			} else
// 				throw new Error("Пожалуйста, выберите вариант из предложенных");

// 			userData[userId].activityLevel = activityLevel;
// 			userData[userId].activity = activityText; // Сохраняем текст для вывода
// 			userData[userId].stage = STAGES.GOAL;
// 			return ctx.reply("Выберите вашу цель:", goalKeyboard);
// 		} else if (stage === STAGES.GOAL) {
// 			let goal, modifier;
// 			if (text.includes("Похудение")) {
// 				goal = "похудение";
// 				modifier = -0.15; // Дефицит 15%
// 			} else if (text.includes("Набор")) {
// 				goal = "набор массы";
// 				modifier = 0.15; // Профицит 15%
// 			} else if (text.includes("Поддержание")) {
// 				goal = "поддержание веса";
// 				modifier = 0;
// 			} else {
// 				throw new Error(
// 					"Пожалуйста, выберите цель из предложенных вариантов"
// 				);
// 			}
// 			userData[userId].goal = text; // Сохраняем текст цели
// 			userData[userId].modifier = modifier;
// 			const userInfo = userData[userId];
// 			const bmr = calculateBMR(userInfo);
// 			const tdee = bmr * ACTIVITY_FACTORS[userInfo.activityLevel];
// 			const targetCalories = tdee * (1 + modifier);

// 			delete userData[userId];

// 			return ctx.reply(
// 				`📊 Ваши данные:\n` +
// 					`- Текущий вес: ${userInfo.currentWeight} кг\n` +
// 					`- Желаемый вес: ${userInfo.targetWeight} кг\n` +
// 					`- Рост: ${userInfo.height} см\n` +
// 					`- Возраст: ${userInfo.age}\n` +
// 					`- Пол: ${userInfo.genderText}\n` + // Используем genderText вместо gender
// 					`- Уровень активности: ${userInfo.activity}\n` +
// 					`- Цель: ${userInfo.goal}\n\n` +
// 					`Расчёт по формуле Миффлина-Сан Жеора на основе ваших данных (вес, рост, возраст, пол, активность, цель):\n` +
// 					`🔹 Базальный метаболизм (BMR): ${Math.round(
// 						bmr
// 					)} ккал/день\n` +
// 					`Базальный метаболизм (BMR) — это количество калорий, которое ваш организм тратит в состоянии полного покоя (без движения) для поддержания жизненно важных функций: дыхание, кровообращение, работы мозга и нервной системы, поддержание температуры тела, обновление клеток. Это минимальная энергия, необходимая вашему телу в сутки, если вы целый день лежите без движения.\n` +
// 					`🔹 Поддержание веса (TDEE): ${Math.round(
// 						tdee
// 					)} ккал/день\n` +
// 					`TDEE=BMR + энергия на вашу физическую активность (ходьба, спорт, работа).\n\n` +
// 					`📌 Рекомендации:\n` +
// 					`🔹 Для похудения (дефицит ${Math.round(
// 						tdee * 0.15
// 					)} ккал): ${Math.round(tdee * 0.85)} ккал/день\n` +
// 					`🔹 Для поддержания веса: ${Math.round(tdee)} ккал/день\n` +
// 					`🔹 Для набора массы (профицит ${Math.round(
// 						tdee * 0.15
// 					)} ккал): ${Math.round(tdee * 1.15)} ккал/день\n\n` +
// 					`💡 Ваша персональная цель (${goal.toLowerCase()}): ${Math.round(
// 						targetCalories
// 					)} ккал/день\n\n` +
// 					"Хотите сделать новый расчет?",
// 				mainMenu // Возвращаем главное меню после вывода результатов
// 			);
// 		}
// 	} catch (error) {
// 		return ctx.reply(error.message);
// 	}
// });
// // Обработчик для возврата в меню
// bot.hears(["Назад", "В меню", "Главное меню"], (ctx) => {
// 	delete userData[ctx.from.id];
// 	return showMainMenu(ctx);
// });

// bot.launch()
// 	.then(() => console.log("Бот запущен"))
// 	.catch((err) => console.error("Ошибка запуска:", err));

// process.once("SIGINT", () => bot.stop("SIGINT"));
// process.once("SIGTERM", () => bot.stop("SIGTERM"));
console.log("Hello");
