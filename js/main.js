import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initCounters } from './modules/counters.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAnimations();
    initCounters();
});
