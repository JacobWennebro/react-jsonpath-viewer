import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { Suggestion } from '../util/suggestionBuilder';

export type ComponentProps = {
  rootChar: string;
  highlightColor: string;
  json: object;
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
};

export type InternalStoreContext = ComponentProps & {
  suggestions: Suggestion[];
  setSuggestions: Dispatch<SetStateAction<Suggestion[]>>;
};

export const InternalStoreContext = createContext<InternalStoreContext>({
  rootChar: '$',
  highlightColor: 'red',
  json: {},
  suggestions: [],
  setSuggestions: () => {},
  path: '$.',
  setPath: () => {},
});

export default function InternalStoreProvider({
  children,
  ...rest
}: PropsWithChildren<ComponentProps>) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  return (
    <InternalStoreContext.Provider
      value={{ ...rest, suggestions, setSuggestions }}
    >
      {children}
    </InternalStoreContext.Provider>
  );
}
