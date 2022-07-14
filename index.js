const Discord =require("discord.js");
const axios = require("axios")
const client = new Discord.Client({
    intents: 32767
  })

const prefix = "d!"



function connect() {
    let auth = 1;
    if (auth == 1) {
        console.log("Connected to discord.sms")
    }
    else if (auth == 2) {
        console.log("discord.sms has down pls contract dev \n https://discord.gg/bjCqn3VSaw")
    }
    else {
        console.log("Unknow eror pls contract dev \n https://discord.gg/bjCqn3VSaw")   
    }
}

function login() {
    var prompt = require('prompt-sync')();
    var token = prompt("token: ")
    client.login(token)

    client.on("ready", async () => {
        console.log("Logined to Your Bot")
        client.user.setActivity("Host by discord.sms", {type: "STREAMING"})
    })
}

function sms_command() {
    console.log("prefix is d!")
    client.on('messageCreate', message => {
        if(message.content.startsWith(prefix+"sms")){
          let phone = message.content.split(" ").slice(1)
          if(!phone[0]) return message.channel.send("กรุณาใส่เบอร์ที่ต้องการจะยิงด้วยค้าบ")

      }
    }
  )
}

function cooldown() {
    const usersMap = new Map();
      const LIMIT = 5
      const TIME = 7000;
      const DIFF = 3000;

      client.on('message', async(message) => {
        if(message.author.bot) return;
        if(usersMap.has(message.author.id)) {
          const userData = usersMap.get(message.author.id);
          const { lastMessage, timer } = userData;
          const difference = message.createdTimestamp - lastMessage.createdTimestamp;
          let msgCount = userData.msgCount;
          console.log(difference);

          if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Clear TimeOut');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
              usersMap.delete(message.author.id);
              console.log('Removed From Map.')
            }, TIME);
            usersMap.set(message.author.id, userData)
          }
          else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
              let spamtextalert = "เซิฟเวอร์นี้ได้มีการเปิด Cooldown คุณจะไม่สามารถ ส่งข้อความรัวๆได้นะครับ !!"
              message.channel.send(`${spamtextalert}`);
              setTimeout(() => {
                message.channel.send('คุณพ้นโทษ จากการสแปมแล้วงับ')
              }, TIME);
            } else {
              userData.msgCount = msgCount;
              usersMap.set(message.author.id, userData);
            }
          }
        }
        else {
          let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed From Map.')
          }, TIME);
          usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
          })
        }
      })
}

function sms_send() {
  
}

module.exports = { connect, login, sms_command, cooldown };

// Module by Gxdjz Zx#9999 //
