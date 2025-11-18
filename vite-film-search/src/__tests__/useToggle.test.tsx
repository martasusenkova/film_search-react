import "./dom-setup";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
// Ensure DOM exists for environments where vitest config/setupFiles might not be applied
import { useToggle } from "../hooks/useToggle";

function TestComp() {
  const [on, toggle] = useToggle(false);
  return (
    <div>
      <span>{on ? "On" : "Off"}</span>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

describe("useToggle hook", () => {
  it("toggles value", () => {
    const { getByText } = render(<TestComp />);
    const btn = getByText("Toggle");
    expect(getByText("Off")).toBeTruthy();
    fireEvent.click(btn);
    expect(getByText("On")).toBeTruthy();
  });
});
