import { render, fireEvent } from "@testing-library/react";
import App from "./App";

const setup = () => {
  const utils = render(<App />);
  const firstInput = utils.getByLabelText("first-input");
  const secondInput = utils.getByLabelText("second-input");
  const thirdInput = utils.getByLabelText("third-input");
  const resultInput = utils.getByLabelText("results-input");
  return {
    firstInput,
    secondInput,
    thirdInput,
    resultInput,
    ...utils,
  };
};

test("Sums numbers", () => {
  const { firstInput, secondInput, thirdInput, resultInput } = setup();
  fireEvent.change(firstInput, { target: { value: "1" } });
  fireEvent.change(secondInput, { target: { value: "2" } });
  fireEvent.change(thirdInput, { target: { value: "3" } });
  expect(resultInput.value).toBe("6");
});

test("Sums big numbers and show correctly", () => {
  const { firstInput, secondInput, thirdInput, resultInput } = setup();
  fireEvent.change(firstInput, { target: { value: "1234" } });
  fireEvent.change(secondInput, { target: { value: "1234" } });
  fireEvent.change(thirdInput, { target: { value: "1234" } });
  expect(resultInput.value).toBe("3.70K");
});

test("Sums bigger numbers and show correctly", () => {
  const { firstInput, secondInput, thirdInput, resultInput } = setup();
  fireEvent.change(firstInput, { target: { value: "123456" } });
  fireEvent.change(secondInput, { target: { value: "723456" } });
  fireEvent.change(thirdInput, { target: { value: "423456" } });
  expect(resultInput.value).toBe("1.27M");
});

test("Sums biggest numbers and show correctly", () => {
  const { firstInput, secondInput, thirdInput, resultInput } = setup();
  fireEvent.change(firstInput, { target: { value: "1234567891" } });
  fireEvent.change(secondInput, { target: { value: "12345678912" } });
  fireEvent.change(thirdInput, { target: { value: "123456789123" } });
  expect(resultInput.value).toBe("137B");
});

test("Results input starts with 0", () => {
  const { resultInput } = setup();
  expect(resultInput.value).toBe("0");
});

test("Sums even if some inputs are empty", () => {
  const { firstInput, secondInput, thirdInput, resultInput } = setup();
  fireEvent.change(firstInput, { target: { value: "1" } });
  expect(resultInput.value).toBe("1");
  fireEvent.change(thirdInput, { target: { value: "3" } });
  expect(resultInput.value).toBe("4");
  fireEvent.change(secondInput, { target: { value: "2" } });
  expect(resultInput.value).toBe("6");
});
