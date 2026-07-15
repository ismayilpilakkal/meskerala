const fs = require('fs');
const path = require('path');

const cssMap = {
    'transition-delay: 0.1s;': 'u-delay-100',
    'transition-delay: 0.2s;': 'u-delay-200',
    'transition-delay: 0.3s;': 'u-delay-300',
    'transition-delay: 0.4s;': 'u-delay-400',
    'transition-delay:0.1s;': 'u-delay-100',
    'transition-delay:0.2s;': 'u-delay-200',
    'padding-top: 60px; padding-bottom: 60px;': 'u-py-60',
    'margin-bottom: 20px;': 'u-mb-20',
    'display:inline-block; padding: 4px 12px; border-radius: 50px; background: rgba(59, 130, 246, 0.1); color: #2563eb; font-size: 0.8rem; font-weight: 700;': 'proj-badge-label',
    'color: var(--proj-emerald); font-weight: 700; font-size: 0.8rem; margin-bottom: 10px; text-transform: uppercase;': 'proj-cat-label',
    'font-size: 0.85rem; font-weight: 600;': 'u-fw-600 u-text-sm',
    'padding: 8px 16px;': 'u-px-16 u-py-8',
    'height: 200px;': 'u-h-200',
    'margin-top: 15px;': 'u-mt-15',
    'font-size: 0.85rem; font-weight: 600; color: #059669;': 'u-fw-600 u-text-sm u-text-success',
    'font-size: 0.85rem; font-weight: 600; color: #2563eb;': 'u-fw-600 u-text-sm u-text-primary',
    'transition-delay: 0.1s; flex-direction: row-reverse;': 'u-delay-100 u-row-reverse',
    'text-align: center; margin-top: 50px;': 'u-text-center u-mt-50',
    'color: var(--proj-text-muted); margin-top: 15px;': 'u-text-muted u-mt-15',
    'color: var(--proj-navy); margin-bottom: 10px; font-size: 1.3rem;': 'u-text-navy u-mb-10 u-text-lg',
    'color: var(--proj-text-muted);': 'u-text-muted',
    'display:flex; align-items:center; gap: 15px;': 'u-flex-center-gap-15',
    'border-radius:50%;': 'u-rounded-circle',
    'color:var(--proj-navy);': 'u-text-navy',
    'font-size:0.85rem; color:var(--proj-text-muted);': 'u-text-sm u-text-muted',
    'color:var(--proj-navy); margin-bottom:5px;': 'u-text-navy u-mb-5',
    'color:var(--proj-emerald); font-weight:600; font-size:0.9rem;': 'u-text-emerald u-fw-600 u-text-md',
    'margin:0; color:var(--proj-navy);': 'u-m-0 u-text-navy',
    'padding:40px;': 'u-p-40',
    'color:var(--proj-emerald);': 'u-text-emerald',
    'font-size:1.2rem; margin-bottom: 40px; color:rgba(255,255,255,0.9);': 'u-text-xl u-mb-40 u-text-white-90',
    'display:flex; gap: 20px; justify-content:center; flex-wrap:wrap;': 'u-flex-center-wrap-gap-20',
    'background:white; color:var(--proj-navy);': 'u-bg-white u-text-navy',
    'color:white; border-color:white;': 'u-text-white u-border-white',
    'margin-top:8px;': 'u-mt-8'
};

const cssDefinitions = `
/* Refactored Utility Classes */
.u-delay-100 { transition-delay: 0.1s; }
.u-delay-200 { transition-delay: 0.2s; }
.u-delay-300 { transition-delay: 0.3s; }
.u-delay-400 { transition-delay: 0.4s; }
.u-py-60 { padding-top: 60px; padding-bottom: 60px; }
.u-mb-20 { margin-bottom: 20px; }
.proj-badge-label { display:inline-block; padding: 4px 12px; border-radius: 50px; background: rgba(59, 130, 246, 0.1); color: #2563eb; font-size: 0.8rem; font-weight: 700; }
.proj-cat-label { color: var(--proj-emerald, #10b981); font-weight: 700; font-size: 0.8rem; margin-bottom: 10px; text-transform: uppercase; }
.u-fw-600 { font-weight: 600; }
.u-text-sm { font-size: 0.85rem; }
.u-px-16 { padding-left: 16px; padding-right: 16px; }
.u-py-8 { padding-top: 8px; padding-bottom: 8px; }
.u-h-200 { height: 200px; }
.u-mt-15 { margin-top: 15px; }
.u-text-success { color: #059669; }
.u-text-primary { color: #2563eb; }
.u-row-reverse { flex-direction: row-reverse; }
.u-text-center { text-align: center; }
.u-mt-50 { margin-top: 50px; }
.u-text-muted { color: var(--proj-text-muted, #6b7280); }
.u-text-navy { color: var(--proj-navy, #1e3a8a); }
.u-mb-10 { margin-bottom: 10px; }
.u-text-lg { font-size: 1.3rem; }
.u-flex-center-gap-15 { display:flex; align-items:center; gap: 15px; }
.u-rounded-circle { border-radius: 50%; }
.u-mb-5 { margin-bottom: 5px; }
.u-text-emerald { color: var(--proj-emerald, #10b981); }
.u-text-md { font-size: 0.9rem; }
.u-m-0 { margin: 0; }
.u-p-40 { padding: 40px; }
.u-text-xl { font-size: 1.2rem; }
.u-mb-40 { margin-bottom: 40px; }
.u-text-white-90 { color: rgba(255,255,255,0.9); }
.u-flex-center-wrap-gap-20 { display:flex; gap: 20px; justify-content:center; flex-wrap:wrap; }
.u-bg-white { background: white; }
.u-text-white { color: white; }
.u-border-white { border-color: white; }
.u-mt-8 { margin-top: 8px; }
`;

fs.writeFileSync(path.join(__dirname, 'css', 'components', 'utilities.css'), cssDefinitions);

// inject to main.css
let mainCss = fs.readFileSync(path.join(__dirname, 'css', 'main.css'), 'utf-8');
if (!mainCss.includes("url('components/utilities.css')")) {
    mainCss += "\\n@import url('components/utilities.css');\\n";
    fs.writeFileSync(path.join(__dirname, 'css', 'main.css'), mainCss);
}

// update html files
const targetFiles = ['projects.html', 'institutions.html', 'notifications.html'];
for (const file of targetFiles) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // First, find all tags that have a style attribute
    const tagRegex = /<([a-zA-Z0-9]+)([^>]*?)style="([^"]+)"([^>]*?)>/g;
    
    content = content.replace(tagRegex, (match, tag, before, styleStr, after) => {
        let classesToAdd = cssMap[styleStr];
        
        if (classesToAdd) {
            let combinedAttrs = (before + after).trim();
            // does it have a class?
            const classMatch = combinedAttrs.match(/class="([^"]+)"/);
            if (classMatch) {
                // append to existing class
                const oldClass = classMatch[1];
                const newClass = oldClass + " " + classesToAdd;
                combinedAttrs = combinedAttrs.replace(/class="([^"]+)"/, \`class="\${newClass}"\`);
            } else {
                combinedAttrs += \` class="\${classesToAdd}"\`;
            }
            // construct the new tag
            return \`<\${tag} \${combinedAttrs}>\`.replace(/\\s+>/g, '>');
        }
        
        // if no match in cssMap, leave as is
        return match;
    });
    
    fs.writeFileSync(filePath, content);
}

console.log('Refactoring complete.');
