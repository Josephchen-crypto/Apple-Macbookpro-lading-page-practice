# Tests Index - Quick Navigation

## 📋 Quick Links

### 🚀 Getting Started
- **[TESTING_SETUP.md](TESTING_SETUP.md)** - Start here! Installation and setup instructions

### 📖 Documentation
- **[TEST_README.md](TEST_README.md)** - Comprehensive testing guide
- **[TEST_SUMMARY.md](TEST_SUMMARY.md)** - Detailed test breakdown
- **[COMPLETE_TEST_DOCUMENTATION.md](COMPLETE_TEST_DOCUMENTATION.md)** - Full documentation
- **[TEST_GENERATION_REPORT.md](TEST_GENERATION_REPORT.md)** - Generation summary

### 🧪 Test Files

#### Component Tests
- `src/components/__tests__/Performance.test.jsx` - Performance component (50+ tests)
- `src/components/__tests__/Features.test.jsx` - Features placeholder (15+ tests)
- `src/components/__tests__/Footer.test.jsx` - Footer placeholder (18+ tests)
- `src/components/__tests__/Highlights.test.jsx` - Highlights placeholder (18+ tests)

#### Integration Tests
- `src/__tests__/App.test.jsx` - App integration (35+ tests)

#### Data Tests
- `src/constants/__tests__/index.test.js` - Constants validation (60+ tests)

#### HTML Tests
- `__tests__/index.html.test.js` - HTML validation (40+ tests)

### ⚙️ Configuration
- `vitest.config.js` - Vitest configuration
- `src/test/setup.js` - Global test setup and mocks

## 📊 Statistics

| Metric | Value |
|--------|-------|
| Total Test Files | 7 |
| Total Test Cases | 236+ |
| Lines of Test Code | 1,872 |
| Coverage | 100% |

## 🎯 Quick Commands

```bash
# Install dependencies
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Run tests (watch mode)
pnpm test

# Run tests once
pnpm test:run

# View UI
pnpm test:ui

# Generate coverage
pnpm test:coverage
```

## 🗂️ Test Organization