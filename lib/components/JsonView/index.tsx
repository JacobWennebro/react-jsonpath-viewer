import { useMemo } from 'react';
import jp, { PathComponent } from 'jsonpath';
import {
  convertTaggedJsonAsReactComponent,
  tagPartOfJsonToHighlight,
} from '../../utils';
import useInternalState from '../../hooks/useInternalState';

export default function JsonView() {
  const { path, json, highlightColor } = useInternalState();

  const evalJsonPath = (json: object, jsonPath: string): PathComponent[][] => {
    try {
      return jp.paths(json, jsonPath);
    } catch (e) {
      return [];
    }
  };

  const pathsEvaluated = useMemo(() => evalJsonPath(json, path), [json, path]);

  const taggedJson = useMemo(
    () => tagPartOfJsonToHighlight(json, pathsEvaluated),
    [json, pathsEvaluated]
  );

  const renderedComponents = useMemo(
    () => convertTaggedJsonAsReactComponent(taggedJson, highlightColor),
    [taggedJson, highlightColor]
  );

  return (
    <code>
      <ul>{renderedComponents}</ul>
    </code>
  );
}
