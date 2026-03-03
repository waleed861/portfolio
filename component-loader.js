'use strict';

/**
 * Component Loader
 * Fetches each section HTML file and injects it into the page,
 * then boots the main script.js once everything is ready.
 */
const COMPONENTS = [
    { id: 'comp-cursor', file: 'cursor' },
    { id: 'comp-navbar', file: 'navbar' },
    { id: 'comp-hero', file: 'hero' },
    { id: 'comp-about', file: 'about' },
    { id: 'comp-skills', file: 'skills' },
    { id: 'comp-experience', file: 'experience' },
    { id: 'comp-education', file: 'education' },
    { id: 'comp-projects', file: 'projects' },
    { id: 'comp-contact', file: 'contact' },
];

const cache = new Map();

async function loadComponent({ id, file }) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
        let html;
        if (cache.has(file)) {
            html = cache.get(file);
        } else {
            const res = await fetch(`components/${file}.html`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            html = await res.text();
            cache.set(file, html);
        }
        const frag = document.createRange().createContextualFragment(html);
        el.replaceWith(frag);
    } catch (err) {
        console.warn(`[component-loader] Could not load ${file}.html`, err);
        el.remove();
    }
}

async function init() {
    // Load all components in parallel
    await Promise.all(COMPONENTS.map(loadComponent));

    // Hide loader with a smoother transition
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.4s ease';
        setTimeout(() => loader.remove(), 400);
    }

    // Boot main script after DOM is fully assembled
    // Using a microtask to ensure DOM updates are processed
    requestAnimationFrame(() => {
        const script = document.createElement('script');
        script.src = 'script.js';
        script.defer = true;
        document.body.appendChild(script);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
