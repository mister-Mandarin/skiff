// src/actions/index.ts

import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

// Определяем схему валидации для данных формы с помощью Zod
const bookingSchema = z.object({
    house: z.enum(['house1', 'house2', 'banya'], {
        errorMap: () => ({ message: "Пожалуйста, выберите объект для бронирования." }),
    }),
    checkIn: z.string().date('Неверный формат даты заезда.'),
    checkOut: z.string().date('Неверный формат даты выезда.'),
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа.'),
    phone: z.string().min(10, 'Телефон должен содержать минимум 10 цифр.'),
    // HTML-чекбокс без атрибута value отправляет 'on', если он отмечен.
    // Поэтому мы проверяем именно это значение.
    privacyPolicy: z.literal('on', {
        errorMap: () => ({ message: 'Вы должны согласиться с политикой конфиденциальности.' }),
    }),
})
    // Добавляем дополнительную проверку, чтобы убедиться, что дата заезда не позже даты выезда
    .refine(data => new Date(data.checkIn) <= new Date(data.checkOut), {
        message: 'Дата заезда не может быть позже даты выезда.',
        path: ['checkOut'], // Указываем, к какому полю относится ошибка
    });


export const server = {
    submitBooking: defineAction({
        accept: 'form',
        input: bookingSchema,
        handler: async (data) => {
            console.log('Получены данные на сервере:', data);

            // --- Симуляция задержки сети ---
            await new Promise(res => setTimeout(res, 1500));

            // --- Здесь будет ваша логика ---
            // Например, отправка email, сохранение в базу данных и т.д.
            // try {
            //   await sendEmail({ to: 'admin@example.com', ...data });
            // } catch (error) {
            //   return { success: false, message: 'Произошла ошибка при отправке.' };
            // }

            // Возвращаем успешный ответ
            return {
                success: true,
                message: `Спасибо, ${data.name}! Ваша заявка на бронирование принята.`,
            };
        },
    }),
};
