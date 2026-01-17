const THEMES = {
    // Light themes
    default_light: {
        name: "default_light",
        label: "Default",
        isDark: false,
        colors: {
            "--bg-color": "#f4f1ea",
            "--text-color": "#1a1a1a",
            "--accent-color": "#ff4500",
            "--sub-color": "#666666",
            "--highlight-color": "#ffd700",
            "--border-color": "#000000",
            "--icon-color": "#000000",
        },
    },
    serika: {
        name: "serika",
        label: "Serika",
        isDark: false,
        colors: {
            "--bg-color": "#e1e1e3",
            "--text-color": "#323437",
            "--accent-color": "#e2b714",
            "--sub-color": "#646669",
            "--highlight-color": "#e2b714",
            "--border-color": "#323437",
            "--icon-color": "#000000",
        },
    },
    paper: {
        name: "paper",
        label: "Paper",
        isDark: false,
        colors: {
            "--bg-color": "#eeeeee",
            "--text-color": "#444444",
            "--accent-color": "#444444",
            "--sub-color": "#b2b2b2",
            "--highlight-color": "#dddddd",
            "--border-color": "#444444",
            "--icon-color": "#000000",
        },
    },
    nord_light: {
        name: "nord_light",
        label: "Nord Light",
        isDark: false,
        colors: {
            "--bg-color": "#eceff4",
            "--text-color": "#2e3440",
            "--accent-color": "#8fbcbb",
            "--sub-color": "#aebacf",
            "--highlight-color": "#d8dee9",
            "--border-color": "#2e3440",
            "--icon-color": "#000000",
        },
    },

    // Dark themes
    default_dark: {
        name: "default_dark",
        label: "Default Dark",
        isDark: true,
        colors: {
            "--bg-color": "#1a1a1a",
            "--text-color": "#f4f1ea",
            "--accent-color": "#ff4500",
            "--sub-color": "#999999",
            "--highlight-color": "#333333",
            "--border-color": "#f4f1ea",
            "--icon-color": "#ffffff",
        },
    },
    serika_dark: {
        name: "serika_dark",
        label: "Serika Dark",
        isDark: true,
        colors: {
            "--bg-color": "#323437",
            "--text-color": "#d1d0c5",
            "--accent-color": "#e2b714",
            "--sub-color": "#646669",
            "--highlight-color": "#2c2e31",
            "--border-color": "#d1d0c5",
            "--icon-color": "#ffffff",
        },
    },
    dracula: {
        name: "dracula",
        label: "Dracula",
        isDark: true,
        colors: {
            "--bg-color": "#282a36",
            "--text-color": "#f8f8f2",
            "--accent-color": "#bd93f9",
            "--sub-color": "#6272a4",
            "--highlight-color": "#44475a",
            "--border-color": "#f8f8f2",
            "--icon-color": "#ffffff",
        },
    },
    nord: {
        name: "nord",
        label: "Nord",
        isDark: true,
        colors: {
            "--bg-color": "#242933",
            "--text-color": "#d8dee9",
            "--accent-color": "#88c0d0",
            "--sub-color": "#617b94",
            "--highlight-color": "#2e3440",
            "--border-color": "#d8dee9",
            "--icon-color": "#ffffff",
        },
    },
    gruvbox_dark: {
        name: "gruvbox_dark",
        label: "Gruvbox Dark",
        isDark: true,
        colors: {
            "--bg-color": "#282828",
            "--text-color": "#ebdbb2",
            "--accent-color": "#d79921",
            "--sub-color": "#665c54",
            "--highlight-color": "#3c3836",
            "--border-color": "#ebdbb2",
            "--icon-color": "#ffffff",
        },
    },
    monokai: {
        name: "monokai",
        label: "Monokai",
        isDark: true,
        colors: {
            "--bg-color": "#272822",
            "--text-color": "#f8f8f2",
            "--accent-color": "#a6e22e",
            "--sub-color": "#75715e",
            "--highlight-color": "#3e3d32",
            "--border-color": "#f8f8f2",
            "--icon-color": "#ffffff",
        },
    },
    catppuccin: {
        name: "catppuccin",
        label: "Catppuccin",
        isDark: true,
        colors: {
            "--bg-color": "#1e1e2e",
            "--text-color": "#cdd6f4",
            "--accent-color": "#cba6f7",
            "--sub-color": "#6c7086",
            "--highlight-color": "#313244",
            "--border-color": "#cdd6f4",
            "--icon-color": "#ffffff",
        },
    },
    rose_pine: {
        name: "rose_pine",
        label: "Rose Pine",
        isDark: true,
        colors: {
            "--bg-color": "#1f1d27",
            "--text-color": "#e0def4",
            "--accent-color": "#9ccfd8",
            "--sub-color": "#6e6a86",
            "--highlight-color": "#26233a",
            "--border-color": "#e0def4",
            "--icon-color": "#ffffff",
        },
    },
    solarized_dark: {
        name: "solarized_dark",
        label: "Solarized Dark",
        isDark: true,
        colors: {
            "--bg-color": "#002b36",
            "--text-color": "#839496",
            "--accent-color": "#859900",
            "--sub-color": "#586e75",
            "--highlight-color": "#073642",
            "--border-color": "#839496",
            "--icon-color": "#ffffff",
        },
    },
    carbon: {
        name: "carbon",
        label: "Carbon",
        isDark: true,
        colors: {
            "--bg-color": "#313131",
            "--text-color": "#f5e6c8",
            "--accent-color": "#f66e0d",
            "--sub-color": "#c1c1c1",
            "--highlight-color": "#232323",
            "--border-color": "#f5e6c8",
            "--icon-color": "#ffffff",
        },
    },
    vscode: {
        name: "vscode",
        label: "VS Code",
        isDark: true,
        colors: {
            "--bg-color": "#1e1e1e",
            "--text-color": "#d4d4d4",
            "--accent-color": "#007acc",
            "--sub-color": "#858585",
            "--highlight-color": "#2d2d2d",
            "--border-color": "#d4d4d4",
            "--icon-color": "#ffffff",
        },
    },
    terminal: {
        name: "terminal",
        label: "Terminal",
        isDark: true,
        colors: {
            "--bg-color": "#191a1b",
            "--text-color": "#79a617",
            "--accent-color": "#79a617",
            "--sub-color": "#3f4d1e",
            "--highlight-color": "#1e2420",
            "--border-color": "#79a617",
            "--icon-color": "#ffffff",
        },
    },
    matrix: {
        name: "matrix",
        label: "Matrix",
        isDark: true,
        colors: {
            "--bg-color": "#000000",
            "--text-color": "#15ff00",
            "--accent-color": "#15ff00",
            "--sub-color": "#003b00",
            "--highlight-color": "#0d0d0d",
            "--border-color": "#15ff00",
            "--icon-color": "#ffffff",
        },
    },
    milkshake: {
        name: "milkshake",
        label: "Milkshake",
        isDark: false,
        colors: {
            "--bg-color": "#ffffff",
            "--text-color": "#212b43",
            "--accent-color": "#62cfe6",
            "--sub-color": "#62cfe6",
            "--highlight-color": "#ddeff3",
            "--border-color": "#212b43",
            "--icon-color": "#000000",
        },
    },
    modern_ink: {
        name: "modern_ink",
        label: "Modern Ink",
        isDark: false,
        colors: {
            "--bg-color": "#ffffff",
            "--text-color": "#000000",
            "--accent-color": "#ff360d",
            "--sub-color": "#b7b7b7",
            "--highlight-color": "#ececec",
            "--border-color": "#000000",
            "--icon-color": "#000000",
        },
    },
    ms_cupcakes: {
        name: "ms_cupcakes",
        label: "MS Cupcakes",
        isDark: false,
        colors: {
            "--bg-color": "#ffffff",
            "--text-color": "#0a282f",
            "--accent-color": "#d64090",
            "--sub-color": "#5ed5f3",
            "--highlight-color": "#edf8fa",
            "--border-color": "#0a282f",
            "--icon-color": "#000000",
        },
    },
    sewing_tin_light: {
        name: "sewing_tin_light",
        label: "Sewing Tin Light",
        isDark: false,
        colors: {
            "--bg-color": "#ffffff",
            "--text-color": "#2d2076",
            "--accent-color": "#385eca",
            "--sub-color": "#385eca",
            "--highlight-color": "#c8cedf",
            "--border-color": "#2d2076",
            "--icon-color": "#000000",
        },
    },
    soaring_skies: {
        name: "soaring_skies",
        label: "Soaring Skies",
        isDark: false,
        colors: {
            "--bg-color": "#fff9f2",
            "--text-color": "#1d1e1e",
            "--accent-color": "#55c6f0",
            "--sub-color": "#1e107a",
            "--highlight-color": "#e5ddd4",
            "--border-color": "#1d1e1e",
            "--icon-color": "#000000",
        },
    },
    onedark: {
        name: "onedark",
        label: "One Dark",
        isDark: true,
        colors: {
            "--bg-color": "#2f343f",
            "--text-color": "#98c379",
            "--accent-color": "#61afef",
            "--sub-color": "#eceff4",
            "--highlight-color": "#262b34",
            "--border-color": "#98c379",
            "--icon-color": "#ffffff",
        },
    },
    sonokai: {
        name: "sonokai",
        label: "Sonokai",
        isDark: true,
        colors: {
            "--bg-color": "#2c2e34",
            "--text-color": "#e2e2e3",
            "--accent-color": "#9ed072",
            "--sub-color": "#e7c664",
            "--highlight-color": "#232429",
            "--border-color": "#e2e2e3",
            "--icon-color": "#ffffff",
        },
    },
    eighties_after_dark: {
        name: "eighties_after_dark",
        label: "80s After Dark",
        isDark: true,
        colors: {
            "--bg-color": "#1b1d36",
            "--text-color": "#e1e7ec",
            "--accent-color": "#fca6d1",
            "--sub-color": "#99d6ea",
            "--highlight-color": "#17182c",
            "--border-color": "#e1e7ec",
            "--icon-color": "#ffffff",
        },
    },
    github: {
        name: "github",
        label: "GitHub",
        isDark: true,
        colors: {
            "--bg-color": "#212830",
            "--text-color": "#ccdae6",
            "--accent-color": "#41ce5c",
            "--sub-color": "#788386",
            "--highlight-color": "#141b23",
            "--border-color": "#ccdae6",
            "--icon-color": "#ffffff",
        },
    },
    everblush: {
        name: "everblush",
        label: "Everblush",
        isDark: true,
        colors: {
            "--bg-color": "#141b1e",
            "--text-color": "#dadada",
            "--accent-color": "#8ccf7e",
            "--sub-color": "#838887",
            "--highlight-color": "#232a2d",
            "--border-color": "#dadada",
            "--icon-color": "#ffffff",
        },
    },
    arch: {
        name: "arch",
        label: "Arch",
        isDark: true,
        colors: {
            "--bg-color": "#0c0d11",
            "--text-color": "#f6f5f5",
            "--accent-color": "#7ebab5",
            "--sub-color": "#454864",
            "--highlight-color": "#171a25",
            "--border-color": "#f6f5f5",
            "--icon-color": "#ffffff",
        },
    },
    alexis: {
        name: "alexis",
        label: "Alexis",
        isDark: true,
        colors: {
            "--bg-color": "#000000ff",
            "--text-color": "#f6f5f5",
            "--accent-color": "#ff2777", 
            "--sub-color": "#9c5b8eff",
            "--highlight-color": "#3b0026ff",
            "--border-color": "#ffffff",
            "--icon-color": "#ffffff",
        }
    }
};

const THEME_ORDER = [
    // Light themes
    "default_light",
    "milkshake",
    "modern_ink",
    "ms_cupcakes",
    "nord_light",
    "paper",
    "serika",
    "sewing_tin_light",
    "soaring_skies",
    // Dark themes
    "default_dark",
    "alexis",
    "arch",
    "carbon",
    "catppuccin",
    "dracula",
    "eighties_after_dark",
    "everblush",
    "github",
    "gruvbox_dark",
    "matrix",
    "monokai",
    "nord",
    "onedark",
    "rose_pine",
    "serika_dark",
    "solarized_dark",
    "sonokai",
    "terminal",
    "vscode",
];

let themeBeforePreview = null;
let currentPreviewTheme = null;

function getTheme(name) {
    if (name && THEMES[name]) {
        return THEMES[name];
    }
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? THEMES.default_dark : THEMES.default_light;
}

function applyThemeColors(theme) {
    if (currentPreviewTheme === theme.name) return;
    currentPreviewTheme = theme.name;

    const root = document.documentElement;
    const colors = theme.colors;

    root.style.cssText = `
        --bg-color: ${colors["--bg-color"]};
        --text-color: ${colors["--text-color"]};
        --accent-color: ${colors["--accent-color"]};
        --sub-color: ${colors["--sub-color"]};
        --highlight-color: ${colors["--highlight-color"]};
        --border-color: ${colors["--border-color"]};
        --icon-color: ${colors["--icon-color"]};
    `;

    document.body.setAttribute("data-theme", theme.name);
    document.body.setAttribute("data-theme-mode", theme.isDark ? "dark" : "light");
}

function applyTheme(theme, save = true) {
    applyThemeColors(theme);
    if (save) {
        localStorage.setItem("theme", theme.name);
    }
    updateGiscusTheme(theme.isDark);
}

function previewTheme(theme) {
    applyThemeColors(theme);
}

function updateGiscusTheme(isDark) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe) {
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: isDark ? "dark" : "light" } } },
            "https://giscus.app",
        );
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const theme = getTheme(savedTheme);
    applyTheme(theme);
}

function showThemePicker() {
    const existing = document.getElementById("theme-modal");
    if (existing) existing.remove();

    const currentThemeName =
        document.body.getAttribute("data-theme") ||
        localStorage.getItem("theme");
    themeBeforePreview = getTheme(currentThemeName);

    const modal = document.createElement("div");
    modal.id = "theme-modal";
    modal.className = "theme-modal";

    const itemsHtml = THEME_ORDER.map((name) => {
        const theme = THEMES[name];
        const isActive = currentThemeName === name;
        const c = theme.colors;
        return `<button class="theme-list-item${isActive ? " active" : ""}" data-theme="${name}">
            <span class="theme-list-label">${theme.label}</span>
            <span class="theme-list-colors">
                <span class="color-dot" style="background:${c["--bg-color"]}"></span>
                <span class="color-dot" style="background:${c["--text-color"]}"></span>
                <span class="color-dot" style="background:${c["--accent-color"]}"></span>
            </span>
        </button>`;
    }).join("");

    modal.innerHTML = `<div class="theme-modal-backdrop"></div>
        <div class="theme-modal-content">
            <div class="theme-modal-list">${itemsHtml}</div>
        </div>`;

    document.body.appendChild(modal);

    const list = modal.querySelector(".theme-modal-list");
    const content = modal.querySelector(".theme-modal-content");

    list.addEventListener("mouseover", (e) => {
        const item = e.target.closest(".theme-list-item");
        if (item) {
            const theme = THEMES[item.dataset.theme];
            if (theme) previewTheme(theme);
        }
    });

    list.addEventListener("click", (e) => {
        const item = e.target.closest(".theme-list-item");
        if (item) {
            const theme = THEMES[item.dataset.theme];
            if (theme) {
                applyTheme(theme, true);
                themeBeforePreview = theme;

                // Update active state
                list.querySelector(".theme-list-item.active")?.classList.remove(
                    "active",
                );
                item.classList.add("active");

                hideThemePicker();
            }
        }
    });

    content.addEventListener("mouseleave", () => {
        if (themeBeforePreview) {
            previewTheme(themeBeforePreview);
        }
    });

    modal
        .querySelector(".theme-modal-backdrop")
        .addEventListener("click", () => {
            if (themeBeforePreview) applyTheme(themeBeforePreview, false);
            hideThemePicker();
        });

    document.addEventListener("keydown", handleEscapeKey);

    requestAnimationFrame(() => modal.classList.add("open"));
}

function hideThemePicker() {
    const modal = document.getElementById("theme-modal");
    if (modal) {
        modal.classList.remove("open");
        setTimeout(() => modal.remove(), 150);
    }
    document.removeEventListener("keydown", handleEscapeKey);
    themeBeforePreview = null;
    currentPreviewTheme = null;
}

function handleEscapeKey(e) {
    if (e.key === "Escape") {
        if (themeBeforePreview) applyTheme(themeBeforePreview, false);
        hideThemePicker();
    }
}

if (typeof window !== "undefined") {
    window.ThemeSystem = {
        THEMES,
        THEME_ORDER,
        getTheme,
        applyTheme,
        previewTheme,
        initTheme,
        showThemePicker,
        hideThemePicker,
    };
}
