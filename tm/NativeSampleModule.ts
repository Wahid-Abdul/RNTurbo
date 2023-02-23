import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
// import type {TurboModule} from 'react-native'; in future versions
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
  readonly getCPPVersion: () => string;
  readonly getNthPrime: (n: number) => number;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeSampleModule');
