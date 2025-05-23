const mineflayer = require('mineflayer');
const readline = require('readline');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'minestax.uz',
    port: 25565,
    username: 'amirxon5768',
    version: '1.17.1' // Server versiyasini shu yerga to‘g‘ri yozing
  });

  bot.on('login', () => {
    console.log('✅ Bot muvaffaqiyatli tizimga kirdi.');

    // Har 5 daqiqada /boxpvp yuboradi
    setInterval(() => {
      bot.chat('/boxpvp');
      console.log('📤 Bot: /boxpvp yuborildi');
    }, 1 * 60 * 1000);

    // Har 20 soniyada sakraydi (lekin log yo‘q)
    setInterval(() => {
      if (bot.entity && bot.entity.onGround) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 300);
      }
    }, 20 * 1000);

    // Konsoldan /send orqali yozish
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('line', (input) => {
      if (input.startsWith('/send ')) {
        const msg = input.slice(6);
        bot.chat(msg);
        console.log(`💬 Botga yuborildi: ${msg}`);
      }
    });
  });

  bot.on('end', (reason) => {
    console.log(`🔌 Bot uzildi. Sabab: ${reason}`);
    console.log('♻️ 5 soniyada qayta ulanmoqda...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log(`❌ Xatolik: ${err.message}`);
  });
}

createBot();
