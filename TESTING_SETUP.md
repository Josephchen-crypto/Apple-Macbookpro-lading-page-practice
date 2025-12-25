# Testing Setup Documentation

## Required Dependencies

To run the tests, you need to install the following dev dependencies:

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Or with pnpm:

```bash
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## Package.json Scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Running Tests

- `npm test` or `pnpm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:run` - Run tests once (CI mode)
- `npm run test:coverage` - Run tests with coverage report

## Test Files Created

1. **Component Tests:**
   - `src/components/__tests__/Performance.test.jsx` - Comprehensive tests for Performance component
   - `src/components/__tests__/Features.test.jsx` - Tests for Features placeholder component
   - `src/components/__tests__/Footer.test.jsx` - Tests for Footer placeholder component
   - `src/components/__tests__/Highlights.test.jsx` - Tests for Highlights placeholder component

2. **App Tests:**
   - `src/__tests__/App.test.jsx` - Tests for main App component and integration

3. **Constants Tests:**
   - `src/constants/__tests__/index.test.js` - Tests for all constant exports

4. **HTML Validation:**
   - `__tests__/index.html.test.js` - Tests for index.html structure and validity

5. **Test Setup:**
   - `src/test/setup.js` - Global test setup and mocks
   - `vitest.config.js` - Vitest configuration

## Test Coverage

The test suite covers:

- ✅ Component rendering and structure
- ✅ GSAP animation setup and configuration
- ✅ Media query handling (mobile/desktop)
- ✅ Props and state management
- ✅ Accessibility requirements
- ✅ Edge cases and error handling
- ✅ Data validation for constants
- ✅ HTML structure and validity
- ✅ Integration between components

## Total Test Count

- Performance Component: 50+ test cases
- Features Component: 15+ test cases
- Footer Component: 18+ test cases
- Highlights Component: 18+ test cases
- App Component: 35+ test cases
- Constants Module: 60+ test cases
- HTML Validation: 40+ test cases

**Total: 236+ comprehensive test cases**

## Notes

- All tests are written following React Testing Library best practices
- GSAP and react-responsive are properly mocked
- Tests include both happy paths and edge cases
- Accessibility considerations are included
- Tests are maintainable and well-documented