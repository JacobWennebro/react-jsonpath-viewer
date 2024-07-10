import {
  ChangeEvent,
  FocusEvent,
  useState,
  useRef,
  forwardRef,
  ForwardedRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
  HTMLAttributes,
  FC,
  Ref,
} from 'react';
import Viewer from '../Dialog';
import InternalStoreProvider from '../../contexts/InternalStoreContext';

type InputComponentProps = {
  value: string;
  ref: Ref<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
};

type JsonPathViewerProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  rootChar?: string;
  value?: string;
  highlightColor?: string;
  json: object;
  component?:
    | FC<InputComponentProps>
    | ForwardRefExoticComponent<
        HTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>
      >;
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

const JsonPathEditor = forwardRef<HTMLInputElement, JsonPathViewerProps>(
  (
    {
      rootChar = '$',
      highlightColor = 'green',
      value,
      json,
      component: CustomInputComponent = InputComponent, // Default to InputComponent if not provided
    },
    ref
  ) => {
    const [path, setPath] = useState<string>(() => {
      if (value?.startsWith(`${rootChar}.`)) {
        return value;
      }
      return `${rootChar}.${value ?? ''}`;
    });

    const [showViewer, setShowViewer] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => {
        if (inputRef.current) {
          return inputRef.current;
        } else {
          throw new Error('JPV: Failed to set ref on input element');
        }
      },
      [inputRef]
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const regex = /^[a-zA-Z0-9$. [\]*-]+$/;
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
  }
);

export default JsonPathEditor;
