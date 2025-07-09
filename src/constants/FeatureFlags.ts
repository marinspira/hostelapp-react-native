export type FeatureName =
  | 'rooms'
  | 'events'
  | 'reservation'
  | 'chat'

type FeatureFlags = {
  [key in FeatureName]: {
    enabled: boolean;
    dependsOn?: FeatureName[]; 
  };
};

export const featureFlags: FeatureFlags = {
  // creation and management of rooms
  rooms: {
    enabled: false,
  },
  reservation: {
    enabled: true,
    // dependsOn: ['rooms'],
  },
  events: {
    enabled: false,
  },
  chat: {
    enabled: false,
  },
};
