---
title: Azure Cost Analytics in Microsoft Fabric / Power BI
eyebrow: Featured Case Study
excerpt: Azure cost analytics pipeline built with dbt, Dagster, DuckDB, and Microsoft Fabric to turn raw billing, price, discount, and resource metadata into governed marts, semantic models, and optimization reporting.
summary: A full cost-management analytics pipeline that combines dbt transformation layers, Dagster-driven orchestration, DuckDB development, Microsoft Fabric delivery, and semantic modeling to support Azure cost visibility, discount analysis, tag governance, and optimization decisions.
tools:
  - Power BI
  - Microsoft Fabric
  - dbt
  - Dagster
  - SQL
  - Tabular Editor
featured: true
order: 1
image: /assets/images/case-studies/azure-cost-analytics/01-report-tags-analysis.png
project_repo_url: https://github.com/lukaszjarych/cost-mgmt-analitycs
project_repo_label: Open dbt GitHub Repository
gallery:
  - path: /assets/images/case-studies/azure-cost-analytics/01-report-tags-analysis.png
    alt: Tags analysis report view
    caption: Sanitized reporting view focused on tag quality and resource classification.
  - path: /assets/images/case-studies/azure-cost-analytics/02-architecture-fabric-lineage.png
    alt: Fabric lineage and architecture overview
    caption: Fabric consumption and lineage view showing how dbt-built lakehouse outputs were delivered as parquet-based datasets and then used in Fabric to provide governed sharing and security across tenants and customers.
  - path: /assets/images/case-studies/azure-cost-analytics/03-engineering-tabular-editor.png
    alt: Tabular Editor view
    caption: Semantic model engineering layer showing model governance and technical implementation depth.
  - path: /assets/images/case-studies/azure-cost-analytics/04-star schema.png
    alt: Star schema design for Azure cost analytics
    caption: Star schema view showing the modeled relationship structure used to keep reporting logic reusable and stable.
  - path: /assets/images/case-studies/azure-cost-analytics/05-Kimball-SQLBI-ManyToManyPowerBI.png
    alt: Kimball and SQLBI many-to-many modeling approach
    caption: Kimball-style and SQLBI-tested many-to-many approach used to balance semantic clarity with benchmarked performance.
---

## Overview

This case study is about the full analytics system behind Azure cost reporting, not only the final Power BI layer. The project combines dbt transformation design, Dagster-driven orchestration, DuckDB development, Microsoft Fabric delivery, export layers, and semantic modeling to make cloud-cost data usable for recurring operational decisions.

The real value came from moving beyond raw billing extracts into a governed pipeline that could ingest daily and monthly cost data, normalize discount and resource metadata, apply reusable business logic, publish curated marts, and expose a semantic model that business users could trust. That system made it possible to investigate spend drivers, tagging gaps, discount behavior, and optimization opportunities without rebuilding logic inside each report.

## Business Problem

Azure billing data is rich, but it is not decision-ready by default. Raw cost files, price sheets, discount-plan data, ARM resource metadata, and tagging information arrive with different structures, inconsistent identifiers, and business logic that cannot be read directly from the source rows.

The business needed a solution that could answer questions such as:

- which subscriptions, services, or resources are driving spend changes
- how amortized cost compares with actual cost and PAYG baseline
- where savings plans and reservations are being used, wasted, or left on the table
- which resources have weak tagging and incomplete classification
- how to move from raw billing exports to a reusable semantic model and stable reporting layer

The challenge was to turn cost data into a repeatable analytics product, not a one-off dashboard.

## End-To-End Pipeline

The underlying repository shows a broad cost-management pipeline with medallion-style dbt layers and separate daily and monthly refresh patterns. The flow is much closer to a modern analytics engineering stack than to a traditional BI report project.

At a high level, the pipeline works like this:

1. Raw ingestion models pull Azure Enterprise Agreement cost, billing, discount, price-sheet, and ARM resource data into standardized source tables.
2. Extract and transform layers normalize keys, tags, discount-plan identifiers, locations, resource metadata, and pricing structures.
3. Dimensional and fact models shape the data into governed cost, billing, discount, and resource entities.
4. Mart and export models publish analytics-ready outputs for Fabric, parquet/csv/excel distribution, and semantic-model consumption.
5. Power BI and semantic-model engineering sit on top of those curated tables to expose trusted metrics and drill paths.

This structure supports both daily operational analysis and broader monthly pricing and discount analysis without mixing raw logic directly into the reporting layer.

## dbt Modeling

The dbt project is a substantial implementation, not a small portfolio mock-up. The repository contains:

- Daily and Monthly model domains
- separate Raw, Extract, Spec, Dim/Fct, and Mart layers
- billing, cost, discount, price, and resource subject areas
- verification queries, relation checks, tuple checks, and business-rule tests
- export branches for parquet, csv, and excel outputs

That modeling work is what makes the reporting credible. Instead of sending raw Azure billing rows into Power BI, the solution creates curated entities such as amortized-cost facts, resource dimensions, tag dimensions, reservation and savings-plan dimensions, unified price references, and classification-supporting structures. This is also where business logic for discountability, price alignment, savings-plan behavior, and optimization interpretation becomes reusable across outputs.

## Dagster And Operational Delivery

Dagster is an important part of the technical story and should be visible in the case study. The project documentation and run commands show that orchestration was not treated as an afterthought. Dagster was used to execute daily cost-processing jobs, materialize assets, and coordinate configurable dbt runs for partitioned Azure-cost workflows.

That matters because the pipeline was designed for recurring delivery, not manual refreshes. Orchestration helped turn the dbt models into an automated system that could:

- run partition-aware daily cost processing
- refresh specific assets and model groups on demand
- support repeatable local and operational execution paths
- keep cost reporting aligned with refreshed upstream data

This is part of why the project belongs in an Analytics Engineering portfolio. The work spans data modeling, orchestration, and analytical consumption rather than stopping at SQL transformations alone.

## Runtime And Architecture

The technical runtime also shows clear engineering choices. DuckDB was used as a fast development engine, while Microsoft Fabric acted as the delivery environment for warehouse, semantic-model, and reporting consumption. That split allowed rapid local iteration while still supporting governed downstream use in Fabric.

The architecture and lineage views help communicate how the solution moves through these layers:

- source and raw cost inputs
- modeled dbt tables and marts
- exported and published analytical tables
- semantic-model engineering and Power BI reporting

This makes the project easier to maintain and easier to explain. The lineage is not hidden inside one report file; it is visible as a system.

## What The Reporting Layer Exposed

The reporting layer sat on top of curated cost marts and semantic logic, which enabled analysis such as:

- amortized cost versus actual cost
- savings-plan and reservation utilization patterns
- PAYG baseline and effective discount comparisons
- tag quality and classification completeness
- resource and subscription drill-downs for follow-up actions

Because those metrics were derived from curated facts and dimensions rather than ad hoc visual calculations, users could move between executive summary and detailed investigation without losing consistency.

## Outcome

The outcome was a governed Azure cost analytics product rather than a reporting mock-up. The pipeline created a structured way to ingest, model, orchestrate, publish, and analyze cost data across multiple layers of the stack.

In business terms, the solution improved visibility into spend, discount behavior, and tagging quality, and it helped surface optimization opportunities worth more than $100K. In engineering terms, it demonstrates the ability to design a full pipeline from raw cloud-cost inputs through dbt transformations and Dagster automation into Fabric semantic models and decision-ready reporting.

## Confidentiality Note

Visuals and descriptions are sanitized to protect confidential business context while preserving the technical approach and solution shape.
