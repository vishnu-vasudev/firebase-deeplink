import React, {useEffect} from 'react';
import ReactMoE from 'react-native-moengage';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('REMOTE NOTIFICATION ==>', notification);

    if (notification.data['push_from'] === 'moengage') {
      ReactMoE.passFcmPushPayload(notification.data);
    } else {
      if (notification.foreground) {
        PushNotification.localNotification({
          title: notification.title,
          message: notification.message,
        });
      }
    }

    // process the notification here
  },
  // Android only: GCM or FCM Sender ID
  senderID: '2327885200',
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

const RemotePushController = () => {
  // useEffect(() => {
    
  // }, []);

  return null;
};

export default RemotePushController;
