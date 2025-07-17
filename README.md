FakeMute Plugin for BetterDiscord
Overview
FakeMute is a BetterDiscord plugin that allows you to appear muted in Discord voice channels while still being able to speak and hear. It adds a headphone icon button next to the mute and deafen buttons in the Discord interface, with support for customizable keybind combinations, including NumPad keys.
Warning: Using this plugin may violate Discord's Terms of Service. Use at your own risk.
Features

Fake Mute: Appear muted to others while continuing to speak and hear.
Customizable Keybinds: Assign key combinations (e.g., Ctrl+Shift+Numpad1) to toggle fake mute.
NumPad Support: Distinctly recognizes NumPad keys (e.g., Numpad1 vs. Digit1).
Seamless Integration: The button uses Discord's native styling and aligns with existing voice control buttons.
Settings Panel: Configure keybinds directly in the BetterDiscord plugin settings.

Installation

Install BetterDiscord: If you haven't already, install BetterDiscord by following the instructions on the BetterDiscord website.
Download the Plugin:
Download the FakeMute.plugin.js file from the Releases page or clone this repository.


Place the Plugin:
Move FakeMute.plugin.js to your BetterDiscord plugins folder:
Windows: %appdata%\BetterDiscord\plugins
Mac: ~/Library/Application Support/BetterDiscord/plugins
Linux: ~/.local/share/BetterDiscord/plugins




Enable the Plugin:
Open Discord, go to User Settings > Plugins, and enable the FakeMute plugin.


Reload Discord: Press Ctrl+R (or Cmd+R on Mac) to reload Discord and activate the plugin.

Usage

Locate the Button:
After enabling the plugin, a headphone icon button will appear next to the mute and deafen buttons in Discord's voice control panel.


Toggle Fake Mute:
Click the button to enable or disable fake mute. When enabled, the button turns red, and you appear muted to others but can still speak and hear.


Set a Keybind:
Go to User Settings > Plugins > FakeMute > Open Plugin Settings.
Click the keybind input field and press a key combination (e.g., Ctrl+Shift+F6 or Numpad1).
The keybind will be saved and displayed in the settings panel.


Use the Keybind:
Press the assigned key combination to toggle fake mute without clicking the button.


Troubleshooting:
If the button doesn't appear, reload Discord (Ctrl+R) or check the console (Ctrl+Shift+I) for errors.
Ensure BetterDiscord is properly installed and the plugin is enabled.



Configuration

Keybind Customization:
In the plugin settings, click the keybind input field and press any combination of Ctrl, Shift, Alt, and a main key (including NumPad keys).
Example keybinds: Ctrl+Numpad1, Shift+F6, Ctrl+Shift+Enter.
The current keybind is displayed in the settings panel.


NumPad Support: NumPad keys (e.g., Numpad1) are treated separately from main keyboard keys (e.g., Digit1).

Notes

The plugin uses BetterDiscord's BdApi for storing keybind settings, ensuring compatibility with BetterDiscord's environment.
If you encounter issues, check the console (Ctrl+Shift+I) for error logs and ensure the plugin is up to date.
This plugin modifies WebSocket data to simulate a muted state. Use cautiously, as it may be detected by Discord.

Warning
This plugin may violate Discord's Terms of Service, as it alters the expected behavior of the mute function. Using it could result in account restrictions or bans. The author is not responsible for any consequences of using this plugin.
Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure your code follows the existing style and includes appropriate comments.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgments

Built for BetterDiscord, a client modification for Discord.
Inspired by the need for flexible voice control in Discord.
