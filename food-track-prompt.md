# Task: Extract Core Calorie Tracking Flow from Mobbin

## 1. Objective

I am designing a mobile calorie-tracking application.

I have identified three existing applications in Mobbin that provide calorie and food-tracking functionality.

Your task is to analyze these three applications, extract their common UX patterns, identify the essential user journey, and produce a consolidated **Core Calorie Tracking Flow Specification**.

The goal is NOT to copy any individual application.

The goal is to understand how users perform the primary calorie-tracking operation and design a simple, consistent, user-friendly flow based on the strongest patterns found across the three applications.

For this task, focus exclusively on the main food-tracking journey.

Do not analyze onboarding, authentication, subscription flows, settings, profile configuration, analytics, or secondary functionality unless it directly affects the core tracking flow.

## 2. Tools and Environment

Available MCP connectors:

- Mobbin MCP — access to mobile application screenshots, screens, and user flows.
- Figma MCP — access to Figma files and design capabilities.

Use Mobbin MCP for research.

Do not use Figma MCP yet. Figma implementation will be a separate task after the research and flow specification have been reviewed and approved.

Before starting, inspect the available Mobbin MCP tools and understand their capabilities.

## 3. Applications to Analyze

Analyze these three applications:

- APP 1: https://mobbin.com/apps/bite-pal-ios-bdcb96c8-4074-42f0-8082-01b5e6c9d17a/199195b6-4f75-4da3-9bd5-3aae09fed9bb/flows
- APP 2: https://mobbin.com/apps/lifesum-ios-1f1267a3-fa68-4112-a355-9b2d8bb1fecb/62c05b34-e0c8-4f60-bdd4-3c3b9434904c/flows
- APP 3: https://mobbin.com/apps/my-fitness-pal-ios-fd6605ba-ebb7-48f9-834f-bb7af71381be/0c048543-ebaf-4c8a-88a6-dee24a2e0672/flows

Use Mobbin to locate each application and inspect its available screens and flows.

If an application has multiple relevant versions, use the most recent available version and document the version when possible.

## 4. Scope: Core Calorie Tracking

Analyze the complete journey of adding food to a daily calorie log.

Start from the main/home screen where the user can see their daily calorie progress.

Follow the journey until the food has been successfully added and the daily calorie overview has been updated.

Investigate these stages:

### A. Home / Daily Overview

- How is daily calorie progress displayed?
- How are meals organized?
- Where is the Add Food action located?
- Is food added directly to a meal or through a separate screen?
- What happens when the user has not added any food yet?

### B. Add Food Entry Point

- What happens after tapping Add Food?
- Is there a separate food selection screen?
- How does the application organize different food input methods?
- Are there shortcuts for frequently used foods or recent meals?

### C. Food Input Methods

Investigate the available methods in each application:

- Search by food name.
- Photo-based food recognition / AI.
- Voice-based food input.
- Manual food entry.
- Recently used foods.
- Favorite foods.
- Saved meals or recipes.

Only document methods that are actually available in the inspected application.

Do not assume that every application supports every method.

### D. Food Search and Selection

- How does search work?
- What information is displayed in search results?
- Are calories displayed in the results list?
- Are foods grouped into categories?
- Can users select multiple food items?
- What happens after selecting a food item?
- How does the application handle ambiguous search results?

### E. Food Details and Quantity

- How does the user specify the amount of food?
- Which units are supported (grams, milliliters, servings, pieces, etc.)?
- Is there a quantity selector?
- Can the user change the serving size?
- How are calories recalculated?
- Are proteins, carbohydrates, and fats displayed?
- Is there a confirmation step?

### F. Meal Assignment

- How does the application determine which meal the food belongs to?
- Can the user change the meal?
- Are Breakfast, Lunch, Dinner, and Snacks used?
- Can multiple foods be added to the same meal?

### G. Confirmation and Completion

- What happens after the user confirms adding food?
- Does the application return to the home screen?
- Does it return to the food list?
- Is there a confirmation message or animation?
- How is the updated calorie balance displayed?
- Can the user edit or delete the newly added food?

## 5. Research Methodology

For each application:

1. Find the main calorie-tracking screen.
2. Identify the Add Food entry point.
3. Follow the actual available user flow.
4. Inspect every relevant screen in sequence.
5. Record screen names and their order.
6. Record user actions and navigation transitions.
7. Capture important UI patterns and interactions.
8. Identify missing or inaccessible screens.

IMPORTANT:

Do not invent screens or interactions that are not supported by Mobbin evidence.

If a flow cannot be fully inspected, explicitly mark the missing information.

Distinguish between:

- Observed behavior — directly supported by screenshots or recorded flows.
- Inferred behavior — reasonable interpretation, but not directly verified.
- Unknown — information that cannot be established from available evidence.

For every important observation, include the application name and the corresponding screen or flow reference. Include Mobbin URLs or screen identifiers whenever available.

## 6. Cross-Application Comparison

After analyzing all three applications, create a comparative analysis.

Use the following structure:

| Feature / Interaction   | App 1 | App 2 | App 3 | Common Pattern |
| ----------------------- | ----- | ----- | ----- | -------------- |
| Daily overview          |       |       |       |                |
| Add food entry point    |       |       |       |                |
| Food search             |       |       |       |                |
| Search results          |       |       |       |                |
| Food details            |       |       |       |                |
| Quantity selection      |       |       |       |                |
| Meal assignment         |       |       |       |                |
| Multiple food selection |       |       |       |                |
| Confirmation            |       |       |       |                |
| Updated calorie balance |       |       |       |                |

Identify:

1. Patterns shared by all three applications.
2. Patterns shared by two applications.
3. Unique features that provide meaningful UX improvements.
4. Differences in navigation and interaction.
5. Unnecessary complexity that should not be included in the core flow.

Do not automatically consider the most common pattern the best one.

Evaluate patterns based on usability, number of steps, clarity, and speed of daily food logging.

## 7. Define the Consolidated Core Flow

Based on the research, propose one consolidated flow.

The flow must describe:

- Starting point.
- User actions.
- Screens.
- Navigation transitions.
- Required information.
- System responses.
- Completion state.

Represent the flow as a Mermaid flowchart.

Example structure (illustrative only):

Home
→ Add Food
→ Select Input Method
→ Search Food
→ Select Food
→ Specify Quantity
→ Select Meal
→ Confirm
→ Updated Daily Overview

This is only an example. The final flow must be based on research findings.

### Important UX decisions

Explicitly address these questions:

1. Should the user select a meal before or after selecting food?
2. Should food selection and quantity adjustment happen on separate screens or in one interface?
3. Should the user be able to add multiple food items in one session?
4. Should the user return to the home screen after every added item?
5. How can the number of interactions be minimized?
6. Which information is essential and which can be secondary?
7. What is the fastest reasonable path for a returning user?

For each decision, explain the reasoning and reference the relevant competitor patterns.

## 8. Screen Inventory for Wireframing

Create a list of screens required to implement the consolidated flow.

For every screen, document:

- Screen ID.
- Screen name.
- Purpose.
- Entry point.
- Main UI components.
- Primary action.
- Secondary actions.
- Possible states.
- Exit/navigation destinations.

Example:

| ID    | Screen         | Purpose                                  | Primary Action |
| ----- | -------------- | ---------------------------------------- | -------------- |
| CT-01 | Daily Overview | Display daily calorie progress and meals | Add Food       |
| CT-02 | Food Input     | Select food input method                 | Search         |
| CT-03 | Food Search    | Find food items                          | Select Food    |
| CT-04 | Food Details   | Adjust quantity and nutritional values   | Add Food       |

Do not assume this exact screen structure. Derive the final inventory from the research.

## 9. Deliverables

Create the following Markdown documents in the project:

### docs/research/mobbin-app-1-analysis.md

Detailed analysis of the first application.

### docs/research/mobbin-app-2-analysis.md

Detailed analysis of the second application.

### docs/research/mobbin-app-3-analysis.md

Detailed analysis of the third application.

### docs/research/cross-app-comparison.md

Comparative analysis of all three applications.

### docs/product/core-calorie-tracking-flow.md

The final proposed core user flow, UX decisions, Mermaid diagram, screen inventory, and interaction descriptions.

### docs/product/core-calorie-tracking-open-questions.md

Questions that cannot be answered reliably from the available research and decisions requiring product owner approval.

## 10. Quality Requirements

- Base conclusions on actual Mobbin research.
- Do not fabricate application functionality.
- Separate facts from assumptions.
- Avoid unnecessary features.
- Prioritize a fast, intuitive daily tracking experience.
- Keep the main flow independent from secondary functionality.
- Avoid overengineering.
- Do not create detailed visual designs.
- Do not modify existing project documentation unless explicitly required.
- Do not create Figma frames or components at this stage.

## 11. Final Report

After completing the research, provide a concise summary containing:

1. The most important common patterns.
2. The biggest UX differences between the three applications.
3. Your recommended consolidated core flow.
4. The number of screens required.
5. The most important UX decisions.
6. Open questions requiring my input.

Stop after producing the documentation.

Wait for my approval before proceeding to Figma wireframe creation.
