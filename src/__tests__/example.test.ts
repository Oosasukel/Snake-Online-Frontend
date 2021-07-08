import Home from '../pages';

describe('Example tests', () => {
  it('Should sum two numbers', () => {
    expect(1 + 2).toBe(3);
  });

  test('Home name should be Home', () => {
    expect(Home.name).toBe('Home');
  });
});
