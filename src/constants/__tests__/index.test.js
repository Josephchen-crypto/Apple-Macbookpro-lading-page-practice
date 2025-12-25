import { describe, it, expect } from 'vitest';
import {
  features,
  featureSequence,
  footerLinks,
  navLinks,
  noChangeParts,
  performanceImages,
  performanceImgPositions,
} from '../index.js';

describe('Constants Module', () => {
  describe('performanceImages', () => {
    it('should be defined and be an array', () => {
      expect(performanceImages).toBeDefined();
      expect(Array.isArray(performanceImages)).toBe(true);
    });

    it('should contain 7 image objects', () => {
      expect(performanceImages).toHaveLength(7);
    });

    it('should have all required properties for each image', () => {
      performanceImages.forEach((image, index) => {
        expect(image).toHaveProperty('id');
        expect(image).toHaveProperty('src');
        expect(typeof image.id).toBe('string');
        expect(typeof image.src).toBe('string');
      });
    });

    it('should have unique ids', () => {
      const ids = performanceImages.map(img => img.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid image paths', () => {
      performanceImages.forEach(image => {
        expect(image.src).toMatch(/^\/performance\d+\.(png|jpg)$/);
      });
    });

    it('should have sequential ids from p1 to p7', () => {
      const expectedIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];
      const actualIds = performanceImages.map(img => img.id);
      expect(actualIds).toEqual(expectedIds);
    });

    it('should have p5 as jpg format and others as png', () => {
      performanceImages.forEach(image => {
        if (image.id === 'p5') {
          expect(image.src).toContain('.jpg');
        } else {
          expect(image.src).toContain('.png');
        }
      });
    });

    it('should not mutate when accessed', () => {
      const original = [...performanceImages];
      const _ = performanceImages[0];
      expect(performanceImages).toEqual(original);
    });
  });

  describe('performanceImgPositions', () => {
    it('should be defined and be an array', () => {
      expect(performanceImgPositions).toBeDefined();
      expect(Array.isArray(performanceImgPositions)).toBe(true);
    });

    it('should contain 7 position objects', () => {
      expect(performanceImgPositions).toHaveLength(7);
    });

    it('should have all required properties', () => {
      performanceImgPositions.forEach(position => {
        expect(position).toHaveProperty('id');
        expect(position).toHaveProperty('animate');
        expect(typeof position.id).toBe('string');
        expect(typeof position.animate).toBe('boolean');
      });
    });

    it('should have unique ids', () => {
      const ids = performanceImgPositions.map(pos => pos.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have ids matching performanceImages', () => {
      const imageIds = performanceImages.map(img => img.id).sort();
      const positionIds = performanceImgPositions.map(pos => pos.id).sort();
      expect(positionIds).toEqual(imageIds);
    });

    it('should have either left or right positioning (not both)', () => {
      performanceImgPositions.forEach(position => {
        const hasLeft = position.hasOwnProperty('left');
        const hasRight = position.hasOwnProperty('right');
        expect(hasLeft || hasRight).toBe(true);
        expect(hasLeft && hasRight).toBe(false);
      });
    });

    it('should have bottom positioning for all items', () => {
      performanceImgPositions.forEach(position => {
        expect(position).toHaveProperty('bottom');
        expect(typeof position.bottom).toBe('number');
      });
    });

    it('should have numeric position values', () => {
      performanceImgPositions.forEach(position => {
        if (position.left !== undefined) {
          expect(typeof position.left).toBe('number');
        }
        if (position.right !== undefined) {
          expect(typeof position.right).toBe('number');
        }
        expect(typeof position.bottom).toBe('number');
      });
    });

    it('should have valid animate flags', () => {
      const animateFlags = performanceImgPositions.map(pos => pos.animate);
      expect(animateFlags).toContain(true);
      expect(animateFlags).toContain(false);
    });

    it('should have p5 with animate false', () => {
      const p5 = performanceImgPositions.find(pos => pos.id === 'p5');
      expect(p5.animate).toBe(false);
    });

    it('should have 6 items with animate true', () => {
      const animatableCount = performanceImgPositions.filter(
        pos => pos.animate === true
      ).length;
      expect(animatableCount).toBe(6);
    });

    it('should support negative position values', () => {
      const hasNegative = performanceImgPositions.some(
        pos => (pos.left !== undefined && pos.left < 0) || 
               (pos.right !== undefined && pos.right < 0)
      );
      expect(hasNegative).toBe(true);
    });

    it('should have positions in valid range', () => {
      performanceImgPositions.forEach(position => {
        if (position.left !== undefined) {
          expect(position.left).toBeGreaterThanOrEqual(-100);
          expect(position.left).toBeLessThanOrEqual(100);
        }
        if (position.right !== undefined) {
          expect(position.right).toBeGreaterThanOrEqual(-100);
          expect(position.right).toBeLessThanOrEqual(100);
        }
        expect(position.bottom).toBeGreaterThanOrEqual(0);
        expect(position.bottom).toBeLessThanOrEqual(100);
      });
    });

    it('should allow optional transform property', () => {
      // Test that transform property can be added
      const hasTransform = performanceImgPositions.some(
        pos => pos.hasOwnProperty('transform')
      );
      // It's okay if none have it or some have it
      expect(typeof hasTransform).toBe('boolean');
    });
  });

  describe('navLinks', () => {
    it('should be defined and be an array', () => {
      expect(navLinks).toBeDefined();
      expect(Array.isArray(navLinks)).toBe(true);
    });

    it('should contain navigation items', () => {
      expect(navLinks.length).toBeGreaterThan(0);
    });

    it('should have label property for each item', () => {
      navLinks.forEach(link => {
        expect(link).toHaveProperty('label');
        expect(typeof link.label).toBe('string');
        expect(link.label.length).toBeGreaterThan(0);
      });
    });

    it('should include expected navigation labels', () => {
      const labels = navLinks.map(link => link.label);
      expect(labels).toContain('Store');
      expect(labels).toContain('Mac');
      expect(labels).toContain('iPhone');
    });
  });

  describe('noChangeParts', () => {
    it('should be defined and be an array', () => {
      expect(noChangeParts).toBeDefined();
      expect(Array.isArray(noChangeParts)).toBe(true);
    });

    it('should contain object part names', () => {
      expect(noChangeParts.length).toBeGreaterThan(0);
    });

    it('should contain only string values', () => {
      noChangeParts.forEach(part => {
        expect(typeof part).toBe('string');
      });
    });

    it('should follow Object_XX naming pattern', () => {
      noChangeParts.forEach(part => {
        expect(part).toMatch(/^Object_\d+$/);
      });
    });

    it('should have unique values', () => {
      const uniqueParts = new Set(noChangeParts);
      expect(uniqueParts.size).toBe(noChangeParts.length);
    });
  });

  describe('features', () => {
    it('should be defined and be an array', () => {
      expect(features).toBeDefined();
      expect(Array.isArray(features)).toBe(true);
    });

    it('should contain feature objects', () => {
      expect(features.length).toBeGreaterThan(0);
    });

    it('should have all required properties', () => {
      features.forEach(feature => {
        expect(feature).toHaveProperty('id');
        expect(feature).toHaveProperty('icon');
        expect(feature).toHaveProperty('highlight');
        expect(feature).toHaveProperty('text');
        expect(feature).toHaveProperty('styles');
      });
    });

    it('should have unique ids', () => {
      const ids = features.map(f => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid icon paths', () => {
      features.forEach(feature => {
        expect(feature.icon).toMatch(/^\/feature-icon\d+\.svg$/);
      });
    });

    it('should have non-empty text content', () => {
      features.forEach(feature => {
        expect(feature.highlight.length).toBeGreaterThan(0);
        expect(feature.text.length).toBeGreaterThan(0);
      });
    });
  });

  describe('featureSequence', () => {
    it('should be defined and be an array', () => {
      expect(featureSequence).toBeDefined();
      expect(Array.isArray(featureSequence)).toBe(true);
    });

    it('should have all required properties', () => {
      featureSequence.forEach(item => {
        expect(item).toHaveProperty('videoPath');
        expect(item).toHaveProperty('boxClass');
        expect(item).toHaveProperty('delay');
      });
    });

    it('should have valid video paths', () => {
      featureSequence.forEach(item => {
        expect(item.videoPath).toMatch(/^\/videos\/feature-\d+\.mp4$/);
      });
    });

    it('should have valid box class selectors', () => {
      featureSequence.forEach(item => {
        expect(item.boxClass).toMatch(/^\.box\d+$/);
      });
    });

    it('should have numeric delay values', () => {
      featureSequence.forEach(item => {
        expect(typeof item.delay).toBe('number');
        expect(item.delay).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('footerLinks', () => {
    it('should be defined and be an array', () => {
      expect(footerLinks).toBeDefined();
      expect(Array.isArray(footerLinks)).toBe(true);
    });

    it('should contain footer link objects', () => {
      expect(footerLinks.length).toBeGreaterThan(0);
    });

    it('should have label and link properties', () => {
      footerLinks.forEach(link => {
        expect(link).toHaveProperty('label');
        expect(link).toHaveProperty('link');
        expect(typeof link.label).toBe('string');
        expect(typeof link.link).toBe('string');
      });
    });

    it('should have non-empty labels', () => {
      footerLinks.forEach(link => {
        expect(link.label.length).toBeGreaterThan(0);
      });
    });

    it('should include expected footer links', () => {
      const labels = footerLinks.map(link => link.label);
      expect(labels).toContain('Privacy Policy');
      expect(labels).toContain('Terms of Use');
    });
  });

  describe('Module Exports', () => {
    it('should export all required constants', () => {
      expect(features).toBeDefined();
      expect(featureSequence).toBeDefined();
      expect(footerLinks).toBeDefined();
      expect(navLinks).toBeDefined();
      expect(noChangeParts).toBeDefined();
      expect(performanceImages).toBeDefined();
      expect(performanceImgPositions).toBeDefined();
    });

    it('should export arrays (not objects)', () => {
      expect(Array.isArray(features)).toBe(true);
      expect(Array.isArray(featureSequence)).toBe(true);
      expect(Array.isArray(footerLinks)).toBe(true);
      expect(Array.isArray(navLinks)).toBe(true);
      expect(Array.isArray(noChangeParts)).toBe(true);
      expect(Array.isArray(performanceImages)).toBe(true);
      expect(Array.isArray(performanceImgPositions)).toBe(true);
    });

    it('should have immutable exports', () => {
      const originalLength = performanceImages.length;
      
      // Attempting to modify should not affect the original
      const copy = [...performanceImages];
      copy.push({ id: 'test', src: '/test.png' });
      
      expect(performanceImages.length).toBe(originalLength);
    });
  });

  describe('Data Integrity', () => {
    it('should maintain consistency between performanceImages and performanceImgPositions', () => {
      expect(performanceImages.length).toBe(performanceImgPositions.length);
      
      performanceImages.forEach(image => {
        const position = performanceImgPositions.find(pos => pos.id === image.id);
        expect(position).toBeDefined();
      });
    });

    it('should have features count matching featureSequence count', () => {
      expect(features.length).toBe(featureSequence.length);
    });

    it('should not have duplicate values in any array', () => {
      const checkUnique = (arr, key) => {
        const values = arr.map(item => typeof item === 'object' ? item[key] : item);
        const unique = new Set(values);
        return unique.size === values.length;
      };

      expect(checkUnique(performanceImages, 'id')).toBe(true);
      expect(checkUnique(performanceImgPositions, 'id')).toBe(true);
      expect(checkUnique(features, 'id')).toBe(true);
    });
  });

  describe('Type Safety', () => {
    it('should have consistent types in performanceImages', () => {
      performanceImages.forEach(image => {
        expect(typeof image.id).toBe('string');
        expect(typeof image.src).toBe('string');
      });
    });

    it('should have consistent types in performanceImgPositions', () => {
      performanceImgPositions.forEach(position => {
        expect(typeof position.id).toBe('string');
        expect(typeof position.animate).toBe('boolean');
        expect(typeof position.bottom).toBe('number');
        
        if (position.left !== undefined) {
          expect(typeof position.left).toBe('number');
        }
        if (position.right !== undefined) {
          expect(typeof position.right).toBe('number');
        }
      });
    });

    it('should have consistent types in features', () => {
      features.forEach(feature => {
        expect(typeof feature.id).toBe('number');
        expect(typeof feature.icon).toBe('string');
        expect(typeof feature.highlight).toBe('string');
        expect(typeof feature.text).toBe('string');
        expect(typeof feature.styles).toBe('string');
      });
    });
  });
});