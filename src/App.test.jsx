import { render, screen } from '@testing-library/react'

import App from './App'
import { describe } from 'vitest'

describe("App", () => {
  it('Contains heading', () => {
    render(<App />)
    const heading = screen.getByText("TH Students Homework")
    expect(heading).toBeInTheDocument()
  })
  it("Contain input", () => {
    render(<App />)
    const input = screen.getByTestId("search")
    expect(input).toBeInTheDocument()
  })
});
