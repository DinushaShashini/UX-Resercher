# InternLink — Information Architecture

**Document Type:** Information Architecture & Navigation Design  
**Product:** InternLink (Mobile & Web Application)  
**Prepared by:** Senior UX Research Team  
**Date:** June 2026  
**Version:** 1.0  
**Status:** Approved for Design Handoff

---

## Table of Contents

1. [IA Overview](#1-ia-overview)
2. [Site Map](#2-site-map)
3. [Navigation Structure](#3-navigation-structure)
4. [User Flow Diagrams](#4-user-flow-diagrams)
5. [Feature Hierarchy](#5-feature-hierarchy)
6. [Content Inventory](#6-content-inventory)
7. [IA Principles & Design Decisions](#7-ia-principles--design-decisions)

---

## 1. IA Overview

### Purpose

This document defines the structural foundation of InternLink — how content is organized, how users navigate between sections, and how features relate to each other. It serves as the authoritative reference for UI design, development, and content strategy.

### Scope

- Web Application (Desktop + Tablet)
- Mobile Application (iOS + Android)
- All V1 MVP features

### IA Approach

InternLink's IA is organized around **three core mental models** students bring to the product:

| Mental Model | Corresponding Section | Principle |
|---|---|---|
| *"I'm searching for opportunities"* | Internship Search | Discovery-first, filtered, low friction |
| *"I'm managing my applications"* | Application Tracker | Pipeline visibility, status clarity |
| *"I'm preparing myself"* | Skills & Resume | Guided, supportive, actionable |

The fourth implicit model — *"I want to know what's happening"* — is served by the Dashboard (unified at-a-glance view) and Notifications (real-time updates).

---

## 2. Site Map

### 2.1 Complete Site Map

```
InternLink
│
├── 🔓 PUBLIC (Pre-authentication)
│   ├── Landing Page
│   │   ├── Value proposition & features overview
│   │   ├── Student testimonials
│   │   ├── "Get started in 5 minutes" CTA
│   │   └── Platform screenshots / demo
│   │
│   ├── Sign Up
│   │   ├── Email / University Email
│   │   ├── Google OAuth
│   │   ├── Apple Sign In (mobile)
│   │   └── → Onboarding Wizard
│   │
│   ├── Log In
│   │   ├── Email + Password
│   │   ├── Google / Apple
│   │   └── Forgot Password → Reset Flow
│   │
│   └── Onboarding Wizard (first-time only)
│       ├── Step 1: Basic Info (Name, University, Major, Year)
│       ├── Step 2: Career Interests (Industries, Role Types)
│       ├── Step 3: Location Preferences (Remote / Hybrid / Onsite, City)
│       ├── Step 4: Skills & Experience Level
│       ├── Step 5: Resume Upload (Optional / Skip)
│       └── Step 6: Notification Preferences
│
└── 🔐 AUTHENTICATED (Core App)
    │
    ├── 1. Dashboard (Home)
    │   ├── Weekly Summary Card
    │   │   ├── Applications this week
    │   │   ├── Upcoming deadlines
    │   │   └── Suggested tasks
    │   ├── Application Pipeline Snapshot
    │   │   ├── Pipeline stage counts (Applied / Interview / Offer)
    │   │   └── → Quick-link to Application Tracker
    │   ├── Recommended Internships (3–5 cards)
    │   │   └── → Individual Listing Detail
    │   ├── Recent Activity Feed
    │   │   ├── Status changes
    │   │   ├── New matches
    │   │   └── Upcoming deadlines
    │   └── Quick Actions Bar
    │       ├── + Add Application
    │       ├── Search Internships
    │       └── View All Notifications
    │
    ├── 2. Internship Search
    │   ├── Search Bar
    │   │   ├── Keyword search (role, company, skill)
    │   │   └── Voice search (mobile)
    │   ├── Filter Panel
    │   │   ├── Experience Level (No exp required / 1 yr / 2+ yr)
    │   │   ├── Work Type (Remote / Hybrid / Onsite)
    │   │   ├── Industry / Field
    │   │   ├── Location (City, State, Country)
    │   │   ├── Duration (Summer / Year-round / Semester)
    │   │   ├── Deadline (Rolling / Specific date range)
    │   │   ├── Major / Field of Study
    │   │   └── Tags (Career changers welcome / Part-time / Stipend)
    │   ├── Results View
    │   │   ├── List View (default)
    │   │   ├── Card Grid View
    │   │   └── Map View (location-based roles)
    │   ├── Sort Options
    │   │   ├── Relevance (default)
    │   │   ├── Date posted
    │   │   ├── Application deadline
    │   │   └── Match score
    │   ├── Saved Searches
    │   │   ├── Save current filter set
    │   │   └── Manage saved searches
    │   └── Internship Detail Page ──────────────────────────────┐
    │       ├── Company header (logo, name, size, industry)       │
    │       ├── Role title, location, work type, duration         │
    │       ├── Match Score indicator                             │
    │       ├── Plain-language summary                           │
    │       ├── Full description & requirements                   │
    │       ├── Skills required (linked to Skill Matching)        │
    │       ├── Company culture & perks                          │
    │       ├── Application deadline (with countdown)            │
    │       ├── Application link / Apply via InternLink           │
    │       ├── Save to Collection                               │
    │       ├── Share listing                                    │
    │       └── Peer Insights (company reviews, interview tips)   │
    │                                                             │
    │   ◄─── Referenced from Dashboard & Skill Matching ─────────┘
    │
    ├── 3. Application Tracker
    │   ├── Pipeline View (Kanban board)
    │   │   ├── Saved
    │   │   ├── Applied
    │   │   ├── Under Review
    │   │   ├── Interview Scheduled
    │   │   ├── Offer Received
    │   │   └── Rejected / Withdrawn
    │   ├── List View (table format)
    │   │   ├── Sortable by company, deadline, status, date added
    │   │   └── Bulk actions (archive, change status)
    │   ├── Analytics View
    │   │   ├── Application funnel chart
    │   │   ├── Response rate %
    │   │   ├── Avg. time to response
    │   │   └── Weekly/monthly activity trend
    │   ├── Add Application Modal
    │   │   ├── Manual entry
    │   │   │   ├── Company name
    │   │   │   ├── Role title
    │   │   │   ├── Application date
    │   │   │   ├── Deadline
    │   │   │   ├── Status
    │   │   │   ├── Application URL
    │   │   │   └── Notes
    │   │   └── From saved listing (pre-filled)
    │   └── Application Detail Page
    │       ├── Header (company, role, status badge)
    │       ├── Timeline (status history with dates)
    │       ├── Documents tab
    │       │   ├── Linked resume version
    │       │   └── Linked cover letter version
    │       ├── Contacts tab
    │       │   ├── Recruiter / hiring manager name
    │       │   ├── Email / LinkedIn
    │       │   └── Add contact
    │       ├── Notes tab
    │       │   ├── Freeform notes
    │       │   └── Interview prep notes
    │       ├── Reminders tab
    │       │   ├── Set deadline reminder
    │       │   ├── Set follow-up reminder
    │       │   └── Interview date reminder
    │       └── Quick actions (Edit, Archive, Delete)
    │
    ├── 4. Skill Matching
    │   ├── My Skills Profile
    │   │   ├── Current skills list (from profile + manual add)
    │   │   ├── Experience level per skill (Beginner / Intermediate / Advanced)
    │   │   └── Skill categories (Technical / Soft / Tools / Domain)
    │   ├── Skills Gap Analysis
    │   │   ├── Target role selector
    │   │   ├── "You have X of Y required skills" indicator
    │   │   ├── Skills you have ✓
    │   │   ├── Skills to develop (gap list)
    │   │   └── Priority skill recommendations
    │   ├── Learning Resources
    │   │   ├── Curated free resources per skill
    │   │   ├── Platform links (Coursera, YouTube, freeCodeCamp, etc.)
    │   │   └── Estimated time to learn
    │   └── Match Scores
    │       ├── How match % is calculated (transparent)
    │       └── Improve your match (actionable tips)
    │
    ├── 5. Resume Manager
    │   ├── My Documents
    │   │   ├── Resumes (version list)
    │   │   │   ├── Upload new version
    │   │   │   ├── View / Preview
    │   │   │   ├── Rename
    │   │   │   ├── Set as default
    │   │   │   ├── Linked applications count
    │   │   │   └── Delete
    │   │   └── Cover Letters (version list)
    │   │       ├── Upload / Create
    │   │       ├── View / Edit
    │   │       ├── Link to application
    │   │       └── Delete
    │   ├── Resume Builder
    │   │   ├── Template gallery (5 templates)
    │   │   │   ├── Classic
    │   │   │   ├── Modern
    │   │   │   ├── Creative
    │   │   │   ├── Tech-focused
    │   │   │   └── Minimal
    │   │   ├── Section editors
    │   │   │   ├── Personal Info
    │   │   │   ├── Education
    │   │   │   ├── Experience
    │   │   │   ├── Projects
    │   │   │   ├── Skills
    │   │   │   ├── Certifications
    │   │   │   └── Extracurriculars / Awards
    │   │   ├── AI-assisted writing tips (inline)
    │   │   ├── ATS score indicator
    │   │   ├── Preview (PDF / web)
    │   │   └── Export (PDF, DOCX)
    │   └── Cover Letter Assistant
    │       ├── Template selection
    │       ├── Role-specific prompt (paste job description)
    │       ├── Draft editor
    │       └── Save to My Documents
    │
    ├── 6. Notifications
    │   ├── Notification Center
    │   │   ├── All notifications (chronological)
    │   │   ├── Unread badge count
    │   │   ├── Filter by type
    │   │   │   ├── Deadlines
    │   │   │   ├── Status changes
    │   │   │   ├── New matches
    │   │   │   ├── Reminders
    │   │   │   └── System / Account
    │   │   ├── Mark all as read
    │   │   └── Clear all
    │   └── Notification Settings (→ in Profile)
    │       ├── Push notifications toggle
    │       ├── Email digest toggle (daily / weekly / off)
    │       ├── Deadline reminder timing (1 day / 3 days / 7 days)
    │       ├── New match alerts
    │       └── Follow-up reminders
    │
    └── 7. Profile
        ├── My Profile
        │   ├── Personal Info
        │   │   ├── Name, photo, bio
        │   │   ├── University, major, graduation year
        │   │   ├── Location
        │   │   └── LinkedIn / Portfolio URL
        │   ├── Career Interests
        │   │   ├── Target industries
        │   │   ├── Target role types
        │   │   └── Work preferences (remote/hybrid/onsite)
        │   └── Skills (linked to Skill Matching)
        ├── Account Settings
        │   ├── Email & password
        │   ├── University email verification
        │   ├── Connected accounts (Google, Apple)
        │   └── Delete account
        ├── Notification Preferences
        │   └── (See Notifications section)
        ├── Privacy & Data
        │   ├── Data download
        │   ├── Visibility settings
        │   └── Cookie preferences
        ├── Help & Support
        │   ├── FAQ
        │   ├── Contact support
        │   ├── Feature tour (re-trigger)
        │   └── Give feedback
        └── Sign Out
```

---

### 2.2 Site Map — Visual Hierarchy Summary

```
Level 0 (Root)          Level 1 (Main Sections)    Level 2 (Sub-sections)      Level 3 (Detail Pages)
────────────────────────────────────────────────────────────────────────────────────────────────────
                         Dashboard
                         Internship Search ──────── Filters / Results ────────── Internship Detail
                         Application Tracker ─────── Pipeline / List ──────────── Application Detail
InternLink ─────────────  Skill Matching ──────────── Gap Analysis / Resources
                         Resume Manager ──────────── Document Vault ────────────  Resume Builder
                         Notifications ──────────── Notification Center
                         Profile ─────────────────── Settings / Privacy
```

---

## 3. Navigation Structure

### 3.1 Global Navigation — Web (Desktop)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  HEADER (Persistent)                                                           │
│  ┌────────────┐  ┌────────────────────────────────────────────────────────┐   │
│  │ InternLink │  │  Dashboard │ Search │ Tracker │ Skills │ Resume       │   │
│  │   Logo     │  └────────────────────────────────────────────────────────┘   │
│  └────────────┘  ┌────────────────────────────────────────────────────────┐   │
│                  │  🔔 Notifications (badge) │ 👤 Profile Menu ▾          │   │
│                  └────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Primary navigation items (left-aligned, persistent):**

| Tab | Icon | Shortcut | Badge |
|-----|------|----------|-------|
| Dashboard | 🏠 Home | D | — |
| Search | 🔍 Search | S | New matches count |
| Tracker | 📋 Checklist | T | Overdue items |
| Skills | ⚡ Lightning | K | Skills gap count |
| Resume | 📄 Document | R | — |

**Utility navigation (right-aligned):**

| Item | Behavior |
|------|----------|
| Notifications (🔔) | Dropdown panel; badge shows unread count |
| Profile avatar | Dropdown: Profile, Settings, Help, Sign Out |

---

### 3.2 Global Navigation — Mobile (Bottom Tab Bar)

```
┌────────────────────────────────────────────────────────────┐
│                     Screen Content                         │
│                                                            │
│                                                            │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  🏠        🔍        📋        ⚡        👤               │
│  Home    Search   Tracker   Skills   Profile              │
└────────────────────────────────────────────────────────────┘
```

**Notes:**
- Resume Manager is accessible from both Profile tab and Application Detail
- Notifications accessed via bell icon in the top header bar (mobile)
- FAB (Floating Action Button) for "+ Add Application" on Dashboard and Tracker screens

---

### 3.3 Secondary Navigation Patterns

#### Breadcrumbs (Web only)
Used for deep navigation paths:
```
Dashboard > Internship Search > Company Name > Role Title
Dashboard > Application Tracker > Application Detail > Documents
```

#### Back Navigation (Mobile)
- Standard back arrow for drill-down flows
- Swipe gesture (iOS) supported throughout

#### Contextual Navigation

| Context | Navigation Element |
|---|---|
| Internship Detail → Apply | External link + auto-add to Tracker prompt |
| Application Detail → Linked Listing | Tap to view original listing |
| Skill Gap → Learning Resource | In-app webview or external link |
| Resume Builder → Export | Download or link to application |

#### In-Page Tabs

| Screen | Tabs |
|---|---|
| Application Detail | Timeline \| Documents \| Contacts \| Notes \| Reminders |
| Application Tracker | Pipeline \| List \| Analytics |
| Resume Manager | My Documents \| Resume Builder \| Cover Letter |
| Profile | My Profile \| Career Interests \| Skills |

---

### 3.4 Navigation Hierarchy Map

```
                            ┌───────────────────────────────┐
                            │         InternLink App        │
                            └───────────────┬───────────────┘
                                            │
          ┌──────────┬────────────┬─────────┼──────────┬────────────┐
          ▼          ▼            ▼         ▼          ▼            ▼
     Dashboard    Search       Tracker   Skills     Resume      Profile
          │          │            │         │          │            │
      ┌───┤     ┌────┤       ┌────┤    ┌────┤     ┌────┤      ┌─────┤
      │   │     │    │       │    │    │    │     │    │      │     │
  Quick  Rec  Filter Detail  App  Gap  Res   My   Settings  Notif  Help
  Action Feed  Panel  Page  Detail Analysis Builder Docs
```

---

## 4. User Flow Diagrams

### 4.1 Onboarding Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ONBOARDING FLOW — First-Time User                                           │
└─────────────────────────────────────────────────────────────────────────────┘

         App Store / Web
               │
               ▼
    ┌─────────────────────┐
    │    Landing Page     │
    └──────────┬──────────┘
               │ CTA: "Get Started"
               ▼
    ┌─────────────────────┐
    │    Sign Up Screen   │◄─── Already have account? → Log In
    │  Email / Google /   │
    │  Apple              │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────────────────────────────────────┐
    │                  ONBOARDING WIZARD                  │
    │                                                     │
    │  [1/6] Basic Info        [2/6] Career Interests     │
    │  • Name                  • Target industries        │
    │  • University            • Role types               │
    │  • Major                 • Work type preference     │
    │  • Year                                             │
    │         │                        │                  │
    │         └──────────┬─────────────┘                  │
    │                    │                                │
    │  [3/6] Location    [4/6] Skills & Experience        │
    │  • City / Region   • Add current skills             │
    │  • Remote pref.    • Experience level               │
    │                                                     │
    │  [5/6] Resume Upload    [6/6] Notifications         │
    │  • Upload PDF           • Push on/off               │
    │  • "Skip for now"       • Email digest              │
    │                         • Deadline alerts           │
    │                                                     │
    │  [Skip any step — progressive profiling]            │
    └──────────────────────────┬──────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Dashboard       │
                    │  "Welcome, [Name]!" │
                    │  First task prompt  │
                    └─────────────────────┘
```

---

### 4.2 Internship Discovery & Save Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ DISCOVERY FLOW — Finding and Saving an Internship                           │
└─────────────────────────────────────────────────────────────────────────────┘

    Dashboard / Search Tab
           │
           ▼
    ┌─────────────────────┐
    │  Internship Search  │
    │  (default: feed     │
    │   based on profile) │
    └──────────┬──────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
   Keyword         Apply
   Search          Filters
        │             │
        └──────┬───────┘
               ▼
    ┌─────────────────────┐
    │   Results List      │
    │  (with Match Score) │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │  Internship Detail  │
    └──────────┬──────────┘
               │
        ┌──────┴─────────────┬─────────────────┐
        ▼                    ▼                  ▼
  Apply Now              Save to          Share Listing
  (external link)        Collection
        │                    │
        ▼                    ▼
  ┌───────────────┐   ┌─────────────────────┐
  │  External ATS │   │  Saved Collections  │
  │  (new tab)    │   │  "Dream roles"      │
  └───────┬───────┘   │  "Backup"           │
          │           │  + New collection   │
          ▼           └─────────────────────┘
  ┌───────────────────────┐
  │  Prompt: "Add to      │
  │  Application Tracker?"│
  │  [Yes, Add] [Later]   │
  └───────────┬───────────┘
              │ Yes
              ▼
    ┌─────────────────────┐
    │  Application added  │
    │  to Tracker (status │
    │  "Applied")         │
    └─────────────────────┘
```

---

### 4.3 Application Tracking Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ APPLICATION TRACKING FLOW — Managing the Full Lifecycle                     │
└─────────────────────────────────────────────────────────────────────────────┘

           Entry Points
    ┌──────────┬──────────────┐
    │          │              │
    ▼          ▼              ▼
 From       From           Manual
 Listing    "Apply        Add (+)
 Detail     Now" flow     button
    │          │              │
    └──────────┴──────────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │   ADD APPLICATION       │
        │   Modal                 │
        │   Company / Role /      │
        │   Date / Deadline /     │
        │   Status / Notes        │
        └────────────┬────────────┘
                     │
                     ▼
         ┌────────────────────────┐
         │  APPLICATION TRACKER   │
         │  Pipeline View         │
         │                        │
         │  Saved → Applied       │
         │    → Under Review      │
         │    → Interview         │
         │    → Offer             │
         │    → Rejected          │
         └────────────┬───────────┘
                      │
              Tap on application card
                      │
                      ▼
         ┌────────────────────────┐
         │  APPLICATION DETAIL    │
         ├────────────────────────┤
         │  TIMELINE tab          │◄── Update status (drag card or dropdown)
         │  DOCUMENTS tab         │◄── Link resume version, cover letter
         │  CONTACTS tab          │◄── Add recruiter info
         │  NOTES tab             │◄── Prep notes, follow-up log
         │  REMINDERS tab         │◄── Set deadline / follow-up / interview alerts
         └────────────┬───────────┘
                      │
              Status update triggers
                      │
                      ▼
         ┌────────────────────────┐
         │  NOTIFICATION          │
         │  "Interview reminder   │
         │  set for [date]"       │
         └────────────────────────┘
```

---

### 4.4 Resume Creation Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ RESUME CREATION FLOW — Building and Linking a Resume                        │
└─────────────────────────────────────────────────────────────────────────────┘

    Resume Manager Tab
           │
           ▼
    ┌─────────────────────┐
    │    My Documents     │
    │    (empty state /   │
    │    existing list)   │
    └──────────┬──────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
    Upload          Build New
    Existing        Resume
    Resume               │
        │                ▼
        │     ┌──────────────────────┐
        │     │  RESUME BUILDER      │
        │     │                      │
        │     │  1. Pick Template    │
        │     │  2. Fill Sections    │
        │     │     • Education      │
        │     │     • Experience     │
        │     │     • Skills         │
        │     │     • Projects       │
        │     │  3. Review ATS Score │
        │     │  4. Preview          │
        │     │  5. Save / Export    │
        │     └──────────┬───────────┘
        │                │
        └───────┬─────────┘
                │
                ▼
     ┌───────────────────────┐
     │  Resume saved to      │
     │  My Documents         │
     │  (version name auto-  │
     │  generated + editable)│
     └──────────┬────────────┘
                │
        Link to application?
                │
                ▼
     ┌───────────────────────┐
     │  Application Tracker  │
     │  → Application Detail │
     │  → Documents tab      │
     │  → Link this resume   │
     └───────────────────────┘
```

---

### 4.5 Skill Matching Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SKILL MATCHING FLOW — Identifying Gaps & Taking Action                      │
└─────────────────────────────────────────────────────────────────────────────┘

    Skills Tab / Internship Detail "Skills" section
                     │
                     ▼
     ┌──────────────────────────────┐
     │     MY SKILLS PROFILE        │
     │  Current skills + levels     │
     │  (pre-filled from onboarding │
     │   + editable)                │
     └──────────────┬───────────────┘
                    │
                    ▼
     ┌──────────────────────────────┐
     │    SELECT TARGET ROLE        │
     │  Dropdown / search for       │
     │  role type or paste JD       │
     └──────────────┬───────────────┘
                    │
                    ▼
     ┌──────────────────────────────┐
     │    SKILLS GAP ANALYSIS       │
     │                              │
     │  Match Score: 72%  ████████░░│
     │                              │
     │  ✅ Skills you have (8)       │
     │  Python, Figma, Excel...     │
     │                              │
     │  ❌ Skills to develop (3)     │
     │  SQL, Tableau, A/B Testing   │
     └──────────────┬───────────────┘
                    │
          Tap on a skill to develop
                    │
                    ▼
     ┌──────────────────────────────┐
     │    LEARNING RESOURCES        │
     │  "SQL for Beginners"         │
     │  • Coursera (free)           │
     │  • ~5 hours                  │
     │  [Start Learning →]          │
     └──────────────┬───────────────┘
                    │
                    ▼
     ┌──────────────────────────────┐
     │  Skill marked "In Progress"  │
     │  Match Score updates         │
     │  Listing recommendations     │
     │  re-ranked                   │
     └──────────────────────────────┘
```

---

### 4.6 Notifications & Reminder Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ NOTIFICATION FLOW — Deadline & Reminder System                              │
└─────────────────────────────────────────────────────────────────────────────┘

    Trigger events:
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │  Deadline   │  │  Interview  │  │  New match  │  │  Follow-up  │
    │  approaching│  │  scheduled  │  │  found      │  │  overdue    │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           └────────────────┴─────────────────┴─────────────────┘
                                       │
                                       ▼
                           ┌───────────────────────┐
                           │  Notification Engine  │
                           │  (evaluates prefs)    │
                           └───────────┬───────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                      ▼
           ┌────────────────┐                   ┌────────────────────┐
           │ Push Notif.    │                   │  Email Digest      │
           │ (if enabled)   │                   │  (if enabled)      │
           └───────┬────────┘                   └────────────────────┘
                   │
          User taps notification
                   │
                   ▼
         ┌─────────────────────┐
         │  Deep link to:      │
         │  • Application      │
         │    Detail           │
         │  • Listing Detail   │
         │  • Skill resource   │
         └─────────────────────┘
```

---

## 5. Feature Hierarchy

### 5.1 Master Feature Hierarchy (All Features)

```
InternLink Features
│
├── TIER 1 — Core Value Features (MVP Critical)
│   ├── 1.0 Dashboard
│   │   ├── 1.1 Weekly summary card
│   │   ├── 1.2 Pipeline snapshot
│   │   ├── 1.3 Recommended listings
│   │   ├── 1.4 Recent activity feed
│   │   └── 1.5 Quick actions
│   │
│   ├── 2.0 Internship Search
│   │   ├── 2.1 Search bar (keyword + voice)
│   │   ├── 2.2 Advanced filters (9 filter types)
│   │   ├── 2.3 Results list / grid view
│   │   ├── 2.4 Internship Detail page
│   │   │   ├── 2.4.1 Match score indicator
│   │   │   ├── 2.4.2 Plain-language summary
│   │   │   ├── 2.4.3 Application deadline countdown
│   │   │   └── 2.4.4 Save to collection
│   │   └── 2.5 Saved searches (alerts)
│   │
│   ├── 3.0 Application Tracker
│   │   ├── 3.1 Pipeline (Kanban) view
│   │   ├── 3.2 List (table) view
│   │   ├── 3.3 Add application (manual + from listing)
│   │   ├── 3.4 Application Detail
│   │   │   ├── 3.4.1 Status timeline
│   │   │   ├── 3.4.2 Document linking
│   │   │   ├── 3.4.3 Contact log
│   │   │   ├── 3.4.4 Notes editor
│   │   │   └── 3.4.5 Reminder setter
│   │   └── 3.5 Analytics view
│   │
│   ├── 4.0 Notifications
│   │   ├── 4.1 Push notifications
│   │   ├── 4.2 Email digest
│   │   ├── 4.3 Notification center
│   │   ├── 4.4 Deep linking
│   │   └── 4.5 Notification preferences
│   │
│   └── 5.0 Profile & Onboarding
│       ├── 5.1 Guided onboarding wizard
│       ├── 5.2 Profile editor
│       ├── 5.3 Career interests
│       ├── 5.4 Account settings
│       └── 5.5 University email verification
│
├── TIER 2 — Differentiating Features (High Value)
│   ├── 6.0 Skill Matching
│   │   ├── 6.1 Skills profile editor
│   │   ├── 6.2 Skills gap analysis
│   │   ├── 6.3 Target role comparison
│   │   ├── 6.4 Learning resource links
│   │   └── 6.5 Match score calculation
│   │
│   └── 7.0 Resume Manager
│       ├── 7.1 Document vault (upload + version)
│       ├── 7.2 Resume builder (templates + editor)
│       ├── 7.3 ATS score checker
│       ├── 7.4 Cover letter assistant
│       └── 7.5 Document ↔ Application linking
│
└── TIER 3 — Enrichment Features (V1.1+)
    ├── 8.0 Interview Preparation
    │   ├── 8.1 Behavioral question bank (STAR method)
    │   ├── 8.2 Role-specific question sets
    │   └── 8.3 Interview tips & checklists
    │
    ├── 9.0 Analytics & Insights
    │   ├── 9.1 Application funnel visualization
    │   ├── 9.2 Response rate tracking
    │   └── 9.3 Peer benchmarks (anonymized)
    │
    └── 10.0 Community & Social
        ├── 10.1 Peer insights & company reviews
        ├── 10.2 Share listings with friends
        └── 10.3 Success stories
```

---

### 5.2 Feature Priority Matrix

| Feature | User Value | Business Value | Effort | Priority | Release |
|---|---|---|---|---|---|
| Internship Search | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Medium | P0 | V1 MVP |
| Application Tracker | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | High | P0 | V1 MVP |
| Notifications / Reminders | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Medium | P0 | V1 MVP |
| Onboarding Wizard | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Medium | P0 | V1 MVP |
| Dashboard | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Medium | P0 | V1 MVP |
| Resume Manager (Upload) | ⭐⭐⭐⭐ | ⭐⭐⭐ | Low | P0 | V1 MVP |
| Skill Matching | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | High | P1 | V1 MVP |
| Resume Builder | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | High | P1 | V1 MVP |
| Cover Letter Assistant | ⭐⭐⭐ | ⭐⭐⭐ | Medium | P1 | V1 MVP |
| Analytics Dashboard | ⭐⭐⭐⭐ | ⭐⭐⭐ | Medium | P2 | V1.1 |
| Interview Prep Hub | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | High | P2 | V1.1 |
| Peer Insights / Community | ⭐⭐⭐ | ⭐⭐⭐⭐ | Very High | P3 | V2 |
| Offer Comparison Tool | ⭐⭐⭐ | ⭐⭐ | Medium | P3 | V2 |

---

### 5.3 Feature-Persona Mapping

| Feature | Priya (Achiever) | Marcus (Explorer) | Elena (Switcher) |
|---|---|---|---|
| Internship Search + Filters | Advanced filters, volume | Beginner-friendly tags | Career-pivot filters |
| Application Tracker | Full pipeline, analytics | Guided first entry | Multi-role management |
| Skill Matching | Competitive benchmarking | Entry-level gap guidance | Transferable skill mapping |
| Resume Manager | Multiple versions, ATS score | Builder from scratch | Portfolio-linked resume |
| Notifications | Deadline alerts, digest | Daily nudges, milestones | Weekly summary |
| Interview Prep | Technical + behavioral | Behavioral basics | Design/UX specific |

---

### 5.4 Feature Dependencies

```
Onboarding Wizard
      │
      ├──▶ Profile (populated)
      │         │
      │         ├──▶ Skill Matching (match score)
      │         │         │
      │         │         └──▶ Search results (ranked by match)
      │         │
      │         └──▶ Dashboard (personalized feed)
      │
      └──▶ Internship Search (filter defaults)

Application Tracker
      │
      ├──▶ Notifications (reminders require application data)
      ├──▶ Resume Manager (document linking)
      └──▶ Dashboard (pipeline snapshot)

Resume Manager
      │
      └──▶ Application Tracker (document linking)
```

---

## 6. Content Inventory

### 6.1 Content Types

| Content Type | Location | Owner | Update Frequency |
|---|---|---|---|
| Internship listings | Search, Dashboard | Data partner / scraper | Real-time / daily |
| Company profiles | Listing Detail | Data partner | Weekly |
| User profile data | Profile | User | On demand |
| Application records | Tracker | User | On demand |
| Resume/document files | Resume Manager | User | On demand |
| Skill taxonomy | Skills section | InternLink content team | Monthly |
| Learning resources | Skill Matching | InternLink content team | Monthly |
| Notification copy | Notification Center | InternLink content team | Per release |
| Resume templates | Resume Builder | InternLink design team | Per release |
| Onboarding guidance | Wizard, empty states | InternLink content team | Per release |
| FAQ / Support content | Help & Support | InternLink content team | As needed |

---

### 6.2 Empty States

Empty states are critical for new users (especially Marcus). Every zero-data view must include:
- Clear explanation of the section purpose
- Actionable first step
- Friendly, encouraging tone

| Screen | Empty State Prompt |
|---|---|
| Dashboard | "Welcome! Let's find your first internship. Start searching →" |
| Application Tracker | "No applications yet. Save a listing or add one manually." |
| Resume Manager | "Your resume vault is empty. Upload a resume or build one from scratch." |
| Skill Matching | "Add your skills to see how you match with roles." |
| Notifications | "You're all caught up! Notifications will appear here." |
| Saved listings | "You haven't saved any listings yet. Browse internships to get started." |

---

## 7. IA Principles & Design Decisions

### 7.1 Core IA Principles

**1. Student-first mental models**  
Navigation labels use plain language students recognize ("Tracker," not "Pipeline Management") and match how students already think about the internship process.

**2. Progressive disclosure**  
Complex features (Skill Gap Analysis, Resume Builder) are surfaced progressively — not shown until the user has context to benefit from them. Simple tasks are never buried behind advanced features.

**3. One path, multiple entry points**  
Key tasks (adding an application, linking a resume) can be initiated from multiple locations — no single required entry point. This reduces friction and supports different usage patterns.

**4. Contextual continuity**  
When a user clicks "Apply" on a listing, InternLink immediately offers to add the application to the Tracker. When viewing a skill gap, the listing results update. Context flows across sections rather than treating each section as isolated.

**5. Cross-platform consistency**  
The same 7 sections exist on web and mobile. Navigation labels, terminology, and information hierarchy are identical — only interaction patterns differ (tap vs. click, FAB vs. button, bottom bar vs. top nav).

**6. Mobile-first depth hierarchy**  
No section is deeper than 3 levels from the bottom tab bar on mobile. Complex tasks that benefit from a larger screen (resume building, analytics) are fully functional on mobile but optimized for web.

---

### 7.2 Key Design Decisions

| Decision | Rationale |
|---|---|
| Bottom tab bar limited to 5 items | Cognitive load reduction; all primary sections reachable in one tap |
| "Tracker" not "Applications" | Reflects active management mindset, not passive logging |
| Pipeline (Kanban) as default tracker view | Visual status at a glance; familiar pattern from productivity tools |
| Match score on listings (not just filters) | Inline confidence signal reduces decision fatigue in the results list |
| Notifications as a separate tab → top bar icon | Reduces clutter in primary nav; notifications are secondary to action |
| Resume Manager accessible from Profile AND Tracker | Dual context of need — managing documents proactively or just-in-time |
| Onboarding wizard is skippable per step | Respects user autonomy; collects data over time rather than upfront |
| Dashboard as the home screen | Reduces cold start problem; always gives users a next action |

---

### 7.3 Accessibility & Inclusivity Considerations

- All navigation items include visible labels (no icon-only nav)
- Tab order follows logical reading sequence for screen reader users
- Color alone is never used to convey status (status labels + icons alongside color)
- Touch targets meet minimum 44×44px (iOS HIG) and 48dp (Material Design)
- Onboarding accommodates users with no experience (no required fields that assume existing knowledge)

---

*Document end. Next steps: Wireframe key flows (Dashboard, Search, Tracker) → Prototype → Usability testing.*

---

**Document Control**

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | June 2026 | Senior UX Research Team | Initial IA release |
