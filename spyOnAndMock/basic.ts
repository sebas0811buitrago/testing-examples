import square, { sum } from './operations';

const operation = (n: number, operation: 'square' | 'sum') =>
  operation == 'square' ? square(n) : sum(n, n);

export default operation;
