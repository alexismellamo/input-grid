import NumberInput from "./NumberInput";
import { render, fireEvent } from "@testing-library/react";

const setup = () => {
  const utils = render(<NumberInput />);
  const input = utils.getByLabelText("number-input");
  return {
    input,
    ...utils,
  };
};

test("Shows 3 digits", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "123" } });
  expect(input.value).toBe("123");
});

test("Shows thousands as 3 digits", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "123456" } });
  expect(input.value).toBe("123K");
  fireEvent.change(input, { target: { value: "12345" } });
  expect(input.value).toBe("12.3K");
  fireEvent.change(input, { target: { value: "1234" } });
  expect(input.value).toBe("1.23K");
});

test("Shows millions as 3 digits", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "1234567" } });
  expect(input.value).toBe("1.23M");
  fireEvent.change(input, { target: { value: "12345678" } });
  expect(input.value).toBe("12.3M");
  fireEvent.change(input, { target: { value: "1234567" } });
  expect(input.value).toBe("1.23M");
});

test("Shows billions as 3 digits", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "1234567891" } });
  expect(input.value).toBe("1.23B");
  fireEvent.change(input, { target: { value: "12345678912" } });
  expect(input.value).toBe("12.3B");
  fireEvent.change(input, { target: { value: "123456789123" } });
  expect(input.value).toBe("123B");
});
