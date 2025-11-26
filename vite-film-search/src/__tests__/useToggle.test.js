import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./dom-setup";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
// Ensure DOM exists for environments where vitest config/setupFiles might not be applied
import { useToggle } from "../hooks/useToggle";
function TestComp() {
    const [on, toggle] = useToggle(false);
    return (_jsxs("div", { children: [_jsx("span", { children: on ? "On" : "Off" }), _jsx("button", { onClick: toggle, children: "Toggle" })] }));
}
describe("useToggle hook", () => {
    it("toggles value", () => {
        const { getByText } = render(_jsx(TestComp, {}));
        const btn = getByText("Toggle");
        expect(getByText("Off")).toBeTruthy();
        fireEvent.click(btn);
        expect(getByText("On")).toBeTruthy();
    });
});
