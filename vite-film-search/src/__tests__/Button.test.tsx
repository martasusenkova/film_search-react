import "./dom-setup";
import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { describe, it, expect } from "vitest";
import { Button } from "../components/Button/Button";

describe("Button component", () => {
  it("renders text and handles click", () => {
    const handle = vi.fn();
    const { getByText } = render(
      <Button text="Click me" option="primary" onClick={handle} type="button" />,
    );
    const btn = getByText("Click me");
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    expect(handle).toHaveBeenCalled();
  });
});
