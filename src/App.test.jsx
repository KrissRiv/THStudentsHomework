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
  it("Contain Loading message after search action", () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("Contain list collection after search action: First case parent 0", async () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))

    expect(screen.getByText("Module 15: Acids and Bases")).toBeInTheDocument();
    expect(screen.getByText("Module 5: Thermochemistry")).toBeInTheDocument();
    expect(screen.getByText("Module 18: Electrochemistry - Practical Applications of Gibbs Free Energy")).toBeInTheDocument();

  });
  it("Contain child list of the parent: Second case -", async () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))

    expect(screen.getAllByText(/-/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Homework Assignment: Acids and Bases/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Bank: Acids and Bases/i)).toBeInTheDocument();

  });
  it("Contain child list of the parent: Third case --", async () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))

    expect(screen.getAllByText(/--/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Question 13.2/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 13.4/i)).toBeInTheDocument();

  });
 
});
