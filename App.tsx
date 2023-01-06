/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import NativeSampleModule from './tm/NativeSampleModule';
import { nThPrime } from './src/utils/calculators';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    initialMethod();
  }, []);

  const initialMethod = async () => {
    // cpp implementation
    let startTime = new Date();
    const cppPrime = await NativeSampleModule.getNthPrime(15000);
    let endTime = new Date();
    console.log(
      'CPP value: ',
      cppPrime,
      ' time: ',
      endTime.getTime() - startTime.getTime(),
    );

    // js implementataion
    startTime = new Date();
    const jsPrime = await nThPrime(15000);
    endTime = new Date();
    console.log(
      'JS value: ',
      jsPrime,
      ' time: ',
      endTime.getTime() - startTime.getTime(),
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Cxx TurboModule">
            NativeSampleModule.reverseString(...) ={' '}
            {NativeSampleModule.reverseString(
              'the quick brown fox jumps over the lazy dog',
            )}
            {'\n'}
            {NativeSampleModule.reverseString('Abdul Wahid')}
            {NativeSampleModule.dummyText()}
          </Section>
        </View>
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
