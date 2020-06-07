import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('should display week if strength is 5', () => {
    const pipe = new StrengthPipe();
    const value = pipe.transform(5);
    expect(value).toEqual('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });
});
