import { useSelector } from 'react-redux';

export default function useStoreData(selector) {
  // Return the result of the selector
  return useSelector(selector);
}
