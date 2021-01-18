import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  id: string;
  children: React.ReactNode;
}

export const Portal = memo(({ id, children }: Props) => {
  if (!id) return null;
  const el = useRef(document.getElementById(id));
  console.log(el.current.parentElement);
  const [dynamic] = useState(!el.current.parentElement);
  useEffect(() => {
    if (dynamic) {
      el.current.id = id;
      document.body.appendChild(el.current);
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    };
  }, [id]);
  return createPortal(children, el.current);
});
