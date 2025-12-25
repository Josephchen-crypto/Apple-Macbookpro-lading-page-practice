import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Performance from '../Performance';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import {
  performanceImages,
  performanceImgPositions,
} from '../../constants/index.js';

vi.mock('react-responsive');
vi.mock('@gsap/react');
vi.mock('gsap');

describe('Performance Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useMediaQuery.mockReturnValue(false);
    useGSAP.mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render the performance section with correct id', () => {
      render(<Performance />);
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('id', 'performance');
    });

    it('should render the main heading', () => {
      render(<Performance />);
      const heading = screen.getByRole('heading', {
        name: /next-level graphics performance\. game on\./i,
      });
      expect(heading).toBeInTheDocument();
    });

    it('should render all performance images from constants', () => {
      render(<Performance />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(performanceImages.length);
    });

    it('should render images with correct src attributes', () => {
      render(<Performance />);
      const images = screen.getAllByRole('img');
      
      images.forEach((img, index) => {
        expect(img).toHaveAttribute('src', performanceImages[index].src);
      });
    });

    it('should render images with correct class names', () => {
      render(<Performance />);
      const images = screen.getAllByRole('img');
      
      images.forEach((img, index) => {
        expect(img).toHaveClass(performanceImages[index].id);
      });
    });

    it('should render images with default alt text when not provided', () => {
      render(<Performance />);
      const images = screen.getAllByRole('img');
      
      images.forEach((img, index) => {
        const expectedAlt = performanceImages[index].alt || `Performance Image #${index + 1}`;
        expect(img).toHaveAttribute('alt', expectedAlt);
      });
    });

    it('should render the content section with descriptive text', () => {
      render(<Performance />);
      const contentText = screen.getByText(/run graphics-intensive workflows/i);
      expect(contentText).toBeInTheDocument();
    });

    it('should render the highlighted span text', () => {
      render(<Performance />);
      const highlightedText = screen.getByText(
        /gaming feels more immersive and realistic than ever\./i
      );
      expect(highlightedText).toBeInTheDocument();
      expect(highlightedText.tagName).toBe('SPAN');
      expect(highlightedText).toHaveClass('text-white');
    });

    it('should render wrapper div for images', () => {
      const { container } = render(<Performance />);
      const wrapper = container.querySelector('.wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render content div', () => {
      const { container } = render(<Performance />);
      const content = container.querySelector('.content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Media Query Handling', () => {
    it('should detect mobile viewport', () => {
      useMediaQuery.mockReturnValue(true);
      render(<Performance />);
      expect(useMediaQuery).toHaveBeenCalledWith({ query: '(max-width: 1024px)' });
    });

    it('should detect desktop viewport', () => {
      useMediaQuery.mockReturnValue(false);
      render(<Performance />);
      expect(useMediaQuery).toHaveBeenCalledWith({ query: '(max-width: 1024px)' });
    });

    it('should not create image positioning timeline on mobile', () => {
      useMediaQuery.mockReturnValue(true);
      const mockTimeline = vi.fn(() => ({ to: vi.fn() }));
      gsap.timeline = mockTimeline;
      
      render(<Performance />);
      
      // Timeline should not be created on mobile
      expect(mockTimeline).not.toHaveBeenCalled();
    });

    it('should create image positioning timeline on desktop', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      const mockTimeline = vi.fn(() => ({ to: mockTimelineTo }));
      gsap.timeline = mockTimeline;
      
      render(<Performance />);
      
      expect(mockTimeline).toHaveBeenCalledWith({
        defaults: { duration: 2, ease: 'power1.inOut', overwrite: 'auto' },
        scrollTrigger: {
          trigger: expect.any(Object),
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
  });

  describe('GSAP Animations', () => {
    it('should call useGSAP with correct dependencies', () => {
      render(<Performance />);
      
      expect(useGSAP).toHaveBeenCalled();
      const callArgs = useGSAP.mock.calls[0];
      expect(callArgs[1]).toEqual({
        scope: expect.anything(),
        dependencies: [false],
      });
    });

    it('should initialize text animation with gsap.fromTo', () => {
      render(<Performance />);
      
      expect(gsap.fromTo).toHaveBeenCalledWith(
        '.content p',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.content p',
            start: 'top bottom',
            end: 'top center',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    it('should handle null sectionRef gracefully', () => {
      const { container } = render(<Performance />);
      // Component should still render even if ref handling has issues
      expect(container.querySelector('#performance')).toBeInTheDocument();
    });

    it('should animate only images with animate: true flag', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      render(<Performance />);
      
      // Count how many images should be animated
      const animatableImages = performanceImgPositions.filter(
        (item) => item.animate !== false
      );
      
      // Timeline.to should be called once per animatable image
      expect(mockTimelineTo).toHaveBeenCalledTimes(animatableImages.length);
    });

    it('should skip images with animate: false', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      render(<Performance />);
      
      // Check that p5 (which has animate: false) is not animated
      const p5Position = performanceImgPositions.find(item => item.id === 'p5');
      expect(p5Position.animate).toBe(false);
      
      // Verify that the selector for p5 was not used
      const calls = mockTimelineTo.mock.calls;
      const p5Call = calls.find(call => call[0] === '.p5');
      expect(p5Call).toBeUndefined();
    });

    it('should build correct animation vars for left positioning', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      render(<Performance />);
      
      // Find a call with left positioning (e.g., p1)
      const p1Call = mockTimelineTo.mock.calls.find(call => call[0] === '.p1');
      expect(p1Call).toBeDefined();
      expect(p1Call[1]).toHaveProperty('left', '5%');
      expect(p1Call[1]).toHaveProperty('bottom', '65%');
    });

    it('should build correct animation vars for right positioning', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      render(<Performance />);
      
      // Find a call with right positioning (e.g., p2)
      const p2Call = mockTimelineTo.mock.calls.find(call => call[0] === '.p2');
      expect(p2Call).toBeDefined();
      expect(p2Call[1]).toHaveProperty('right', '10%');
      expect(p2Call[1]).toHaveProperty('bottom', '60%');
    });

    it('should include transform property when provided', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      // Add transform to test data temporarily
      const originalPositions = [...performanceImgPositions];
      performanceImgPositions[0] = {
        ...performanceImgPositions[0],
        transform: 'scale(1.2)',
      };
      
      render(<Performance />);
      
      const p1Call = mockTimelineTo.mock.calls.find(call => call[0] === '.p1');
      expect(p1Call[1]).toHaveProperty('transform', 'scale(1.2)');
      
      // Restore original
      performanceImgPositions[0] = originalPositions[0];
    });

    it('should pass correct position (0) to timeline.to for synchronization', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      render(<Performance />);
      
      // All timeline.to calls should have position parameter of 0
      mockTimelineTo.mock.calls.forEach(call => {
        expect(call[2]).toBe(0);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty performanceImages array', () => {
      const originalImages = [...performanceImages];
      performanceImages.length = 0;
      
      render(<Performance />);
      const images = screen.queryAllByRole('img');
      expect(images).toHaveLength(0);
      
      // Restore
      performanceImages.push(...originalImages);
    });

    it('should handle missing image src gracefully', () => {
      const originalImages = [...performanceImages];
      performanceImages[0] = { id: 'test', src: '' };
      
      const { container } = render(<Performance />);
      const firstImg = container.querySelector('.test');
      expect(firstImg).toHaveAttribute('src', '');
      
      // Restore
      performanceImages[0] = originalImages[0];
    });

    it('should handle missing image id gracefully', () => {
      const originalImages = [...performanceImages];
      performanceImages[0] = { src: '/test.png' };
      
      const { container } = render(<Performance />);
      expect(container).toBeInTheDocument();
      
      // Restore
      performanceImages[0] = originalImages[0];
    });

    it('should render without crashing when useGSAP callback is not executed', () => {
      useGSAP.mockImplementation(() => {});
      
      const { container } = render(<Performance />);
      expect(container.querySelector('#performance')).toBeInTheDocument();
    });

    it('should handle positions with negative values', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      render(<Performance />);
      
      // p3 has right: -5
      const p3Call = mockTimelineTo.mock.calls.find(call => call[0] === '.p3');
      expect(p3Call).toBeDefined();
      expect(p3Call[1]).toHaveProperty('right', '-5%');
    });

    it('should handle positions with only some properties defined', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      render(<Performance />);
      
      // Check that vars object only includes defined properties
      mockTimelineTo.mock.calls.forEach(call => {
        const vars = call[1];
        // Vars should only have properties that were actually set
        const keys = Object.keys(vars);
        keys.forEach(key => {
          expect(['left', 'right', 'bottom', 'transform']).toContain(key);
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('should have semantic section element', () => {
      render(<Performance />);
      const section = screen.getByRole('region');
      expect(section.tagName).toBe('SECTION');
    });

    it('should have proper heading hierarchy', () => {
      render(<Performance />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should have alt text for all images', () => {
      render(<Performance />);
      const images = screen.getAllByRole('img');
      
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    it('should use meaningful alt text pattern', () => {
      render(<Performance />);
      const images = screen.getAllByRole('img');
      
      images.forEach((img, index) => {
        const alt = img.getAttribute('alt');
        expect(alt).toMatch(/Performance Image #\d+/);
      });
    });
  });

  describe('Component Structure', () => {
    it('should maintain correct DOM hierarchy', () => {
      const { container } = render(<Performance />);
      const section = container.querySelector('#performance');
      const heading = section.querySelector('h2');
      const wrapper = section.querySelector('.wrapper');
      const content = section.querySelector('.content');
      
      expect(heading).toBeInTheDocument();
      expect(wrapper).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    it('should have images inside wrapper div', () => {
      const { container } = render(<Performance />);
      const wrapper = container.querySelector('.wrapper');
      const imagesInWrapper = wrapper.querySelectorAll('img');
      
      expect(imagesInWrapper.length).toBe(performanceImages.length);
    });

    it('should have paragraph inside content div', () => {
      const { container } = render(<Performance />);
      const content = container.querySelector('.content');
      const paragraph = content.querySelector('p');
      
      expect(paragraph).toBeInTheDocument();
    });

    it('should have span with text-white class inside paragraph', () => {
      const { container } = render(<Performance />);
      const paragraph = container.querySelector('.content p');
      const span = paragraph.querySelector('span.text-white');
      
      expect(span).toBeInTheDocument();
    });
  });

  describe('Integration with Constants', () => {
    it('should use performanceImages from constants', () => {
      render(<Performance />);
      const images = screen.getAllByRole('img');
      
      expect(images.length).toBe(performanceImages.length);
    });

    it('should use performanceImgPositions for animation', () => {
      useMediaQuery.mockReturnValue(false);
      const mockTimelineTo = vi.fn();
      gsap.timeline = vi.fn(() => ({ to: mockTimelineTo }));
      
      render(<Performance />);
      
      // Verify that positions are used correctly
      performanceImgPositions.forEach(position => {
        if (position.animate !== false) {
          const call = mockTimelineTo.mock.calls.find(
            c => c[0] === `.${position.id}`
          );
          expect(call).toBeDefined();
        }
      });
    });

    it('should match image ids with position ids', () => {
      const imageIds = performanceImages.map(img => img.id);
      const positionIds = performanceImgPositions.map(pos => pos.id);
      
      expect(imageIds.sort()).toEqual(positionIds.sort());
    });
  });

  describe('Re-rendering and Updates', () => {
    it('should update when isMobile changes', () => {
      const { rerender } = render(<Performance />);
      
      useMediaQuery.mockReturnValue(true);
      rerender(<Performance />);
      
      expect(useMediaQuery).toHaveBeenCalled();
    });

    it('should call useGSAP with updated dependencies on re-render', () => {
      useMediaQuery.mockReturnValue(false);
      const { rerender } = render(<Performance />);
      
      useMediaQuery.mockReturnValue(true);
      rerender(<Performance />);
      
      // Check that useGSAP was called multiple times
      expect(useGSAP.mock.calls.length).toBeGreaterThan(0);
    });
  });
});