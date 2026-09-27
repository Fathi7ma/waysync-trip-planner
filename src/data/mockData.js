/**
 * Mock Data for Waysync Trip Planner
 * Contains suggested locations, default trip info, and turn-by-turn steps
 * matching the Figma specifications.
 */

export const SUGGESTED_LOCATIONS = [
  {
    id: '1',
    title: 'Home',
    subtitle: 'Villa 12, Street 840, Zone 27, West Bay',
    icon: 'home-outline',
    type: 'saved',
  },
  {
    id: '2',
    title: 'Marina Office Tower',
    subtitle: 'Level 14, Al Fardan Rd, Lusail Marina',
    icon: 'business-outline',
    type: 'saved',
  },
  {
    id: '3',
    title: 'Corniche Ferry Terminal',
    subtitle: 'Gate 3, Corniche Promenade',
    icon: 'time-outline',
    type: 'recent',
  },
  {
    id: '4',
    title: 'Mushaireb Metro Station',
    subtitle: 'Al Khail St, Msheireb Downtown',
    icon: 'time-outline',
    type: 'recent',
  },
  {
    id: '5',
    title: 'Hamad International Airport',
    subtitle: 'Departures Level, Terminal 1',
    icon: 'airplane-outline',
    type: 'recent',
  },
];

export const DEFAULT_TRIP_DETAILS = {
  estimatedTime: '24 min',
  distance: '9.8 km',
  estimatedArrival: 'arrive 09:42',
  trafficAlert: 'Heavy traffic near the marina',
  modes: ['Drive', 'Ride', 'Walk'],
  selectedMode: 'Drive',
  turns: [
    {
      id: 't1',
      instruction: 'Head north on Street 840',
      detail: 'Keep right onto the service road',
      distance: '400 m',
      icon: 'arrow-up',
    },
    {
      id: 't2',
      instruction: 'Turn right onto Al Istiqlal St',
      detail: 'Moderate traffic on the road ahead',
      distance: '1.8 km',
      icon: 'arrow-forward',
    },
    {
      id: 't3',
      instruction: 'Merge onto Lusail Expressway',
      detail: 'Stay on left 2 lanes toward Marina',
      distance: '5.2 km',
      icon: 'navigate-outline',
    },
    {
      id: 't4',
      instruction: 'Take exit toward Al Fardan Rd',
      detail: 'Destination will be on the right',
      distance: '2.4 km',
      icon: 'location-outline',
    },
  ],
};
