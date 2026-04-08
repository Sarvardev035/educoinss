import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteFromLabel } from '../../utils/routeMap';

const BOOLEAN_ATTRIBUTES = new Set(['checked', 'selected', 'disabled', 'readonly', 'multiple', 'autofocus']);
const FORM_TAGS = new Set(['input', 'textarea', 'select']);

const toCamelCase = (value) => value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

const parseStyle = (styleText) =>
  styleText
    .split(';')
    .map((rule) => rule.trim())
    .filter(Boolean)
    .reduce((styles, rule) => {
      const [rawKey, ...rest] = rule.split(':');
      if (!rawKey || rest.length === 0) return styles;
      const key = toCamelCase(rawKey.trim());
      const value = rest.join(':').trim();
      if (key) styles[key] = value;
      return styles;
    }, {});

const toPath = (onclickValue) => {
  const match = onclickValue.match(/window\.location\.(?:href|assign)\s*=\s*['"]([^'"]+)['"]/);
  return match ? match[1] : null;
};

const nodeToReact = (node, key, navigate, pathname) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const tagName = node.tagName.toLowerCase();
  const props = { key };
  let childNodes = Array.from(node.childNodes)
    .map((child, index) => nodeToReact(child, `${key}-${index}`, navigate, pathname))
    .filter((child) => child !== null && child !== undefined);

  for (const attr of Array.from(node.attributes)) {
    const name = attr.name.toLowerCase();
    const value = attr.value;

    if (name === 'class') {
      props.className = value;
      continue;
    }

    if (name === 'for') {
      props.htmlFor = value;
      continue;
    }

    if (name === 'style') {
      props.style = parseStyle(value);
      continue;
    }

    if (name === 'onclick') {
      const path = toPath(value);
      if (path) {
        props.onClick = (event) => {
          event.preventDefault();
          if (path.startsWith('/')) {
            navigate(path);
            return;
          }
          window.location.href = path;
        };
      }
      continue;
    }

    if (BOOLEAN_ATTRIBUTES.has(name)) {
      props[name] = true;
      continue;
    }

    if (FORM_TAGS.has(tagName) && name === 'value') {
      props.defaultValue = value;
      continue;
    }

    props[name] = value;
  }

  if (tagName === 'textarea') {
    props.defaultValue = node.textContent;
    childNodes = [];
  }

  if (tagName === 'a') {
    const rawHref = props.href;
    const textContent = node.textContent || '';
    
    // Resolve broken/placeholder hrefs to real routes
    let resolvedHref = rawHref;
    
    if (!rawHref || rawHref === '#' || rawHref.includes('{{DATA:SCREEN:')) {
      // Try to resolve from button text first
      resolvedHref = getRouteFromLabel(textContent, pathname);
      if (!resolvedHref) {
        // Fallback to default dashboard
        resolvedHref = pathname.startsWith('/parent') ? '/parent/dashboard' : '/student/dashboard';
      }
    } else if (rawHref.startsWith('/')) {
      // Already a real route
      resolvedHref = rawHref;
    }

    if (resolvedHref && resolvedHref.startsWith('/')) {
      props.href = resolvedHref;
      props.onClick = (event) => {
        event.preventDefault();
        navigate(resolvedHref);
      };
    }
  }

  if (tagName === 'select') {
    delete props.value;
  }

  return React.createElement(tagName, props, childNodes.length > 0 ? childNodes : undefined);
};

export default function HtmlRenderer({ html }) {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const content = useMemo(() => {
    const firstTagIndex = html.indexOf('<');
    const leadingStyles = firstTagIndex > 0 ? html.slice(0, firstTagIndex).trim() : '';
    const markup = firstTagIndex > 0 ? html.slice(firstTagIndex) : html;
    const parser = new DOMParser();
    const document = parser.parseFromString(`<div id="html-render-root">${markup}</div>`, 'text/html');
    const root = document.getElementById('html-render-root');

    const nodes = Array.from(root.childNodes)
      .map((node, index) => nodeToReact(node, index, navigate, pathname))
      .filter((node) => node !== null && node !== undefined);

    return leadingStyles
      ? [React.createElement('style', { key: 'styles' }, leadingStyles), ...nodes]
      : nodes;
  }, [html, navigate, pathname]);

  return <>{content}</>;
}
