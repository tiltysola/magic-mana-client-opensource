import dayjs from 'dayjs';
import { Notification } from 'electron';
import path from 'path';

import { APP_PATH } from '../utils/constant';
import logger from '../utils/logger';

interface NotificationData {
  id: string;
  title: string;
  body: string;
  timer: number;
}

const notificationQueue: NotificationData[] = [];

export const pushNotification = (data: NotificationData) => {
  removeNotification(data.id);
  notificationQueue.push(data);
};

export const removeNotification = (id: string) => {
  for (let i = notificationQueue.length - 1; i >= 0; i--) {
    if (notificationQueue[i].id === id) {
      notificationQueue.splice(i, 1);
    }
  }
};

setInterval(() => {
  for (let i = notificationQueue.length - 1; i >= 0; i--) {
    try {
      if (dayjs().diff(dayjs(notificationQueue[i].timer)) > 0) {
        new Notification({
          title: notificationQueue[i]?.title,
          body: notificationQueue[i]?.body,
          icon: path.join(APP_PATH, 'build/icons/png/common/notification.png'),
        }).show();
      }
    } catch (err) {
      logger.error(err);
    }
    notificationQueue.splice(i, 1);
  }
}, 1000);
