
import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from '~/env'
import { InlineKeyboardMarkup, Message } from '@grammyjs/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(!req.body) {
          console.warn('No body or message');
          res.status(200).end();
          return;
        }
    
        const {message} = req.body as {message:Message};
        if (message.text == '/start') {
            const tex =       'Welcome to <i>Authifier</i> <b>' +
            message?.from?.first_name+
            '</b>.%0ATo get a list of commands sends /help';
        const ret = await fetch(
            `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${message.chat.id}&text=${tex}&parse_mode=HTML`
          );
        }
        console.log(message)
      res.status(200).send('OK');
    }
    catch(error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error');
      }
}