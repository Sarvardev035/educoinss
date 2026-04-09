import React, { useEffect, useMemo, useState } from 'react';
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

const getContextText = (node, maxDepth = 3) => {
  const parts = [];
  let current = node;
  let depth = 0;

  while (current && depth <= maxDepth) {
    const text = (current.textContent || '').replace(/\s+/g, ' ').trim();
    if (text) parts.push(text);
    current = current.parentElement;
    depth += 1;
  }

  return parts.join(' ').slice(0, 1200);
};

const inferCostFromContext = (contextText) => {
  const patterns = [
    /(\d{1,5})\s*(?:edu\s*)?coins?\b/i,
    /(\d{1,5})\s*ec\b/i,
    /\$\s*(\d{1,4})/i,
  ];

  for (const pattern of patterns) {
    const match = contextText.match(pattern);
    if (match) return Number(match[1]);
  }

  return 100;
};

const nodeToReact = (node, key, navigate, pathname, showToast) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const tagName = node.tagName.toLowerCase();
  const props = { key };
  let childNodes = Array.from(node.childNodes)
    .map((child, index) => nodeToReact(child, `${key}-${index}`, navigate, pathname, showToast))
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

  if (tagName === 'form') {
    props.onSubmit = (event) => {
      event.preventDefault();
      showToast('Form saved locally (demo mode).');
    };
  }

  if (tagName === 'button' && !props.onClick) {
    props.type = props.type || 'button';
    const label = (node.textContent || '').replace(/\s+/g, ' ').trim();
    const lowerLabel = label.toLowerCase();
    const contextText = getContextText(node);

    props.onClick = (event) => {
      event.preventDefault();

      if (/(purchase|buy|redeem|claim)\b/.test(lowerLabel)) {
        const balanceKey = 'educoin_balance';
        const txKey = 'educoin_transactions';
        const currentBalance = Number(localStorage.getItem(balanceKey) || '2450');
        const cost = inferCostFromContext(contextText);
        const itemLabel = label || 'Item';

        if (currentBalance < cost) {
          showToast(`Not enough coins. Need ${cost} EC, you have ${currentBalance} EC.`);
          return;
        }

        const nextBalance = currentBalance - cost;
        localStorage.setItem(balanceKey, String(nextBalance));

        const currentTx = JSON.parse(localStorage.getItem(txKey) || '[]');
        currentTx.unshift({
          type: 'purchase',
          item: itemLabel,
          cost,
          balance: nextBalance,
          createdAt: Date.now(),
        });
        localStorage.setItem(txKey, JSON.stringify(currentTx.slice(0, 50)));

        window.dispatchEvent(
          new CustomEvent('educoin:wallet-updated', {
            detail: { balance: nextBalance, delta: -cost, item: itemLabel },
          }),
        );

        showToast(`Purchased successfully: ${itemLabel} (-${cost} EC). Balance: ${nextBalance} EC.`);
        event.currentTarget.disabled = true;
        event.currentTarget.classList.add('opacity-60', 'cursor-not-allowed');
        event.currentTarget.textContent = 'Purchased';
        return;
      }

      if (/(start|launch|continue).*(study|session|learning)|study now/.test(lowerLabel)) {
        navigate('/study-session-enhanced');
        return;
      }

      if (/(end|stop).*(study|session)/.test(lowerLabel)) {
        navigate('/student/dashboard');
        return;
      }

      if (/(sign out|logout|log out)/.test(lowerLabel)) {
        navigate('/role-selection');
        return;
      }

      if (/(save|discard|approve|decline|copy|change|edit|delete)/.test(lowerLabel)) {
        showToast(`${label || 'Action'} completed.`);
        return;
      }

      const resolvedRoute = getRouteFromLabel(label, pathname);
      if (resolvedRoute && resolvedRoute.startsWith('/')) {
        navigate(resolvedRoute);
        return;
      }

      showToast(`"${label || 'This action'}" is now interactive, but no route was mapped.`);
    };
  }

  if (tagName === 'select') {
    delete props.value;
  }

  return React.createElement(tagName, props, childNodes.length > 0 ? childNodes : undefined);
};

export default function HtmlRenderer({ html }) {
  const navigate = useNavigate();
  const [toast, setToast] = useState('');
  const pathname = window.location.pathname;

  const showToast = (message) => setToast(message);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(timeout);
  }, [toast]);

  const content = useMemo(() => {
    const firstTagIndex = html.indexOf('<');
    const leadingStyles = firstTagIndex > 0 ? html.slice(0, firstTagIndex).trim() : '';
    const markup = firstTagIndex > 0 ? html.slice(firstTagIndex) : html;
    const parser = new DOMParser();
    const document = parser.parseFromString(`<div id="html-render-root">${markup}</div>`, 'text/html');
    const root = document.getElementById('html-render-root');

    const nodes = Array.from(root.childNodes)
      .map((node, index) => nodeToReact(node, index, navigate, pathname, showToast))
      .filter((node) => node !== null && node !== undefined);

    return leadingStyles
      ? [React.createElement('style', { key: 'styles' }, leadingStyles), ...nodes]
      : nodes;
  }, [html, navigate, pathname]);

  return (
    <>
      {content}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 rounded-xl bg-slate-900/95 border border-white/10 px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </>
  );
}
