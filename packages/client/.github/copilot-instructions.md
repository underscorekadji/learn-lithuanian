### General Guidelines
As a package manager, use Yarn instead of npm.

Project adheres to a feature-based architecture, utilizing Vite as the build tool and TypeScript for development.

Please ensure that all code suggestions:
- Leverage Yarn for dependency management.
- Follow modular and reusable code practices.
- Use type safety with TypeScript, ensuring no `any` type unless absolutely necessary.
- Adhere to clean code principles, including clear naming conventions, minimal side effects, and DRY (Don't Repeat Yourself).
- Include comprehensive and relevant test coverage with proper alignment to the project's architecture.

---

### Component Structure
- **Component Directories**: Each React component should be placed in its own directory. This ensures better organization and scalability of the project.
- **File Naming**: The React component file should be named `{ComponentName}.component.tsx`, following a consistent and clear naming convention.
- **Index File**: Each component folder must include an `index.ts` file. This file should re-export all relevant modules from the component, making it easier to import the component elsewhere in the project.
- **Folder Contents**: Alongside the component, include its related files such as:
  - **Tests**: A test file (e.g., `{ComponentName}.spec.tsx`) should be located in the same directory as the component.
  - **Stories**: If using Storybook, a `.stories.tsx` file should also reside within the same directory.
  - **Other Files**: Any additional files related to the component (e.g., styles, hooks, etc.) should be stored within the component's directory for better encapsulation.

---

### Test Instructions
- Use `.spec.tsx` files for all test implementations.
- Prefer **Vitest** as the testing framework.
- Place test files in the same directory as the component or module they are testing (e.g., `Component.spec.tsx` next to `Component.tsx`).
- Ensure test files are clear and well-structured, using `describe` blocks for grouping related tests and `it` for individual test cases.
- Write meaningful test descriptions that explain the test's purpose.
- Mock external dependencies when necessary to isolate the unit being tested.
- Aim for 100% coverage of critical components and modules.

---

### Additional Preferences
- Favor functional components with React hooks over class components.
- Use modern React practices, including `useState`, `useEffect`, and `useReducer`.
- Write maintainable and readable code with comments only when necessary to explain complex logic.
- Ensure compatibility with the latest stable versions of Vite, TypeScript, and React.
- Avoid deprecated features or libraries unless explicitly required.

---

### Debugging & Logging
- Use descriptive error messages and logs during debugging.
- Avoid committing debug logs (e.g., `console.log` statements) unless essential for monitoring.

---

### Collaboration Guidelines
- Follow consistent code formatting and style rules (e.g., Prettier, ESLint).
- Ensure all code suggestions consider team collaboration and readability.
- Document any complex logic or patterns directly in the code or via comments.