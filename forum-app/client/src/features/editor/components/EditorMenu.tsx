import React, { MutableRefObject, PropsWithChildren } from 'react';
import { cx, css } from '@emotion/css';

import { EditorControlBaseProps } from '../types';

export const EditorMenu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<EditorControlBaseProps>,
    ref:
      | MutableRefObject<HTMLDivElement | null>
      | ((instance: HTMLDivElement | null) => void)
      | null,
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `,
      )}
    />
  ),
);
