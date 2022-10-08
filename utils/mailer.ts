import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config"
import log from "./logger";

// async function createtestaccount(){
//     const testAccount = await nodemailer.createTestAccount();
//     console.log("testAccount", testAccount);
// }

// createtestaccount();

const smtp = config.get<{
user: string,
pass: string,
host: string,
port: number,
secure: boolean
}>('smtp');

const transporter = nodemailer.createTransport({
    // host: smtp.host,
    // port: smtp.port,
    // secure: smtp.secure,
    ...smtp,
    auth: {
        user: smtp.user,
        pass: smtp.pass
    }
});

async function sendmail(payload: SendMailOptions){
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err,"Error occurred. " + err.message);
    }
    log.info("Message sent: %s", info.messageId);
    log.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};

export default sendmail;
