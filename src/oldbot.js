const Telegraf = require("telegraf").Telegraf
const { NewsManager } = require("./scraper.js")
require("dotenv").config()


class NewsBot {
    constructor(token) {
        this.bot = new Telegraf(token)
        this.bot.launch()

        this.newsManager = new NewsManager()

        this.extremeHours = [11, 21] //Nothing will be published before 11am and after 9pm. (Always >0 && <24)
        this.scheduledNews = [] 
        this.schedulingInProcess = false  

        this.timeManager()
    }

    //manage time to know when the bot publishes
    timeManager(){
        let intervalDuration = 300000 //milliseconds == 1 minute

        setInterval(() => {
            let actualTime = new Date()

            if(this.scheduledNews.length === 0 && !this.schedulingInProcess) {
                this.getAndScheduleNews().then(() => this.schedulingInProcess = false).catch(err => this.sendError(err))
            }

            var i = 0 // "i" is needed to know the index of the news to delete when publishes
            this.scheduledNews.forEach(_new => {
                if(_new.hour == actualTime.getHours()) {
                    this.sendNew(_new.data)
                    this.scheduledNews.splice(i, 1)
                }
                i++
            })

        }, intervalDuration)
    }

    getAndScheduleNews() {
        this.schedulingInProcess = true

        return new Promise((resolve, reject) => {
            this.getNewsData().then(news => {

                const availableHoursAmount = this.extremeHours[1] - this.extremeHours[0]
                const newsAmmount = news ? news.length : 0;
                // Interval is the interval of time between news
                const interval = newsAmmount !== 0 ? ((availableHoursAmount - (availableHoursAmount%newsAmmount))/newsAmmount) : null;

                if(interval !== null) {
                    let hourToPublish = this.extremeHours[0] + Math.floor((availableHoursAmount%newsAmmount)/2)
                    news.forEach( _new => {
                        this.scheduledNews.push({
                            hour: hourToPublish,
                            data: _new
                        })
                        hourToPublish+=interval;
                    })
                    resolve("this.scheduledNews updated")
                } else {
                    reject("There was no interval")
                }

            }).catch(err => {
                reject(err)
            })

        })
    }

    getNewsData() {
        return new Promise((resolve, reject) => {
            try {
                const news = this.newsManager.getDailyNews(this.newsManager.newsPages[0])
                news.then(news => {
                    let _news = []
                    news.forEach(_new => {

                        let newString = `
                        <b>${_new.title}</b> \n\n
                        - ${_new.resume[0]}\n
                        - ${_new.resume[1]}\n
                        <a href="${_new.url}">Ver noticia completa</a>"`

                        _news.push({
                            imageUrl: _new.imageUrl,
                            caption: newString,
                            url: _new.url
                        })
                    })
                    resolve(_news)
                })
            }
            catch(error){
                this.sendError("I've had a trouble getting the news")
                reject(error)
            }
        })
    }

    sendNew(_new) {
        this.bot.telegram.sendPhoto(
            process.env.BLECKIN_CHANNEL_ID,
            _new.imageUrl,
            {
                caption:_new.caption,
                parse_mode: "HTML"
            }
        )
    }

    changeExtremeHours(newHours) {
        this.extremeHours = newHours
    }

    sendError(err) {
        this.bot.telegram.sendMessage(process.env.BLECKIN_ERRORS_CHAT_ID, err)
    }

}

const bot = new NewsBot(process.env.BLECKIN_BOT_TOKEN)
