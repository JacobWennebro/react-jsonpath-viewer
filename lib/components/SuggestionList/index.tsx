import { RefObject, useEffect } from 'react';
import { getSuggestions } from '../../util/suggestionBuilder';
import useInternalState from '../../hooks/useInternalState';

type SuggestionListProps = {
  inputRef: RefObject<HTMLInputElement>;
};

export default function SuggestionList({ inputRef }: SuggestionListProps) {
  const { suggestions, setSuggestions, path, setPath, json, rootChar } =
    useInternalState();

  const updatePath = (value: string) => {
    const extend = !path.endsWith('.') && !value.includes('.');
    setPath((path) => path + value + (extend ? '.' : ''));
  };

  useEffect(() => {
    const suggestions = getSuggestions(
      path,
      inputRef.current?.selectionStart || rootChar.length + 1,
      json
    );

    setSuggestions(suggestions);
  }, [path, inputRef, json, rootChar.length, setSuggestions]);

  return (
    <ul>
      {suggestions.map((s, i) => (
        <li key={i} onClick={() => updatePath(s.value)}>
          {s.value} - {s.description}
        </li>
      ))}
    </ul>
  );
}
