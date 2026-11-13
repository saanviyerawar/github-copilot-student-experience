# GitHub Copilot student experience

**A university customer demonstration: turn student coursework into a living CV
with GitHub Copilot and GitHub Pages.**

The website preserves the original portfolio's mountain hero, parallax
effects, day/evening themes, navigation, experience cards and project grid.
The original portfolio design is retained at `#/portfolio`. Hash-based routes
allow both views to refresh on static GitHub Pages without a server fallback.
The main screen is
now **Student studio**, a separate chat-led workspace, not a long portfolio page
with every module embedded in it.

## Beginner-first demo modules

Open the site's root URL for **Student studio**. The welcome screen offers the six
**Coursework to career** modules below, plus a **Study essentials** tab with four
daily study activities, a compact navigation sidebar and a bottom chat composer.
Select a card to start a focused conversation; **Explore activities**
returns to the welcome screen without deleting work. Saved conversations resume
after refresh. No GitHub knowledge is assumed.

The portfolio is an on-demand panel opened from **Portfolio**, rather than a
permanent empty third column. On narrower screens it becomes a side sheet and
navigation collapses into a menu. Escape closes the portfolio. The layout takes
inspiration from the assistant-first welcome screen and suggestion cards in the
[OpenScout browser demo](https://peterxing.github.io/openscout/); this is an
independent implementation, not an OpenScout integration. It does not implement
OpenScout's Microsoft 365 connection, authentication or live agent backend.

The new planner, lecture, assignment and revision modules each have three
task-specific questions and clearly labelled fixed reference notes. These notes
are examples, not automated feedback or grades. Students propose a schedule,
explain a lecture, outline a brief or answer practice questions, rather than
receiving a completed assessed submission. Existing subject conversations still
ask about contribution and skills, learning/limitations and evidence.
A deterministic template organises those responses into an editable
draft; it does not invent or verify claims. Students review the draft and choose
**Add to my portfolio**, which opens the portfolio panel. They can update or remove entries and download the
reviewed portfolio as Markdown. Each subject has its own conversation and draft.
Fictional source material and a mistake-spotting activity are available within
the conversation, rather than displayed as a long worksheet.

| Module | Beginner activity | Optional GitHub extension |
| --- | --- | --- |
| Study planner | Propose a realistic week, handle a lost study slot and check deadlines. | Track agreed tasks as issues. |
| Lecture companion | Explain feedback loops, create revision questions and identify an uncertainty. | Keep reviewed notes privately, with permission. |
| Assignment coach | Break a book-swap proposal brief into tasks, review time and evidence checks. | Create task cards from the outline. |
| Revision practice | Answer three evidence-literacy questions and compare fixed reference notes. No grading. | Keep permitted practice questions in a repository. |
| Computer science | Debug a Python project, explain the fix and add tests. Compare a reference fix and four `unittest` cases; run them in a separate Python environment. | Save the fix and review it in a pull request. |
| Business/economics | Analyse sample sales data, create bar and line charts and critically assess the findings. | Save and review the chart in a project repository. |
| Science/engineering | Explore a browser simulation, vary full-sun hours and efficiency, and explain how changing assumptions affects the results. | Build your own simulation from the checked formula and add tests. |
| Humanities | Search a timeline using only the exercise-approved fictional sources; verify entries, citations and conflicting dates. | Review source references through a proposed change. |
| Group assignments | Break a brief into issue drafts, practise a pull-request summary and review individual contributions. | Create the agreed GitHub issues and collaborate through real pull requests. |
| Careers/portfolio | Turn completed practice projects into portfolio entries showing skills, contributions and learning outcomes. | Add reviewed content to the portfolio site. |

The default cards cover coursework, group assignments and careers. Study
essentials cover planning, lectures, assignment prep and revision.
No real timetable, school files, calendar,
grades or Microsoft 365 data are fetched or changed. Planner outputs are
proposals, not completed tasks; quiz completion is not a qualification.

For a general university audience, demonstrate **study planner > lecture
companion > careers**, or use the assignment/group-work flow. Use the Coursework
to career tab for the six discipline, collaboration and portfolio modules, and
choose the programming activity only when appropriate for the audience.
The beginner activities use plain-language chat, arithmetic or a document;
only the programming module needs Python to run its final checks.

This is explicitly a **guided demo, not live AI**. Responses are scripted
questions, not open-ended model answers. The page does not call an AI service,
sign users in, run Python or publish content. A presenter can optionally show
real GitHub Copilot separately with authorised access; do not promise student
entitlements or portray the scripted chat as live Copilot.

The chart, simulation and timeline search are working browser interactions over
fixed fictional data, not live model output. Python fixes/tests, issue drafts and
review guidance are prepared references, not executed or published work.
Simulation controls, chart selection and timeline search reset when switching
modules; record findings and assumptions in chat to retain them in a draft.
Interface copy uses sentence case, preserving proper nouns and acronyms.
Student-authored text and previously saved titles are never recased.

Conversations, unsent responses, drafts and portfolio entries persist in
`localStorage` under `student-studio-v1`, on this browser and origin only.
Storage failures are surfaced; unreadable saved data is not overwritten without
an explicit choice. Export a copy before clearing browser data or changing
device. **Start a fresh workspace** requires confirmation. Nothing is published
or sent to an AI service. Use fictional material and no personal records on
shared demo devices. The example portfolio is separate and is not modified by
the student's private draft.

## What this demo shows

Students can present coursework, technical skills and experience in a
shareable portfolio, maintain the source in GitHub and use Copilot to help
make reviewed changes. **Copilot helps author the site; GitHub Pages hosts
the static build.** The website itself is not a live Copilot chat or an AI
agent, and it has no Microsoft 365 connection.

| University audience | Conversation to lead with |
| --- | --- |
| Careers and employability teams | Show project evidence alongside a traditional CV, rather than only listing skills. |
| Lecturers and course leads | Explain a project's purpose, approach and learning outcomes without publishing restricted coursework solutions. |
| Student engagement teams | Give students a practical portfolio-building activity they can keep updating. |
| IT and digital learning teams | Discuss repository access, account boundaries, public content and institutional policies. |

This is a fictional example, not a claim about a real student's employment,
enrolment, grades or achievements.

## Demo content

| Section | Example content |
| --- | --- |
| Introduction | A generic student interested in technology and building projects. |
| Experience | Exactly four Software intern roles at Company A, B, C and D, with illustrative responsibilities. |
| Projects | CS1101: programming; CS2101: web development; CS2201: databases; CS3101: data analysis. Course codes and descriptions are fictional. |
| Contact | Clickable LinkedIn, Gmail and GitHub demo buttons. They contain no links, do not send messages and do not navigate. |

Identifying portraits, employer logos and project screenshots are not
rendered. Generic labels occupy the original card areas.

## Before meeting a university customer

1. Prepare the local site and the repository in a code editor with Copilot
   signed in. Verify the account you intend to use before screen sharing.
2. Run the checks below and open the site. Check Student studio's chat, draft
   review and portfolio export. For the original walkthrough below, choose
   **Example portfolio**, then check the Map menu, day/evening toggle, four
   internship cards, project details and inert contact buttons.
3. Keep the site and editor in separate tabs or windows. Close personal
   account pages, notifications, private repositories and unrelated files.
4. Choose one small live edit and rehearse it. Use fictional content only;
   never paste a student's CV, grades, email or institutional data into the demo.
5. If showing a public URL, verify the deployed page contains the current
   Company A-D and CS1101-style examples. A renamed repository or successful
   local build does not mean the latest version is deployed.

### Local setup

Requires Node.js 22 or newer, npm and Git. Copilot is needed for the live
authoring segment, but not to view or run the website.

```powershell
git clone https://github.com/saanviyerawar/github-copilot-student-experience.git
Set-Location .\github-copilot-student-experience
npm ci
npm test -- --watchAll=false --runInBand
npm start
```

If already cloned, use the existing checkout rather than cloning it again.
Open `http://localhost:3000/github-copilot-student-experience/`.
For a different port, set `$env:PORT='3100'` before `npm start` and use that port.
Install dependencies and build before the meeting, not during the presentation.

## Seven-minute customer walkthrough

| Time | Show | Suggested talk track |
| --- | --- | --- |
| 0:00-0:45 | Mountain hero and introduction | "Imagine a student turning their coursework into a CV that grows with what they build. All identities and examples here are fictional." |
| 0:45-1:30 | Map menu and day/evening toggle | "This is a normal website. Students can customise the presentation while keeping their work in a version-controlled repository." |
| 1:30-2:15 | Four experience cards | "A student can explain their contribution, not just name an employer. Company A-D are placeholders, not actual internship claims." Click different cards to show selection; on mobile, close the details dialog before moving on. |
| 2:15-3:15 | CS1101-CS3101 project cards | "Coursework can demonstrate programming, web development, databases and analysis." Hover over a card to reveal its description and point out the skill tags. |
| 3:15-5:15 | Editor, Copilot and local preview | Use the small-edit prompt below. Review the proposed diff, run the checks and show the updated local page. "Copilot assists; the student remains responsible for accuracy and understanding." |
| 5:15-6:15 | Git diff and publishing steps | "Reviewed changes can be committed and published to the same Pages URL. This connects authoring, source control and a shareable output." Only deploy if agreed in advance. |
| 6:15-7:00 | Contact buttons and discussion | Click the demo icons to show that they do not leave the page. Ask which student cohort or employability activity would benefit from a portfolio workshop. |

**Close with:** "The outcome is not just a website generated by AI. It is a
student-owned portfolio, backed by source control, with reviewed evidence of
what they have learned."

### Live Copilot prompt: one small, safe edit

Use this in Copilot Chat with the repository open:

```text
In src/pages/home/sections/Projects.jsx, update only the CS1101 project
description to explain this fictional task tracker more clearly:
1. Its purpose: organise a student's study tasks.
2. Its approach: Python functions, loops and basic data structures.
3. Its learning outcome: input validation and testing common cases.

Keep the existing layout, animations, themes, project count and skill tags.
Keep all content fictional. Do not add names, grades, metrics, links,
dependencies or claims about real coursework. Show me the diff for review.
```

Review the change before accepting it. Ask the presenter/student to explain
the code, then run:

```powershell
npm test -- --watchAll=false --runInBand
npm run build
git --no-pager diff --check
git --no-pager diff -- src/pages/home/sections/Projects.jsx
```

The local development server refreshes the preview. It does **not** update
GitHub Pages until a separate deployment succeeds.

### Optional discussion prompt

```text
Review this fictional student portfolio. Suggest how to explain a course
project's purpose, contribution and learning outcomes more clearly.
Do not edit files yet. Do not invent qualifications, dates, grades,
employment, impact metrics or public evidence links.
```

If Copilot or sign-in is unavailable, show the prepared local site and the
source file, explain the proposed edit and continue the walkthrough. Clearly
describe this as a fallback, not a successful live Copilot interaction.

## Publish to GitHub Pages

Publishing changes public content. Review the wording, assets and repository
permissions first. Save reviewed source changes in a commit and push them
through your agreed Git workflow; deployment publishes the build separately.

```powershell
npm run deploy
```

The existing `predeploy` script runs `npm run build` automatically, then
`gh-pages` publishes `build/` to the `gh-pages` branch. In repository
**Settings > Pages**, choose **Deploy from a branch**, `gh-pages` and `/ (root)`.

The configured destination is:
<https://saanviyerawar.github.io/github-copilot-student-experience/>

Wait for the Pages deployment to complete and check the URL in a fresh browser
tab. Verify the title, Company A-D cards, all four course projects and contact
buttons; do not rely on an older open tab or assume a successful push is a
successful Pages deployment.

If using a different repository name, update both `homepage` in `package.json`
and the router `basename` in `src/index.js`, then rebuild. A user/organisation
root Pages site uses `/` instead of a project-repository subpath.

## Privacy, accounts and university guardrails

- **Presentation anonymity is not account anonymity.** The GitHub owner,
  commit history and original files identify the source portfolio. Original
  image files remain in `public/` and are copied into the build even though
  the page does not display them. Do not describe this repository as fully
  de-identified. For strict anonymity, prepare a separately reviewed clean
  repository and asset set before sharing it.
- **Keep the demo fictional.** Replace examples with verified information
  only when creating a real CV. Never use real student records in a customer
  demonstration.
- **Respect assessment and copyright rules.** Check course policy before
  publishing assignment code, solutions, marking material, group work or
  third-party content. A project summary can be shown without its solution.
- **Use the authorised account.** An EMU Copilot identity and a personal
  GitHub identity are separate. A shared email does not grant publishing
  access or permission to move institutional code into a personal repository.
- **Do not promise entitlements.** Confirm current Copilot eligibility,
  licensing, organisation policies and Pages availability for the customer's
  intended accounts. The static demo does not validate any of those.
- **Do not claim accessibility certification or production readiness.**
  This preserves an existing React portfolio. Project detail overlays are
  hover-based; assess keyboard, touch and assistive-technology access before
  adopting it as an institutional template.

Useful references: [GitHub Pages documentation](https://docs.github.com/en/pages),
[GitHub Copilot documentation](https://docs.github.com/en/copilot) and
[GitHub Education](https://education.github.com/).

## Presenter recovery and handoff

| Situation | Action |
| --- | --- |
| Local page does not open | Confirm `npm start` is running and use the repository subpath and correct port shown above. |
| Images or scripts fail on Pages | Check `homepage`, router basename and the deployed `gh-pages` content; rebuild after path changes. |
| Public page shows old content | Check the deployment result and refresh in a new tab; use the local preview until the current version is verified. |
| Copilot cannot access the repository | Confirm the intended identity and organisation policy. Do not bypass restrictions by copying private code to another account. |
| A contact icon appears inactive | Expected: it is deliberately a non-navigating demo button. |

Content is in `src/pages/home/sections/Introduction.jsx`, `WorkExperience.jsx`,
`Projects.jsx` and `Contact.jsx`. Regression checks are in
`src/pages/home/sections/StudentDemo.test.jsx`.

After the session, keep only approved edits. For a workshop, agree the audience,
approved hosting/account model, coursework-sharing rules and a process for
students to review their own content before publication.
