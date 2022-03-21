import { DateHelperCore } from "../date-helper-core.class";

class MockDataHelperCore extends DateHelperCore {
  public static getTz(): string {
    return this.getBrowserTimezone();
  }
}

describe('DateHelper Core Class Test', () => {
  it('getBrowserTimezone should return proper timezone in a string', () => {
    const timezone = MockDataHelperCore.getTz();
    expect(typeof timezone).toBe('string');
  })
});
