import React, { MutableRefObject, PropsWithChildren } from 'react';
import { cx, css } from '@emotion/css';

import { EditorMenu } from './EditorMenu';
import { EditorControlBaseProps } from '../types';

export const EditorToolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<EditorControlBaseProps>,
    ref:
      | MutableRefObject<HTMLDivElement | null>
      | ((instance: HTMLDivElement | null) => void)
      | null,
  ) => (
    <EditorMenu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `,
      )}
    />
  ),
);
