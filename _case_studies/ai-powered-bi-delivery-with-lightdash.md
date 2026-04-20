---
title: AI-Powered BI Delivery with Lightdash
eyebrow: Featured Case Study
excerpt: dbt and Lightdash MVP that turns Azure pricing and amortized-cost logic into curated marts, MotherDuck-hosted semantic tables, and decision-ready dashboard exploration.
summary: A focused Azure cost analytics MVP built with dbt, DuckDB, MotherDuck, and Lightdash to expose pricing-model behavior, discount capture, PAYG baseline, and optimization opportunities through a curated semantic BI workflow.
tools:
  - Lightdash
  - dbt
  - Data Agents
  - DuckDB
  - MotherDuck
  - AI-Assisted Development
featured: true
order: 2
image: /assets/images/case-studies/ai-powered-bi-delivery-with-lightdash/01-lightdash-overview.png
gallery:
  - path: /assets/images/case-studies/ai-powered-bi-delivery-with-lightdash/01-lightdash-overview.png
    alt: Lightdash executive overview page
    caption: Executive dashboard view used to summarize pricing model mix, costs, and optimization direction.
  - path: /assets/images/case-studies/ai-powered-bi-delivery-with-lightdash/02-lightdash-breakdown.png
    alt: Lightdash cost breakdown analysis
    caption: Breakdown view showing how modeled marts were exposed for interactive cost analysis and drill-down.
  - path: /assets/images/case-studies/ai-powered-bi-delivery-with-lightdash/03-lightdash-detail.png
    alt: Lightdash diagnostic report detail
    caption: Detail-oriented dashboard slice used to validate business logic and inspect cost drivers at lower granularity.
---

## Overview

This case study shows a tighter, modern BI delivery slice built on top of Azure cost-management logic. The goal was not to recreate the full Fabric-oriented cost platform, but to prove that a focused MVP could take dbt-modeled pricing and amortized-cost data, publish curated marts into MotherDuck, and expose them through Lightdash as a semantic exploration layer.

That makes the project useful as public technical proof. It demonstrates how analytics engineering, semantic design, and dashboard delivery can be connected end to end with a lightweight stack that is easier to share publicly than a larger enterprise implementation.

## Business Problem

Azure cost data becomes useful only when business users can move from billing lines to meaningful optimization questions. The reporting layer needed to help users understand:

- pricing-model mix across OnDemand, SavingsPlan, Reservation, and Spot
- effective cost versus PAYG baseline
- discount captured and discount percentage behavior
- discountability and opportunity segmentation
- which slices of usage looked like candidates for better pricing treatment

The hard part was not dashboard cosmetics. It was designing a semantic layer that translated pricing and amortized-cost logic into metrics and dimensions that could be explored confidently.

## MVP Scope

The project was intentionally narrow. Rather than migrate every branch of the larger cost-management logic, the MVP focused on the stable slice that best demonstrated engineering quality and decision value.

That scope included:

- public retail price sheet ingestion
- EA customer price sheet normalization
- unified price sheet modeling
- amortized cost transformation
- Lightdash-facing marts for pricing and discount analysis

By keeping the scope tight, the project made room for stronger modeling discipline, clearer documentation, and a cleaner semantic BI experience.

## Technical Workflow

The workflow combines several runtimes, each with a specific role:

- dbt handles the transformation logic and quality checks
- DuckDB is the fast local development engine
- MotherDuck hosts the curated analytics marts for shared querying
- Lightdash Cloud provides the semantic and dashboarding layer

The practical delivery flow is:

1. build local marts in DuckDB with dbt
2. sync only the curated analytics tables into MotherDuck
3. refresh the Lightdash preview against the published marts
4. validate the dashboard against business logic and KPI expectations

This split runtime is one of the strongest technical decisions in the project. It balances local development speed with cloud accessibility, while making the trade-offs explicit in the documentation.

## dbt And Semantic Layer Design

The repo shows that the BI layer was built on curated marts rather than on raw or intermediate tables. That is important because it creates a semantic contract for the dashboard instead of exposing fragile transformation logic directly to BI users.

The semantic layer was built on a small set of curated marts rather than on raw or intermediate models. That gave the BI layer stable entry points for KPIs and drill paths around:

- effective cost
- PAYG baseline
- captured discount
- pricing-model segmentation
- discount opportunity categories

The project also includes explicit data-quality protections, including uniqueness and not-null checks, arithmetic consistency tests, and business-rule tests around discount logic. That helps show that the semantic layer was engineered, not improvised.

## Lightdash Delivery

Lightdash is not just a screenshot destination in this project. It is the business-facing semantic and exploration surface built on top of the curated marts.

The dashboard layer was shaped to support:

- executive KPI review
- discount-opportunity segmentation by pricing model
- drill-down into amortized-cost diagnostics
- exploration of pricing-reference and optimization logic

This makes the project a good example of BI delivery built from an analytics-engineering foundation. The Lightdash layer stays thin and business-readable because the heavy logic already lives in dbt models and curated marts.

## AI-Assisted Delivery

AI-assisted implementation played a meaningful role in speeding up delivery, but the value is best understood as acceleration on top of clear engineering choices rather than replacement for them.

It helped move faster on tasks such as:

- narrowing the MVP scope
- shaping marts for BI consumption
- validating model and metric behavior
- tightening dashboard structure, labels, and filters
- documenting the local-to-cloud workflow

That is relevant because it shows how AI can improve analytics delivery in practice: by accelerating real model, semantic, and dashboard work within a defined architecture.

## Outcome

The result is a recruiter-friendly example of a modern analytics delivery pattern: business logic modeled in dbt, curated marts built locally in DuckDB, selected tables synchronized to MotherDuck, and a Lightdash dashboard delivered on top of a controlled semantic layer.

The case study demonstrates the ability to:

- reduce a broad cost domain into a stable and presentable MVP
- model for BI consumption instead of only for storage
- design a semantic layer around curated marts
- explain and execute runtime trade-offs across local and cloud tools
- deliver a usable analytics product instead of only a transformation repo

## Confidentiality Note

Descriptions are written to highlight the technical approach and implementation pattern while keeping the business context appropriately generalized.
