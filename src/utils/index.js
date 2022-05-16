import { Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const DEFAULT_CENTER_COORDINATE = [106.65, 10.78];
export const SF_OFFICE_COORDINATE = [106.65, 10.78];

export function onSortOptions(a, b) {
  if (a.label < b.label) {
    return -1;
  }

  if (a.label > b.label) {
    return 1;
  }

  return 0;
}
