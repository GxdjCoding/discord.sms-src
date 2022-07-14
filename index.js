const Discord =require("discord.js");
const { MessageButton } = require('discord-buttons');
const axios = require("axios")
const slow = require('slow')
const client = new Discord.Client({
    intents: 32767
  })

const prefix = "d!"

let gpm = 0

let spam_status = "ยังไม่มีไรเกิดขึ้น !!"

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
          let status_button = new MessageButton()
          .setStyle('green')
          .setLabel('สถานะการยิง')
          .setID('stats_spam')
          if(!phone[0]) return message.channel.send("กรุณาใส่เบอร์ที่ต้องการจะยิงด้วยค้าบ")
          message.reply("คุณสามารถกดปุ่มเา้นล่างข้อความนี้ เพื่อดูสถานะการยิงได้ !!", status_button)
          gpm = phone[0]
          sms_send();
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
  const randomWait = i => {
    return new Promise(resolve => {
      setTimeout(() => resolve(i), Math.random() * 3000)
    })
  }
  console.clear()
  get_phone = gpm
  console.log(`Get ready to start send sms high speed with ${get_phone}`)
  slow.walk([1, 2, 3, 4, 5, 6], randomWait).then(res => {
    console.clear()
    console.log(`Attack to ${get_phone}`)
  })
}

module.exports = { connect, login, sms_command, cooldown };

// Module by Gxdjz Zx#9999 //

// License Original code //

// ถ้าอยากดัดแปลง กรุณษขออนุญาติเจ้าของก่อนน้าค้าบ หรือถ้าไม่อยากขอ ก็อย่าลบข้อความนี้พอ นะ โมดูลนี้ผมทำโมดูลแรก ขอเครดิตหน่อยละกัน ไม่ได้ก็อปใคร :) //
