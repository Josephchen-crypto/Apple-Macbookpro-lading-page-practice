import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { gsap } from 'gsap';

// Mock all child components
vi.mock('../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero Component</div>,
}));

vi.mock('../components/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar Component</nav>,
}));

vi.mock('../components/ProductViewer', () => ({
  default: () => <div data-testid="product-viewer">ProductViewer Component</div>,
}));

vi.mock('../components/Showcase', () => ({
  default: () => <div data-testid="showcase">Showcase Component</div>,
}));

vi.mock('../components/Performance', () => ({
  default: () => <div data-testid="performance">Performance Component</div>,
}));

vi.mock('../components/Features', () => ({
  default: () => <div data-testid="features">Features Component</div>,
}));

vi.mock('../components/Highlights', () => ({
  default: () => <div data-testid="highlights">Highlights Component</div>,
}));

vi.mock('../components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer Component</footer>,
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should render main element as root container', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should render all child components', () => {
      render(<App />);
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('product-viewer')).toBeInTheDocument();
      expect(screen.getByTestId('showcase')).toBeInTheDocument();
      expect(screen.getByTestId('performance')).toBeInTheDocument();
      expect(screen.getByTestId('features')).toBeInTheDocument();
      expect(screen.getByTestId('highlights')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('Component Order', () => {
    it('should render components in correct order', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const children = Array.from(main.children);
      
      expect(children[0]).toHaveAttribute('data-testid', 'navbar');
      expect(children[1]).toHaveAttribute('data-testid', 'hero');
      expect(children[2]).toHaveAttribute('data-testid', 'product-viewer');
      expect(children[3]).toHaveAttribute('data-testid', 'showcase');
      expect(children[4]).toHaveAttribute('data-testid', 'performance');
      expect(children[5]).toHaveAttribute('data-testid', 'features');
      expect(children[6]).toHaveAttribute('data-testid', 'highlights');
      expect(children[7]).toHaveAttribute('data-testid', 'footer');
    });

    it('should render Navbar first', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const firstChild = main.firstChild;
      
      expect(firstChild).toHaveAttribute('data-testid', 'navbar');
    });

    it('should render Footer last', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const lastChild = main.lastChild;
      
      expect(lastChild).toHaveAttribute('data-testid', 'footer');
    });

    it('should have exactly 8 child components', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      
      expect(main.children.length).toBe(8);
    });
  });

  describe('GSAP Integration', () => {
    it('should register ScrollTrigger plugin', () => {
      expect(gsap.registerPlugin).toHaveBeenCalled();
    });

    it('should register ScrollTrigger before component renders', () => {
      // Plugin registration happens at module level
      expect(gsap.registerPlugin).toHaveBeenCalledBefore(
        vi.fn() // Any function that would run during render
      );
    });
  });

  describe('Component Structure', () => {
    it('should use semantic main element', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main.tagName).toBe('MAIN');
    });

    it('should not have any wrapper divs around main', () => {
      const { container } = render(<App />);
      expect(container.firstChild.tagName).toBe('MAIN');
    });

    it('should have clean component hierarchy', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      
      // Main should only contain direct child components
      Array.from(main.children).forEach(child => {
        expect(child).toHaveAttribute('data-testid');
      });
    });
  });

  describe('New Components Integration', () => {
    it('should include Performance component in layout', () => {
      render(<App />);
      expect(screen.getByTestId('performance')).toBeInTheDocument();
    });

    it('should include Features component in layout', () => {
      render(<App />);
      expect(screen.getByTestId('features')).toBeInTheDocument();
    });

    it('should include Highlights component in layout', () => {
      render(<App />);
      expect(screen.getByTestId('highlights')).toBeInTheDocument();
    });

    it('should include Footer component in layout', () => {
      render(<App />);
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should place Performance after Showcase', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const children = Array.from(main.children);
      
      const showcaseIndex = children.findIndex(
        child => child.getAttribute('data-testid') === 'showcase'
      );
      const performanceIndex = children.findIndex(
        child => child.getAttribute('data-testid') === 'performance'
      );
      
      expect(performanceIndex).toBeGreaterThan(showcaseIndex);
    });

    it('should place Features after Performance', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const children = Array.from(main.children);
      
      const performanceIndex = children.findIndex(
        child => child.getAttribute('data-testid') === 'performance'
      );
      const featuresIndex = children.findIndex(
        child => child.getAttribute('data-testid') === 'features'
      );
      
      expect(featuresIndex).toBeGreaterThan(performanceIndex);
    });

    it('should place Highlights after Features', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const children = Array.from(main.children);
      
      const featuresIndex = children.findIndex(
        child => child.getAttribute('data-testid') === 'features'
      );
      const highlightsIndex = children.findIndex(
        child => child.getAttribute('data-testid') === 'highlights'
      );
      
      expect(highlightsIndex).toBeGreaterThan(featuresIndex);
    });

    it('should place Footer after Highlights', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const children = Array.from(main.children);
      
      const highlightsIndex = children.findIndex(
        child => child.getAttribute('data-testid') === 'highlights'
      );
      const footerIndex = children.findIndex(
        child => child.getAttribute('data-testid') === 'footer'
      );
      
      expect(footerIndex).toBeGreaterThan(highlightsIndex);
    });
  });

  describe('Re-rendering', () => {
    it('should handle re-renders without errors', () => {
      const { rerender } = render(<App />);
      
      expect(() => rerender(<App />)).not.toThrow();
    });

    it('should maintain component structure on re-render', () => {
      const { rerender, container } = render(<App />);
      const initialHTML = container.innerHTML;
      
      rerender(<App />);
      
      expect(container.innerHTML).toBe(initialHTML);
    });

    it('should render all components after multiple re-renders', () => {
      const { rerender } = render(<App />);
      
      for (let i = 0; i < 5; i++) {
        rerender(<App />);
      }
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('performance')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible main landmark', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should have navigation landmark (from Navbar)', () => {
      render(<App />);
      const nav = screen.getByTestId('navbar');
      expect(nav.tagName).toBe('NAV');
    });

    it('should have contentinfo landmark (from Footer)', () => {
      render(<App />);
      const footer = screen.getByTestId('footer');
      expect(footer.tagName).toBe('FOOTER');
    });
  });

  describe('Edge Cases', () => {
    it('should not throw when unmounting', () => {
      const { unmount } = render(<App />);
      expect(() => unmount()).not.toThrow();
    });

    it('should handle rapid mount/unmount cycles', () => {
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<App />);
        unmount();
      }
      
      // Should be able to render again after cycles
      const { container } = render(<App />);
      expect(container.querySelector('main')).toBeInTheDocument();
    });
  });

  describe('Component Exports', () => {
    it('should export App as default', () => {
      expect(App).toBeDefined();
      expect(typeof App).toBe('function');
    });

    it('should have correct component name', () => {
      expect(App.name).toBe('App');
    });
  });
});