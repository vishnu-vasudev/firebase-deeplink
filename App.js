import React, {useEffect, useState} from 'react';
import {View, Text, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import NewPage from './components/NewPage';
import LinkingScreens from './components/LinkingScreens';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import RemotePushController from './android/app/src/services/RemotePushController';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  // const {url: initialUrl, processing} = useInitialURL();
  // console.log(initialUrl);
  let url = '';
  url = useInitialURL();
  let initialUrl = url.url;
  let param = '';
  if (initialUrl === undefined) {
    console.log('undefined');
  }
  if (initialUrl !== undefined) {
    if (initialUrl !== null) {
      param = parseURLParams(initialUrl);
      console.log(param);
    }
  }

  useEffect(() => {
    setData(param);
  }, [param]);

  function setData(param) {
    let Item = [];
    let singleObject = {};
    if (param !== '') {
      param.map(index => {
        // setSingleObj(singleObj => {order: index});
        singleObject = {order: index};
        // setItems(items => [...items, singleObject]);
        Item.push(singleObject);
      });
      alert(JSON.stringify(Item));
    }
  }

  // useEffect(() => {
  //   setData(param);
  // }, [param]);

  // function setData(param) {
  //   let Item = [];
  //   let singleObject = {};
  //   if (param !== '') {
  //     let newarray = param?.Items[0].split(',');
  //     console.log(newarray);
  //     newarray.map(index => {
  //       // setSingleObj(singleObj => {order: index});
  //       singleObject = {order: index};
  //       // setItems(items => [...items, singleObject]);
  //       Item.push(singleObject);
  //       console.log(index);
  //     });
  //     alert(JSON.stringify(Item));
  //   }
  // }

  function parseURLParams(url) {
    const splitted = url.split(/%0a/);
    console.log(splitted);
    let value = [];
    for (i = 2; i < splitted.length; i++) {
      value.push(splitted[i].replace(/%20/g, ' '));
    }
    return value;
  }

  // function parseURLParams(url) {
  //   var queryStart = url.indexOf('?') + 1,
  //     queryEnd = url.indexOf('#') + 1 || url.length + 1,
  //     query = url.slice(queryStart, queryEnd - 1),
  //     pairs = query.replace(/\+/g, ' ').split('&'),
  //     parms = {},
  //     i,
  //     n,
  //     v,
  //     nv;

  //   if (query === url || query === '') return;

  //   for (i = 0; i < pairs.length; i++) {
  //     nv = pairs[i].split('=', 2);
  //     n = decodeURIComponent(nv[0]);
  //     v = decodeURIComponent(nv[1]);

  //     if (!parms.hasOwnProperty(n)) parms[n] = [];
  //     parms[n].push(nv.length === 2 ? v : null);
  //   }
  //   return parms;
  // }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewPage" component={NewPage} />
      <Stack.Screen name="LinkingScreens" component={LinkingScreens} />
    </Stack.Navigator>
  );
};

const useMount = func => useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return {url, processing};
};

const App = () => {
  const linking = {
    prefixes: ['https://chattybao.page.link', 'deeplink://'],
    config: {
      screens: {
        Home: 'home',
        NewPage: 'newpage',
      },
    },
  };

  return (
    <>
      <RemotePushController />
      <NavigationContainer linking={linking}>
        <MyStack />
      </NavigationContainer>
    </>
  );
};

export default App;
