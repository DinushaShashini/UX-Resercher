# InternLink Low-Fidelity Wireframes Spec
### Grayscale Blueprint Layouts, Responsive Reflows, and UX Directives

---

## Wireframe Symbols Legend
To interpret the ASCII representations below, refer to this standard UI notation:
```
[  ]        Generic Button / Tab                  [====]      Text Input Field
(  )        Radio Button / Option Selector        [ X ]       Image / Logo Placeholder
[v ]        Dropdown Menu Selector                |---|       Divider Line
[#]         Checkbox                              ====        Placeholder Heading Text
( # )       Avatar / Profile Image Placeholder    ----        Placeholder Body Text
```

---

## 1. Landing Page

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
|  [X] InternLink    [Discover]  [How It Works]  [Skills]               [Log In]  [Register]       |
|--------------------------------------------------------------------------------------------------|
|                                                                                                  |
|                                     ====================                                         |
|                                     Your Next Internship Starts Here                             |
|                                     --------------------------------                             |
|                                     [   Enter Career Target...   ] [Get Started]                 |
|                                                                                                  |
|--------------------------------------------------------------------------------------------------|
|      [ X ] Discover Roles            [ X ] Track Progress            [ X ] Match Your Skills     |
|      --------------------            --------------------            -----------------------     |
|      Filter by visa support,         Organize applications           Upload your resume and      |
|      salary, and location.           in a clean Kanban view.         find skill gaps instantly.  |
|                                                                                                  |
|--------------------------------------------------------------------------------------------------|
|                                  [ Join 10,000+ Students Today ]                                 |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [=] [X] InternLink         [LogIn] |
|-----------------------------------|
|                                   |
| ======= Your Next Internship      |
| ------- Starts Here               |
| [  Enter Career Target...  ]      |
| [      Get Started       ]        |
|                                   |
|-----------------------------------|
| [ X ] Discover Roles              |
| --------------------              |
| [ X ] Track Progress              |
| --------------------              |
| [ X ] Match Your Skills           |
|                                   |
|-----------------------------------|
| [ Join 10,000+ Students Today ]   |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Header:** Sticky top bar. Logo on left, navigation options center, CTAs right.
* **Hero Section:** Single-column layout centered with search field and immediate primary CTA.
* **Mobile Adaptability:** Top navigation collapses into a hamburger menu `[=]`. Search bar stacks vertically. Three-column feature grid reflows to a single-column stack.

---

## 2. Login Page

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
|  [X] InternLink                                                                                  |
|--------------------------------------------------------------------------------------------------|
|                                                                                                  |
|       [ X ] Branding Visual           |           ====================                           |
|       =====================           |           Welcome Back                                   |
|       "Empowering student             |           --------------------                           |
|        careers, one step              |           Email Address                                  |
|        at a time."                    |           [=========================================]    |
|                                       |           Password                                       |
|                                       |           [=========================================]    |
|                                       |           [#] Keep me logged in    [Forgot Password?]    |
|                                       |                                                          |
|                                       |           [              Log In                     ]    |
|                                       |           ----------------- OR -----------------         |
|                                       |           [          Continue with Google           ]    |
|                                       |           [          Continue with University ID    ]    |
|                                       |                                                          |
|                                       |           Don't have an account? [Register]              |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [X] InternLink                    |
|-----------------------------------|
|                                   |
| ======= Welcome Back              |
| -------                           |
| Email Address                     |
| [===============================] |
| Password                          |
| [===============================] |
| [#] Remember   [Forgot Pass?]     |
| [            Log In            ]  |
| ----------- OR -----------        |
| [      Continue with Google    ]  |
| [      Continue with Uni ID    ]  |
|                                   |
| Don't have an account? [Register] |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Desktop Split Layout:** 50/50 split layout. Brand illustration on left (adds visual prestige), form focused on right.
* **Accessibility:** Fields have explicit top labels (not just placeholders) to maintain context for screen readers. Tab index flows logically: Email -> Password -> Remember Me -> Forgot Password -> Log In.

---

## 3. Registration Page

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
|  [X] InternLink                                                                                  |
|--------------------------------------------------------------------------------------------------|
|                                                                                                  |
|                 ( 1 ) Account Setup ------> [ 2 ] Academic Profile ------> [ 3 ] Skills & Resume |
|                                                                                                  |
|                             ====================                                                 |
|                             Create Your Student Account                                          |
|                             --------------------                                                 |
|                             Full Name                                                            |
|                             [======================================]                             |
|                             Email Address                                                        |
|                             [======================================]                             |
|                             Password                                                             |
|                             [======================================]                             |
|                                                                                                  |
|                             [             Next Step              ]                               |
|                             Already have an account? [Log In]                                    |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [X] InternLink                    |
|-----------------------------------|
|  ( 1 ) Step 1 of 3: Account Info  |
|-----------------------------------|
|                                   |
| ======= Create Account            |
| Full Name                         |
| [===============================] |
| Email Address                     |
| [===============================] |
| Password                          |
| [===============================] |
|                                   |
| [           Next Step           ] |
|                                   |
| Already have account? [Log In]    |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Multi-Step Form:** Reduces cognitive overload by dividing questions into 3 clear chunks.
* **Mobile Adaptability:** Desktop step-indicator chain collapses into a simple text banner (`Step 1 of 3`). Button spans full-width for easier thumb tapping.

---

## 4. Dashboard

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
| [X] InternLink | [🔍 Search...]                     ( # ) Arjun Patel [v]                        |
|----------------|---------------------------------------------------------------------------------|
| [🏠 Dash]      |  ====================                                                           |
| [🔍 Search]    |  Good Morning, Arjun                                                            |
| [📋 Tracker]   |                                                                                 |
| [🎯 Skills]    |  +--------------------+  +--------------------+  +--------------------+         |
| [📁 Resumes]   |  | Active Apps: 12    |  | Interviews Set: 3  |  | Skill Match: 84%   |         |
| [👤 Profile]   |  +--------------------+  +--------------------+  +--------------------+         |
|                |                                                                                 |
|                |  =====================                  ====================                    |
|                |  Upcoming Agenda                        Recommended Roles                       |
|                |  ---------------------                  --------------------                    |
|                |  [#] Stripe Coding Test - Due Today     [X] Software Engineer Intern - Microsoft|
|                |  [#] Meta Interview prep - tomorrow     [X] Product Analyst - Salesforce        |
|                |  [#] Review resume draft - Friday       [X] Devops Assistant - AWS              |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [=] InternLink              ( # ) |
|-----------------------------------|
| ======= Good Morning, Arjun       |
|                                   |
| +------+ +------+ +-------------+ |
| |Act:12| |Int: 3| |Match: 84%   | |
| +------+ +------+ +-------------+ |
|                                   |
| ======= Upcoming Agenda           |
| [#] Stripe Coding Test - Today    |
| [#] Meta Interview - Tomorrow     |
|                                   |
| ======= Recommended Roles         |
| [X] SWE Intern - Microsoft        |
|                                   |
|-----------------------------------|
| [🏠]     [🔍]     [📋]     [👤]   |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Desktop Grid:** 2-column sidebar navigation on left; dynamic grid layout on right.
* **Mobile Bottom Bar Navigation:** Persistent bottom tab bar containing the four main functional destinations. Left sidebar elements collapse into top-left hamburger menu `[=]`.

---

## 5. Internship Search

### A. Desktop Wireframe (Split-Pane layout)
```
+--------------------------------------------------------------------------------------------------+
| [X] InternLink | [=============================] [ Filter ]                      ( # ) Arjun [v] |
|----------------|---------------------------------------------------------------------------------|
| [🏠 Dash]      |  124 Jobs Found                           Job Details: Selected Card            |
| [🔍 Search]    |  +------------------------------------+  ====================================   |
| [📋 Tracker]   |  | Software Eng. Intern - Stripe      |  Software Eng. Intern - Stripe          |
| [🎯 Skills]    |  | Seattle, WA • [Paid] • [Visa-Yes]  |  Stripe • Seattle, WA • [Hybrid]        |
| [📁 Resumes]   |  | Match Score: 92%                   |  ------------------------------------   |
| [👤 Profile]   |  +------------------------------------+  Skill Match Score: 92% (High)          |
|                |  | QA Intern - Salesforce             |                                         |
|                |  | SF, CA • [Paid] • [Visa-No]        |  [ Apply Now ]       [ Save to Tracker ]|
|                |  | Match Score: 68%                   |                                         |
|                |  +------------------------------------+  Responsibilities                       |
|                |  | Frontend Intern - Adobe            |  • Write clean code...                  |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [🔍 Search Roles...        ] [Filter] |
|-----------------------------------|
|  124 Jobs Found                   |
|  +------------------------------+ |
|  | Software Eng. Intern         | |
|  | Stripe • [Paid] • [Visa-Yes] | |
|  | Match Score: 92%             | |
|  +------------------------------+ |
|  +------------------------------+ |
|  | QA Intern                    | |
|  | Salesforce • [Paid]          | |
|  | Match Score: 68%             | |
|  +------------------------------+ |
|-----------------------------------|
| [🏠]     [🔍]     [📋]     [👤]   |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Split View:** On desktop, the card list remains on left, details load on right. Prevents page reload latency.
* **Mobile View:** Stacks cards. Clicking a card slides up a bottom-sheet modal detailing the job description.

---

## 6. Internship Details

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
| [Back to Search]                                                                                 |
|--------------------------------------------------------------------------------------------------|
|                                                                                                  |
|     [ X ] Company Logo    ================================================                       |
|                           Senior Software Engineer Intern                                        |
|                           Stripe • Seattle, WA • [Hybrid] • Posted 2 days ago                    |
|                                                                                                  |
|     |--------------------------------------------------------------------------------------|     |
|      [Paid: $45/hr]    [CPT/OPT Supported]    [Duration: 12 Weeks]    [App Deadline: June 30]    |
|     |--------------------------------------------------------------------------------------|     |
|                                                                                                  |
|     [       Apply Now       ]        [ Save to Tracker ]                                         |
|                                                                                                  |
|     [ About the Role ]      [ Qualifications ]      [ Peer Insights & Interview History ]        |
|     ------------------                                                                           |
|     Stripe is looking for university students to join our core API teams.                        |
|     You will build secure, low-latency transaction nodes...                                      |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [< Back]                          |
|-----------------------------------|
|  [ X ] Stripe                     |
|  ====== SWE Intern                |
|  Seattle, WA • Hybrid             |
|                                   |
|  [Paid]  [CPT/OPT]  [12 Weeks]    |
|                                   |
|  [            Apply Now          ]|
|  [        Save to Tracker        ]|
|                                   |
|  [About]  [Qualifications] [Peer] |
|  -------------------------------- |
|  Stripe is looking for university |
|  students to join our core...     |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Header Badges:** A dedicated horizontal strip highlights critical criteria (pay, duration, sponsorship) so users don't have to scan paragraphs.
* **Secondary Navigation:** Segmented tab controls partition the text, optimizing screen layouts.

---

## 7. Application Tracker

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
| [X] InternLink | [📋 Tracker]                                                    ( # ) Arjun [v] |
|----------------|---------------------------------------------------------------------------------|
| [🏠 Dash]      |  [ Kanban Board ]      [ Calendar View ]      [ List View ]                     |
| [🔍 Search]    |  ------------------------------------------------------------------------------ |
| [📋 Tracker]   |  To Apply (3)       Applied (2)       Assessment (1)    Interview (1)   Offer(1)|
| [🎯 Skills]    |  +------------+     +------------+    +------------+    +------------+  +------+ |
| [📁 Resumes]   |  | Google     |     | Stripe     |    | Uber       |    | Robinhood  |  | Apple| |
| [👤 Profile]   |  | SWE Intern |     | SWE Intern |    | Backend    |    | FrontEnd   |  | SWE  | |
|                |  | [Edit]     |     | [Edit]     |    | [Due Today]|    | [Edit]     |  | [Edit| |
|                |  +------------+     +------------+    +------------+    +------------+  +------+ |
|                |  | Roblox     |     | Meta       |                      | Microsoft  |         |
|                |  | UI Designer|     | QA Intern  |                      | [Edit]     |         |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [📋 Tracker]                      |
| [ Kanban Board v]   [ + Add Job ] |
|-----------------------------------|
|                                   |
|  [ To Apply ]  [ Applied ]  [ OA ]|
|  ------------                     |
|  +------------------------------+ |
|  | Google • SWE Intern          | |
|  | Deadline: June 15   [Edit]   | |
|  +------------------------------+ |
|  +------------------------------+ |
|  | Roblox • UI Designer         | |
|  | Deadline: June 20   [Edit]   | |
|  +------------------------------+ |
|                                   |
|-----------------------------------|
| [🏠]     [🔍]     [📋]     [👤]   |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Kanban Drag-and-Drop:** Supported on desktop. Cards show alerts like `[Due Today]` in priority colors.
* **Mobile List Alternative:** Multi-column Kanban reflows on mobile into vertical cards under a horizontal tab switcher (`To Apply`, `Applied`, etc.) or custom dropdown `[ Kanban Board v ]`.

---

## 8. Resume Manager

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
| [X] InternLink | [📁 Resume Manager]                                             ( # ) Arjun [v] |
|----------------|---------------------------------------------------------------------------------|
| [🏠 Dash]      |                                                                                 |
| [🔍 Search]    |  +---------------------------------------------------------------------------+  |
| [📋 Tracker]   |  |                    Drag & Drop Resume PDF or Word Document                 |  |
| [🎯 Skills]    |  |                            [ Select File ]                                |  |
| [📁 Resumes]   |  +---------------------------------------------------------------------------+  |
| [👤 Profile]   |                                                                                 |
|                |  Your Resumes                                                                   |
|                |  +-----------------------------+    +-----------------------------+             |
|                |  | [X] Arjun_SWE_Main.pdf      |    | [X] Arjun_DataScience.pdf   |             |
|                |  | Active • Parsed Successfully|    | Backup • Parsed 1 wk ago    |             |
|                |  | [Set Active] [Scan] [Delete]|    | [Set Active] [Scan] [Delete]|             |
|                |  +-----------------------------+    +-----------------------------+             |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [📁 Resume Manager]               |
|-----------------------------------|
|  +-----------------------------+  |
|  |   Drag & Drop Resume PDF    |  |
|  |       [ Select File ]       |  |
|  +-----------------------------+  |
|                                   |
|  Your Resumes                     |
|  +-----------------------------+  |
|  | [X] Arjun_SWE_Main.pdf      |  |
|  | Active • Parsed             |  |
|  | [Scan]  [Manage]  [Delete]  |  |
|  +-----------------------------+  |
|                                   |
|-----------------------------------|
| [🏠]     [🔍]     [📋]     [👤]   |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **File Dropper:** Large target area for easy drag-and-drop.
* **Active Status:** Clear badge indicator indicating which file is currently active and used for matching logic.

---

## 9. Skill Match Screen

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
| [X] InternLink | [🎯 Skill Matching]                                             ( # ) Arjun [v] |
|----------------|---------------------------------------------------------------------------------|
| [🏠 Dash]      |                                                                                 |
| [🔍 Search]    |  ====================                                                           |
| [📋 Tracker]   |  Employability Score: 84%                                                       |
| [🎯 Skills]    |  ------------------------------------------------------------------------------ |
| [📁 Resumes]   |  Competency Strengths                 Missing Skills / Gaps                     |
| [👤 Profile]   |  • Python (Advanced)                  • SQL (Required by 5 saved jobs)          |
|                |  • Data Structures (Intermediate)     • Docker (Required by 3 saved jobs)       |
|                |  • Git & Github (Advanced)            • AWS (Required by 2 saved jobs)          |
|                |                                                                                 |
|                |  ============================================================================== |
|                |  Recommended Upskilling Courses                                                 |
|                |  [ Learn SQL for Data Analysis ]          [ Intro to Docker & Microservices ]   |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [🎯 Skill Matching]               |
|-----------------------------------|
|  ====== Employability Score: 84%  |
|  -------------------------------- |
|  Competency Strengths             |
|  • Python • Data Struct • Git     |
|                                   |
|  Missing Skills / Gaps            |
|  [ SQL (5 roles) ] [ Docker (3) ] |
|                                   |
|  ====== Recommended Courses       |
|  +-----------------------------+  |
|  | Learn SQL for Data Analysis |  |
|  +-----------------------------+  |
|                                   |
|-----------------------------------|
| [🏠]     [🔍]     [📋]     [👤]   |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Skill Tags:** Missing skills are rendered as button-like chip filters that link directly to matching job listings search pages.

---

## 10. User Profile

### A. Desktop Wireframe
```
+--------------------------------------------------------------------------------------------------+
| [X] InternLink | [👤 Profile]                                                    ( # ) Arjun [v] |
|----------------|---------------------------------------------------------------------------------|
| [🏠 Dash]      |  ( # ) Arjun Patel                                           [ Edit Profile ]   |
| [🔍 Search]    |  University of Texas at Austin • Computer Science major                         |
| [📋 Tracker]   |  ------------------------------------------------------------------------------ |
| [🎯 Skills]    |  Education                                                                      |
| [📁 Resumes]   |  • B.S. in Computer Science (GPA: 3.82)               Graduation Date: May 2027 |
| [👤 Profile]   |  ------------------------------------------------------------------------------ |
|                |  Experience                                                                     |
|                |  • Coding Camp Assistant Instructor                   Summer 2025               |
|                |  ------------------------------------------------------------------------------ |
|                |  Portfolio Projects                                                             |
|                |  • File system Indexer in Rust                        [ github.com/arjun/rust ] |
+--------------------------------------------------------------------------------------------------+
```

### B. Mobile Reflow
```
+-----------------------------------+
| [👤 Profile]                      |
|-----------------------------------|
|  ( # ) Arjun Patel                |
|  UT Austin • CS Major             |
|  [ Edit Profile ]                 |
|                                   |
|  ====== Education                 |
|  B.S. CS (GPA 3.82) • Grad 2027   |
|                                   |
|  ====== Experience                |
|  Coding Camp Assistant • 2025     |
|                                   |
|  ====== Projects                  |
|  File Indexer • Rust              |
|                                   |
|-----------------------------------|
| [🏠]     [🔍]     [📋]     [👤]   |
+-----------------------------------+
```

### C. Anatomy & UX Rules
* **Edit Action:** Prominently positioned, accessible trigger to switch the profile screen to editable fields mode.
* **Layout Structure:** Stacks logically, matching standard resume reading flow (Top: Info -> Education -> Experience -> Projects).

---
*InternLink Wireframe Blueprint Specification — Grayscale Wireframes. All rights reserved.*
