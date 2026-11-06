---
slug: devops-es-una-cultura-no-un-equipo
title: DevOps is a culture, not a team
authors: [chava]
tags: [devops, infraestructura, operacion]
description: A practical experience of how agile methods, IaC, CI/CD and DevSecOps taught us that DevOps is much more than creating a team.
---

My introduction to DevOps didn't begin with implementing DevOps.

It began with trying to solve problems.

First, we needed to organize the team's work more effectively. Then came challenges involving planning, deployments, environment consistency, and the way Development and Operations worked together.

Each problem led us to look for a solution, and often that solution helped us recognize the next problem.

Eventually, a team called **DevOps** appeared.

Paradoxically, that was when I understood that having a DevOps team didn't necessarily mean we had implemented DevOps.

## Agile methodologies

In 2019, we started with something relatively simple: a Kanban board.

It worked. We gained greater visibility into activities, projects and progress.

But adoption wasn't immediate.

Making work visible could also be perceived as surveillance or micromanagement. Implementing the board wasn't enough; we also had to change how we understood and used the methodology.

Then came Scrum.

We wanted to improve planning and better understand our capacity. During the first sprints, we focused mainly on projects and improvements.

**We underestimated operations.**

All our planned effort was directed toward projects, but operations were still there: services to maintain, incidents, monitoring and everyday tasks.

We eventually incorporated operational work into planning and estimated it based on the effort it had historically required.

## The wall of confusion

We managed multiple products and environments.

Development worked in the early environments. As a product progressed, Operations received the infrastructure that had to be moved through quality assurance, security and production.

Much of the process was manual.

Environments weren't always consistent. A deployment could take between **2 and 8 hours**, with a rollback taking roughly another two.

But time was only part of the problem.

We had accumulated technical debt along the way, along with insufficient documentation, differences between environments and many decisions that had to be translated between Development and Operations.

Development understood the product better.

Operations understood the infrastructure better.

And between them stood **a wall of confusion**.

## Infrastructure as code

We then began automating infrastructure.

We adopted **Terraform**, gradually adding components, modules, variables, secrets and certificates until we could represent an entire infrastructure environment as code.

The result was much more than faster deployments.

Environments became more consistent, infrastructure could be reproduced, changes could be versioned, and we began building a baseline that incorporated architecture, security and monitoring.

But this mainly worked in environments managed by Operations.

When a product reached our environments, we still found differences and manual configurations.

**We had automated our environments, but not the complete delivery process.**

## A DevOps team was created

Another organizational change happened around that time: a small DevOps team was formed, initially made up of developers who began taking on this new role.

Operations started working with them, sharing much of the infrastructure-as-code work we had developed.

The goal was to extend those practices to earlier stages so that IaC wouldn't begin only when a product reached our environments.

And there were results.

In some projects, infrastructure started arriving automated and standardized. Practices that had begun in Infrastructure were spreading to other stages of the lifecycle.

But the culture hadn't yet taken root across teams.

The new DevOps team began encountering many of the same coordination challenges that Operations had faced.

We had transferred code and automation.

**But we had also moved the wall of confusion.**

Previously, it stood between:

```text
Development │ Operations
```

Now we had:

```text
Development │ DevOps │ Operations
```

Instead of disappearing, the wall had moved. In practice, we ended up with two points of separation.

## Involvement from the earliest stages

Things began to change when Operations and Security were invited to participate earlier in projects.

Instead of waiting for a product to pass from one team to another, Development, Operations and Security could discuss decisions while they were still being made.

Development contributed product knowledge; Operations brought the perspective of infrastructure, availability, monitoring and day-to-day operation; and Security could integrate its requirements early on.

IaC could be part of a project from its first environments, with the same baseline following it through the delivery lifecycle.

Pipelines evolved as well. We began integrating unit, integration and acceptance tests, along with security controls such as SAST and DAST.

**CI/CD stopped being merely a way to automate delivery and began serving as an integration point for Development, Operations and Security.**

In practice, we were applying **shift-left**: architecture, infrastructure, operations, automation and security could be introduced earlier instead of appearing when the product was already far along.

This evolution also brought us closer to **DevSecOps**: security was no longer just a final checkpoint but part of the development and delivery lifecycle.

Yet the most important change wasn't simply shifting activities left.

**Feedback no longer had to cross the wall of confusion.**

When a need arose, the teams involved could discuss it and work on it within the same project.

We still had teams and specialties, but working together also expanded our individual capabilities.

Development gained more context about infrastructure and operations; Operations understood the application and its delivery lifecycle better; and Security participated directly in product decisions.

**We were developing T-shaped skills:** retaining depth in our specialties while broadening our understanding of the disciplines we worked alongside.

It was no longer simply about handing work from one specialist to another.

We were beginning to work toward a shared objective.

## DevOps is a culture, not a team

Looking back at the whole journey, every stage contributed something.

Kanban and Scrum changed how we organized work. IaC gave us repeatability and consistency. CI/CD and automation transformed delivery. Shift-left and DevSecOps helped us incorporate different perspectives earlier.

But the most important change happened when this way of working began to spread across teams.

**After that entire journey, DevOps stopped being the name of a team for me and became a culture: a way to communicate and work across the organization.**
