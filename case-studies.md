---
title: Case Studies
description: Selected analytics and BI case studies.
intro: Carefully scoped examples that highlight architecture, modeling, automation, and business value while respecting confidentiality.
hero_style: compact
---

The projects below are written as employer-facing summaries. They focus on decision support, engineering depth, and trusted analytics workflows rather than showing every deliverable.

<section class="cards cards--stacked">
  {% assign featured_case_studies = site.case_studies | sort: "order" %}
  {% for case_study in featured_case_studies %}
    <article class="card{% if case_study.image %} card--with-media{% endif %}">
      {% if case_study.image %}
        <button
          class="image-button"
          type="button"
          data-lightbox-src="{{ case_study.image | relative_url }}"
          data-lightbox-alt="{{ case_study.title }}"
          data-lightbox-caption="{{ case_study.title }}"
        >
          <img class="card__image card__image--stacked" src="{{ case_study.image | relative_url }}" alt="{{ case_study.title }}">
        </button>
      {% endif %}
      <div class="card__body">
        <p class="eyebrow">{{ case_study.eyebrow }}</p>
        <h2><a href="{{ case_study.url | relative_url }}">{{ case_study.title }}</a></h2>
        <p>{{ case_study.excerpt }}</p>
        <div class="tag-list">
          {% for tool in case_study.tools limit:3 %}
            <span class="tag">{{ tool }}</span>
          {% endfor %}
        </div>
      </div>
    </article>
  {% endfor %}
</section>
