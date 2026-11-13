import React, { useState } from "react";
import { archiveSources, cafeSales } from "./demoModuleContent";

export const taskTrackerFix = `def completion_rate(tasks):
    if not tasks:
        return 0.0
    completed = sum(1 for task in tasks if task["done"])
    return completed / len(tasks) * 100
`;

export const taskTrackerTests = `import unittest
from task_tracker import completion_rate


class CompletionRateTests(unittest.TestCase):
    def test_empty_list(self):
        self.assertEqual(completion_rate([]), 0)

    def test_partially_complete(self):
        tasks = [{"done": True}, {"done": False}]
        self.assertEqual(completion_rate(tasks), 50)

    def test_fully_complete(self):
        self.assertEqual(completion_rate([{"done": True}]), 100)

    def test_none_complete(self):
        self.assertEqual(completion_rate([{"done": False}]), 0)
`;

function SalesChart() {
  const [chartType, setChartType] = useState("bar");
  const average = promotion => {
    const rows = cafeSales.filter(row => row.promotion === promotion);
    return rows.reduce((total, row) => total + row.revenue, 0) / rows.length;
  };
  const promoted = average(true);
  const regular = average(false);
  const y = revenue => 190 - revenue / 700 * 140;

  return (
    <details className="studio-workbench">
      <summary>Create and critique a sales chart</summary>
      <label htmlFor="sales-chart-type">Chart type</label>
      <select id="sales-chart-type" value={chartType} onChange={event => setChartType(event.target.value)}>
        <option value="bar">Bar chart</option><option value="line">Line chart</option>
      </select>
      <figure>
        <svg viewBox="0 0 420 230" role="img" aria-label={`${chartType === "bar" ? "Bar" : "Line"} chart of weekly cafe revenue in dollars, starting at zero`}>
          <text x="40" y="24">Revenue ($)</text>
          {[0, 350, 700].map(value => <g key={value}><line className="studio-chart-grid" x1="40" x2="390" y1={y(value)} y2={y(value)} /><text x="32" y={y(value) + 4} textAnchor="end">{value}</text></g>)}
          {chartType === "line" && <polyline className="studio-chart-line" points={cafeSales.map((row, index) => `${70 + index * 90},${y(row.revenue)}`).join(" ")} />}
          {cafeSales.map((row, index) => {
            const x = 70 + index * 90;
            return <g key={row.week}>
              {chartType === "bar" ? <rect className="studio-chart-mark" x={x - 24} y={y(row.revenue)} width="48" height={190 - y(row.revenue)} /> : <circle className="studio-chart-mark" cx={x} cy={y(row.revenue)} r="5" />}
              <text x={x} y={y(row.revenue) - 10} textAnchor="middle">${row.revenue}</text>
              <text x={x} y="212" textAnchor="middle">Week {row.week}</text>
            </g>;
          })}
        </svg>
        <figcaption>Fictional weekly revenue, not profit. The source table also lists drinks sold and promotion weeks.</figcaption>
      </figure>
      <p>Promotion average: (${cafeSales.filter(row => row.promotion).map(row => row.revenue).join(" + $")}) / 2 = ${promoted}. Non-promotion average: ${regular}. Revenue was {((promoted - regular) / regular * 100).toFixed(1)}% higher in this sample.</p>
      <p><strong>Your critique:</strong> Does either chart prove causation? What costs and comparison data are missing? Record your reasoning in chat, not a claim that the promotion increased profit.</p>
    </details>
  );
}

function EnergySimulation() {
  const [hours, setHours] = useState(4);
  const [efficiency, setEfficiency] = useState(0.75);
  const energy = time => 200 * time * efficiency;
  return (
    <details className="studio-workbench">
      <summary>Explore the energy simulation</summary>
      <p>This browser model uses the supplied formula: 200 W x full-sun hours x efficiency factor. Predict the result before changing an assumption.</p>
      <label htmlFor="simulation-hours">Full-sun hours: {hours}</label>
      <input id="simulation-hours" type="range" min="0" max="8" step="1" value={hours} onChange={event => setHours(Number(event.target.value))} />
      <label htmlFor="simulation-efficiency">Efficiency factor: {efficiency.toFixed(2)}</label>
      <input id="simulation-efficiency" type="range" min="0.5" max="1" step="0.05" value={efficiency} onChange={event => setEfficiency(Number(event.target.value))} />
      <p><output aria-label="Modelled daily energy" aria-live="polite">{energy(hours).toFixed(0)} Wh per day ({(energy(hours) / 1000).toFixed(2)} kWh)</output></p>
      <table>
        <caption>Comparison at the selected efficiency factor</caption>
        <thead><tr><th scope="col">Full-sun hours</th><th scope="col">Daily energy (Wh)</th></tr></thead>
        <tbody>{[2, 4, 6].map(time => <tr key={time}><th scope="row">{time}</th><td>{energy(time).toFixed(0)}</td></tr>)}</tbody>
      </table>
      <p>Weather, shading, storage and seasonal changes are omitted. This is a classroom simulation, not a performance guarantee or equipment-design advice.</p>
      <p>Controls reset when you switch modules. Record the assumptions, results and your interpretation in chat to keep them in your portfolio draft.</p>
    </details>
  );
}

function SourceTimeline() {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const matches = archiveSources.filter(source => [`Source ${source.id}`, source.name, source.published, source.event, source.title, source.excerpt].join(" ").toLowerCase().includes(search));
  return (
    <details className="studio-workbench">
      <summary>Search and verify the timeline</summary>
      <p>Only the three supplied fictional excerpts are approved for this exercise. These are prepared reference entries, not AI-generated historical findings.</p>
      <label htmlFor="timeline-search">Search events, dates or sources</label>
      <input id="timeline-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try proposal, 1999 or newsletter" />
      <p aria-live="polite">{matches.length} of {archiveSources.length} entries shown. The 1999 recollection conflicts with the June 2000 report; filtering does not resolve that conflict.</p>
      {!matches.length && <p>No matching entries. Try a different event, date or source.</p>}
      <ol className="studio-timeline">
        {matches.map(source => <li key={source.id}>
          <strong>{source.event}: {source.title}</strong>
          <p>Source {source.id}: {source.name}. Source publication date: {source.published}.</p>
          <blockquote>{source.excerpt}</blockquote>
          <p>{source.uncertain ? "Uncertain recollection, not a verified opening date." : source.id === "A" ? "Proposal approval is not the library opening." : "A report of first visitors, not evidence for an exact opening day."} Check the entry against the excerpt and record what still needs verification.</p>
        </li>)}
      </ol>
    </details>
  );
}

export default function SubjectWorkbench({ moduleId }) {
  if (moduleId === "business") return <SalesChart />;
  if (moduleId === "engineering") return <EnergySimulation />;
  if (moduleId === "humanities") return <SourceTimeline />;
  if (moduleId === "programming") return (
    <details className="studio-workbench">
      <summary>Compare the reference fix and tests</summary>
      <p>Explain the bug and write your own fix and tests before opening this reference. These are prepared examples; this browser does not execute Python or check your code.</p>
      <p>Save the fix as <code>task_tracker.py</code>:</p><pre>{taskTrackerFix}</pre>
      <p>Save the tests beside it as <code>test_task_tracker.py</code>:</p><pre>{taskTrackerTests}</pre>
      <p>Run <code>python -m unittest -v</code> in that folder. Record actual results in chat; if you have not run them, describe testing as planned.</p>
    </details>
  );
  if (moduleId === "collaboration") return (
    <details className="studio-workbench">
      <summary>Draft issues and review a pull request</summary>
      <p>These are unpublished examples, not real GitHub issues or completed team contributions. Confirm owners with your team.</p>
      <ol className="studio-timeline">
        <li><strong>Issue draft 1: check the evidence</strong><p>Proposed owner: researcher. Done when each claim cites the fictional source, evidence gaps are documented and unsupported waste figures are removed.</p></li>
        <li><strong>Issue draft 2: prepare the proposal and slides</strong><p>Proposed owner: designer, with the team. Depends on the evidence check. Done when the one-page proposal and three slides meet the brief and have readable text and accessible visuals.</p></li>
        <li><strong>Issue draft 3: review and rehearse</strong><p>Proposed owner: presenter, with a teammate reviewing. Depends on the draft materials. Done when the review is addressed and a rehearsal is scheduled before the seven-day deadline.</p></li>
      </ol>
      <p><strong>Pull-request exercise:</strong> Draft a proposed-change summary in chat: which task it addresses, who contributed, what changed and what a teammate should check. A teammate should review the evidence, accessibility and acceptance criteria before agreeing it is ready.</p>
      <p>To do this in GitHub, create the agreed issues, make changes on a branch and open a pull request referencing those issues. Ask a teammate to review the diff and address their comments. This demo does not connect to GitHub or publish anything.</p>
    </details>
  );
  return null;
}
