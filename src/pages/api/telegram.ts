// pages/api/telegram.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '~/env'; // Make sure your environment variables are set up correctly
import { Telegraf } from 'telegraf';

const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);
bot.telegram.setWebhook(`https://${env.VERCEL_URL}/api/telegram`);

bot.on('text', (ctx) => {
    ctx.reply('Hello! You said: ' + ctx.message.text);
  });

bot.command('main', async (ctx) => {
        // Respond with a button to open the Web Mini App
        await ctx.reply('Click below to open the Mini Web App:', {
            reply_markup: {
                inline_keyboard: [[{
                    text: "Open Web App",
                    web_app: { url: "https://t.me/authifier_bot/authify" } // Replace with your actual Mini Web App URL
                }]]
            }
        });
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await bot.handleUpdate(req.body, res); // Pass the request body to Telegraf
        res.status(200).end(); // Properly end the response
    } else {
        res.status(200).send('This endpoint is for Telegram bot webhook only.');
    }
}
