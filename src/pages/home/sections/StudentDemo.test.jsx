import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ModeContext } from "../../../contexts/ModeProvider";
import WorkExperience from "./WorkExperience";
import Projects from "./Projects";
import Contact from "./Contact";

function renderDemo(component) {
  return render(
    <ModeContext.Provider value={{ mode: "dark" }}>
      {component}
    </ModeContext.Provider>
  );
}

test("shows exactly four fictional internships at Company A-D", () => {
  const { container } = renderDemo(<WorkExperience />);
  const experience = container.querySelector("#work-experience");
  expect(experience.querySelectorAll(".clickable")).toHaveLength(4);
  expect(within(experience).getAllByText("Software intern")).toHaveLength(4);
  for (const company of ["Company A", "Company B", "Company C", "Company D"]) {
    expect(within(experience).getByText(company)).toBeInTheDocument();
  }
  expect(experience).toHaveTextContent("fictional demo examples");
  expect(experience.querySelectorAll("img")).toHaveLength(0);
});

test("selects different companies even when their internship titles match", () => {
  const { container } = renderDemo(<WorkExperience />);
  const cards = container.querySelectorAll("#work-experience .clickable");
  fireEvent.click(cards[0]);
  expect(cards[0]).toHaveClass("border-4");
  expect(cards[1]).not.toHaveClass("border-4");
  fireEvent.click(cards[1]);
  expect(cards[0]).not.toHaveClass("border-4");
  expect(cards[1]).toHaveClass("border-4");
  fireEvent.click(cards[1]);
  expect(cards[1]).not.toHaveClass("border-4");
});

test("shows four fictional course projects without the original branded projects", () => {
  const { container } = renderDemo(<Projects />);
  const projects = container.querySelector("#projects");
  expect(projects.querySelectorAll(".aspect-square")).toHaveLength(4);
  for (const code of ["CS1101", "CS2101", "CS2201", "CS3101"]) {
    expect(within(projects).getAllByText(`${code} project`)).toHaveLength(2);
  }
  expect(projects).toHaveTextContent("fictional examples");
  expect(projects.querySelectorAll('img[src*="-Project"]')).toHaveLength(0);
});

test("contact icons are clickable buttons without navigation or outgoing links", () => {
  const { container } = renderDemo(<Contact />);
  const originalURL = window.location.href;
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  try {
    for (const name of ["LinkedIn", "Gmail", "GitHub"]) {
      const button = screen.getByRole("button", { name: `${name} demo (no navigation)` });
      expect(button).toHaveAttribute("type", "button");
      expect(button).not.toHaveAttribute("formAction");
      fireEvent.click(button);
    }
    expect(container.querySelectorAll("#contact button")).toHaveLength(3);
    expect(container.querySelectorAll("a[href]")).toHaveLength(0);
    expect(window.location.href).toBe(originalURL);
    expect(open).not.toHaveBeenCalled();
  } finally {
    open.mockRestore();
  }
});
