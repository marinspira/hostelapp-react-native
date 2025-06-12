import { featureFlags, FeatureName } from '@/src/constants/FeatureFlags';

export const useFeatureFlag = (flagName: FeatureName): boolean => {
  
  const checkEnabled = (name: FeatureName): boolean => {
    const flag = featureFlags[name];
    if (!flag?.enabled) return false;

    if (flag.dependsOn?.length) {
      return flag.dependsOn.every(dep => checkEnabled(dep));
    }

    return true;
  };

  return checkEnabled(flagName);
};
