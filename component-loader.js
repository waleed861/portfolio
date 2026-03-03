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

async function loadComponent({ id, file }) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
        const res = await fetch(`components/${file}.html`);
        const html = await res.text();
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

    // Hide loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 400);
    }

    // Boot main script after DOM is fully assembled
    const script = document.createElement('script');
    script.src = 'script.js';
    script.defer = true;
    document.body.appendChild(script);
}

init();
