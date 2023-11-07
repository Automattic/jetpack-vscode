# Jetpack VS Code Extension

## Features

The Jetpack VS Code extension brings the power of the Jetpack CLI to your VS Code workspace! Version 1.0.0 includes two built in commands that you can use to speed up your development workflow: `rsync`, and `watch`.

## Using the Commands

In your VS Code window, use `ctrl/cmd + shift + p` to open the command palette and search for "Jetpack" - you'll see three commands:

* **Jetpack: Rsync:** This will let you choose a remote site to connect and sync your development environment to. Choosing this command will walk you through choosing which project to rsync and which remote site to connect to. If you're connecting to a Jurassic Ninja site, it will open a terminal in your VSCode workspace so you can enter the site's password. 
* **Jetpack: Watch Project:** The command will watch your specified project and re-build automatically whenever you save your changes, so you don't have to build manually every time you work on Jetpack. You can run this command multiple times to follow many projects a once. You can monitor which projects are being watched by hovering over the heart icon in VSCode's bottom toolbar.  
* **Jetpack Stop Watching Project**: If you've watched projects, this command will let you stop watching a specific project, or stop watching all of them at once.

## Extension Settings

The Jetpack VS Code extension has an option to enable analytics tracking. You can enable it in your setting.json or by searching for Analytics Settings in the settings UI:

* `jetpackVSCode.enableAnalytics`: Set to `true` or `false`. Set to `false` by default.

With this setting enabled, the extension will report how often a specific command is used. No personally identifying information is sent.

## Release Notes

### 1.0.0

- Initial release of extension
- Adds Jetpack Rsync command
- Adds Jetpack Watch and Stop Watching commands
- Adds support for analytics tracking.

## Bug Reporting

You can submit bug reports to https://github.com/Automattic/jetpack-vscode
