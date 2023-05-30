import { RefObject, useEffect, useRef } from 'react';

import { throttle } from 'common/utils';

export const useOnViewEffect = <T extends HTMLElement>(
  elementRef: RefObject<T>,
  effect: () => void | Promise<void>,
  defer: boolean = false,
): void => {
  const viewedTop = useRef(false);
  const viewedBottom = useRef(false);
  const effectRunRef = useRef(false);

  const checkIfViewed = throttle(async () => {
    if (!elementRef.current) {
      return;
    }

    const { top, bottom } = elementRef.current.getBoundingClientRect();
    const { innerHeight } = window;

    if (!viewedTop.current && top >= 0 && top <= innerHeight) {
      viewedTop.current = true;
    }

    if (!viewedBottom.current && bottom >= 0 && bottom <= innerHeight) {
      viewedBottom.current = true;
    }

    if (viewedTop.current && viewedBottom.current && !effectRunRef.current) {
      await effect();
      effectRunRef.current = true;
    }
  }, 100);

  useEffect(() => {
    if (defer) {
      return;
    }

    if (viewedTop.current && viewedBottom.current) {
      return;
    }

    if (elementRef.current) {
      (async () => {
        await checkIfViewed();

        if (!viewedTop.current || !viewedBottom.current) {
          document.addEventListener('scroll', checkIfViewed);
        }
      })();
    }

    return () => {
      document.removeEventListener('scroll', checkIfViewed);
    };
  }, [elementRef, checkIfViewed, effect, defer]);
};
