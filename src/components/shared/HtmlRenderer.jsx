import React, { useMemo } from 'react';

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

const nodeToReact = (node, key) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const tagName = node.tagName.toLowerCase();
  const props = { key };
  let childNodes = Array.from(node.childNodes).map((child, index) => nodeToReact(child, `${key}-${index}`)).filter((child) => child !== null && child !== undefined);

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

  if (tagName === 'select') {
    delete props.value;
  }

  return React.createElement(tagName, props, childNodes.length > 0 ? childNodes : undefined);
};

export default function HtmlRenderer({ html }) {
  const content = useMemo(() => {
    const parser = new DOMParser();
    const document = parser.parseFromString(`<div id="html-render-root">${html}</div>`, 'text/html');
    const root = document.getElementById('html-render-root');

    return Array.from(root.childNodes)
      .map((node, index) => nodeToReact(node, index))
      .filter((node) => node !== null && node !== undefined);
  }, [html]);

  return <>{content}</>;
}
