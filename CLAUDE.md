# LuCI-Theme-CoreNet — CLAUDE

CoreNet: a LuCI theme for OpenWrt 25.12+ (ucode templates, apk). Dark/light/auto, FA/EN with RTL chrome, grouped sidebar + favorites, Ctrl+K menu search, per-page bilingual help cards, home dashboard. Look follows corenetbase.com (PLUS98IR-Pages): dark navy, red→orange brand gradient, blue→violet primary, site logo, Vazirmatn.

## Layout (luci.mk feed package)
- `luci-theme-corenet/Makefile` - LuCI feed Makefile (PKG_VERSION 1.0.0, never bump without asking).
- `ucode/template/themes/corenet/` - header.ut, footer.ut, sysauth.ut (own login page, plain POST form).
- `htdocs/luci-static/corenet/` - base.css (= bootstrap cascade.css, Apache-2.0, keeps all widget mechanics), base-mobile.css, corenet.css (our layer; maps bootstrap vars to --cn-* tokens), help.js (CN_HELP: per-path fa title, icon, en/fd descriptions, w/fw warnings, k keywords), logo.svg, fonts/Vazirmatn 400/700.
- `htdocs/luci-static/resources/menu-corenet.js` - nav, tabs, crumbs, help card, palette, lang/theme switch, dashboard (status/overview only).
- `root/usr/share/rpcd/ucode/luci.corenet` - `upgrades` method (apk/opkg upgradable list, cached 30 min in /tmp). ACL in root/usr/share/rpcd/acl.d/.
- `root/etc/uci-defaults/30_luci-theme-corenet` - registers luci.themes.CoreNet + `luci.corenet` section (lang auto|fa|en, theme dark|light|auto). Does NOT make it the default theme.
- Optional local file `/www/luci-static/corenet/custom.js` (not packaged): `window.CN_NOTES = { 'menu/path': {en, fa} }`, `window.CN_PINS = [...]`.

## Gotchas
- ui.menu.getChildren() resolves alias nodes to their target (no children) - walk the raw `node.children[name]` for deeper levels.
- `network.wireless status` fails from the browser session; use `luci-rpc getWirelessDevices` (includes iwinfo per interface).
- Byte strings are wrapped in U+2066/U+2069 so they read right in RTL.
- No apk-tools mkpkg on the router or PC (no WSL/Docker): build the .apk with the OpenWrt SDK (GitHub Actions) or install files directly.

## Test
- Deploy: `tar -cf - -C htdocs . | ssh root@192.168.30.1 'tar -xf - -C /www'` (same for ucode -> /usr/share/ucode/luci, root -> /).
- Screenshots: Playwright (pip, channel=chrome) with a temp ubus session cookie `sysauth_http` (grant access-group all + ubus/uci/file *). Destroy the session after.
- 2026-11-12: all 59 menu pages load without JS errors (EN/FA, dark/light, 390px mobile).

## v1.1.0 (released 2026-11-12)
- Upgrade all: button next to "Update lists…" (anchor `#view button[data-command="update"]`) on the Software page; confirm dialog lists packages, skips kmod-*/kernel; rpcd `upgrade_start` writes /tmp/corenet-upgrade.sh and runs it with setsid in the background (survives rpcd/uhttpd restarts), `upgrade_status` returns log + EXIT code; optional hook /etc/corenet/post-upgrade.
- Accordion sidebar: only the active category is open; opening one closes the others (favorites keep their own state in cn-fav-open).

- apk feed: CI runs `apk mkndx --sign-key` and publishes pages/apk (apk + packages.adb + corenet.pem) to gh-pages -> https://corenetbase.com/luci-theme-corenet/apk/packages.adb (Pages on, served via Cloudflare; reachable from the router with and without PassWall). Add that line to customfeeds.list to get updates in Software > Updates. A future project web page must be added to the same pages dir in the workflow (keep_files: false wipes gh-pages each release).

## Status
- GitHub: public https://github.com/Plus98ir/luci-theme-corenet (no corenetbase.com page yet). CI (.github/workflows/build.yml) builds with the x86_64 25.12.6 SDK, signs with secret APK_SIGN_KEY (private key backup: .keys/corenet-private.pem, gitignored), verifies with corenet.pem; tag v* -> release (apk + corenet.pem).
- LuCI Software upload runs plain `apk add` (no --allow-untrusted) -> users add corenet.pem once in System > Administration > Repo Public Keys.
- LUCI_MINIFY_CSS:=0 - csstidy merged the two Vazirmatn @font-face rules and dropped the regular weight.
- Write workflow files with explicit UTF-8 (python open() default on Windows is cp1252 and broke the YAML once).
- 2026-11-12 v1.0.0: installed on Sadeq's router through the LuCI upload flow and made default; 118 page loads (fa/dark/desktop + en/light/390px) without errors; save/changes/revert tested. Added to /etc/thirdparty.
- Router: uclient-fetch `wget` times out to github.com; `curl -L` works.
- Next: README EN/FA + cover image + corenetbase.com page when Sadeq says so; optional apk feed on GitHub Pages for in-panel updates.
