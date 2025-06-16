import { useState } from 'react';

export function useMathViewModel() {
  const [expression, setExpression] = useState('\\frac{a}{b}');

  return {
    expression,
    setExpression,
  };
}
