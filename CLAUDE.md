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

## Status
- Installed on Sadeq's router as plain files (kept via sysupgrade.conf), registered, NOT default (mediaurlbase = bootstrap) until Sadeq approves.
- Open: GitHub repo public/private + corenetbase.com page (ask), CI build of the .apk, add to /etc/thirdparty when packaged.
