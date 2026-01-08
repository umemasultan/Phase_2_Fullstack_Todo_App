# Features Specifications

This directory contains feature specifications for the hackathon-todo application.

## Structure

Each feature should have its own subdirectory:

```
features/
├── <feature-name>/
│   ├── spec.md      # Feature requirements and acceptance criteria
│   ├── plan.md      # Architecture and implementation plan
│   └── tasks.md     # Testable tasks with test cases
```

## Creating a New Feature Spec

1. Create a new directory with a descriptive kebab-case name (e.g., `user-authentication`, `todo-crud`)
2. Use the `/sp.specify` command to generate the spec.md
3. Use the `/sp.plan` command to generate the plan.md
4. Use the `/sp.tasks` command to generate the tasks.md

## Feature Spec Guidelines

- **spec.md**: Focus on WHAT needs to be built (business requirements, user stories, acceptance criteria)
- **plan.md**: Focus on HOW it will be built (architecture, technology choices, design decisions)
- **tasks.md**: Focus on implementation steps (testable tasks, test cases, dependencies)

## Cross-Workspace Features

When a feature spans both frontend and backend:
- Create a single feature directory here
- Reference both workspaces in the spec
- Coordinate API contracts in `../api/`
- Ensure both teams understand dependencies

## Examples

- `todo-crud/` - Create, read, update, delete operations for todos
- `user-authentication/` - User login, registration, and session management
- `todo-filtering/` - Filter todos by status, priority, or tags
