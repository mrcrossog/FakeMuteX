/**
 * @name FakeMuteX
 * @version 1.2.7
 * @description Allows you to fake mute yourself in Discord voice channels, appearing muted to others while still being able to speak and hear. Supports customizable keybind combinations.
 * @author MrCross
 * @source https://github.com/your-repo/FakeMute
 */

module.exports = class FakeMute {
    constructor() {
        this.originalSend = null;
        this.isFakeMuteActive = false;
        this.button = null;
        this.intervalId = null;
        // Load saved keybind settings
        const savedKeybind = BdApi.Data.load("FakeMute", "keybind") || {
            key: "F6",
            code: "F6",
            ctrl: false,
            shift: false,
            alt: false
        };
        this.keybind = savedKeybind;
    }

    start() {
        this.tryInjectButton();
        this.setupKeybindListener();
        console.log("[FakeMuteX] Plugin started. Checking for button container...");
    }

    stop() {
        // Disable WebSocket interception
        if (this.originalSend) {
            WebSocket.prototype.send = this.originalSend;
            this.originalSend = null;
        }
        // Remove the button
        if (this.button) {
            this.button.remove();
            this.button = null;
        }
        // Stop container checking
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        // Remove keybind listener
        document.removeEventListener("keydown", this.handleKeybind);
        console.log("[FakeMuteX] Plugin stopped.");
    }

    // Intercept WebSocket for fake mute
    interceptWebSocket() {
        if (this.originalSend) return; // Already intercepted
        this.originalSend = WebSocket.prototype.send;
        const self = this;

        WebSocket.prototype.send = function (data) {
            try {
                if (self.isFakeMuteActive && Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
                    const text = new TextDecoder("utf-8").decode(data);
                    if (text.includes("self_mute")) {
                        data = new TextEncoder().encode(text.replace('"self_mute":false', '"self_mute":true'));
                    }
                }
                return self.originalSend.apply(this, [data]);
            } catch (e) {
                console.error("[FakeMuteX] Error in WebSocket interception:", e);
                return self.originalSend.apply(this, [data]);
            }
        };
    }

    // Restore WebSocket interception
    restoreWebSocket() {
        if (this.originalSend) {
            WebSocket.prototype.send = this.originalSend;
            this.originalSend = null;
        }
    }

    // Set up keybind listener
    setupKeybindListener() {
        this.handleKeybind = (event) => {
            const { ctrl, shift, alt, code } = this.keybind;
            if (
                event.code === code &&
                event.ctrlKey === ctrl &&
                event.shiftKey === shift &&
                event.altKey === alt
            ) {
                this.toggleFakeMute();
            }
        };
        document.addEventListener("keydown", this.handleKeybind);
    }

    // Toggle fake mute
    toggleFakeMute() {
        this.isFakeMuteActive = !this.isFakeMuteActive;
        if (this.isFakeMuteActive) {
            this.interceptWebSocket();
            console.log("[FakeMuteX] Fake mute enabled.");
        } else {
            this.restoreWebSocket();
            console.log("[FakeMuteX] Fake mute disabled.");
        }
        if (this.button) {
            const existingButton = document.querySelector(
                '[class*="voiceControls_"], [class*="controlButtonsContainer_"], [class*="buttons_"] button'
            );
            this.button.style.backgroundColor = this.isFakeMuteActive
                ? "#ed4245"
                : existingButton
                ? window.getComputedStyle(existingButton).backgroundColor
                : "#4f545c";
            this.updateButtonIcon();
            this.button.setAttribute(
                "aria-label",
                this.isFakeMuteActive ? "Disable fake mute" : "Enable fake mute"
            );
        }
    }

    // Attempt to inject button with DOM loading wait
    tryInjectButton() {
        const self = this;
        let attempts = 0;
        const maxAttempts = 30; // Check 30 times (15 seconds at 500ms intervals)

        this.intervalId = setInterval(() => {
            const voiceControlContainer = document.querySelector(
                '[class*="voiceControls_"], [class*="controlButtonsContainer_"], [class*="buttons_"]'
            );
            attempts++;

            if (voiceControlContainer) {
                clearInterval(self.intervalId);
                self.intervalId = null;
                self.injectButton(voiceControlContainer);
                console.log("[FakeMuteX] Button container found, button added.");
            } else if (attempts >= maxAttempts) {
                clearInterval(self.intervalId);
                self.intervalId = null;
                console.error(
                    "[FakeMuteX] Failed to find button container after",
                    maxAttempts,
                    "attempts. Try reloading Discord."
                );
            } else {
                console.log("[FakeMuteX] Button container not found, attempt", attempts);
            }
        }, 500); // Check every 500ms
    }

    // Inject button into Discord interface
    injectButton(voiceControlContainer) {
        const self = this;

        // Create button with Discord classes
        this.button = document.createElement("button");
        this.button.setAttribute(
            "aria-label",
            this.isFakeMuteActive ? "Disable fake mute" : "Enable fake mute"
        );
        this.button.className = "button__67645 controlButton_67645"; // Standard Discord classes
        this.button.style.width = "32px";
        this.button.style.height = "38px";
        this.button.style.display = "flex";
        this.button.style.alignItems = "center";
        this.button.style.justifyContent = "center";
        this.button.style.borderRadius = "4px";
        this.button.style.backgroundColor = this.isFakeMuteActive ? "#ed4245" : "#4f545c";
        this.button.style.transition = "background-color 0.2s ease";
        this.button.style.position = "relative"; // Set positioning
        this.button.style.margin = "0 4px"; // Add margins for alignment
        this.updateButtonIcon();

        // Copy styles from other buttons
        const existingButton = voiceControlContainer.querySelector("button");
        if (existingButton) {
            const computedStyles = window.getComputedStyle(existingButton);
            this.button.style.border = computedStyles.border || "none";
            this.button.style.boxShadow = computedStyles.boxShadow || "none";
            this.button.style.lineHeight = computedStyles.lineHeight || "32px"; // Align height
            this.button.style.fontSize = computedStyles.fontSize || "0"; // Set font-size for proper display
            if (!this.isFakeMuteActive) {
                this.button.style.backgroundColor = computedStyles.backgroundColor || "#4f545c";
            }
        } else {
            // Fallback style if existing buttons are not found
            this.button.style.border = "none";
            this.button.style.boxShadow = "none";
            this.button.style.lineHeight = "32px";
        }

        // Button click handler
        this.button.addEventListener("click", () => {
            self.toggleFakeMute();
        });

        // Hover effect
        this.button.addEventListener("mouseenter", () => {
            if (!self.isFakeMuteActive) {
                self.button.style.backgroundColor = "#72767d";
            }
        });

        this.button.addEventListener("mouseleave", () => {
            if (!self.isFakeMuteActive) {
                self.button.style.backgroundColor = existingButton
                    ? window.getComputedStyle(existingButton).backgroundColor
                    : "#4f545c";
            }
        });

        // Insert button into container
        voiceControlContainer.appendChild(this.button);
    }

    // Update button icon (classic headphone icon)
    updateButtonIcon() {
        if (this.isFakeMuteActive) {
            this.button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="white" d="M12 2.003C6.486 2.003 2 6.488 2 12.003v7.334c0 1.99 1.656 3.667 3.666 3.667h.667c.736 0 1.333-.597 1.333-1.333v-4c0-.736-.597-1.333-1.33-1.333H5.666c-.736 0-1.333-.597-1.333-1.333v-3.334c0-4.418 3.582-8 8-8s8 3.582 8 8v3.334c0 .736-.597 1.333-1.333 1.333h-.667c-.736 0-1.333.597-1.333 1.333v4c0 .736.597 1.333 1.333 1.333h.667c2.01 0 3.666-1.678 3.666-3.667v-7.334c0-5.515-4.486-10-10-10zm-3.5 15.336h-1.333v4h1.333v-4zm7.333 0v4h1.333v-4h-1.333z"/>
                    <path fill="none" stroke="white" stroke-width="2" d="M3 3L21 21"/>
                </svg>`;
            this.button.title = "Disable fake mute";
        } else {
            this.button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 2.003C6.486 2.003 2 6.488 2 12.003v7.334c0 1.99 1.656 3.667 3.666 3.667h.667c.736 0 1.333-.597 1.333-1.333v-4c0-.736-.597-1.333-1.333-1.333H5.666c-.736 0-1.333-.597-1.333-1.333v-3.334c0-4.418 3.582-8 8-8s8 3.582 8 8v3.334c0 .736-.597 1.333-1.333 1.333h-.667c-.736 0-1.333.597-1.333 1.333v4c0 .736.597 1.333 1.333 1.333h.667c2.01 0 3.666-1.678 3.666-3.667v-7.334c0-5.515-4.486-10-10-10zm-3.5 15.336h-1.333v4h1.333v-4zm7.333 0v4h1.333v-4h-1.333z"/>
                </svg>`;
            this.button.title = "Enable fake mute";
        }
    }

    // Format keybind display
    formatKeybind() {
        const { key, ctrl, shift, alt } = this.keybind;
        let modifiers = [];
        if (ctrl) modifiers.push("Ctrl");
        if (shift) modifiers.push("Shift");
        if (alt) modifiers.push("Alt");
        return [...modifiers, key].join("+");
    }

    getSettingsPanel() {
        const panel = document.createElement("div");
        panel.innerHTML = `
            <div style="padding: 10px;">
                <h3 style="font-size: 16px; color: #b9bbbe; margin-top: 5px;" >Fake Mute Plugin Settings</h3>
                <p style="font-size: 15px; color: #b9bbbe; margin-top: 5px;">This plugin adds a headphone icon button next to the mute and deafen buttons to enable/disable fake mute. You will appear muted to others but can still speak and hear.</p>
                <div style="margin-top: 10px;">
                    <label style="display: block; color: #b9bbbe; margin-bottom: 5px;">Set keybind for fake mute:</label>
                    <input type="text" id="fakeMuteKeybind" value="${this.formatKeybind()}" placeholder="Press a key combination..." style="padding: 5px; width: 150px;" readonly/>
                    <p style="font-size: 13px; color: #b9bbbe; margin-top: 5px;">Press a key combination to assign. Current combination: ${this.formatKeybind()}</p>
                </div>
                <p style="font-size: 14px; color: #b9bbbe; margin-top: 5px;">If the button does not appear or displays incorrectly, reload Discord or check the console (Ctrl+Shift+I) for error logs.</p>
                <p style="font-size: 13px; color: #b9bbbe; margin-top: 5px;"><strong>Warning:</strong> Use at your own risk. This may violate Discord's Terms of Service.</p>
            </div>
        `;

        // Update keybind
        panel.querySelector("#fakeMuteKeybind").addEventListener("keydown", (event) => {
            event.preventDefault();
            const { key, code, ctrlKey, shiftKey, altKey } = event;
            if (key !== "Escape" && key !== "Control" && key !== "Shift" && key !== "Alt") {
                // Ignore Esc and modifiers as main key
                this.keybind = {
                    key: key,
                    code: code, // Save code for NumPad support
                    ctrl: ctrlKey,
                    shift: shiftKey,
                    alt: altKey
                };
                BdApi.Data.save("FakeMute", "keybind", this.keybind);
                panel.querySelector("#fakeMuteKeybind").value = this.formatKeybind();
                panel.querySelector("p").textContent = `Press a key combination to assign. Current combination: ${this.formatKeybind()}`;
                console.log("[FakeMute] Keybind changed to:", this.formatKeybind());
            }
        });

        return panel;
    }
};
