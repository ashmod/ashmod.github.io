// Interactive Terminal Easter Egg
// Terminal commands and responses

class InteractiveTerminal {
    constructor() {
        this.terminalBody = document.getElementById('terminal-body');
        this.userInput = document.getElementById('user-input');
        this.interactiveLine = document.getElementById('interactive-line');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isActive = false;
        
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clearTerminal(),
            echo: (args) => this.echo(args),
            date: () => this.showDate(),
            cat: (args) => this.cat(args),
            cowsay: (args) => this.cowsay(args),
            whoami: () => this.whoami(),
            pwd: () => '/home/shehab/portfolio',
            ls: () => this.ls(),
            about: () => this.about(),
            socials: () => this.socials(),
            skills: () => this.skills(),
            coffee: () => this.coffee(),
            hack: () => this.hack(),
            matrix: () => this.matrix(),
            fortune: () => this.fortune(),
            banner: () => this.banner(),
            'sudo rm -rf /': () => this.sudo(),
            exit: () => this.exit()
        };
        
        this.fortunes = [
            "Code is like humor. When you have to explain it, it's bad.",
            "First, solve the problem. Then, write the code.",
            "Experience is the name everyone gives to their mistakes.",
            "The best error message is the one that never shows up.",
            "Debugging is twice as hard as writing the code in the first place.",
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            "Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.",
            "There are two ways to write error-free programs; only the third one works.",
            "Premature optimization is the root of all evil.",
            "Simplicity is the soul of efficiency.",
            "There's always one more bug.",
            "It works on my machine."
        ];
        
        this.init();
    }
    
    init() {
        if (!this.terminalBody || !this.userInput) return;
        
        // Ensure text direction is LTR for Firefox compatibility
        this.userInput.style.direction = 'ltr';
        this.userInput.style.unicodeBidi = 'normal';
        
        // Window button functionality
        this.setupWindowButtons();
        
        // Make terminal clickable to activate
        this.terminalBody.addEventListener('click', () => this.activate());
        
        // Auto-activate terminal on page load
        setTimeout(() => this.activate(), 500);
        
        // Handle key events globally when terminal is active
        document.addEventListener('keydown', (e) => {
            if (!this.isActive) return;
            
            // Don't capture if user is typing in another input field
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            // Focus input on first keypress if not already focused
            if (document.activeElement !== this.userInput) {
                this.userInput.focus();
            }
            
            if (e.key === 'Enter') {
                e.preventDefault();
                this.executeCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocomplete();
            } else if (e.key === 'Backspace') {
                // Always handle backspace manually to ensure correct cursor position
                if (this.userInput) {
                    e.preventDefault();
                    
                    // Ensure input is focused
                    if (document.activeElement !== this.userInput) {
                        this.userInput.focus();
                    }
                    
                    // Get current text
                    const text = this.userInput.textContent;
                    
                    if (text.length > 0) {
                        // Remove last character
                        this.userInput.textContent = text.slice(0, -1);
                        // Move cursor to end
                        this.moveCursorToEnd();
                    }
                }
            } else if (e.key === 'Delete') {
                // Only focus if not already focused
                if (this.userInput && document.activeElement !== this.userInput) {
                    e.preventDefault();
                    this.userInput.focus();
                    this.moveCursorToEnd();
                }
            } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                // For single character keys, always prevent and manually insert
                // This ensures consistent behavior across all browsers
                e.preventDefault();
                if (this.userInput) {
                    if (document.activeElement !== this.userInput) {
                        this.userInput.focus();
                        this.moveCursorToEnd();
                    }
                    // Use modern text insertion that works consistently across browsers
                    this.insertTextAtCursor(e.key);
                }
            }
        });
        
        // Handle input
        this.userInput.addEventListener('input', () => {
            this.userInput.textContent = this.userInput.textContent.replace(/\n/g, '');
        });
        
        // Keep focus on input when clicking terminal
        this.terminalBody.addEventListener('click', (e) => {
            if (this.isActive && this.userInput) {
                this.userInput.focus();
            }
        });
        
        // Prevent default behavior on contenteditable
        this.userInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain').replace(/\n/g, ' ');
            this.insertTextAtCursor(text);
        });
    }
    
    insertTextAtCursor(text) {
        // Modern approach that works consistently in Firefox and Chrome
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        
        const range = selection.getRangeAt(0);
        range.deleteContents();
        
        // Replace spaces with non-breaking spaces for proper rendering
        const processedText = text.replace(/ /g, '\u00A0');
        const textNode = document.createTextNode(processedText);
        range.insertNode(textNode);
        
        // Move cursor to end of inserted text
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Ensure the input is focused
        this.userInput.focus();
    }
    
    setupWindowButtons() {
        const closeBtn = document.querySelector('.window-btn.close');
        const minimizeBtn = document.querySelector('.window-btn.minimize');
        const maximizeBtn = document.querySelector('.window-btn.maximize');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const terminal = document.getElementById('hero-terminal');
                if (terminal) {
                    terminal.style.opacity = '0';
                    terminal.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        terminal.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const terminalBody = this.terminalBody;
                if (terminalBody) {
                    if (terminalBody.style.display === 'none') {
                        terminalBody.style.display = 'block';
                        minimizeBtn.style.backgroundColor = '#1e2330';
                    } else {
                        terminalBody.style.display = 'none';
                        minimizeBtn.style.backgroundColor = '#2d3748';
                    }
                }
            });
        }
        
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const terminal = document.getElementById('hero-terminal');
                if (terminal) {
                    terminal.classList.toggle('maximized');
                    if (terminal.classList.contains('maximized')) {
                        terminal.style.position = 'fixed';
                        terminal.style.top = '4rem';
                        terminal.style.left = '1rem';
                        terminal.style.right = '1rem';
                        terminal.style.bottom = '1rem';
                        terminal.style.zIndex = '9999';
                        terminal.style.maxWidth = 'none';
                        maximizeBtn.textContent = '❐';
                    } else {
                        terminal.style.position = '';
                        terminal.style.top = '';
                        terminal.style.left = '';
                        terminal.style.right = '';
                        terminal.style.bottom = '';
                        terminal.style.zIndex = '';
                        terminal.style.maxWidth = '';
                        maximizeBtn.textContent = '□';
                    }
                }
            });
        }
    }
    
    activate() {
        if (this.isActive) {
            // Already active, just ensure focus
            if (this.userInput) {
                this.userInput.focus();
                // Move cursor to end
                this.moveCursorToEnd();
            }
            return;
        }
        
        this.isActive = true;
        this.userInput.setAttribute('contenteditable', 'true');
        
        // Don't focus immediately - let user scroll naturally first
        // Focus will happen on first keypress or click
        
        // Move cursor to end when focused
        this.moveCursorToEnd();
    }
    
    moveCursorToEnd() {
        // Cross-browser compatible cursor positioning
        const range = document.createRange();
        const sel = window.getSelection();
        
        // Ensure we have content to work with
        if (this.userInput.childNodes.length > 0) {
            const lastNode = this.userInput.childNodes[this.userInput.childNodes.length - 1];
            if (lastNode.nodeType === Node.TEXT_NODE) {
                range.setStart(lastNode, lastNode.length);
            } else {
                range.setStartAfter(lastNode);
            }
        } else {
            range.setStart(this.userInput, 0);
        }
        
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    
    executeCommand() {
        // Get input and normalize spaces
        const input = this.userInput.textContent.replace(/\u00A0/g, ' ').trim();
        
        if (!input) {
            this.addNewPrompt();
            return;
        }
        
        // Add to history
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;
        
        // Parse command and arguments
        const parts = input.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');
        
        // Create a command echo line (showing what user typed)
        const commandEcho = document.createElement('div');
        commandEcho.className = 'terminal-line';
        commandEcho.innerHTML = `<span class="prompt">└──╼</span> <span class="prompt-symbol">$</span> <span class="command">${this.escapeHtml(input)}</span>`;
        
        // Create output section
        const output = document.createElement('div');
        output.className = 'terminal-output';
        
        // Execute command
        if (this.commands[command]) {
            const result = this.commands[command](args);
            output.innerHTML = result;
        } else if (input === 'sudo rm -rf /') {
            output.innerHTML = this.sudo();
        } else {
            output.innerHTML = `<span style="color: #ff5555;">bash: ${command}: command not found</span><br>
<span style="color: #6272a4;">Try 'help' to see available commands</span>`;
        }
        
        // Insert command echo before interactive line
        this.interactiveLine.parentNode.insertBefore(commandEcho, this.interactiveLine);
        
        // Insert output after command echo
        this.interactiveLine.parentNode.insertBefore(output, this.interactiveLine);
        
        // Add spacing
        const br = document.createElement('br');
        this.interactiveLine.parentNode.insertBefore(br, this.interactiveLine);
        
        // Clear input and add new prompt
        this.userInput.textContent = '';
        this.addNewPrompt();
        
        // Scroll to bottom
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    addNewPrompt() {
        // Update the interactive line with new prompt
        const promptLine = this.interactiveLine.querySelector('.prompt');
        if (promptLine) {
            promptLine.textContent = '└──╼';
        }
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        this.historyIndex = Math.max(0, Math.min(this.historyIndex, this.commandHistory.length));
        
        if (this.historyIndex < this.commandHistory.length) {
            this.userInput.textContent = this.commandHistory[this.historyIndex];
        } else {
            this.userInput.textContent = '';
        }
        
        // Move cursor to end using the helper method
        this.moveCursorToEnd();
    }
    
    autocomplete() {
        const input = this.userInput.textContent.trim();
        if (!input) return;
        
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.userInput.textContent = matches[0];
            // Move cursor to end using the helper method
            this.moveCursorToEnd();
        }
    }
    
    showHelp() {
        return `<span style="color: #8be9fd;">Available commands:</span><br><br>
<span style="color: #50fa7b;">help</span>        - Show this help message<br>
<span style="color: #50fa7b;">clear</span>       - Clear the terminal<br>
<span style="color: #50fa7b;">echo</span>        - Print text to terminal<br>
<span style="color: #50fa7b;">date</span>        - Show current date and time<br>
<span style="color: #50fa7b;">whoami</span>      - Display user information<br>
<span style="color: #50fa7b;">pwd</span>         - Print working directory<br>
<span style="color: #50fa7b;">ls</span>          - List directory contents<br>
<span style="color: #50fa7b;">cat</span>         - Display file contents (try: cat readme.md)<br>
<span style="color: #50fa7b;">about</span>       - Learn more about me<br>
<span style="color: #50fa7b;">socials</span>     - Show social media links<br>
<span style="color: #50fa7b;">skills</span>      - Display technical skills<br>
<span style="color: #50fa7b;">cowsay</span>      - Make a cow say something<br>
<span style="color: #50fa7b;">fortune</span>     - Get a random programming quote<br>
<span style="color: #50fa7b;">banner</span>      - Display ASCII art banner<br>
<span style="color: #50fa7b;">coffee</span>      - Get some coffee ☕<br>
<span style="color: #50fa7b;">hack</span>        - Try to hack the mainframe<br>
<span style="color: #50fa7b;">matrix</span>      - Enter the matrix<br>
<span style="color: #50fa7b;">exit</span>        - Deactivate interactive mode<br><br>
<span style="color: #6272a4;">Tip: Use ↑↓ for command history, Tab for autocomplete</span>`;
    }
    
    clearTerminal() {
        // Store reference to initial content
        const initialContent = `
            <div class="terminal-line">
                <span class="prompt">└──╼</span>
                <span class="prompt-symbol">$</span>
                <span class="command">whoami</span>
            </div>
            <div class="terminal-output" id="terminal-output">
                <!-- Dynamic content based on persona -->
            </div>
            <br />
            <div class="terminal-line">
                <span class="prompt">└──╼</span>
                <span class="prompt-symbol">$</span>
                <span class="command">ls</span>
            </div>
            <div class="terminal-output">
                <a href="about.html" class="output-item-underlined ls-file">about.html</a>
                <a href="projects.html" class="output-item-underlined ls-file">projects.html</a>
                <a href="blog.html" class="output-item-underlined ls-file">blog.html</a>
                <a href="contact.html" class="output-item-underlined ls-file">contact.html</a>
            </div>
            <br />
            <div class="terminal-line interactive-line" id="interactive-line">
                <span class="prompt">└──╼</span>
                <span class="prompt-symbol">$</span>
                <span class="user-input" id="user-input" contenteditable="${this.isActive ? 'true' : 'false'}"></span>
            </div>
        `;
        
        this.terminalBody.innerHTML = initialContent;
        
        // Reconnect references
        this.userInput = document.getElementById('user-input');
        this.interactiveLine = document.getElementById('interactive-line');
        
        // Re-attach event listeners to new input element
        if (this.userInput) {
            this.userInput.addEventListener('input', () => {
                this.userInput.textContent = this.userInput.textContent.replace(/\n/g, '');
            });
            
            this.userInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = e.clipboardData.getData('text/plain').replace(/\n/g, ' ');
                this.insertTextAtCursor(text);
            });
            
            if (this.isActive) {
                this.userInput.focus();
            }
        }
        
        // Trigger persona content update
        if (typeof window.PersonaManager !== 'undefined') {
            const persona = window.PersonaManager.getCurrentPersona();
            const event = new CustomEvent('personaChanged', {
                detail: { persona }
            });
            document.dispatchEvent(event);
        }
        
        return '<span style="color: #6272a4;">Terminal cleared</span>';
    }
    
    echo(args) {
        return args || '';
    }
    
    showDate() {
        const now = new Date();
        return now.toString();
    }
    
    cat(args) {
        const files = {
            'readme.md': `<span style="color: #8be9fd;">╔═══════════════════════════════════╗<br>
║      SHEHAB'S PORTFOLIO  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         ║<br>
╚═══════════════════════════════════╝</span><br><br>
<span style="color: #50fa7b;">## About</span><br>
Computer Engineering student passionate about<br>
software development, open source, and creating<br>
innovative solutions.<br><br>
<span style="color: #50fa7b;">## Quick Links</span><br>
- GitHub: github.com/ashmod<br>
- LinkedIn: linkedin.com/in/ShehabMahmoud<br>
- Email: shehab@ashmod.dev<br><br>
<span style="color: #6272a4;"># Built with ❤️ and driven by procrastination.</span>`,
            'skills.txt': this.skills(),
            'about.txt': this.about()
        };
        
        if (!args) {
            return '<span style="color: #ff5555;">cat: missing file operand</span><br><span style="color: #6272a4;">Try: cat readme.md</span>';
        }
        
        return files[args] || `<span style="color: #ff5555;">cat: ${args}: No such file or directory</span>`;
    }
    
    cowsay(args) {
        const message = args || 'Hello from the terminal!';
        const msgLength = message.length;
        const border = '_'.repeat(msgLength + 2);
        
        return `<span style="color: #f1fa8c;"> ${border}<br>< ${message} ><br> ${'-'.repeat(msgLength + 2)}<br>        \\   ^__^<br>         \\  (oo)\\_______<br>            (__)\\       )\\/\\<br>                ||----w |<br>                ||     ||</span>`;
    }
    
    whoami() {
        return `<span style="color: #bd93f9;">shehab</span><br>
<span style="color: #6272a4;">Computer Engineering Student | Software Developer</span><br>
<span style="color: #6272a4;">Location: Earth</span><br>
<span style="color: #6272a4;">Status: Hands on keyboard probably</span>`;
    }
    
    ls() {
        return `<span style="color: #8be9fd;">drwxr-xr-x</span>  <span style="color: #f1fa8c;">projects/</span><br>
<span style="color: #8be9fd;">drwxr-xr-x</span>  <span style="color: #f1fa8c;">blog/</span><br>
<span style="color: #6272a4;">-rw-r--r--</span>  <span style="color: #50fa7b;">about.html</span><br>
<span style="color: #6272a4;">-rw-r--r--</span>  <span style="color: #50fa7b;">contact.html</span><br>
<span style="color: #6272a4;">-rw-r--r--</span>  readme.md<br>
<span style="color: #6272a4;">-rw-r--r--</span>  skills.txt`;
    }
    
    about() {
        return `<span style="color: #8be9fd;">╔════════════════════════════════════════════╗<br>
║           ABOUT ME      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         ║<br>
╚════════════════════════════════════════════╝</span><br><br>
<span style="color: #50fa7b;">→</span> Computer Engineering student<br>
<span style="color: #50fa7b;">→</span> Passionate about Software Development & Open Source<br>
<span style="color: #50fa7b;">→</span> Interests: AI/ML, Cybersecurity, Web Development<br>
<span style="color: #50fa7b;">→</span> Always learning, always building<br><br>
<span style="color: #f1fa8c;">Fun Fact:</span> Pokemon nerd`;
    }
    
    socials() {
        return `<span style="color: #8be9fd;">╔════════════════════════════════════════════╗<br>
║            CONNECT WITH ME     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;              ║<br>
╚════════════════════════════════════════════╝</span><br><br>
<span style="color: #50fa7b;">🐙 GitHub:</span>    <a href="https://github.com/ashmod" target="_blank" style="color: #8be9fd;">github.com/ashmod</a><br>
<span style="color: #50fa7b;">💼 LinkedIn:</span>  <a href="https://linkedin.com/in/ShehabMahmoud" target="_blank" style="color: #8be9fd;">linkedin.com/in/ShehabMahmoud</a><br>
<span style="color: #50fa7b;">🐦 Twitter:</span>   <a href="https://x.com/shehabtweets" target="_blank" style="color: #8be9fd;">x.com/shehabtweets</a><br>
<span style="color: #50fa7b;">📧 Email:</span>     <a href="mailto:shehab@ashmod.dev" style="color: #8be9fd;">shehab@ashmod.dev</a><br>
<span style="color: #50fa7b;">🎨 Behance:</span>   <a href="https://behance.net/dizzydroid" target="_blank" style="color: #8be9fd;">behance.net/dizzydroid</a>`;
    }
    
    skills() {
        return `<span style="color: #8be9fd;">╔════════════════════════════════════════════╗<br>
║              TECHNICAL SKILLS      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        ║<br>
╚════════════════════════════════════════════╝</span><br><br>
<span style="color: #f1fa8c;">Languages:</span><br>
  <span style="color: #50fa7b;">▰▰▰▰▰▰▰▰▰</span> Java, JS/TS, Python<br>
  <span style="color: #50fa7b;">▰▰▰▰▰▰▰▰</span>  Go, C<br>
  <span style="color: #50fa7b;">▰▰▰▰▰▰</span>    C++, SQL<br><br>
<span style="color: #f1fa8c;">Frameworks:</span><br>
  React, Node.js, Next.js, PyTorch, TensorFlow<br><br>
<span style="color: #f1fa8c;">Tools:</span><br>
  Git, Docker, Maven, VS Code, Vim, Linux<br><br>
<span style="color: #f1fa8c;">Areas:</span><br>
  Software Engineering, Web Development, ML/AI, Cybersecurity`;
    }
    
    coffee() {
        return `<span style="color: #f1fa8c;">      ) )  (<br>     ( ( (  )<br>      ) ) ( (<br>    ┌───────────┐<br>    │  COFFEE   │<br>    │  ☕ ☕ ☕  │<br>    └───────────┘</span><br>
<span style="color: #6272a4;">*sips coffee*</span><br>
<span style="color: #50fa7b;">Ahh... Much better! ☕</span><br>
<span style="color: #bd93f9;">Energy level: [████████░░] 80%</span>`;
    }
    
    hack() {
        return `<span style="color: #50fa7b;">$ Initializing hack sequence...</span><br>
<span style="color: #ff5555;">[████████████████████] 100%</span><br><br>
<span style="color: #ff5555;">ACCESS DENIED</span><br>
<span style="color: #f1fa8c;">⚠️  Warning: This incident will be reported</span><br>
<span style="color: #6272a4;">Just kidding! Nice try though!</span><br><br>
<span style="color: #bd93f9;">Did you really think it would be that easy?</span>`;
    }
    
    matrix() {
        return `<span style="color: #50fa7b;">Wake up, Neo...<br>
The Matrix has you...<br>
Follow the white rabbit 🐰<br><br>
Knock, knock, Neo.<br><br>
01010111 01100001 01101011 01100101 00100000<br>
01110101 01110000</span><br><br>
<span style="color: #6272a4;">*Matrix code rains down*</span><br>
<span style="color: #8be9fd;">You take the blue pill, the story ends...</span><br>
<span style="color: #ff5555;">You take the red pill, you stay in wonderland...</span>`;
    }
    
    fortune() {
        const randomFortune = this.fortunes[Math.floor(Math.random() * this.fortunes.length)];
        return `<span style="color: #f1fa8c;">🔮 Fortune Cookie Says:</span><br><br>
<span style="color: #bd93f9;">"${randomFortune}"</span><br><br>
<span style="color: #6272a4;">    /\\_/\\<br>   ( o.o )<br>    &gt; ^ &lt;</span>`;
    }
    
    banner() {
        return `<span style="color: #8be9fd;">  ███████╗██╗  ██╗███████╗██╗  ██╗ █████╗ ██████╗<br>  ██╔════╝██║  ██║██╔════╝██║  ██║██╔══██╗██╔══██╗<br>  ███████╗███████║█████╗  ███████║███████║██████╔╝<br>  ╚════██║██╔══██║██╔══╝  ██╔══██║██╔══██║██╔══██╗<br>  ███████║██║  ██║███████╗██║  ██║██║  ██║██████╔╝<br>  ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝</span><br>
<span style="color: #50fa7b;">         Portfolio | Est. 2025</span><br>
<span style="color: #f1fa8c;">    "Redefining lives, one line of code at a time"</span>`;
    }
    
    sudo() {
        return `<span style="color: #ff5555;">⚠️  CRITICAL WARNING ⚠️</span><br><br>
<span style="color: #f1fa8c;">[sudo] password for shehab: </span><span style="color: #6272a4;">**********</span><br><br>
<span style="color: #ff5555;">Are you SURE you want to delete everything? [y/N]:</span> <span style="color: #6272a4;">N</span><br><br>
<span style="color: #50fa7b;">Operation cancelled. Crisis averted!</span><br>
<span style="color: #bd93f9;">Tip: Don't try this at home.`;
    }
    
    exit() {
        this.isActive = false;
        this.userInput.setAttribute('contenteditable', 'false');
        this.userInput.blur();
        
        return '<span style="color: #6272a4;">Interactive mode deactivated. Click terminal to reactivate.</span>';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new InteractiveTerminal();
    });
} else {
    new InteractiveTerminal();
}
