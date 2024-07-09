import { RefObject, useEffect, useState } from 'react';
import JsonView from '../JsonView';
import SuggestionList from '../SuggestionList';
import './dialog.scss';

type ViewerProps = {
  inputRef: RefObject<HTMLInputElement>;
};

export default function Viewer({ inputRef }: ViewerProps) {
  const [[x, y], setPos] = useState([0, 0]);

  useEffect(() => {
    if (!inputRef.current) return;
    const { left, bottom } = inputRef.current.getBoundingClientRect();
    setPos([left, bottom + 5]);
  }, [inputRef]);

  return (
    <div
      className="jpv-dialog"
      style={{ left: x + 'px', top: y + 'px' }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="jpv-dialog__suggestions">
        <SuggestionList inputRef={inputRef} />
      </div>
      <div className="jpv-dialog__json">
        <JsonView />
      </div>
    </div>
  );
}
