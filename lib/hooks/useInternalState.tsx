import { useContext } from 'react';
import { InternalStoreContext } from '../contexts/InternalStoreContext';

export default function useInternalState() {
  const context = useContext(InternalStoreContext);
  if (!context) {
    throw new Error(
      'useInternalState must be used within an InternalStoreProvider'
    );
  }
  return context;
}
