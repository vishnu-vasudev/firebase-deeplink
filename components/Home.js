import React, {useEffect} from 'react';
import {Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import ReactMoE, {MoEGeoLocation, MoEProperties} from 'react-native-moengage';
import {MoE} from '@moengage/react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {LocalNotification} from '../android/app/src/services/LocalPushController';


ReactMoE.initialize('OTLJHNYUT4KE57FV6ZHF3F7N');

const Home = () => {
  const getTok = async () => {
    let fcmtoken = await messaging().getToken();
    console.log(fcmtoken);
  };

  useEffect(() => {
    let properties = new MoEProperties();
    properties.addAttribute('user_id', '123');
    properties.addAttribute('login_method', 'email');
    ReactMoE.trackEvent('User Login', properties);
    ReactMoE.showInApp();
    // ReactMoE.getSelfHandledInApp();
  }, []);

  useEffect(() => {
    getTok();
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
  }, []);

  // const notificationListener = () => {};

  const createUser = () => {
    ReactMoE.setUserContactNumber(9495305161);
    ReactMoE.setUserLocation(
      new MoEGeoLocation(11.317416150598916, 75.78232753890357),
    );
  };

  const logout = () => {
    ReactMoE.logout();
  };

  const login = () => {
    ReactMoE.setUserUniqueID('9495305161');
  };

  const clickButton = () => {
    let properties = new MoEProperties();
    ReactMoE.trackEvent('Button Clicked', properties);
  };

  const handleButtonPress = () => {
    LocalNotification();
  };

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  return (
    <>
      <Text>HomePage</Text>
      {/* <Text onPress={getTok}>get tokebutton</Text> */}
      <TouchableOpacity onPress={createUser}>
        <Text style={{color: 'black'}}>Set User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={login}>
        <Text style={{color: 'black', paddingTop: 30}}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={{color: 'black', paddingTop: 30}}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clickButton}>
        <Text style={styles.button}>Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleButtonPress}>
        <Text style={styles.button}>send Not</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={createChannel}>
        <Text style={styles.button}>create Channel</Text>
      </TouchableOpacity>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    borderWidth: 2,
    width: 70,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 10,
    height: 30,
    paddingTop: 5,
    backgroundColor: 'black',
  },
});
