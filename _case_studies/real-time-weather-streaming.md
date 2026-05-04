---
title: Real-Time Weather Streaming on Azure and Microsoft Fabric
eyebrow: Featured Case Study
excerpt: WeatherAPI streaming project that moved lightweight scheduled ingestion from a Databricks prototype to Azure Functions, then routed events through Event Hubs, Fabric Eventstream, Eventhouse/KQL, Power BI, and Data Activator email alerting.
summary: A real-time weather analytics pipeline for Wroclaw that uses Azure Functions for cost-conscious ingestion, Event Hubs and Fabric Eventstream for routing, Eventhouse/KQL materialized views for shaping nested JSON, Power BI PBIP/PBIR for reporting, and Data Activator for email alerts.
tools:
  - Azure Functions
  - Event Hubs
  - Microsoft Fabric
  - Eventhouse / KQL
  - Power BI
  - Databricks
  - Data Activator
featured: true
order: 5
image: /assets/images/case-studies/real-time-weather-streaming/01-azure-functions-weather-architecture.png
project_repo_url: https://github.com/lukaszjarych/databricks-events
project_repo_label: Open Weather Streaming GitHub Repository
gallery:
  - path: /assets/images/case-studies/real-time-weather-streaming/01-azure-functions-weather-architecture.png
    alt: Azure Functions weather streaming architecture
    caption: Final architecture showing Azure Functions as the ingestion runtime, Event Hubs and Fabric Eventstream for routing, Eventhouse/KQL for shaping, Power BI for reporting, and Data Activator for email alerting.
  - path: /assets/images/case-studies/real-time-weather-streaming/02-power-bi-weather-report.png
    alt: Power BI live weather report for Wroclaw
    caption: Power BI report built from Eventhouse materialized views for latest weather, recent history, and 3-day forecast data.
  - path: /assets/images/case-studies/real-time-weather-streaming/03-azure-resource-group.png
    alt: Azure resource group for the weather streaming project
    caption: "Sanitized Azure resource group view showing the runtime footprint: Function App, Event Hubs namespace, Key Vault, App Service plan, and Databricks prototype resource."
---

## Overview

This project started as a Databricks learning exercise for producing weather events, but the final architecture deliberately moved ingestion to Azure Functions. The producer only needs to call WeatherAPI, shape one JSON payload, and send one Event Hub message on a timer. That is a better fit for a serverless Function App than an always-running Spark cluster.

The result is a compact real-time analytics pipeline: Azure Functions ingests current weather and 3-day forecast data for Wroclaw, Azure Event Hubs buffers the messages, Fabric Eventstream routes them into Eventhouse, KQL materialized views flatten the nested JSON, Power BI presents the near-real-time report, and Data Activator sends email alerts when weather warnings are caught.

## Architecture Decision

The important decision was not simply which tool could send events. Databricks worked for the prototype, but it was too heavy for the actual runtime requirement. The ingestion workload is small and scheduled:

- call WeatherAPI every 30 seconds
- create one versioned JSON event
- send the event to Azure Event Hubs
- keep secrets and connection strings in Function App settings

Azure Pricing Calculator and Azure Cost Management were used to check the cost profile before choosing the runtime. With a 30-second timer, the Function App runs about 86,400 times in a 30-day month. That volume fits well within the free/low-cost shape of Azure Functions Consumption for a small timer-trigger workload, while Databricks would add cluster compute overhead for a task that only calls an API and sends one Event Hub message.

## Event Flow

The implemented flow is:

1. WeatherAPI returns current weather, air quality, forecast, and alerts.
2. The PowerShell Azure Function builds a `schema_version = 2.0` JSON event.
3. The Event Hub output binding sends the message to `weatherstreamingeventhub`.
4. Fabric Eventstream routes the message to the Eventhouse target.
5. Eventhouse stores raw events in `weather-table`.
6. KQL materialized views expose report-ready tables for Power BI.
7. Data Activator watches the warning signal and sends an email notification when warnings are caught.

Databricks remains useful in the repository as a prototype and as a future option for structured streaming, transformations, and Delta Lake bronze/silver/gold processing, but it is not the chosen production ingestion runtime for this workload.

## KQL And Reporting

The event payload contains nested objects such as `location`, `current`, `air_quality`, `forecast`, and `alerts`. Power BI works better with flattened report-facing tables, so KQL is the shaping layer.

The repository includes Eventhouse setup and validation scripts for:

- `LatestWeatherByCity` for current KPI cards
- `WeatherHistoryByMinute` for recent trend charts
- `LatestForecastByCity` for the forecast matrix

This keeps the Power BI report readable and keeps nested JSON parsing out of the visual layer.

The warning signal is also shaped in KQL. Empty alert arrays return `No Warnings`; warning rows return `Warnings`. Data Activator uses that value to trigger an email notification.

## Power BI Result

The Power BI project is stored as PBIP/PBIR files, which makes it easier to inspect and maintain in source control. I used the [`pbi-cli-tool`](https://pypi.org/project/pbi-cli-tool/) library, a CLI for Power BI semantic models and PBIR reports, to let AI work directly against the file-based report definition. With that workflow, AI was able to build the first working report layout in about five minutes, including KPI cards, trend visuals, and the forecast matrix.

The report shows current local time, weather condition, air quality, alerts, temperature, humidity, wind, pressure, UV, recent weather trends, and a 3-day forecast. Power BI Desktop remained the final rendering and validation authority after the AI/CLI-generated PBIR changes.

There is one practical caveat: events can arrive every 30 seconds, but automatic Power BI page refresh is controlled by tenant and capacity settings. In this environment, the admin interval was 5 minutes, so Eventhouse/KQL queries were the better proof point for fast backend ingestion.

## Engineering Decisions And Tradeoffs

This project demonstrates senior data engineering judgment because the solution is not just a working demo. It shows the ability to choose the right runtime for the workload, keep the architecture cost-conscious, validate each streaming step, and expose nested event data through reusable analytical structures.

The key decisions and tradeoffs are:

- evaluating Databricks against Azure Functions and selecting the cheaper, simpler serverless runtime for lightweight scheduled ingestion
- designing a versioned JSON event contract with current weather, forecast, air quality, and alert payloads
- routing events through Event Hubs, Fabric Eventstream, and Eventhouse with clear validation points at each layer
- using KQL materialized views to turn nested streaming JSON into stable report-facing tables
- separating raw event storage, analytical shaping, Power BI consumption, and Data Activator alerting responsibilities
- keeping Databricks as a prototype and future Delta Lake path rather than forcing Spark into a workload that does not need it
- documenting cost, refresh, and operational caveats instead of presenting the dashboard as the whole solution
