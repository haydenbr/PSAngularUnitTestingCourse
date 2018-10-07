import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    let pipe = new StrengthPipe();
    let pipeTransform = pipe.transform(5);

    expect(pipeTransform).toEqual('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    let pipe = new StrengthPipe();
    let pipeTransform = pipe.transform(10);

    expect(pipeTransform).toEqual('10 (strong)');
  });
});
