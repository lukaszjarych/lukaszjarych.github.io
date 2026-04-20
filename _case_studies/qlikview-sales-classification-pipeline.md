---
title: QlikView Sales Classification Pipeline
eyebrow: Case Study
excerpt: Legacy QlikView pipeline where chained applications, QVD storage, and rule-based classification created a governed reporting workflow for sales classification and decision support.
summary: A portfolio case study showing how a legacy QlikView stack was used not only for reporting, but also for staged data processing, historical tracking, exception management, and governed sales classification logic across SAP BW and CRM inputs.
tools:
  - QlikView
  - QVD
  - SAP BW
  - CRM
  - Scripting
  - Data Governance
featured: true
order: 4
image: /assets/images/case-studies/qlikview-sales-classification/01-kokpit-managerski-koncepcja.png
gallery:
  - path: /assets/images/case-studies/qlikview-sales-classification/01-kokpit-managerski-koncepcja.png
    alt: QlikView sales cockpit concept slide
    caption: Concept dashboard view used to communicate KPI layout, sales categories, and navigation structure in the reporting solution.
---

## Overview

This project was built in a much earlier BI era, before modern analytics engineering patterns were widely available in everyday enterprise teams. In that context, QlikView was used for much more than dashboarding. It effectively acted as a data processing and storage layer, with chained applications producing QVD outputs that fed the next stage of the workflow.

The result was a reporting pipeline focused on sales-type classification, history-aware logic, exception handling, and cross-source reconciliation. Even without report screenshots, the technical depth is visible in the structure behind the solution: multiple dependent QlikView applications, persistent intermediate datasets, rule-based classification, and operational governance around edge cases.

## Business Problem

The business needed a trusted way to classify revenue and cost activity into sales types such as:

- new recurring sales
- new one-off sales
- renewed sales
- maintained sales
- residual or internal categories

The difficulty was not visual reporting alone. The real challenge was making classification rules reliable across imperfect operational data, historical changes on controlling orders, contract hierarchies, CRM relationships, and exceptions that could not be cleanly solved with one static formula.

At the same time, the team had to reconcile behavior between legacy SAP BW outputs and the QlikView implementation, eliminate manual spreadsheet dependencies, and support business units that kept surfacing edge cases and corrections.

## Solution Approach

The solution was organized as a staged QlikView pipeline rather than a single report file. Based on the technical documentation, the core flow consisted of multiple applications with distinct responsibilities:

- `Wlasciciele.qvw` built ownership and parent-branch mappings for external clients
- `01_historiaBW.qvw` maintained a history layer for controlling-order changes
- `02_model_typy_sprzedazy.qvw` assembled the analytical model and aligned order history to posting periods
- `03_Algorytmy.qvw` applied classification logic and exception rules
- `04_CRM_Fakty.qvw` prepared CRM-linked facts
- `05_CRM_Agregaty R7.qvw` produced aggregated outputs for downstream reporting

This is one of the most interesting aspects of the project from a portfolio perspective: QlikView was functioning as a lightweight warehouse and transformation layer. QVD files were not just extracts for a dashboard. They were persistent intermediate assets used to stage, enrich, correct, and pass data between applications in a controlled sequence.

## Pipeline Architecture

The pipeline combined SAP BW history, CRM data, and QlikView-managed QVD layers into one governed reporting flow.

Important technical characteristics included:

- daily incremental handling of changes in controlling-order master data
- persistent history used to align contract and customer assignments to the posting date of each order
- multi-step enrichment of objects with business unit, product group, profit center, external customer, flags, and contract relationships
- mapping layers used to connect subordinate and parent contract logic
- separate aggregation steps for downstream reporting consumption

In practical terms, this meant QlikView was serving roles that today would often be split across ingestion jobs, transformation models, warehouse tables, and semantic layers. At the time, implementing that behavior inside QlikView and QVD pipelines was a pragmatic and effective engineering choice.

## Classification Logic And Governance

The classification engine was rule-heavy and explicitly designed to handle business ambiguity.

The artifacts show logic for:

- contract start-date evaluation
- distinction between recurring and one-off sales based on duration thresholds such as the 92-day rule
- handling of renewed and annexed opportunities
- special treatment for internal sales, monitoring products, vehicles, fixed assets, and service/material orders
- separate logic paths for parent-contract and subordinate-contract scenarios
- company-specific and order-pattern-specific overrides

The project also included a formal exception-management layer. A dedicated `Tabela Wyjatkow` workbook and QlikView logic allowed individually approved overrides for cases that could not be resolved cleanly by standard rules alone. That made the system more governable: business units could request corrections, exceptions were registered in a controlled place, and the reporting layer became less dependent on ad hoc manual fixes.

## Engineering Work

The documentation and notes point to a substantial amount of engineering and operational cleanup work behind the reporting result:

- reconciling differences between QlikView logic and SAP BW outputs
- improving history loading for controlling orders
- removing earlier Excel dependencies so the algorithm could run automatically
- filtering out invalid or inactive opportunities
- extending the model with additional business fields needed by reporting users
- improving authorization handling and CRM-structure-based access
- iterating on algorithm changes as new edge cases were discovered by business units

This is why the project is best described as a governed data workflow rather than only a BI report. A large share of the value came from stabilizing business logic, operationalizing data preparation, and reducing ambiguity in how sales types were assigned.

## Implementation

From an implementation perspective, this project was built as a chain of QlikView applications and QVD outputs rather than a single monolithic report. Each layer had a clear role in the flow: source extraction, historical correction, business enrichment, classification logic, fact preparation, and final aggregation for reporting.

The implementation pattern included:

- loading source data from SAP BW, CRM, and supporting operational tables into reusable QVD layers
- maintaining history for controlling-order changes so classifications could be aligned to the correct posting period rather than only the current master-data state
- applying mapping tables and staged joins to enrich orders with customer, contract, product, and ownership context
- encoding business rules directly in QlikView script, including separate branches for parent and subordinate contract logic
- introducing an exception table as an explicit override mechanism for cases that business users approved outside the standard algorithm
- iterating on the rule set through reconciliation against BW outputs and repeated feedback from business units

The selected image reflects the presentation layer of the solution, but the main implementation effort sat underneath it: data preparation, historical alignment, classification logic, and governance. In modern terms, much of this work would likely be distributed across ingestion jobs, warehouse models, and semantic layers. In this legacy setup, QlikView and QVDs handled those responsibilities directly.

## Outcome

The outcome was a reusable reporting backbone for sales classification and related reporting, supported by:

- a staged QlikView pipeline with persisted QVD layers
- a historical model that improved classification accuracy over time
- exception governance for non-standard cases
- reduced reliance on manual spreadsheet-driven corrections
- more consistent downstream reporting across business units

Even without dashboard images, the project demonstrates strong BI engineering instincts: decomposing a business problem into processing stages, managing rule complexity explicitly, introducing historical logic where point-in-time data was not enough, and building governance around exceptions instead of hiding them.

## Legacy Context

This work should be read in the context of its time. The implementation predates many of the patterns that are now standard in analytics engineering, such as dedicated cloud warehouses, transformation frameworks, and semantic modeling tools. By current standards, some responsibilities would likely be distributed differently across the stack.

But that is exactly what makes the project valuable as a case study. It shows how data engineering thinking was applied inside a legacy BI platform: QlikView was used as the practical orchestration, storage, and transformation environment available at the time, and the solution was shaped accordingly.

## Confidentiality Note

Descriptions are based on preserved project artifacts and have been generalized to protect confidential business context while still showing the architecture, rule design, and delivery approach.
