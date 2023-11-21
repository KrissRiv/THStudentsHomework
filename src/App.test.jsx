import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { HttpResponse, http } from "msw";

import App from "./App";
import { constants } from "./utils/constants";
import { server } from "./mocks/server";

describe("App", () => {
  afterEach(cleanup);
  beforeEach(() => render(<App />));

  /**
   * Test for UI Interface
   */
  it("Render correctly", () => {
    const result = render(<App />);
    expect(result).toMatchSnapshot();
  });
  it("Contains heading", () => {
    const heading = screen.getByTestId("title");
    expect(heading.innerHTML).toBe("TH Students Homework");
  });
  it("Contain input search", () => {
    const input = screen.getByTestId("search");
    expect(input).toBeTruthy();
  });
  it("Contain input have focus", () => {
    const input = screen.getByTestId("search");
    expect(input.matches(":focus")).toBe(true);
  });
  it("Contain button", () => {
    const button = screen.getByTestId("go");
    expect(button).toBeTruthy();
  });

  /**
   * Test for API service
   */
  it("Contain Loading message after search action", () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);

    expect(screen.getByText("Loading...")).toBeTruthy();
  });
  it("Contain list collection after search action: First case parent 0", async () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(screen.getByText("Module 15: Acids and Bases")).toBeTruthy();
    expect(screen.getByText("Module 5: Thermochemistry")).toBeTruthy();
    expect(
      screen.getByText(
        "Module 18: Electrochemistry - Practical Applications of Gibbs Free Energy"
      )
    ).toBeTruthy();
  });
  it("Contain child list of the parent: Second case -", async () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(screen.getAllByText(/-/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Homework Assignment: Acids and Bases/i)
    ).toBeTruthy();
    expect(screen.getByText(/Test Bank: Acids and Bases/i)).toBeTruthy();
  });
  it("Contain child list of the parent: Third case --", async () => {
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.click(button);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(screen.getAllByText(/--/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Question 13.2/i)).toBeTruthy();
    expect(screen.getByText(/Question 13.4/i)).toBeTruthy();
  });
  it("Service should to answer error", async () => {
    server.use(
      http.get(constants.API_SERVICE_URL, () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );

    const button = screen.getByRole("button", { name: /Go/i });
    fireEvent.click(button);

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    screen.debug();

    expect(
      screen.getByText(
        "ERROR: Ups! I did it again! Please refresh after 10 seconds"
      )
    ).toBeTruthy();

    server.resetHandlers();
  });

  it("Service should to answer specific data based on search term", async () => {
    server.close();

    const input = screen.getByTestId("search");
    const button = screen.getByRole("button", { name: /Go/i });

    fireEvent.change(input, { target: { value: "math" } });
    expect(input.value).toBe("math");
    fireEvent.click(button);

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

  });
});
