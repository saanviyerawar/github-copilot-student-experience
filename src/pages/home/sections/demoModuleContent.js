export const cafeSales = [
  { week: 1, drinks: 100, revenue: 500, promotion: false },
  { week: 2, drinks: 120, revenue: 600, promotion: true },
  { week: 3, drinks: 90, revenue: 450, promotion: false },
  { week: 4, drinks: 130, revenue: 650, promotion: true }
];

export const archiveSources = [
  { id: "A", name: "Council minutes", published: "12 March 1998", event: "12 March 1998", title: "Library proposal approved", excerpt: "The council approved a proposal for a community library.", uncertain: false },
  { id: "C", name: "Volunteer interview", published: "2010", event: "1999 (uncertain recollection)", title: "Recalled opening date", excerpt: "I remember the library opening in 1999, but I may have the year wrong.", uncertain: true },
  { id: "B", name: "Local newsletter", published: "7 June 2000", event: "June 2000", title: "First visitors reported", excerpt: "The library welcomed its first visitors this week.", uncertain: false }
];

export const studentModules = [
  {
    id: "study-plan",
    group: "student",
    subject: "Study planner",
    title: "Plan my study week",
    duration: "4 minutes",
    outcome: "Find room for deadlines, focused study and a realistic buffer.",
    setup: "Let's plan a fictional week together. Nothing here reads or changes a real calendar.",
    source: "Fictional week\nAvailable study time: Monday 2 hours, Tuesday 1 hour, Wednesday 1 hour, Thursday 1 hour.\nReading: 1 hour, due Tuesday evening.\nEssay outline: 2 hours, due Friday morning.\nPresentation rehearsal: 1 hour, due Thursday morning.\nKeep 1 hour as a catch-up buffer. Classes and breaks are already excluded from the available time.",
    steps: ["Count the available hours and identify which deadline comes first."],
    questions: [
      "How would you split the reading, essay outline and rehearsal across these four days, keeping one hour free as a buffer?",
      "If Tuesday's hour disappeared, what would you move or reduce? Explain the trade-off rather than adding time you do not have.",
      "What would you check before using this plan? Label this as a proposed schedule, not work you have already completed."
    ],
    responseNotes: [
      "Planning reference: there are five available hours. One workable option is reading + one outline hour on Monday, the other outline hour on Tuesday, rehearsal on Wednesday, and a Thursday buffer. This is a fixed example, not a check of your answer.",
      "Trade-off reference: losing Tuesday means using the buffer or changing scope. Do not schedule the rehearsal after its Thursday-morning deadline.",
      "A plan is not a completion record. Check real commitments and course deadlines separately before adapting this fictional example."
    ],
    draftLabels: ["My proposed study plan", "My contingency and trade-off", "Checks before using the plan"],
    challenge: "A fictional AI draft schedules the rehearsal for Thursday evening and fills all five hours. Is that a workable plan?",
    answer: "No. Rehearsal is due Thursday morning, and the brief asks for a one-hour buffer. Check both timing and total hours, not just whether every task appears.",
    extension: "Optionally track the agreed tasks as GitHub issues. A document or paper planner works just as well for this activity."
  },
  {
    id: "lecture-notes",
    group: "student",
    subject: "Lecture companion",
    title: "Make sense of my notes",
    duration: "4 minutes",
    outcome: "Turn a short lecture extract into an explanation you can remember.",
    setup: "Use the invented lecture extract below. No slides or files are uploaded, and no school account is connected.",
    source: "Fictional lecture extract: feedback loops\nA system changes in response to its output.\nNegative feedback counteracts a change: a thermostat switches heating off as temperature rises above a target.\nPositive feedback amplifies a change: a microphone picks up its own speaker output and the sound grows.\nPositive and negative describe the direction of feedback, not whether the result is good or bad.",
    steps: ["Read the extract once, then try explaining the two feedback types without looking."],
    questions: [
      "In your own words, how does negative feedback differ from positive feedback? Use the thermostat or microphone example.",
      "Write two revision questions from the extract and give your own short answers. Keep them grounded in these notes.",
      "Which part would you ask a tutor to clarify, and how would you check your summary against the original extract?"
    ],
    responseNotes: [
      "Reference from the extract: negative feedback counteracts a change; positive feedback amplifies it. These names do not mean bad and good. Compare this with your explanation yourself.",
      "Review prompt: can each revision answer be traced to a sentence or example in the extract? No extra scientific claims are needed.",
      "Keep a genuine question open rather than inventing certainty. These notes are fictional and are not a substitute for your course materials."
    ],
    draftLabels: ["My explanation of the lecture", "My revision questions and answers", "My open question and source checks"],
    challenge: "A fictional AI summary says: 'Positive feedback is always beneficial; negative feedback is harmful.'",
    answer: "The extract uses positive and negative to describe amplification or counteraction. Neither label alone tells you whether a feedback loop is beneficial or harmful.",
    extension: "Optionally save the reviewed notes in a private repository. Do not upload course slides or copyrighted materials without permission."
  },
  {
    id: "assignment-plan",
    group: "student",
    subject: "Assignment coach",
    title: "Break down an assignment",
    duration: "5 minutes",
    outcome: "Go from an overwhelming brief to manageable next steps.",
    setup: "We will plan an assignment, not write a submission for you. This fictional brief is safe to use in the demo.",
    source: "Fictional assignment brief\nPrepare a 600-word proposal for a campus book-swap event, due in seven days.\nInclude: purpose, intended audience, a practical event plan, and a way to evaluate it.\nConstraints: no real survey collection or personal data; do not invent attendance or environmental impact results.\nDeliverable for this demo: a planning outline only, not a completed assessed proposal.",
    steps: ["Identify the required sections before deciding what to write."],
    questions: [
      "What headings and small tasks would you use to cover the required proposal sections? Make an outline rather than writing the proposal.",
      "How would you sequence those tasks over seven days and leave time to review the plan?",
      "Which claims would need evidence or tutor clarification? Explain how you would avoid inventing results."
    ],
    responseNotes: [
      "Brief checklist: purpose, audience, practical plan and evaluation method. Check your outline covers all four, without turning this into a completed submission.",
      "Planning reference: understand the brief first, outline next, then review feasibility and evidence. Keep review time before the deadline.",
      "Proposed evaluation is different from measured success. Do not present future attendance, savings or impact as results you already achieved."
    ],
    draftLabels: ["My assignment outline and tasks", "My proposed sequence and review time", "My evidence gaps and integrity checks"],
    challenge: "A fictional AI draft says: 'The event attracted 200 students and saved 100 kg of waste.' The event has not happened.",
    answer: "Those are invented outcomes. Remove them. You can propose a future measurement method without claiming that results already exist.",
    extension: "Optionally turn the outline into GitHub task cards. You do not need a repository to finish your planning activity."
  },
  {
    id: "revision",
    group: "student",
    subject: "Revision practice",
    title: "Quiz me, one question at a time",
    duration: "4 minutes",
    outcome: "Practise recall, compare reference answers and find your next revision gap.",
    setup: "This is a three-question practice quiz, not an assessed test. Fixed reference notes appear after each answer; they do not grade your response.",
    source: "Fictional revision sheet: interpreting evidence\nRevenue is money received from sales. Profit subtracts costs from revenue.\nCorrelation describes an association. It does not by itself establish cause and effect.\nA small observational sample can suggest questions but does not prove that an intervention worked.",
    steps: ["Read the revision sheet, close it and try answering from memory."],
    questions: [
      "Question 1 of 3: a campus cafe reports $600 in sales, but no costs. Can you work out its profit? Explain your reasoning.",
      "Question 2 of 3: sales were higher during two promotion weeks. Does that prove the promotion caused the increase? Why or why not?",
      "Question 3 of 3: what extra evidence would you want before recommending the promotion? Say which concept you would revise next."
    ],
    responseNotes: [
      "Reference answer: you cannot calculate profit without costs. $600 is revenue, not necessarily profit. Compare your reasoning; no grade has been assigned.",
      "Reference answer: no. Other factors may have changed, and two promotion weeks are a small observational sample. Association is not proof of cause.",
      "Reference direction: seek cost information, a broader sample and an appropriate comparison before making a causal or profit claim. Your next revision gap is for you to identify."
    ],
    draftLabels: ["My revenue-versus-profit answer", "My correlation-versus-causation answer", "My evidence needs and next revision goal"],
    challenge: "A fictional AI tutor says: 'You answered three questions, so you have mastered data analysis.'",
    answer: "Completing this practice quiz is not evidence of mastery or a verified qualification. Review your reasoning against the reference notes and identify what still needs practice.",
    extension: "Optionally keep your own practice questions in a repository. Never publish protected exam questions or answer keys."
  },
  {
    id: "business",
    subject: "Business/economics",
    title: "Make sense of a campus cafe",
    duration: "5 minutes",
    outcome: "Analyse sample sales data, create charts and critically assess the findings.",
    setup: "Read the sample table below. No spreadsheet, coding or GitHub experience is needed.",
    source: `Fictional cafe sales (revenue, not profit)\nWeek | Drinks sold | Revenue ($) | Promotion\n${cafeSales.map(row => `${row.week} | ${row.drinks} | ${row.revenue} | ${row.promotion ? "Yes" : "No"}`).join("\n")}`,
    prompt: "I am a business student with no coding experience. Using only the fictional cafe table below, compare average weekly revenue for promotion and non-promotion weeks. Show the arithmetic in plain language. Help me create a labelled revenue chart and critically assess what it does and does not show. Suggest one next investigation and explain why this table cannot establish that the promotion caused a change. Do not invent costs or profit.\n\n",
    steps: ["Create bar and line views below, then check every plotted value against the four source rows.", "Compare promotion and non-promotion averages; use Copilot separately if you want further guidance.", "Critically assess the chart and write a recommendation with a limitation and an evidence gap."],
    challenge: "A fictional AI draft says: 'The promotion increased profit by 39% and proves we should run it every week.' What needs correcting?",
    answer: "Average revenue is $625 with a promotion and $475 without: about 31.6% higher. Costs are missing, so profit is unknown. Four observational weeks do not establish causation.",
    checks: ["I checked the averages against the four rows.", "I distinguished revenue from profit and correlation from causation."],
    extension: "Save the table in a repository (a project folder with change history). Ask Copilot in your editor to create a chart, then check its labels and calculations before sharing.",
    reflection: "What would you recommend investigating before spending money on another promotion?"
  },
  {
    id: "humanities",
    subject: "Humanities",
    title: "Create a searchable timeline",
    duration: "5 minutes",
    outcome: "Create a searchable timeline from approved sources and verify the outputs.",
    setup: "Use only these invented excerpts. They are practice sources, not historical evidence.",
    source: `Fictional town archive\n${archiveSources.map(source => `Source ${source.id}: ${source.name}, ${source.published}: '${source.excerpt}'`).join("\n")}`,
    prompt: "I am a humanities student. Build a short timeline using only the fictional excerpts below. Cite Source A, B or C for each entry. Separate approval from opening, flag conflicting dates, and distinguish the source publication date from the event date. Do not invent quotations or resolve uncertainty without evidence. Ask me one question about source reliability.\n\n",
    steps: ["Search the timeline below by event, date or source, then verify each entry against its excerpt.", "Keep approval separate from opening and the source publication date separate from the event date.", "Preserve the conflicting dates and explain which source you would investigate next. Only these fictional excerpts are approved for this exercise."],
    challenge: "A fictional AI draft says: 'The library opened on 12 March 1998 [Source A].' Is the citation enough to make this reliable?",
    answer: "No. Source A records approval of a proposal, not an opening. Source B reports first visitors in June 2000; Source C recalls 1999 with explicit uncertainty. Preserve the conflict rather than inventing an exact opening date.",
    checks: ["I matched each event to the actual words in its source.", "I kept conflicting dates visible instead of inventing certainty."],
    extension: "Store the reviewed timeline in a repository. Use a pull request (a proposed change for someone to review) to let a classmate check the source references.",
    reflection: "Which source would you investigate next, and why?"
  },
  {
    id: "engineering",
    subject: "Science/engineering",
    title: "Build and explore a simulation",
    duration: "5 minutes",
    outcome: "Build a simulation and explore how changing assumptions affects the results.",
    setup: "Start with arithmetic, not code. This is a simplified classroom example, not equipment-design advice.",
    source: "Fictional solar-panel exercise\nRated power: 200 watts\nEquivalent full-sun time: 4 hours per day\nAssumed overall efficiency factor: 0.75\nModel: daily energy (Wh) = rated power (W) x full-sun hours (h) x efficiency factor\nCompare 2, 4 and 6 full-sun hours. Ignore storage and seasonal variation.",
    prompt: "I am learning to evaluate models, with no programming background. Use the fictional solar-panel exercise below. Explain each unit, calculate daily energy for 2, 4 and 6 equivalent full-sun hours, and state the assumptions. Ask me to predict the effect of doubling the hours before explaining it. Distinguish watts from watt-hours. Do not present this as a real-world performance guarantee.\n\n",
    steps: ["Use the browser simulation below to test the supplied formula; predict before changing the controls.", "Compare 2, 4 and 6 full-sun hours, then vary the efficiency assumption. Check the 4-hour case by hand.", "Explain the changed results and omitted factors. Optionally use Copilot to build your own version from the checked formula."],
    challenge: "A fictional AI draft says: 'At four hours, the panel generates 600 W per day, guaranteed.' What is wrong?",
    answer: "200 W x 4 h x 0.75 = 600 Wh, or 0.6 kWh, of modelled daily energy. Watts measure power, not daily energy. Weather, shading and the simplified assumptions prevent a guarantee.",
    checks: ["I checked the result and the energy units.", "I explained an assumption and why the model is not a guarantee."],
    extension: "Ask Copilot in an editor to build a small simulation from the checked formula. Store it in GitHub and add tests for zero hours and the three sample cases.",
    reflection: "Which omitted factor would you add to improve the model?"
  },
  {
    id: "programming",
    subject: "Computer science",
    title: "Debug a Python project",
    duration: "6 minutes",
    outcome: "Debug a Python project, explain the fix and add tests.",
    setup: "This module introduces Python. You can reason through it in chat first; running code requires a Python environment.",
    source: 'Fictional task tracker (Python)\ndef completion_rate(tasks):\n    completed = sum(1 for task in tasks if task["done"])\n    return completed / len(tasks) * 100\n\nprint(completion_rate([]))\n\nExpected behaviour: an empty task list has a completion rate of 0%. All tasks have a boolean "done" field.',
    prompt: "I am learning Python. Review the fictional task-tracker example below. Give me one hint about why the empty-list case fails, then wait for my explanation before suggesting a fix. Keep the specified empty-list behaviour. Later, help me test empty, partially complete and fully complete lists. Explain the change rather than replacing the whole program.\n\n",
    steps: ["Read the starter code, explain the division-by-zero bug and propose the smallest fix.", "Write tests for empty, partially complete and fully complete lists, then compare the reference fix and tests below.", "Apply the fix in a Python environment and run the tests. This browser does not execute Python or verify your results."],
    challenge: "A fictional AI draft recommends returning 100% whenever the task list is empty. Does avoiding the crash mean the fix is correct?",
    answer: "No. The brief explicitly defines the empty-list result as 0%. Guard against the zero denominator and return 0 for that case. Two tasks with one complete should give 50%; all complete should give 100%.",
    checks: ["I explained the division-by-zero bug and preserved the required behaviour.", "I ran empty, partially complete and fully complete cases in Python."],
    extension: "Commit the small fix (save a named checkpoint) and open a pull request showing the bug, expected behaviour and test results. Review Copilot's suggestions before accepting them.",
    reflection: "Why is a fix that stops a crash not necessarily a correct fix?"
  },
  {
    id: "collaboration",
    subject: "Group assignments",
    title: "Get my group project moving",
    duration: "5 minutes",
    outcome: "Break a brief into GitHub issues, collaborate through pull requests and review contributions.",
    setup: "Practise with issue drafts and a proposed-change review below. An issue is a task card; a pull request is a proposed change. No GitHub account is needed here, and nothing is published.",
    source: "Fictional assignment brief\nA team of three has seven days to propose a campus food-waste campaign.\nDeliverables: a one-page proposal and a three-slide presentation.\nEvidence: the supplied fictional cafe table from the business module; no claim that it measures food waste.\nConstraints: no personal data, no real survey collection and no invented impact statistics.\nTeam roles: researcher, designer, presenter. Agree responsibilities rather than assuming consent.",
    prompt: "Help our student team break the fictional brief below into GitHub issue drafts. Explain issues as task cards and pull requests as proposed changes. For each task, suggest a title, proposed owner, dependencies and acceptance criteria. Propose a pull-request summary linking the tasks and a review checklist covering evidence, accessibility and individual contributions. Ask us to confirm responsibilities. Do not publish anything or invent survey results, deadlines beyond the seven-day brief, or environmental impact figures.\n\n",
    steps: ["Break the brief into task cards with proposed owners, dependencies and acceptance criteria.", "Draft a pull-request summary for the proposal and slides, linking the relevant tasks and describing each contribution.", "Review a teammate's proposed change for evidence, accessibility and the agreed definition of done. Use GitHub separately only if the team chooses."],
    challenge: "A fictional AI draft says: 'Claim the campaign will reduce food waste by 40%, based on the cafe sales table.' Should the team use this?",
    answer: "No. The sales table does not measure waste or campaign outcomes. Remove the unsupported figure and propose a future measurement approach without claiming results or collecting real data in this demo.",
    checks: ["The team agreed responsibilities and a review before rehearsal.", "I removed unsupported impact claims and protected personal data."],
    extension: "Transfer agreed tasks into GitHub issues (task cards). Use a pull request to review the proposal together. A presenter can demonstrate this while beginners stay with the plain-language plan.",
    reflection: "What would your team check before calling the proposal finished?"
  },
  {
    id: "careers",
    subject: "Careers/portfolio",
    title: "Build my student portfolio",
    duration: "5 minutes",
    outcome: "Turn completed projects into portfolio entries showing skills, contributions and learning outcomes.",
    setup: "Use the fictional reflection below, or your reviewed notes from another module. Do not paste a real CV or student record.",
    source: "Fictional student reflection\nProject: campus cafe analysis, a practice exercise.\nMy contribution: calculated average revenue and checked a misleading promotion claim.\nTools: a small sample table and Copilot Chat.\nLearning: revenue is not profit; correlation is not causation.\nLimits: fictional data from four weeks; no real client or measured business impact.",
    prompt: "Help me turn the fictional reflection below into a short portfolio entry. Cover the project's purpose, skills demonstrated, my own contribution, checks and learning outcomes. Keep it explicitly a practice project using fictional data. Do not invent employers, grades, qualifications, metrics or links. Ask me to explain one claim before including it. Suggest an evidence item I could create, not a claim that it already exists.\n\n",
    steps: ["Choose a completed practice project and identify the skills you demonstrated and what you personally contributed.", "Use the chat to record your contribution, learning outcomes, limitations and evidence; remove unsupported claims.", "Review and edit your draft, then choose Add to my portfolio. Build entries across modules and download the reviewed collection; publishing is optional."],
    challenge: "A fictional AI draft says: 'I consulted for a campus business and increased revenue by 32%.' Is this an acceptable summary?",
    answer: "No. This was a fictional practice analysis, not a client engagement or intervention. Describe calculating and checking average revenue, identifying limitations and learning to evaluate AI output.",
    checks: ["Every claim matches the student's stated contribution.", "I labelled the practice data and avoided invented achievements."],
    extension: "With permission, add the reviewed paragraph to the existing portfolio source. Review the change before publishing to GitHub Pages; never publish restricted assessment solutions.",
    reflection: "What evidence could you create to support this learning claim?"
  }
];
