import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

const mockData = [
 {
   id: 1,
   name: "First class",
   parent_id: 1,
 },
 {
   id: 2,
   name: "Second class",
   parent_id: 1,
 },
 {
   id: 3,
   name: "Other class",
   parent_id: 2,
 },
];

const server = setupServer(
 http.get("/service-courses", (request, params, cookies) => {
   return HttpResponse.json(mockData);
 })
);

describe("App", () => {
  it("Contains heading", () => {
    render(<App />);
    const heading = screen.getByText("TH Students Homework");
    expect(heading).toBeInTheDocument();
  });
  it("Contain input search", () => {
    render(<App />);
    const input = screen.getByTestId("search");
    expect(input).toBeInTheDocument();
  });
  it("Contain input have focus", () => {
    render(<App />);
    const input = screen.getByTestId("search");
    expect(input.matches(":focus")).toBe(true);
  });
  it("Contain list collection after search action", () => {
    const mockValue = "search term";
 
    render(<App url={"/service-courses"} />);
    const button = screen.getByTestId("go");
    const input = screen.getByTestId("search");
 
    fireEvent.change(input, { target: { value: mockValue } });
    fireEvent.click(button);
 
    waitFor(() => {
      const courses = screen.getByTestId("courses-collection");
      expect(courses).toBeInTheDocument();
    });
  });
  it("Contain list collection after search action when press enter key", () => {
    const mockValue = "search term";
 
    render(<App url={"/service-courses"} />);
    const button = screen.getByTestId("go");
    const input = screen.getByTestId("search");
 
    fireEvent.change(input, { target: { value: mockValue } });
    fireEvent.keyUp(input, { key: "Enter", keyCode: 13 });
    
    waitFor(() => {
      const courses = screen.getByTestId("courses-collection");
      expect(courses).toBeInTheDocument();
    });
  });
  it("Contain button", () => {
    render(<App />);
    const button = screen.getByTestId("go");
    expect(button).toBeInTheDocument();
  });
 
  it("Call API service for courses", async () => {
    server.listen();

    render(<App url={"/service-courses"} />);
    const button = screen.getByTestId("go");
    fireEvent.click(button);
 
    waitFor(() => {
      expect(screen.getAllByTestId("course").length).toBe(mockData.length);
    });
   
    server.resetHandlers()
    server.close();
  });
 }); 
