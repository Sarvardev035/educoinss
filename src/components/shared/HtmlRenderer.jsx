import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

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

const normalizeText = (value) =>
  value
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const resolveDashboardRoute = (pathname, family) => {
  if (family === 'student') {
    return pathname.includes('/student/dashboard-2') ? '/student/dashboard' : '/student/dashboard-2';
  }

  if (family === 'parent') {
    return pathname.includes('/parent/dashboard-2') ? '/parent/dashboard' : '/parent/dashboard-2';
  }

  return '/role-selection';
};

const resolveRouteFromText = (text, pathname) => {
  const family = pathname.startsWith('/parent') ? 'parent' : pathname.startsWith('/student') ? 'student' : 'shared';
  const label = normalizeText(text);

  if (!label) {
    return family === 'student' ? '/student/dashboard' : family === 'parent' ? '/parent/dashboard' : '/role-selection';
  }

  if (family === 'student') {
    if (/(sign out|log out|logout)/.test(label)) return '/role-selection';
    if (/settings/.test(label)) return '/settings';
    if (/(help|support)/.test(label)) return '/chat';
    if (/(community|classes|social)/.test(label)) return '/community-classes';
    if (/(profile|avatar)/.test(label)) return '/student/avatar-shop';
    if (/(wardrobe|ward|gear)/.test(label)) return '/student/wardrobe';
    if (/(gift|gifts|request|requests|treasury|vault|wallet|card link|rewards)/.test(label)) return '/student/gifts';
    if (/(library|my shelf|lending|resources|curriculum)/.test(label)) return '/student/library';
    if (/(market|store|discover)/.test(label)) return '/student/marketplace';
    if (/(academy|quest|quests|mission|missions|history|activity|achievements|leaderboard|earn|view assignment history)/.test(label)) {
      if (/history|activity|view assignment history/.test(label)) return '/study-session-4';
      if (/missions?/.test(label)) return '/study-session-2';
      if (/achievements|leaderboard|earn|academy/.test(label)) return '/study-session-3';
      return '/study-session';
    }
    if (/(dashboard|overview|home|dash|view all)/.test(label)) return resolveDashboardRoute(pathname, family);
    return '/student/dashboard';
  }

  if (family === 'parent') {
    if (/(sign out|log out|logout)/.test(label)) return '/role-selection';
    if (/settings/.test(label)) return '/settings';
    if (/(help|support|alerts|notifications)/.test(label)) return '/chat';
    if (/(community|classes|social|leaderboard|earn)/.test(label)) return '/community-classes';
    if (/(gift|gifts|request|requests|activity)/.test(label)) return '/parent/gift-manager';
    if (/(treasury|wallet|vault|rewards|card link)/.test(label)) return '/parent/treasury-tips';
    if (/(library|my shelf|lending|resources|curriculum|discover)/.test(label)) return '/parent/library-manager';
    if (/(children|kids|family hub|profile)/.test(label)) return '/parent/dashboard';
    if (/(dashboard|overview|home)/.test(label)) return resolveDashboardRoute(pathname, family);
    return '/parent/dashboard';
  }

  if (/(sign out|log out|logout)/.test(label)) return '/role-selection';
  if (/settings/.test(label)) return '/settings';
  if (/(help|support)/.test(label)) return '/chat';
  if (/(community|classes|social)/.test(label)) return '/community-classes';
  if (/(dashboard|overview|home)/.test(label)) return '/role-selection';
  return '/role-selection';
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
    const resolvedHref =
      typeof rawHref === 'string' && rawHref.startsWith('/')
        ? rawHref
        : rawHref === '#' || rawHref === '' || (typeof rawHref === 'string' && rawHref.startsWith('{{DATA:')) || (typeof rawHref === 'string' && rawHref.startsWith('#'))
          ? resolveRouteFromText(textContent, pathname)
          : rawHref;

    if (typeof resolvedHref === 'string' && resolvedHref.startsWith('/')) {
      props.href = resolvedHref;
      props.onClick = (event) => {
        event.preventDefault();
        navigate(resolvedHref);
      };
    } else if (!rawHref || rawHref === '#') {
      props.href = resolveRouteFromText(textContent, pathname);
      props.onClick = (event) => {
        event.preventDefault();
        navigate(props.href);
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
