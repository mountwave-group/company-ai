# Contributing

We welcome contributions to Company AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <fork-url>`
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Install dependencies: `npm install`
5. Make your changes
6. Run tests: `npm test`
7. Run linting: `npm run lint:fix`
8. Run formatting: `npm run format`
9. Commit with clear messages: `git commit -m "feat: add new feature"`
10. Push to your fork and open a Pull Request

## Development Workflow

### Build the Project
```bash
npm run build
```

### Run Tests
```bash
npm test
npm test:watch
```

### Check Types
```bash
npm run type-check
```

### Lint and Format
```bash
npm run lint
npm run lint:fix
npm run format
```

## Code Style

We use Prettier and ESLint for code formatting and quality. Configuration files are provided:
- `.prettierrc.json` - Prettier configuration
- `.eslintrc.json` - ESLint configuration

All code must pass linting and formatting checks before being merged.

## Commit Messages

Use clear, descriptive commit messages following conventional commits:

- `feat: add new feature`
- `fix: fix a bug`
- `docs: update documentation`
- `refactor: refactor code structure`
- `test: add or update tests`
- `style: code style changes`
- `chore: maintenance tasks`

Example:
```
feat: add support for Anthropic Claude models

- Added AnthropicProvider implementation
- Added integration tests for Anthropic API
- Updated documentation with provider configuration
```

## Pull Request Process

1. Update documentation for new features
2. Add or update tests as needed
3. Ensure all tests pass: `npm test`
4. Ensure code is properly linted: `npm run lint`
5. Ensure formatting is correct: `npm run format:check`
6. Write a clear PR description explaining:
   - What change is being made
   - Why the change is necessary
   - How to test the changes
   - Any potential impacts

## Testing

- Write tests for all new features
- Maintain or improve code coverage
- Tests should be in `src/__tests__/` directory
- Use Jest for testing
- Test file naming: `module.test.ts`

Example test structure:
```typescript
describe('MyComponent', () => {
  beforeEach(() => {
    // Setup
  });

  test('should do something', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Documentation

- Update README.md for user-facing changes
- Update docs/ for architectural changes
- Add JSDoc comments for public APIs
- Keep examples up to date

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Publish to npm: `npm publish`

## Questions or Need Help?

- Open an issue for bugs and feature requests
- Check existing issues for similar topics
- Review documentation before asking

Thank you for contributing!
