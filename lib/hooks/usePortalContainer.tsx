import { useEffect, useRef } from 'react';

export default function usePortalContainer() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement('div');
    div.setAttribute('data-jpv-container', '');
    div.style.position = 'absolute';
    div.style.top = '0px';
    div.style.left = '0px';
    document.body.appendChild(div);
    ref.current = div;
    return () => {
      document.body.removeChild(div);
      ref.current = null;
    };
  }, []);

  return ref.current;
}
