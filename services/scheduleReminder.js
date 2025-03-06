import schedule from 'node-schedule';
import sendMail from './mailService.js';

function scheduleReminder(todoId, scheduleParams, sendTime) {
    const { email, title } = scheduleParams;
    schedule.scheduleJob(todoId, sendTime, async () => {
        try {
            console.log('Initiating reminder mail sending process!!');
            await sendMail(email, title);
            console.log('Email sent!');
        } catch (error) {
            console.log('Error sending reminder mail!!');
        }
    });
}

export default scheduleReminder;