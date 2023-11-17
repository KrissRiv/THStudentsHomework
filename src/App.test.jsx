import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import App from "./App";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("App", () => {
  afterEach(cleanup);
  beforeEach(() => render(<App />));
  /**
   * Test for UI Interface
   */
  it("Contains heading", () => {
    const heading = screen.getByText("TH Students Homework");
    expect(heading).toBeInTheDocument();
  });
  it("Contain input search", () => {
    const input = screen.getByTestId("search");
    expect(input).toBeInTheDocument();
  });
  it("Contain input have focus", () => {
    const input = screen.getByTestId("search");
    expect(input.matches(":focus")).toBe(true);
  });
  it("Contain button", () => {
    const button = screen.getByTestId("go");
    expect(button).toBeInTheDocument();
  });

  /**
   * Test for API service
   */
  it("Contain Loading message after search action", async () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
