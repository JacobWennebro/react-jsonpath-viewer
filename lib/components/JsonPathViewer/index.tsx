import {
  FC,
  ChangeEvent,
  FocusEvent,
  useState,
  useRef,
  forwardRef,
  ForwardedRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import Viewer from '../Dialog';
import InternalStoreProvider from '../../contexts/InternalStoreContext';

type JsonPathViewerProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  rootChar?: string;
  highlightColor?: string;
  json: object;
  component?: ForwardRefExoticComponent<
    InputComponentProps & RefAttributes<HTMLInputElement>
  >;
};

type InputComponentProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
};

const InputComponent = forwardRef(
  (
    { value, onChange, onFocus, onBlur }: InputComponentProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
);

const JsonPathEditor: FC<JsonPathViewerProps> = ({
  rootChar = '$',
  highlightColor = 'green',
  json,
  component: CustomInputComponent = InputComponent, // Default to InputComponent if not provided
}: JsonPathViewerProps) => {
  const [path, setPath] = useState(`${rootChar}.`);
  const [showViewer, setShowViewer] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9$. [\]]+$/;
    const { value } = e.target;

    if (value.length <= 0) {
      setPath(`${rootChar}.`);
      return;
    }

    if (!value.startsWith(`${rootChar}.`)) return;

    if (regex.test(value)) {
      setPath(value.split(' ').join('.'));
    }
  };

  const handleFocusAndBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.type === 'focus') {
      setShowViewer(true);
    } else {
      setShowViewer(false);
    }
  };

  return (
    <InternalStoreProvider
      rootChar={rootChar}
      highlightColor={highlightColor}
      json={json}
      path={path}
      setPath={setPath}
    >
      <CustomInputComponent
        value={path}
        ref={inputRef}
        onFocus={handleFocusAndBlur}
        onBlur={handleFocusAndBlur}
        onChange={handleChange}
      />
      {showViewer && <Viewer inputRef={inputRef} />}
    </InternalStoreProvider>
  );
};

export default JsonPathEditor;
