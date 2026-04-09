/**
 * Route Map - Source of truth for all routes in the application
 * Used by link resolver to translate button text to actual routes
 */

export const ROUTE_MAP = {
  // Role Selection & Auth
  'role-selection': '/role-selection',
  'student-login': '/student/login',
  'student-register': '/student/register',
  'parent-login': '/parent/login',
  'parent-register': '/parent/register',

  // Student Portal
  'student-dashboard': '/student/dashboard',
  'student-dashboard-alt': '/student/dashboard-2',
  'avatar-shop': '/student/avatar-shop',
  'wardrobe': '/student/wardrobe',
  'wardrobe-alt': '/student/wardrobe-2',
  'wardrobe-alt-2': '/student/wardrobe-3',
  'wardrobe-alt-3': '/student/wardrobe-4',
  'wardrobe-friendly': '/student/wardrobe-friendly',
  'marketplace': '/student/marketplace',
  'library': '/student/library',
  'gift-requests': '/student/gifts',
  'gift-requests-alt': '/student/gifts-2',

  // Study Sessions
  'study-session': '/study-session',
  'study-session-missions': '/study-session-2',
  'study-session-achievements': '/study-session-3',
  'study-session-history': '/study-session-4',
  'enhanced-study-session': '/study-session-enhanced',
  'study-with-camera': '/study-session-enhanced',

  // Parent Portal
  'parent-dashboard': '/parent/dashboard',
  'parent-dashboard-alt': '/parent/dashboard-2',
  'gift-manager': '/parent/gift-manager',
  'gift-manager-alt': '/parent/gift-manager-2',
  'library-manager': '/parent/library-manager',
  'treasury-tips': '/parent/treasury-tips',
  'child-detailed-activity': '/parent/child-activity',
  'parent-control-settings': '/parent/control-settings',

  // Shared Routes
  'settings': '/settings',
  'chat': '/chat',
  'support': '/chat',
  'help': '/chat',
  'community-classes': '/community-classes',
  'hero-forge': '/hero-forge',
  'trading-hub': '/trading-hub',
  'hero-customizer': '/hero-customizer',
  'elite-gear': '/elite-gear',
};

/**
 * Get route path from a label/button text
 * Returns the actual route path or null if not found
 */
export const getRouteFromLabel = (label, pathname = '') => {
  if (!label) return null;

  const normalizedLabel = label
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  // Try exact match first
  if (ROUTE_MAP[normalizedLabel]) {
    return ROUTE_MAP[normalizedLabel];
  }

  // Try fuzzy matching based on context
  const family = pathname.startsWith('/parent') ? 'parent' : 'student';

  // Contextual aliases
  if (/(home|dash|dashboard|overview)/.test(label.toLowerCase())) {
    return family === 'parent' ? '/parent/dashboard' : '/student/dashboard';
  }

  if (/(logout|log out|sign out)/.test(label.toLowerCase())) {
    return '/role-selection';
  }

  if (/(settings|gear|config)/.test(label.toLowerCase())) {
    return '/settings';
  }

  if (/(help|support|contact)/.test(label.toLowerCase())) {
    return '/chat';
  }

  if (/(chat|message|social|forum)/.test(label.toLowerCase())) {
    return '/chat';
  }

  if (/(community|class|course|learn)/.test(label.toLowerCase())) {
    return '/community-classes';
  }

  if (/(market|store|shop|exchange)/.test(label.toLowerCase())) {
    return family === 'parent' ? '/parent/dashboard' : '/student/marketplace';
  }

  if (/(gift|reward|vault|wallet|treasury)/.test(label.toLowerCase())) {
    return family === 'parent' ? '/parent/gift-manager' : '/student/gifts';
  }

  if (/(wardrobe|avatar|appearance|hero)/.test(label.toLowerCase())) {
    return family === 'parent' ? '/parent/dashboard' : '/student/wardrobe';
  }

  if (/(library|book|resource)/.test(label.toLowerCase())) {
    return family === 'parent' ? '/parent/library-manager' : '/student/library';
  }

  if (/(mission|quest|activity|progress|track|learning)/.test(label.toLowerCase())) {
    return family === 'parent' ? '/parent/library-manager' : '/study-session-2';
  }

  if (/(history|activity|past|archive)/.test(label.toLowerCase())) {
    return family === 'parent' ? '/chat' : '/study-session-4';
  }

  if (/(achievement|leaderboard|rank)/.test(label.toLowerCase())) {
    return '/study-session-3';
  }

  if (/(profile|account|user|my)/.test(label.toLowerCase())) {
    return family === 'parent' ? '/parent/dashboard' : '/student/avatar-shop';
  }

  if (/(kids|child|children|family)/.test(label.toLowerCase())) {
    if (/(activity|analytics|report|detail)/.test(label.toLowerCase())) {
      return '/parent/child-activity';
    }
    return '/parent/dashboard';
  }

  if (/(control|parental|limits|permissions)/.test(label.toLowerCase())) {
    return '/parent/control-settings';
  }

  if (/(tip|advice|guide|coach)/.test(label.toLowerCase())) {
    return '/parent/treasury-tips';
  }

  return null;
};

/**
 * Validate if a route exists in the application
 */
export const isValidRoute = (path) => {
  return Object.values(ROUTE_MAP).includes(path);
};
