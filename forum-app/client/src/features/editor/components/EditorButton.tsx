import React, { MutableRefObject, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';

import { EditorControlBaseProps } from '../types';

interface EditorButtonProps extends EditorControlBaseProps {
  active: boolean;
  reversed: boolean;
}

export const EditorButton = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<EditorButtonProps>,
    ref:
      | MutableRefObject<HTMLSpanElement | null>
      | ((instance: HTMLSpanElement | null) => void)
      | null,
  ) => {
    const fontColor = ((): string => {
      if (active && !reversed) {
        return 'black';
      }

      if (active && reversed) {
        return 'white';
      }

      return '#aaa';
    })();

    return (
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            cursor: pointer;
            color: ${fontColor};
          `,
        )}
      />
    );
  },
);
