import React from "react";

const paths = {
  spark: "m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z",
  home: "m3 10 9-7 9 7M5 9v12h5v-6h4v6h5V9",
  book: "M12 5c-3-2-7-2-10-1v16c3-1 7-1 10 1m0-16c3-2 7-2 10-1v16c-3-1-7-1-10 1V5Z",
  portfolio: "M4 5h16v16H4V5Zm4 0V2h8v3M4 10h16M9 10v3h6v-3",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  send: "m12 19 0-14m-6 6 6-6 6 6",
  close: "m6 6 12 12M6 18 18 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  chart: "M4 3v18h17M8 16v-5m5 5V7m5 9V4",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z",
  sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
  team: "M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3m14-7a4 4 0 0 1 6 4v3M13 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm4-4a4 4 0 0 1 0 8",
  check: "m5 12 4 4L19 6",
  download: "M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4",
  chat: "M21 11a8 8 0 0 1-8 8H5l-4 3V11a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8Z",
  calendar: "M4 5h16v16H4V5ZM8 2v6m8-6v6M4 10h16M8 14h2m4 0h2m-8 3h2",
  notes: "M5 3h14v18H5V3Zm4 5h6m-6 4h6m-6 4h4",
  quiz: "M9 8a3 3 0 0 1 6 0c0 2-3 2-3 5m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
};

export default function StudioIcon({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.spark} /></svg>;
}
