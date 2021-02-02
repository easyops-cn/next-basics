import { encrypt, decrypt } from "./utils";

describe("encrypt and decrypt in base64", () => {
  const cases: [string, string][] = [
    [null, ""],
    ["", ""],
    ["A", "A"],
    ["http://x.y.z", "http://x.y.z"],
    ["A中国人", "A中国人"],
  ];

  it.each(cases)("decrypt(encrypt(%j)) should be %j", (txt, expected) => {
    const en = encrypt(txt);
    expect(decrypt(en)).toBe(expected);
  });
});
