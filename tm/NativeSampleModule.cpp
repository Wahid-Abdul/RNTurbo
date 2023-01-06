#include "NativeSampleModule.h"

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

std::string NativeSampleModule::dummyText(jsi::Runtime& rt) {
  return "Lorem ipsum";
}

int isPrime(int k)
{
    if (k <= 1)
        return 0;
    if (k==2 || k==3)
        return 1;
    if (k % 2 == 0 || k % 3 == 0)
        return 0;

    for (int i = 5; i * i <= k; i = i + 6)
        if (k % i == 0 || k % (i + 2) == 0)
            return 0;

    return 1;
}

int NativeSampleModule::getNthPrime(jsi::Runtime& rt, int n) {
  int i=2;

    while(n>0)
    {
        if(isPrime(i))
          n--;
        i++;
    }
    i-=1;
    return i;
}
} // namespace facebook::react