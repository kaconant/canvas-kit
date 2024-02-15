import React from 'react';
import {
  StyledType,
  focusRing,
  createComponent,
  ExtractProps,
} from '@workday/canvas-kit-react/common';

import {Box, Flex} from '@workday/canvas-kit-react/layout';
import {CSProps, calc, createStencil, handleCsProp, px2rem} from '@workday/canvas-kit-styling';
import {base, brand, system} from '@workday/canvas-tokens-web';
import {RadioLabelContext} from './RadioLabel';

const radioWidth = 18;
const radioHeight = 18;

export interface StyledRadioButtonProps extends CSProps {
  variant?: 'inverse' | undefined;
}

const radioInputStyles = createStencil({
  base: {
    cursor: 'pointer',
    opacity: '1',
    height: px2rem(radioHeight),
    width: px2rem(radioWidth),
    borderRadius: system.shape.round,
    position: 'absolute',
    margin: '0',
    '&:focus-visible, &.focus, &:active': {
      outline: 'transparent',
    },
    '&:disabled, &.disabled': {
      cursor: 'auto',
      '+ .cnvs-radio-check': {
        borderColor: base.licorice100,
        backgroundColor: base.soap100,
      },
      '&:hover + .cnvs-radio-check, &.hover + .cnvs-radio-check': {
        borderColor: base.licorice100,
      },
      // This creates the inner circle when the Radio is checked.
      // The backgroundColor represents the dot in the middle of the radio.
      // The borderColor represents the border around the middle dot of the radio.
      '&:checked + .cnvs-radio-check, &.checked + .cnvs-radio-check': {
        backgroundColor: brand.primary.accent, // inner circle background color
        border: `5px solid ${brand.primary.base}`, // inner circle border color
      },
    },

    // Circle element styles the radio as checked or unchecked
    '+ .cnvs-radio-check': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: base.frenchVanilla100,
      borderRadius: system.shape.round,
      boxSizing: 'border-box',
      border: `${px2rem(1)} solid ${base.licorice200}`,
      height: px2rem(radioHeight),
      width: px2rem(radioWidth),
      justifyContent: 'center',
      pointerEvents: 'none',
      position: 'absolute',
      transition: 'border 200ms ease, background 200ms',
      opacity: '1',
    },

    '&:hover + .cnvs-radio-check, &.hover + .cnvs-radio-check': {
      borderColor: base.licorice500,
    },

    '&:focus-visible + .cnvs-radio-check, &.focus + .cnvs-radio-check': {
      borderColor: base.blueberry400,
      ...focusRing({
        width: 1,
        separation: 0,
        animate: false,
        innerColor: base.frenchVanilla100,
        outerColor: brand.common.focusOutline,
      }),
    },

    '&:focus-visible:hover + .cnvs-radio-check, &.focus:hover + .cnvs-radio-check': {
      outline: 'transparent',
    },
    // This creates the inner circle when the Radio is checked.
    // The backgroundColor represents the dot in the middle of the radio.
    // The borderColor represents the border around the middle dot of the radio.
    '&:checked + .cnvs-radio-check, &.checked + .cnvs-radio-check': {
      backgroundColor: brand.primary.accent, // inner circle background color
      border: `${px2rem(5)} solid ${brand.primary.base}`, // inner circle border color
    },

    '&:focus-visible:checked + .cnvs-radio-check, &:focus-visible:hover:checked + .cnvs-radio-check, &.focus:checked + .cnvs-radio-check, &.focus:hover:checked + .cnvs-radio-check':
      {
        outline: 'transparent',
        ...focusRing({
          width: 2,
          separation: 2,
          animate: false,
          innerColor: base.frenchVanilla100,
          outerColor: brand.common.focusOutline,
        }),
      },
  },
  modifiers: {
    variant: {
      inverse: {
        '+ .cnvs-radio-check': {
          backgroundColor: base.soap100,
          borderColor: base.soap300,
        },
        '&:disabled, &.disabled': {
          opacity: system.opacity.disabled,
          '+ .cnvs-radio-check': {
            backgroundColor: base.soap100,
            borderColor: base.licorice100,
            opacity: system.opacity.disabled,
          },
          // This creates the inner circle when the Radio is checked.
          // The backgroundColor represents the dot in the middle of the radio.
          // The borderColor represents the border around the middle dot of the radio.
          '&:checked + .cnvs-radio-check, &.checked + .cnvs-radio-check': {
            backgroundColor: brand.primary.base, // inner circle background color
            borderColor: base.frenchVanilla100, // inner circle border color
          },
        },
        '&:hover + .cnvs-radio-check, &.hover + .cnvs-radio-check': {
          borderColor: base.soap300,
        },
        '&:focus-visible + .cnvs-radio-check, &.focus + .cnvs-radio-check': {
          borderColor: base.soap300,
        },
        // This creates the inner circle when the Radio is checked.
        // The backgroundColor represents the dot in the middle of the radio.
        // The borderColor represents the border around the middle dot of the radio.
        '&:checked + .cnvs-radio-check, &.checked + .cnvs-radio-check': {
          backgroundColor: brand.primary.base, // inner circle background color
          borderColor: base.frenchVanilla100, // inner circle border color
        },
        '&:focus-visible + .cnvs-radio-check, &:focus-visible:hover + .cnvs-radio-check, &.focus + .cnvs-radio-check, &.focus:hover + .cnvs-radio-check':
          {
            ...focusRing({
              width: 2,
              separation: 0,
              innerColor: base.blackPepper400,
              outerColor: base.frenchVanilla100,
            }),
          },
        '&:focus-visible:checked + .cnvs-radio-check, &:focus-visible:hover:checked + .cnvs-radio-check, &.focus:checked + .cnvs-radio-check, &.focus:hover:checked + .cnvs-radio-check':
          {
            ...focusRing({
              width: 2,
              separation: 2,
              innerColor: base.blackPepper400,
              outerColor: base.frenchVanilla100,
            }),
          },
      },
    },
  },
});

const StyledRadioInput = createComponent('input')<StyledRadioButtonProps & StyledType>({
  displayName: 'StyledRadioInput',
  Component: ({children, variant, ...elemProps}: StyledRadioButtonProps, ref, Element) => {
    return <Element ref={ref} {...handleCsProp(elemProps, radioInputStyles({variant}))} />;
  },
});

const radioInputWrapperStyles = createStencil({
  base: {
    height: px2rem(radioHeight),
    width: px2rem(radioWidth),
    flex: '0 0 auto',
    // Hover Ripple element
    '::before': {
      content: "''",
      position: 'absolute',
      borderRadius: system.shape.round,
      height: px2rem(radioHeight),
      transition: 'box-shadow 150ms ease-out',
      width: px2rem(radioWidth),
      pointerEvents: 'none',
      opacity: '1',
    },
    '&:hover:before, &.hover:before': {
      boxShadow: `0 0 0 ${calc.subtract(system.space.x2, px2rem(1))} ${base.soap200}`,
    },
  },
  modifiers: {
    variant: {
      inverse: {
        '::before': {
          opacity: system.opacity.disabled,
        },
      },
    },
    disabled: {
      true: {
        '&:hover:before, &.hover:before': {
          boxShadow: 'none',
          cursor: 'auto',
        },
      },
    },
  },
});

const RadioInputWrapper = createComponent(Flex)<
  Pick<StyledRadioButtonProps, 'disabled' | 'variant'>
>({
  displayName: 'RadioInputWrapper',
  Component: ({children, variant, ...elemProps}: StyledRadioButtonProps, ref, Element) => {
    const {disabled} = React.useContext(RadioLabelContext);
    return (
      <Element ref={ref} {...handleCsProp(elemProps, radioInputWrapperStyles({variant, disabled}))}>
        {children}
      </Element>
    );
  },
});

export interface StyledRadioButtonProps extends ExtractProps<typeof Box, 'input'> {
  variant?: 'inverse' | undefined;
}

/**
 * Use `StyledRadioButton` when you want a styled radio button on its own without using `RadioGroup`.
 * You will need to handle behavior and accessibility.
 */
export const StyledRadioButton = createComponent('input')({
  displayName: 'Radio',
  Component: ({...elemProps}: StyledRadioButtonProps, ref, Element) => {
    return (
      <RadioInputWrapper
        {...elemProps} // This ensures our visual testing stories work properly
      >
        <StyledRadioInput type="radio" {...elemProps} />
        <span className="cnvs-radio-check" />
      </RadioInputWrapper>
    );
  },
});
