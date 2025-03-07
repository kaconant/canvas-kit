import React from 'react';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {ColorPreview} from '@workday/canvas-kit-react/color-picker';

export const LabelPosition = () => {
  return (
    <FormField orientation="horizontalStart">
      <FormField.Label>Background Color</FormField.Label>
      <FormField.Field>
        <FormField.Input as={ColorPreview} value="#00ffcc" />
      </FormField.Field>
    </FormField>
  );
};
