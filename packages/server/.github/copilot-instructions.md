### General Guidelines
As a package manager, use Yarn instead of npm.

The project adheres to a modular architecture, utilizing TypeScript for development and maintaining strict type safety.

Please ensure that all code suggestions:
- Leverage Yarn for dependency management.
- Follow the modular structure of NestJS by organizing code into feature-based modules.
- Use decorators, dependency injection, and other NestJS principles effectively.
- Ensure type safety with TypeScript, avoiding the use of `any` unless absolutely necessary.
- Follow clean code practices, including clear naming conventions, minimal side effects, and adherence to the DRY (Don't Repeat Yourself) principle.
- Include comprehensive test coverage using the preferred testing framework.

---

### Module Structure
- **Feature Modules**: Each feature should have its own module, encapsulating related controllers, services, and other components.
- **File Naming**: Use clear and consistent naming conventions:
  - `Feature.module.ts` for the module file.
  - `Feature.controller.ts` for controllers.
  - `Feature.service.ts` for services.
  - `Feature.entity.ts` for database entities, if applicable.
  - `Feature.dto.ts` for Data Transfer Objects (DTOs).
- **Index File**: Optionally include an `index.ts` file in each module directory to re-export entities, DTOs, or other frequently used items.

---

### Testing Instructions
- Use `.spec.ts` files for all test implementations.
- Prefer **Jest** as the testing framework.
- Organize test files adjacent to the module or service they are testing (e.g., `Feature.service.spec.ts` next to `Feature.service.ts`).
- Write tests to:
  - Validate controllers and routes.
  - Verify service methods and business logic.
  - Ensure proper behavior of guards, interceptors, and middleware.
- Mock dependencies with tools like `jest-mock` or NestJS-provided utilities (e.g., `TestingModule`).
- Aim for high test coverage, particularly for core business logic and critical application flows.

---

### API Development
- **Controllers**: Use controllers to define RESTful endpoints. Ensure each route has proper HTTP method decorators (e.g., `@Get`, `@Post`).
- **Services**: Encapsulate business logic in services. Avoid placing logic directly in controllers.
- **DTOs**: Use DTOs for request and response validation, leveraging `class-validator` and `class-transformer` decorators for validation and transformation.
- **Entities**: Use entities for database modeling, adhering to the ORM used (e.g., TypeORM, Prisma, etc.).
- **Middleware, Guards, Interceptors**: Use these constructs appropriately for cross-cutting concerns such as authentication, logging, and data transformation.

---

### Database and ORM
- Prefer **TypeORM** for database interactions.
- Place database entities in the `Feature.entity.ts` file within the respective module.
- Use migrations for schema changes and versioning.
- Leverage repositories or service-level abstraction for database operations.
- Ensure secure query practices to avoid SQL injection vulnerabilities.

---

### Debugging & Logging
- Use **NestJS Logger** for application logging.
- Ensure logs are structured and provide relevant context.
- Avoid committing debug logs or sensitive information.

---

### Collaboration Guidelines
- Enforce consistent code formatting and style rules (e.g., Prettier, ESLint).
- Use consistent folder structure for maintainability and scalability.
- Document complex logic and architectural decisions with in-line comments or external documentation.
- Ensure all code suggestions support team collaboration and follow NestJS conventions.

---

### Additional Preferences
- Use dependency injection provided by NestJS for managing services and modules.
- Prefer asynchronous programming practices where applicable, using `async/await` effectively.
- Use lifecycle hooks (e.g., `OnModuleInit`, `OnApplicationShutdown`) appropriately for initializing or cleaning up resources.
- Ensure compatibility with the latest stable versions of NestJS and related dependencies.
- Avoid deprecated features or libraries unless explicitly required.