import { RefObject, useEffect, useState } from 'react';
import JsonView from '../JsonView';
import SuggestionList from '../SuggestionList';
import './dialog.scss';
import { createPortal } from 'react-dom';
import usePortalContainer from '../../hooks/usePortalContainer';

type ViewerProps = {
  inputRef: RefObject<HTMLInputElement>;
};

export default function Viewer({ inputRef }: ViewerProps) {
  const [[x, y], setPos] = useState([0, 0]);
  const portal = usePortalContainer();

  useEffect(() => {
    if (!inputRef.current) return;
    const { left, bottom } = inputRef.current.getBoundingClientRect();
    setPos([left, bottom + 5]);
  }, [inputRef]);

  return (
    portal &&
    createPortal(
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
      </div>,
      portal
    )
  );
}
