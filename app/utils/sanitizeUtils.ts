import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * 
 * @param content - HTML content to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (content: string): string => {
  // Only run on client side as DOMPurify requires a DOM
  if (typeof window === 'undefined') {
    return content;
  }
  
  return DOMPurify.sanitize(content, {
    ADD_ATTR: ['target'],
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'strong', 'em', 'b', 'i', 'u', 'ul', 'ol', 
      'li', 'a', 'br', 'hr', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'code', 'pre', 
      'blockquote', 'img', 'figure', 'figcaption', 'section', 'article'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id', 'style', 'target', 'rel'
    ]
  });
}; 