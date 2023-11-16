import { fireEvent, render, screen } from '@testing-library/react'
import { describe } from 'vitest'

import App from './App'

describe("App", () => {
  it('Contains heading', () => {
    render(<App />)
    const heading = screen.getByText("TH Students Homework")
    expect(heading).toBeInTheDocument()
  })
  it("Contain input search", () => {
    render(<App />)
    const input = screen.getByTestId("search")
    expect(input).toBeInTheDocument()
  })
  it("Contain input have focus", () => {
    render(<App />)
    const input = screen.getByTestId("search")
    expect(input.matches(':focus')).toBe(true)
  })
  it("Contain list collection after search action", () => {
    const mockValue = "search term";

    render(<App />)
    const button = screen.getByTestId("go")
    const input = screen.getByTestId("search")

    fireEvent.change(input, { target: { value: mockValue } });
    fireEvent.click(button)

    const courses = screen.getByTestId("courses-collection");

    expect(courses).toBeInTheDocument();
  })
  it("Contain button", () => {
    render(<App />)
    const button = screen.getByTestId("go")
    expect(button).toBeInTheDocument()
  })
});
