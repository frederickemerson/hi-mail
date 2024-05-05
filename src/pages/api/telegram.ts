
import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from '~/env'
import type { Message } from '@grammyjs/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(!req.body) {
          console.warn('No body or message');
          res.status(200).end();
          return;
        }
    
        const {message} = req.body as {message:Message};

        if (message?.text  === '/start') {
            const tex =       'Welcome to <i>Authifier</i> <b>' + message?.from?.first_name+ '</b>.  Use /main to get started';
            await sendMessage(message.chat.id, tex);
          }  
        else if (message?.text  === '/main') {
            const tex = "Authify Now:";
          
            const keyboard = JSON.stringify({
              inline_keyboard: [[{
                text: "Get A Hi",
                web_app: { url: "https://hi-mail.vercel.app" }
              }]]
            });
            await sendMessage(message.chat.id, tex, keyboard);
          }
      console.log(message)
      res.status(200).send('OK');
    }
    catch(error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error');
      }
}

async function sendMessage(chatId:number, text:string, replyMarkup = '') {
    const encodedText = encodeURIComponent(text);
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodedText}&parse_mode=HTML`;
  
    if (replyMarkup) {
      await fetch(`${url}&reply_markup=${encodeURIComponent(replyMarkup)}`);
    } else {
      await fetch(url);
    }
  }