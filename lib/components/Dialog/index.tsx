import { RefObject } from 'react';
import JsonView from '../JsonView';
import SuggestionList from '../SuggestionList';
import './dialog.scss';

type ViewerProps = {
  inputRef: RefObject<HTMLInputElement>;
};

export default function Viewer({ inputRef }: ViewerProps) {
  return (
    <div className="jpv-dialog" onMouseDown={(e) => e.preventDefault()}>
      <div className="jpv-dialog__suggestions">
        <SuggestionList inputRef={inputRef} />
      </div>
      <div className="jpv-dialog__json">
        <JsonView />
      </div>
    </div>
  );
}
