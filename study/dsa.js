/* ============================================================
   DSLearn — Shared JavaScript
   Requires: MODULE_ID global variable defined before this script
   Example:  <script>var MODULE_ID = 'm06a';</script>
             <script src="../dsa.js"></script>
   ============================================================ */

(function () {
    'use strict';

    // ── Theme Initialization ───────────────────────────────────
    // Apply theme from localStorage immediately (before DOM ready to prevent flash)
    (function initTheme() {
        var theme = localStorage.getItem('dslearn_theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    })();

    // ── Progress Tracking ──────────────────────────────────────
    // Mark module as in-progress on first visit (don't overwrite 'c')
    if (typeof MODULE_ID !== 'undefined' && MODULE_ID) {
        var key = 'dslearn_' + MODULE_ID;
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, 'p');
        }
    }

    // ── DOM Ready ─────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        // Restore mark-complete button state if already completed
        if (typeof MODULE_ID !== 'undefined' && MODULE_ID) {
            var key = 'dslearn_' + MODULE_ID;
            if (localStorage.getItem(key) === 'c') {
                var btn = document.getElementById('mark-btn');
                if (btn) {
                    btn.textContent = '✅ Completed!';
                    btn.disabled = true;
                }
            }
        }

        // Set up language tab wrappers for Phase 4-10 sequential code blocks
        setupLanguageTabs();

        // Wrap bare <pre> elements with .code-block + copy button (Phase 1-2 files)
        setupCopyButtons();

        // Inject theme toggle button if not on index page
        injectThemeToggle();
    });

    // ── Copy Code ─────────────────────────────────────────────
    window.copyCode = function (btn) {
        var pre = btn.parentElement.querySelector('pre');
        if (!pre) { pre = btn.nextElementSibling; }
        if (!pre) return;
        navigator.clipboard.writeText(pre.textContent).then(function () {
            btn.textContent = '✅ Copied!';
            setTimeout(function () { btn.textContent = '📋 Copy'; }, 2000);
        }).catch(function () {
            btn.textContent = '⚠️ Failed';
            setTimeout(function () { btn.textContent = '📋 Copy'; }, 2000);
        });
    };

    // ── Mark Complete ─────────────────────────────────────────
    window.markComplete = function () {
        if (typeof MODULE_ID !== 'undefined' && MODULE_ID) {
            localStorage.setItem('dslearn_' + MODULE_ID, 'c');
        }
        var btn = document.getElementById('mark-btn');
        if (btn) { btn.textContent = '✅ Completed!'; btn.disabled = true; }
        var toast = document.getElementById('toast');
        if (toast) {
            toast.style.display = 'block';
            setTimeout(function () { toast.style.display = 'none'; }, 4000);
        }
    };

    // ── Toggle Solution (practice files) ──────────────────────
    window.toggleSolution = function (btn) {
        var sol = btn.nextElementSibling;
        if (!sol) return;
        var hidden = sol.style.display !== 'block';
        sol.style.display = hidden ? 'block' : 'none';
        btn.textContent = hidden ? '🙈 Hide Solution' : '💡 Show Solution';
    };

    // ── Toggle Answer (quiz files — Phase 4–6) ───────────────
    window.toggleAnswer = function (btn) {
        var ans = btn.nextElementSibling;
        if (!ans) return;
        var hidden = ans.style.display !== 'block';
        ans.style.display = hidden ? 'block' : 'none';
        btn.textContent = hidden ? '🙈 Hide Answer' : '💡 Show Answer';
    };

    // ── Toggle Answer (quiz-card files — Phase 7+) ────────────
    window.toggle = function (btn) {
        var ans = btn.nextElementSibling;
        if (!ans) return;
        var hidden = ans.style.display !== 'block';
        ans.style.display = hidden ? 'block' : 'none';
        btn.textContent = hidden ? '🙈 Hide Answer' : '▶ Show Answer';
    };

    // ── Language Tab Setup ────────────────────────────────────
    // Auto-converts sequential C# / Python code block pairs into
    // tab-toggled containers. Works for Phase 4-10 files that use
    // the <span class="lang-label lang-cs"> / <span class="lang-label lang-py">
    // label pattern with adjacent .code-block divs.
    function setupLanguageTabs() {
        var csLabels = document.querySelectorAll('.lang-label.lang-cs');
        if (!csLabels.length) return;

        csLabels.forEach(function (csLabel) {
            // Expect: csLabel → csBlock → pyLabel → pyBlock (sibling sequence)
            var csBlock = csLabel.nextElementSibling;
            if (!csBlock || !csBlock.classList.contains('code-block')) return;

            var pyLabel = csBlock.nextElementSibling;
            if (!pyLabel || !pyLabel.classList.contains('lang-py')) return;

            var pyBlock = pyLabel.nextElementSibling;
            if (!pyBlock || !pyBlock.classList.contains('code-block')) return;

            // Capture all node references before DOM manipulation
            var parent = csLabel.parentNode;
            var nextAfter = pyBlock.nextSibling; // insertion anchor

            // Build tab button bar
            var tabsDiv = document.createElement('div');
            tabsDiv.className = 'lang-tabs-btns';
            tabsDiv.innerHTML =
                '<button class="tab-btn" data-lang="cs">C#</button>' +
                '<button class="tab-btn" data-lang="py">Python</button>';

            // Build wrapper
            var wrapper = document.createElement('div');
            wrapper.className = 'lang-tabs-wrapper';
            wrapper.appendChild(tabsDiv);
            wrapper.appendChild(csLabel);
            wrapper.appendChild(csBlock);
            wrapper.appendChild(pyLabel);
            wrapper.appendChild(pyBlock);

            // Insert wrapper in original position
            parent.insertBefore(wrapper, nextAfter);

            // Apply active language
            applyLangToWrapper(wrapper, 'cs');
        });

        // Global click handler for tab switching (one listener, not per-button)
        document.removeEventListener('click', _tabClickHandler);
        document.addEventListener('click', _tabClickHandler);
    }

    function _tabClickHandler(e) {
        if (!e.target.classList.contains('tab-btn')) return;
        var newLang = e.target.dataset.lang;
        if (!newLang) return;
        // Only affect the snippet that was clicked, not all snippets globally
        var wrapper = e.target.closest('.lang-tabs-wrapper');
        if (!wrapper) return;
        applyLangToWrapper(wrapper, newLang);
    }

    function applyLangToWrapper(wrapper, lang) {
        // Update tab buttons
        wrapper.querySelectorAll('.tab-btn').forEach(function (b) {
            b.classList.toggle('active', b.dataset.lang === lang);
        });
        // Show/hide CS label + block
        var csLbl = wrapper.querySelector('.lang-label.lang-cs');
        if (csLbl) {
            var csBlk = csLbl.nextElementSibling;
            csLbl.style.display = (lang === 'py') ? 'none' : '';
            if (csBlk) csBlk.style.display = (lang === 'py') ? 'none' : '';
        }
        // Show/hide PY label + block
        var pyLbl = wrapper.querySelector('.lang-label.lang-py');
        if (pyLbl) {
            var pyBlk = pyLbl.nextElementSibling;
            pyLbl.style.display = (lang === 'cs') ? 'none' : '';
            if (pyBlk) pyBlk.style.display = (lang === 'cs') ? 'none' : '';
        }
    }

    // ── Copy Button Auto-Inject ───────────────────────────────
    // Wraps bare <pre> elements (not already in .code-block) with
    // a .code-block div and a 📋 Copy button. Covers Phase 1-2 files.
    function setupCopyButtons() {
        document.querySelectorAll('pre').forEach(function (pre) {
            if (pre.parentElement.classList.contains('code-block')) return;
            var wrapper = document.createElement('div');
            wrapper.className = 'code-block';
            var btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.textContent = '📋 Copy';
            btn.setAttribute('onclick', 'copyCode(this)');
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(btn);
            wrapper.appendChild(pre);
        });
    }

    // ── Theme Toggle ──────────────────────────────────────────
    function injectThemeToggle() {
        // Skip if index.html (has its own toggle) or if toggle already exists
        if (document.getElementById('theme-btn')) return;
        if (document.querySelector('.toolbar')) return;

        // Find nav-bar to append toggle (most pages have .nav-bar)
        var navBar = document.querySelector('.nav-bar');
        if (!navBar) return;

        var btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.className = 'theme-toggle-btn';
        var theme = document.documentElement.getAttribute('data-theme') || 'light';
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        btn.title = 'Toggle dark/light mode';
        btn.onclick = window.toggleTheme;
        navBar.appendChild(btn);
    }

    window.setTheme = function (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('dslearn_theme', theme);
        var btn = document.getElementById('theme-toggle') || document.getElementById('theme-btn');
        if (btn) {
            if (btn.id === 'theme-btn') {
                btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
            } else {
                btn.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
        }
    };

    window.toggleTheme = function () {
        var curr = document.documentElement.getAttribute('data-theme') || 'light';
        window.setTheme(curr === 'dark' ? 'light' : 'dark');
    };

})();
