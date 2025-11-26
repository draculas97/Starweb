# Starweb Integrated Platform Design: Sales, Admin, and Customer Tools

## 1. Project Overview and Goal

This document outlines the workflow, core features, modules, and initial requirements for the integrated Starweb platform. The goal is to automate the website building service lifecycle—from initial customer request and psychometric profiling to project completion, invoicing, and post-handover upsells—while ensuring transparency and control for both the Admin team and the Customer.

### Platform Modules:
*   **Sales Tool Engine (Frontend)**: Initial qualification and data collection.
*   **Admin Tool (Backend)**: Central hub for CRM, Project Management, and Finance, now including Compliance Management.
*   **Customer Tool (Portal)**: Self-service portal for clients to track progress, upload assets, and provide feedback.

## 2. Integrated Workflow (The Flow)

The process is divided into 7 main stages, driven by automated actions and team interventions.

| Stage | Actor | Action/Tool Used | Key Outcome |
| :--- | :--- | :--- | :--- |
| **A. Inquiry & Qualification** | Customer | Starweb Website / Sales Tool | Submits initial request, industry, and needs. Request is logged in Admin CRM. |
| **B. Client Assessment** | Admin Team | Admin CRM / Email | Admin contacts client. Sends PRD template. Guides client through the Psychometric Analysis tool. System runs Compliance Assessment. |
| **C. Commitment & Setup** | Customer | Customer Tool | Fills PRD, uploads brand assets. Processes 50% Initial Payment via Invoicing Module. |
| **D. Project Initiation (AI Build)** | Admin / System | Project Handling / Compliance | Team assigned. System collates PRD, Brand Identity, Psychometric Results, UI/UX Rules, and Legal Policies into a prompt. Prompt sent to AI Builder. Code exported to Git. Preview link generated. |
| **E. Review & Iteration** | System / Customer | Customer Tool / Git | Customer notified of Preview Link. Customer provides comments (max 3 rounds free). Comments linked to developer. Developer fixes issues. |
| **F. Finalization & Handover** | Admin / Customer | Project Handling / Customer Tool | Second Payment Tranche (50%) processed. Deployment Link generated. Site Handover completed. |
| **G. Post-Project Cycle** | Customer / Admin | Customer Tool / CRM | Feedback submitted. Upselling/Cross-selling notifications. Accounting updated. |

## 3. System Modules and Features

### 3.1 Sales Tool Engine (Starweb Website)
*   **Personal Info Collection**: Name, Contact, Company.
*   **Industry & Purpose Query**: Dropdowns for industry and website goal.
*   **Website Type Selector**: Simple vs. Complex, Maintenance vs. New Build.
*   **Request Logging**: Creates new lead in Admin CRM.

### 3.2 Admin Tool (The Central Operating System)

#### A. CRM Module
*   **AI Client Summary**: LLM-generated summary of client.
*   **Personal & Profile Info**: Contact details, company structure.
*   **Domain & Hosting**: Management fields.
*   **Assets & Documents**: Links to assets, PRD, Git Link.
*   **Credentials Management**: Secured vault (2FA/passcode).
*   **Client Timeline View**: Consolidated view of milestones.
*   **Financial Ledger**: Invoices, Credits, Debits.

#### B. Project Handling Module
*   **Project Request Status**: Tracks progress.
*   **Team Assignment**: Assign Developer, PM, Designer.
*   **Payment Tracking**: Tracks 50% initial and final payments.
*   **Code Management**: Git Repository Link.
*   **Preview Link Management**: Live staging URL.
*   **Change Request System**: Tracks customer comments (max 3 free).
*   **Deployment & Handover**: Checklist and final links.
*   **Cross/Upsell Module**: Displays potential products.

#### C. Invoicing and Accounting Module
*   **Invoice Generation**: Automated Proforma and Final Invoices.
*   **Transaction Logging**: Logs payments/expenses.
*   **Payment Gateway Integration**: Secure processing.

#### D. Compliance Management (NEW)
*   **Compliance Assessment Tool**: Evaluates GDPR, CCPA needs.
*   **Policy Generation Engine**: Generates ToS and Privacy Policy.
*   **Legal Document Storage**: Stores drafts for review.

### 3.3 Customer Tool (Client Portal)
*   **Mobile-First Design**: Optimal usability on all devices.
*   **Project Timeline**: Visual representation of steps.
*   **Website View**: Embeddable preview link.
*   **Payment & Invoices**: View pending payments and past invoices.
*   **Document Upload**: Secure PRD and Asset upload.
*   **Credential Request**: Request access to sensitive credentials.
*   **Chat with Team**: Direct messaging.
*   **Preview Commenting**: Click/mark up preview link (max 3 free).
*   **Feedback Submission**: Post-handover form.
*   **Legal Review Access**: Review ToS and Privacy Policy.

## 4. Mind Map Visualization

```text
STARWEB INTEGRATED PLATFORM
├── 1. SALES TOOL ENGINE (Intake)
│   ├── Personal Info Capture
│   ├── Industry / Goal Query
│   └── Request Log → Admin CRM
│
├── 2. ADMIN TOOL (Internal Ops)
│   ├── 2.1 CRM (Client Data Hub)
│   │   ├── Personal Info / Profile
│   │   ├── AI Client Summary
│   │   ├── Credentials (Secured Vault)
│   │   ├── Domain / Hosting Details
│   │   ├── Assets / Content Docs
│   │   ├── Client Timeline
│   │   └── Financial Ledger
│   ├── 2.2 PROJECT HANDLING
│   │   ├── Team Assignment
│   │   ├── Project Status
│   │   ├── AI Prompt Generation
│   │   ├── Git Link / Preview Link Management
│   │   ├── Customer Feedback (Max 3 Free Changes)
│   │   └── Handover / Deployment Link
│   ├── 2.3 INVOICING / ACCOUNTING
│   │   ├── 50% Tranche 1 / 50% Tranche 2
│   │   ├── Invoice Generation
│   │   └── Transaction ID Logging
│   └── 2.4 COMPLIANCE / LEGAL (NEW)
│       ├── Compliance Assessment Tool
│       ├── Policy Generation Engine (ToS, PP)
│       └── Legal Document Storage
│
└── 3. CUSTOMER TOOL (Client Portal)
    ├── **MOBILE-FIRST DESIGN**
    ├── Project Timeline
    ├── PRD / Asset Upload
    ├── Payment View / Processing
    ├── Website Preview Viewer
    ├── Commenting System (Max 3 Changes)
    ├── Chat with Team
    ├── Invoices View
    ├── Feedback Form
    ├── Legal Document Review (NEW)
    └── Cross-selling / Upselling Notifications
```

## 5. Technical Specifications & Master Design System

### AI Prompt Construction
The Admin Tool constructs a prompt using:
1.  **Project Data (PRD)**: Client info, goals, features.
2.  **Psychometric & Brand Identity**: Tone, layout, colors, fonts.
3.  **Stacia Corp UI/UX Rules**: Responsiveness, Accessibility, Semantic HTML.
4.  **Legal & Compliance**: Required policies and content.

### Master UI/UX Philosophy
*   **Typography**: Expressive, character-rich (No generic Inter/Roboto).
*   **Color**: Bold, intentional, high-contrast.
*   **Motion**: Purposeful storytelling.
*   **UX**: Narrative-aligned, cognitive load managed, accessible.
