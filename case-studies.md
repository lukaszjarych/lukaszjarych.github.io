---
title: Case Studies
description: Selected analytics and BI case studies.
intro: Case studies that explain the delivery, architecture, and business context behind selected portfolio work.
hero_style: compact
---

These summaries focus on architecture, modeling, delivery choices, and business outcomes.

<section class="cards cards--home">
  {% assign featured_case_studies = site.case_studies | where: "featured", true | sort: "order" %}
  {% assign hero_case_study_titles = "Azure Cost Analytics in Microsoft Fabric / Power BI|AI-Powered BI Delivery with Lightdash|Cloud Migration Metadata Workflow|QlikView Sales Classification Pipeline" | split: "|" %}
  {% for desired_title in hero_case_study_titles %}
    {% assign case_study = featured_case_studies | where: "title", desired_title | first %}
    {% if case_study %}
    <article class="card home-case-card home-case-card--{{ forloop.index }}">
      {% if case_study.image %}
        <button
          class="image-button"
          type="button"
          data-lightbox-src="{{ case_study.image | relative_url }}"
          data-lightbox-alt="{{ case_study.title }}"
          data-lightbox-caption="{{ case_study.title }}"
        >
          <img class="card__image" src="{{ case_study.image | relative_url }}" alt="{{ case_study.title }}">
        </button>
      {% endif %}
      <div class="card__body">
        <p class="eyebrow">{{ case_study.eyebrow }}</p>
        <h2><a href="{{ case_study.url | relative_url }}">{{ case_study.title }}</a></h2>
        <p>{{ case_study.excerpt }}</p>
        <div class="tag-list">
          {% for tool in case_study.tools limit:5 %}
            <span class="tag">{{ tool }}</span>
          {% endfor %}
        </div>
      </div>
    </article>
    {% endif %}
  {% endfor %}
</section>
