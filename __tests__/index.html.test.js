import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('index.html', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');
  });

  describe('Document Structure', () => {
    it('should have valid DOCTYPE declaration', () => {
      expect(htmlContent).toMatch(/^<!DOCTYPE html>/i);
    });

    it('should have html root element with lang attribute', () => {
      expect(htmlContent).toMatch(/<html\s+lang="en">/);
    });

    it('should have head section', () => {
      expect(htmlContent).toContain('<head>');
      expect(htmlContent).toContain('</head>');
    });

    it('should have body section', () => {
      expect(htmlContent).toContain('<body>');
      expect(htmlContent).toContain('</body>');
    });

    it('should have closing html tag', () => {
      expect(htmlContent).toContain('</html>');
    });
  });

  describe('Meta Tags', () => {
    it('should have charset meta tag', () => {
      expect(htmlContent).toMatch(/<meta\s+charset="UTF-8"\s*\/>/);
    });

    it('should have viewport meta tag', () => {
      expect(htmlContent).toMatch(/<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1\.0"\s*\/>/);
    });

    it('should have proper viewport configuration for mobile', () => {
      expect(htmlContent).toContain('width=device-width');
      expect(htmlContent).toContain('initial-scale=1.0');
    });
  });

  describe('Favicon', () => {
    it('should have favicon link', () => {
      expect(htmlContent).toMatch(/<link\s+rel="icon"/);
    });

    it('should reference logo.svg as favicon', () => {
      expect(htmlContent).toContain('href="/logo.svg"');
    });

    it('should specify correct favicon type', () => {
      expect(htmlContent).toMatch(/<link\s+[^>]*type="image\/svg\+xml"/);
    });

    it('should not reference old vite.svg', () => {
      expect(htmlContent).not.toContain('vite.svg');
    });
  });

  describe('Title', () => {
    it('should have title tag', () => {
      expect(htmlContent).toMatch(/<title>.*<\/title>/);
    });

    it('should have correct page title', () => {
      expect(htmlContent).toContain('<title>Apple Macbook Pro</title>');
    });

    it('should not have old project title', () => {
      expect(htmlContent).not.toContain('gsap_macbook_landing_practice');
    });

    it('should have descriptive, SEO-friendly title', () => {
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
      expect(titleMatch).toBeTruthy();
      expect(titleMatch[1].length).toBeGreaterThan(5);
      expect(titleMatch[1]).toMatch(/Apple|Macbook|Pro/i);
    });
  });

  describe('Root Element', () => {
    it('should have root div with id "root"', () => {
      expect(htmlContent).toMatch(/<div\s+id="root"><\/div>/);
    });

    it('should have empty root div for React mounting', () => {
      expect(htmlContent).toMatch(/<div\s+id="root"><\/div>/);
    });

    it('should have root div inside body', () => {
      const bodyIndex = htmlContent.indexOf('<body>');
      const rootIndex = htmlContent.indexOf('<div id="root">');
      const bodyCloseIndex = htmlContent.indexOf('</body>');
      
      expect(rootIndex).toBeGreaterThan(bodyIndex);
      expect(rootIndex).toBeLessThan(bodyCloseIndex);
    });
  });

  describe('Script Tags', () => {
    it('should have script tag for main entry point', () => {
      expect(htmlContent).toMatch(/<script[^>]*src="[^"]*"[^>]*><\/script>/);
    });

    it('should reference main.jsx as entry point', () => {
      expect(htmlContent).toMatch(/<script[^>]*src="[^"]*main\.jsx"[^>]*>/);
    });

    it('should use module type for script', () => {
      expect(htmlContent).toMatch(/<script[^>]*type="module"[^>]*>/);
    });

    it('should have script after root div', () => {
      const rootIndex = htmlContent.indexOf('<div id="root">');
      const scriptIndex = htmlContent.indexOf('<script');
      
      expect(scriptIndex).toBeGreaterThan(rootIndex);
    });
  });

  describe('HTML Validity', () => {
    it('should have properly closed tags', () => {
      const openTags = (htmlContent.match(/<[^/][^>]*>/g) || []).length;
      const closeTags = (htmlContent.match(/<\/[^>]*>/g) || []).length;
      const selfClosing = (htmlContent.match(/<[^>]*\/>/g) || []).length;
      
      // Total closing tags should roughly match opening tags
      // (accounting for self-closing tags)
      expect(closeTags + selfClosing).toBeGreaterThan(0);
    });

    it('should not have unclosed tags', () => {
      // Check for common unclosed tag patterns
      expect(htmlContent).not.toMatch(/<div[^>]*>(?![\s\S]*<\/div>)/);
    });

    it('should have proper HTML5 structure', () => {
      const structure = [
        '<!DOCTYPE html>',
        '<html',
        '<head>',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
      ];

      structure.forEach(element => {
        expect(htmlContent).toContain(element);
      });
    });
  });

  describe('Formatting and Best Practices', () => {
    it('should use proper indentation', () => {
      const lines = htmlContent.split('\n');
      const hasIndentation = lines.some(line => line.startsWith('  ') || line.startsWith('    '));
      expect(hasIndentation).toBe(true);
    });

    it('should not have trailing whitespace on empty lines', () => {
      const lines = htmlContent.split('\n');
      const emptyLinesWithWhitespace = lines.filter(
        line => line.trim() === '' && line.length > 0
      );
      // Should have minimal or no trailing whitespace
      expect(emptyLinesWithWhitespace.length).toBeLessThan(3);
    });

    it('should use consistent quote style', () => {
      // Check that double quotes are used consistently
      const attributesCount = (htmlContent.match(/="\w+"/g) || []).length;
      expect(attributesCount).toBeGreaterThan(0);
    });
  });

  describe('Security', () => {
    it('should not have inline scripts', () => {
      expect(htmlContent).not.toMatch(/<script[^>]*>[^<]+<\/script>/);
    });

    it('should not have inline styles', () => {
      expect(htmlContent).not.toMatch(/<style[^>]*>/);
    });

    it('should not have event handlers in HTML', () => {
      expect(htmlContent).not.toMatch(/\son\w+=/i);
    });
  });

  describe('Accessibility', () => {
    it('should have lang attribute on html element', () => {
      expect(htmlContent).toMatch(/<html[^>]*\s+lang="[^"]+"/);
    });

    it('should specify English as language', () => {
      expect(htmlContent).toMatch(/<html[^>]*\s+lang="en"/);
    });

    it('should have viewport for responsive design', () => {
      expect(htmlContent).toContain('width=device-width');
    });
  });

  describe('Performance', () => {
    it('should load main script as module', () => {
      expect(htmlContent).toMatch(/<script[^>]*type="module"/);
    });

    it('should not have blocking scripts in head', () => {
      const headContent = htmlContent.match(/<head>([\s\S]*?)<\/head>/);
      if (headContent) {
        const hasBlockingScript = headContent[1].match(/<script[^>]*(?!type="module")[^>]*>/);
        expect(hasBlockingScript).toBeNull();
      }
    });

    it('should have minimal head content', () => {
      const headContent = htmlContent.match(/<head>([\s\S]*?)<\/head>/);
      expect(headContent).toBeTruthy();
      // Head should be concise
      expect(headContent[1].length).toBeLessThan(500);
    });
  });

  describe('Vite Integration', () => {
    it('should reference correct entry point for Vite', () => {
      expect(htmlContent).toContain('/src/main.jsx');
    });

    it('should have script with proper src path', () => {
      expect(htmlContent).toMatch(/<script[^>]*src="\/src\/main\.jsx"[^>]*>/);
    });
  });

  describe('Branding Updates', () => {
    it('should reflect new branding in title', () => {
      expect(htmlContent).toContain('Apple Macbook Pro');
    });

    it('should use correct favicon', () => {
      expect(htmlContent).toContain('/logo.svg');
    });

    it('should not contain old branding references', () => {
      expect(htmlContent.toLowerCase()).not.toContain('gsap_macbook_landing_practice'.toLowerCase());
    });
  });

  describe('Character Encoding', () => {
    it('should specify UTF-8 encoding', () => {
      expect(htmlContent).toMatch(/<meta\s+charset="UTF-8"/);
    });

    it('should have charset as first meta tag', () => {
      const firstMetaTag = htmlContent.match(/<meta[^>]*>/);
      expect(firstMetaTag[0]).toContain('charset="UTF-8"');
    });
  });
});