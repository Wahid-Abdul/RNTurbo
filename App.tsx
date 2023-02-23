/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import NativeSampleModule from './tm/NativeSampleModule';
import { nThPrime } from './src/utils/calculators';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const callCPP10000 = async () => {
    for (let i = 0; i < 10000; i++) {
      await callCppPrime(i);
    }
  };

  const callJS10000 = async () => {
    for (let i = 0; i < 10000; i++) {
      await callJsPrime(i);
    }
  };

  const callCppPrime = async (n: number = 15000) => {
    let startTime = new Date();
    const cppPrime = await NativeSampleModule.getNthPrime(n);
    let endTime = new Date();
    console.log(
      // 'CPP value: ',
      cppPrime,
      n,
      // ' time: ',
      endTime.getTime() - startTime.getTime(),
    );
  };

  const callJsPrime = async (n: number = 15000) => {
    let startTime = new Date();
    const jsPrime = await nThPrime(n);
    let endTime = new Date();
    console.log(
      // 'JS value: ',
      jsPrime,
      n,
      // ' time: ',
      endTime.getTime() - startTime.getTime(),
    );
  };

  const getCPPVersion = async () => {
    const version = await NativeSampleModule.getCPPVersion();

    alert(version)
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity onPress={() => callJsPrime()} style={backgroundStyle}>
          <Text>JS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => callCppPrime()}
          style={backgroundStyle}>
          <Text>CPP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={callCPP10000} style={backgroundStyle}>
          <Text>CPP 10000</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={callJS10000} style={backgroundStyle}>
          <Text>JS 10000</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getCPPVersion} style={backgroundStyle}>
          <Text>Get CPP Version</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
