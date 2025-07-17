# FakeMuteX Plugin for BetterDiscord

## Overview

**FakeMuteX** is a BetterDiscord plugin that allows you to fake mute yourself in Discord voice channels, appearing muted to others while still being able to speak and hear. The plugin adds a headphone icon button next to the mute and deafen buttons in the Discord interface, with support for customizable keybind combinations, including NumPad keys.

> **Warning**: Using this plugin may violate Discord's Terms of Service. Use at your own risk.

## Features

- **Fake Mute**: Appear muted to others while continuing to speak and hear.
- **Customizable Keybinds**: Assign key combinations (e.g., `Ctrl+5`) to toggle fake mute.
- **Seamless Integration**: The button uses native Discord styling and aligns with existing voice control buttons.
- **Settings Panel**: Configure keybinds directly in the BetterDiscord plugin settings.

## Installation

1. **Install BetterDiscord**:
   - If you haven't already, install BetterDiscord by following the instructions on the [official BetterDiscord website](https://betterdiscord.app/).
2. **Download the Plugin**:
   - Download the `FakeMuteX.plugin.js` file from the [Releases](https://github.com/mrcrossog/FakeMuteX/releases) page or clone this repository.
3. **Place the Plugin**:
   - Move the `FakeMuteX.plugin.js` file to your BetterDiscord plugins folder:
     - **Windows**: `%appdata%\BetterDiscord\plugins`
     - **Mac**: `~/Library/Application Support/BetterDiscord/plugins`
     - **Linux**: `~/.local/share/BetterDiscord/plugins`
4. **Enable the Plugin**:
   - Open Discord, go to **User Settings > Plugins**, and enable the **FakeMute** plugin.
5. **Reload Discord**:
   - Press `Ctrl+R` (or `Cmd+R` on Mac) to reload Discord and activate the plugin.

## Usage

1. **Locate the Button**:
   - After enabling the plugin, a headphone icon button will appear next to the mute and deafen buttons in Discord's voice control panel.
2. **Toggle Fake Mute**:
   - Click the button to enable or disable fake mute. When enabled, the button turns red, and you appear muted to others but can still speak and hear.
3. **Set a Keybind**:
   - Go to **User Settings > Plugins > FakeMute > Open Plugin Settings**.
   - Click the keybind input field and press a key combination (e.g., `Shift+F6`).
   - The keybind will be saved and displayed in the settings panel.
4. **Use the Keybind**:
   - Press the assigned key combination to toggle fake mute without clicking the button.
5. **Troubleshooting**:
   - If the button doesn't appear, reload Discord (`Ctrl+R`) or check the console (`Ctrl+Shift+I`) for errors.
   - Ensure BetterDiscord is properly installed and the plugin is enabled.

## Configuration

- **Keybind Customization**:
  - In the plugin settings, click the keybind input field and press any combination of `Ctrl`, `Shift`, `Alt`, and a main key (including NumPad keys).
  - Example keybinds: `Ctrl+H`, `Shift+F6`, `Alt+L`.
  - The current keybind is displayed in the settings panel.

## Notes

- The plugin uses BetterDiscord's `BdApi` for storing keybind settings, ensuring compatibility with the BetterDiscord environment.
- If issues arise, check the console (`Ctrl+Shift+I`) for error logs and ensure the plugin is up to date.
- The plugin modifies WebSocket data to simulate a muted state. Use cautiously, as it may be detected by Discord.

## Warning

This plugin may violate Discord's Terms of Service, as it alters the expected behavior of the mute function. Using it could result in account restrictions or bans. The author is not responsible for any consequences of using this plugin.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
