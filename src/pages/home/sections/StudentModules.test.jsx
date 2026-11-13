import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import StudentModules from "./StudentModules";

const storageKey = "student-studio-v1";

function renderStudio() {
  const result = render(<MemoryRouter><StudentModules /></MemoryRouter>);
  if (screen.queryByRole("heading", { name: "What are we working on today?" })) {
    fireEvent.click(screen.getByRole("button", { name: "Business/economics" }));
  }
  return result;
}

function respond(text) {
  fireEvent.change(screen.getByLabelText("Your response"), { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: "Send" }));
}

function finishConversation() {
  respond("I compared the four weekly revenue figures.");
  respond("I learned that revenue is not profit; the sample is small.");
  respond("I checked both averages by hand. A chart is only planned.");
}

beforeEach(() => localStorage.clear());
afterEach(() => jest.restoreAllMocks());

test("starts with suggestion cards and opens the portfolio only on request", () => {
  render(<MemoryRouter><StudentModules /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "What are we working on today?" })).toBeInTheDocument();
  expect(within(screen.getByRole("tabpanel")).getAllByRole("button")).toHaveLength(6);
  expect(screen.queryByRole("complementary", { name: "My portfolio" })).not.toBeInTheDocument();
  fireEvent.keyDown(screen.getByLabelText("Your response"), { key: "Enter" });
  expect(JSON.parse(localStorage.getItem(storageKey)).sessions).toEqual({});
  for (const name of ["Computer science", "Business/economics", "Science/engineering", "Humanities", "Group assignments", "Careers/portfolio"]) {
    expect(within(screen.getByRole("tabpanel")).getByRole("button", { name: `Start ${name}` })).toBeInTheDocument();
  }
  fireEvent.click(screen.getByRole("tab", { name: /Study essentials/ }));
  expect(within(screen.getByRole("tabpanel")).getAllByRole("button")).toHaveLength(4);
  fireEvent.click(screen.getByRole("tab", { name: /Coursework to career/ }));
  fireEvent.click(screen.getByRole("button", { name: "Start Humanities" }));
  expect(screen.getByRole("heading", { name: "Create a searchable timeline" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "What are we working on today?" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Toggle portfolio" }));
  expect(screen.getByRole("complementary", { name: "My portfolio" })).toHaveFocus();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("complementary", { name: "My portfolio" })).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Toggle portfolio" })).toHaveFocus();
});

test("supports keyboard category switching without losing an unfinished subject conversation", () => {
  renderStudio();
  respond("My existing subject work.");
  fireEvent.click(screen.getByRole("button", { name: /Explore activities/ }));
  fireEvent.keyDown(screen.getByRole("tab", { name: /Coursework to career/ }), { key: "ArrowRight" });
  expect(screen.getByRole("tab", { name: /Study essentials/ })).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tab", { name: /Study essentials/ })).toHaveFocus();
  fireEvent.keyDown(screen.getByRole("tab", { name: /Study essentials/ }), { key: "Home" });
  expect(screen.getByRole("tab", { name: /Coursework to career/ })).toHaveAttribute("aria-selected", "true");
  fireEvent.click(screen.getByRole("button", { name: "Start Business/economics" }));
  expect(screen.getByText("My existing subject work.")).toBeInTheDocument();
});

test.each([
  ["Study planner", "My proposed study plan", "How would you split", "there are five available hours"],
  ["Lecture companion", "My explanation of the lecture", "how does negative feedback", "negative feedback counteracts"],
  ["Assignment coach", "My assignment outline and tasks", "What headings and small tasks", "purpose, audience, practical plan"],
  ["Revision practice", "My revenue-versus-profit answer", "Question 1 of 3", "cannot calculate profit without costs"]
])("%s uses its own guided exercise and preserves a module-specific portfolio draft", (name, label, question, reference) => {
  render(<MemoryRouter><StudentModules /></MemoryRouter>);
  fireEvent.click(screen.getByRole("tab", { name: /Study essentials/ }));
  fireEvent.click(screen.getByRole("button", { name: `Start ${name}` }));
  expect(screen.getByRole("log")).toHaveTextContent(question);
  respond("My first practice response.");
  expect(screen.getByRole("log")).toHaveTextContent(reference);
  expect(screen.getByRole("log")).toHaveTextContent("not an evaluation");
  respond("My second practice response.");
  respond("My own evidence checks and next steps.");
  const draft = screen.getByLabelText("Edit your portfolio entry");
  expect(draft.value).toContain(`${label}: My first practice response.`);
  fireEvent.click(screen.getByRole("button", { name: "Add to my portfolio" }));
  expect(screen.getByRole("complementary", { name: "My portfolio" })).toHaveTextContent(label);
  expect(screen.getByRole("complementary", { name: "My portfolio" })).toHaveTextContent("not independently verified");
});

test("sends on Enter but keeps Shift+Enter and IME composition from submitting", () => {
  renderStudio();
  const input = screen.getByLabelText("Your response");
  fireEvent.change(input, { target: { value: "I checked the averages." } });
  fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
  fireEvent.keyDown(input, { key: "Enter", isComposing: true });
  expect(JSON.parse(localStorage.getItem(storageKey)).sessions.business.answers).toEqual([]);
  fireEvent.keyDown(input, { key: "Enter" });
  expect(JSON.parse(localStorage.getItem(storageKey)).sessions.business.answers).toEqual(["I checked the averages."]);
});

test("turns student responses into a reviewed, editable portfolio entry without inventing claims", () => {
  renderStudio();
  expect(screen.getByText("Guided demo / no live AI")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "Toggle portfolio" }));
  expect(screen.getByRole("button", { name: "Download portfolio" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "Close portfolio" }));
  finishConversation();
  const draft = screen.getByLabelText("Edit your portfolio entry");
  expect(draft.value).toContain("I compared the four weekly revenue figures.");
  expect(draft.value).toContain("A chart is only planned.");
  fireEvent.click(screen.getByRole("button", { name: "Toggle portfolio" }));
  const preview = screen.getByRole("complementary", { name: "My portfolio" });
  expect(within(preview).queryByRole("article")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close portfolio" }));
  fireEvent.change(draft, { target: { value: "My reviewed practice analysis. No measured business impact." } });
  fireEvent.click(screen.getByRole("button", { name: "Add to my portfolio" }));
  const updatedPreview = screen.getByRole("complementary", { name: "My portfolio" });
  expect(within(updatedPreview).getByText("My reviewed practice analysis. No measured business impact.")).toBeInTheDocument();
  fireEvent.change(draft, { target: { value: "Updated, with clearer limitations." } });
  fireEvent.click(screen.getByRole("button", { name: "Update portfolio entry" }));
  expect(within(updatedPreview).getAllByRole("article")).toHaveLength(1);
  expect(within(updatedPreview).getByText("Updated, with clearer limitations.")).toBeInTheDocument();
});

test("keeps conversations and unsent messages across subject switches and reloads", () => {
  const view = renderStudio();
  respond("My business contribution.");
  fireEvent.change(screen.getByLabelText("Your response"), { target: { value: "My unfinished thought" } });
  fireEvent.click(screen.getByRole("button", { name: "Humanities" }));
  expect(screen.getByLabelText("Your response")).toHaveValue("");
  respond("I noticed conflicting source dates.");
  fireEvent.click(screen.getByRole("button", { name: "Business/economics" }));
  expect(screen.getByLabelText("Your response")).toHaveValue("My unfinished thought");
  view.unmount();
  renderStudio();
  expect(screen.getByText("My business contribution.")).toBeInTheDocument();
  expect(screen.getByLabelText("Your response")).toHaveValue("My unfinished thought");
});

test("restores portfolio entries, removes them without deleting drafts and confirms reset", () => {
  const view = renderStudio();
  finishConversation();
  fireEvent.click(screen.getByRole("button", { name: "Add to my portfolio" }));
  view.unmount();
  renderStudio();
  fireEvent.click(screen.getByRole("button", { name: "Toggle portfolio" }));
  const preview = screen.getByRole("complementary", { name: "My portfolio" });
  expect(within(preview).getAllByRole("article")).toHaveLength(1);
  fireEvent.click(screen.getByRole("button", { name: /Remove Make sense/ }));
  expect(screen.getByLabelText("Edit your portfolio entry").value).toContain("weekly revenue");
  fireEvent.click(screen.getByRole("button", { name: "Start a fresh workspace" }));
  fireEvent.click(screen.getByRole("button", { name: "Keep my work" }));
  expect(screen.getByLabelText("Edit your portfolio entry")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Start a fresh workspace" }));
  fireEvent.click(screen.getByRole("button", { name: "Clear my workspace" }));
  expect(screen.queryByLabelText("Edit your portfolio entry")).not.toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(storageKey)).sessions).toEqual({});
});

test("preserves corrupt browser data until the user explicitly replaces it", () => {
  localStorage.setItem(storageKey, "{broken");
  renderStudio();
  expect(screen.getByRole("alert")).toHaveTextContent("has not been overwritten");
  respond("I can still work without saving.");
  expect(localStorage.getItem(storageKey)).toBe("{broken");
  fireEvent.click(screen.getByRole("button", { name: "Replace unreadable saved copy with this workspace" }));
  expect(JSON.parse(localStorage.getItem(storageKey)).sessions.business.answers).toEqual(["I can still work without saving."]);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("surfaces browser storage failures without claiming that the draft was saved", () => {
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Quota exceeded"); });
  renderStudio();
  respond("My work is still available on screen.");
  expect(screen.getByRole("alert")).toHaveTextContent("Browser saving failed");
  expect(screen.getByText("My work is still available on screen.")).toBeInTheDocument();
  expect(screen.queryByText(/Saved in this browser only/)).not.toBeInTheDocument();
});

test("downloads only reviewed entries rather than unfinished chat or unpublished claims", () => {
  const originalCreate = URL.createObjectURL;
  const originalRevoke = URL.revokeObjectURL;
  URL.createObjectURL = jest.fn().mockReturnValue("blob:portfolio");
  URL.revokeObjectURL = jest.fn();
  jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
  jest.useFakeTimers();
  try {
    renderStudio();
    finishConversation();
    fireEvent.change(screen.getByLabelText("Edit your portfolio entry"), { target: { value: "Reviewed fictional analysis." } });
    fireEvent.click(screen.getByRole("button", { name: "Add to my portfolio" }));
    fireEvent.click(screen.getByRole("button", { name: "Download portfolio" }));
    const blob = URL.createObjectURL.mock.calls[0][0];
    expect(blob.type).toBe("text/markdown;charset=utf-8");
    const reader = new FileReader();
    const read = new Promise(resolve => { reader.onload = () => resolve(reader.result); });
    reader.readAsText(blob);
    jest.runOnlyPendingTimers();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:portfolio");
    expect(screen.getByRole("status")).toHaveTextContent("Nothing has been published");
    return read.then(text => {
      expect(text).toContain("Reviewed fictional analysis.");
      expect(text).not.toContain("four weekly revenue");
    });
  } finally {
    jest.useRealTimers();
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
  }
});

test("switches chart types while preserving revenue values and a critical comparison", () => {
  renderStudio();
  fireEvent.click(screen.getByText("Create and critique a sales chart"));
  const chart = screen.getByRole("img", { name: /Bar chart of weekly cafe revenue/ });
  expect(chart.querySelectorAll("rect")).toHaveLength(4);
  for (const value of ["$500", "$600", "$450", "$650"]) {
    expect(within(chart).getByText(value)).toBeInTheDocument();
  }
  expect(screen.getByText(/Promotion average:/)).toHaveTextContent("$625. Non-promotion average: $475");
  expect(screen.getByText(/Promotion average:/)).toHaveTextContent("31.6%");
  fireEvent.change(screen.getByLabelText("Chart type"), { target: { value: "line" } });
  const lineChart = screen.getByRole("img", { name: /Line chart of weekly cafe revenue/ });
  expect(lineChart.querySelectorAll("circle")).toHaveLength(4);
  expect(lineChart.querySelector("polyline")).toHaveAttribute("points", "70,90 160,70 250,100 340,60");
  expect(screen.getByText(/Does either chart prove causation/)).toBeInTheDocument();
});

test("recalculates the simulation and comparison table when assumptions change, including zero hours", () => {
  renderStudio();
  fireEvent.click(screen.getByRole("button", { name: "Science/engineering" }));
  fireEvent.click(screen.getByText("Explore the energy simulation"));
  expect(screen.getByLabelText("Modelled daily energy")).toHaveTextContent("600 Wh per day (0.60 kWh)");
  expect(screen.getByRole("row", { name: "2 300" })).toBeInTheDocument();
  expect(screen.getByRole("row", { name: "4 600" })).toBeInTheDocument();
  expect(screen.getByRole("row", { name: "6 900" })).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Full-sun hours:/), { target: { value: "8" } });
  expect(screen.getByLabelText("Modelled daily energy")).toHaveTextContent("1200 Wh");
  fireEvent.change(screen.getByLabelText(/Efficiency factor:/), { target: { value: "0.5" } });
  expect(screen.getByLabelText("Modelled daily energy")).toHaveTextContent("800 Wh");
  expect(screen.getByRole("row", { name: "4 400" })).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Full-sun hours:/), { target: { value: "0" } });
  expect(screen.getByLabelText("Modelled daily energy")).toHaveTextContent("0 Wh per day (0.00 kWh)");
});

test("searches only the supplied timeline sources while retaining dates and uncertainty", () => {
  renderStudio();
  fireEvent.click(screen.getByRole("button", { name: "Humanities" }));
  fireEvent.click(screen.getByText("Search and verify the timeline"));
  const timeline = screen.getByRole("list");
  expect(within(timeline).getAllByRole("listitem")).toHaveLength(3);
  fireEvent.change(screen.getByLabelText("Search events, dates or sources"), { target: { value: "  1999  " } });
  expect(within(timeline).getAllByRole("listitem")).toHaveLength(1);
  expect(timeline).toHaveTextContent("Source C: Volunteer interview. Source publication date: 2010");
  expect(timeline).toHaveTextContent("not a verified opening date");
  fireEvent.change(screen.getByLabelText("Search events, dates or sources"), { target: { value: "source a" } });
  expect(within(timeline).getAllByRole("listitem")).toHaveLength(1);
  expect(timeline).toHaveTextContent("Library proposal approved");
  fireEvent.change(screen.getByLabelText("Search events, dates or sources"), { target: { value: "NEWSLETTER" } });
  expect(timeline).toHaveTextContent("June 2000: First visitors reported");
  expect(timeline).toHaveTextContent("Source B");
  fireEvent.change(screen.getByLabelText("Search events, dates or sources"), { target: { value: "unsupported event" } });
  expect(within(timeline).queryByRole("listitem")).not.toBeInTheDocument();
  expect(screen.getByText(/No matching entries/)).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Search events, dates or sources"), { target: { value: "" } });
  expect(within(timeline).getAllByRole("listitem")).toHaveLength(3);
});

test("retains saved module IDs and student-authored casing when module labels change", () => {
  const draft = "My QA reflection with GitHub Copilot, Python and SQL.";
  localStorage.setItem(storageKey, JSON.stringify({
    selectedId: "business",
    sessions: { business: { answers: ["My original contribution."], draft, input: "Keep My Words" } },
    entries: [{ id: "business", title: "My Original Title", text: draft }]
  }));
  renderStudio();
  expect(screen.getByText("My original contribution.")).toBeInTheDocument();
  expect(screen.getByLabelText("Your response")).toHaveValue("Keep My Words");
  fireEvent.click(screen.getByRole("button", { name: "Toggle portfolio" }));
  expect(screen.getByText("My Original Title")).toBeInTheDocument();
  expect(screen.getByText(draft)).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(storageKey)).sessions.business.draft).toBe(draft);
});
