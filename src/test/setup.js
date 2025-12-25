import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    fromTo: vi.fn(),
    to: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn(),
    })),
    registerPlugin: vi.fn(),
  },
  gsap: {
    fromTo: vi.fn(),
    to: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn(),
    })),
    registerPlugin: vi.fn(),
  },
  ScrollTrigger: {},
  SplitText: {},
}));

// Mock @gsap/react
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback) => {
    // Execute the callback immediately in tests
    if (typeof callback === 'function') {
      callback();
    }
  }),
}));

// Mock react-responsive
vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(() => false),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});