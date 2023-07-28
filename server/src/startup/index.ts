import { Server as SocketServer } from 'socket.io';
import database from '../config/database';
import dataStore from '../config/dataStore';
import CommandLineRunner from '../helpers/CommandLineRunner';
import { AGENDA_COLLECTION_NAME } from '../config/constants';
import CronJob from '../helpers/CronJob';
import { Agenda } from 'agenda';
// import { QueueManager } from 'rabbitmq-email-manager';
// import queue from '../config/queue';

export default async function startup(io: SocketServer) {
  dataStore.init();
  await database.mongodb();
  await CommandLineRunner.run();
  console.log('MongoDB Connected Successfully');

  const agenda = new Agenda({
    db: {
      address: database.mongoUrl,
      collection: AGENDA_COLLECTION_NAME,
    },
  });

  agenda.define('vendorIsExpired', { concurrency: 1 }, async (job: any) => {
    await CronJob.vendorIsExpired()
  });

  await agenda.start();
  await agenda.every('0 0 * * *', 'vendorIsExpired');

  //will use this along side nodemailer when i want to send email
  // await QueueManager.init({
  //   queueClient: queue.client,
  //   queue: QUEUE_EVENTS.name,
  // });

}