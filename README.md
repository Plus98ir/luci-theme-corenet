# CoreNet — LuCI theme for OpenWrt

<a href="https://hits.sh/github.com/Plus98ir/luci-theme-corenet/"><img src="https://hits.sh/github.com/Plus98ir/luci-theme-corenet.svg?style=for-the-badge&label=views&color=f38020" alt="Views"></a>
<a href="https://github.com/Plus98ir/luci-theme-corenet/releases/latest"><img src="https://img.shields.io/github/v/release/Plus98ir/luci-theme-corenet?style=for-the-badge&label=release&color=8b7cf6" alt="Latest release"></a>
<img src="https://img.shields.io/badge/OpenWrt-25.12%2B%20(apk)-00b5e2?style=for-the-badge" alt="OpenWrt 25.12+">

**[English](#english) · [فارسی](#فارسی)**

![CoreNet](luci-theme-corenet.png)

## English

**CoreNet is a modern, bilingual (English / Persian) theme for the OpenWrt web interface (LuCI).** It replaces the top menu with a grouped sidebar, adds a live dashboard, a menu search, a help card on every page and an **Upgrade all** button — and it is only ~150 KB.

### Screenshots

| Dashboard (dark) | Dashboard in Persian (RTL) |
|---|---|
| ![Dashboard](docs/img/dashboard-en.png) | ![Dashboard FA](docs/img/dashboard-fa.png) |
| **Menu search (Ctrl+K)** | **Light theme + Upgrade all** |
| ![Search](docs/img/search.png) | ![Light](docs/img/light-software.png) |
| **Upgrade all, live log** | **Login page** |
| ![Upgrade all](docs/img/upgrade-all.png) | ![Login](docs/img/login.png) |

| Mobile | Mobile menu | Help card |
|---|---|---|
| <img src="docs/img/mobile-dashboard.png" width="260"> | <img src="docs/img/mobile-menu.png" width="260"> | <img src="docs/img/help-fa.png" width="420"> |

### Features

| | |
|---|---|
| 🧭 **Grouped sidebar** | Icons for every page, accordion groups (opening one closes the others), and **Favorites**: pin any page with the ☆ next to it. |
| 🔎 **Menu search** | Press `Ctrl+K` or `/` and type in English or Persian (`wifi`, `رمز`, `backup`, `پسوال`…). Arrow keys + Enter to jump. |
| 📊 **Live dashboard** | On Status › Overview: internet + public IP, uptime and load, memory, storage (warns above 80 %), connected clients, Wi-Fi radios with channel / power / clients, proxy status (PassWall, PassWall 2, OpenClash, HomeProxy, Nikki) and available package updates. |
| ⬆️ **Upgrade all** | A button next to *Update lists…* on System › Software. Shows the list first, skips kernel modules, runs `apk upgrade` on the router in the background with a live log, and keeps going even if the web panel restarts. |
| 💡 **Help on every page** | A short card explains what the page does, with warnings for risky settings (WAN, firewall, flashing…). Bilingual. |
| 🌐 **English / Persian** | One click switches the menus, help and dashboard; Persian mirrors the layout to right-to-left and uses Persian digits. Vazirmatn font is built in (works offline). |
| 🌗 **Dark · Light · Auto** | Remembered per browser. |
| 📱 **Mobile ready** | Slide-out menu, stacked forms, scrollable tabs and a sticky *Save & Apply* bar. |
| 🔐 **Own login page** | Clean, centered login with the router name and model. |
| 🧩 **Works with everything** | Built on the standard LuCI widgets, so every app (including Lua apps like PassWall) keeps working. |

### Install

**From the web panel (easiest)**

1. **System › Administration › Repo Public Keys** — paste this key once (CoreNet packages are signed with it):
   ```
   -----BEGIN PUBLIC KEY-----
   MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEddziHMBCZj3GlDV2RsEBaoz1O2MP
   QrpFaEhmFk9456QWGmnq9HSk6ECbrauI9sN+2+KPvVDnyKDP75yLtu2lNA==
   -----END PUBLIC KEY-----
   ```
2. Download the `.apk` from [Releases](https://github.com/Plus98ir/luci-theme-corenet/releases/latest), then **System › Software › Upload Package…**
3. **System › System › Language and Style** → pick **CoreNet**, then reload the page with `Ctrl+F5`.

**Get updates in System › Software** — add this line to `/etc/apk/repositories.d/customfeeds.list`:
```
https://corenetbase.com/luci-theme-corenet/apk/packages.adb
```
New versions then show up in the *Updates* tab after *Update lists…*.

**From SSH**
```sh
curl -sL -o /etc/apk/keys/corenet.pem https://github.com/Plus98ir/luci-theme-corenet/releases/latest/download/corenet.pem
echo https://corenetbase.com/luci-theme-corenet/apk/packages.adb >> /etc/apk/repositories.d/customfeeds.list
apk update && apk add luci-theme-corenet
```

### Settings

| What | How |
|---|---|
| Default language | `uci set luci.corenet.lang=fa` (`auto` / `fa` / `en`) and `uci commit luci`. Each browser can still switch with the button. |
| Default theme | `uci set luci.corenet.theme=dark` (`dark` / `light` / `auto`). |
| Your own notes on pages | Create `/www/luci-static/corenet/custom.js`:<br>`window.CN_NOTES = { 'admin/network/wireless': { en: 'Keep 2.4 GHz at 20 dBm', fa: '...' } };` |
| Default favorites | In the same file: `window.CN_PINS = [ 'admin/status/overview', 'admin/network/wireless' ];` |
| Run something after *Upgrade all* | Make `/etc/corenet/post-upgrade` executable — it runs after a successful upgrade. |

### Requirements

OpenWrt **25.12 or newer** (apk package manager, ucode LuCI). The package is architecture-independent (`noarch`).

### Build from source

The package follows the LuCI feed layout (`luci-theme-corenet/Makefile`). Copy it into `package/` of an OpenWrt SDK with the `luci` feed installed and run `make package/luci-theme-corenet/compile`. The GitHub workflow in `.github/workflows/build.yml` does exactly this, signs the package and publishes the feed.

### License

Apache-2.0. The base widget styles come from `luci-theme-bootstrap` (Apache-2.0), font: Vazirmatn (OFL).

---

<div dir="rtl">

## فارسی

**CoreNet یک تم مدرن و دوزبانه (فارسی / انگلیسی) برای پنل وب OpenWrt (یعنی LuCI) است.** منوی بالای صفحه را با یک منوی کناری گروه‌بندی‌شده عوض می‌کند و داشبورد زنده، جستجوی منو، کارت راهنما برای هر صفحه و دکمه‌ی **آپگرید همه** اضافه می‌کند. کل تم حدود ۱۵۰ کیلوبایت است.

### امکانات

- 🧭 **منوی کناری گروه‌بندی‌شده:** هر صفحه آیکون دارد. گروه‌ها آکاردئونی‌اند؛ با باز کردن یکی بقیه بسته می‌شوند. هر صفحه‌ای را با ستاره‌ی ☆ کنارش به «منتخب‌ها» اضافه کنید.
- 🔎 **جستجوی منو:** `Ctrl+K` یا `/` را بزنید و فارسی یا انگلیسی تایپ کنید (`رمز`، `پسوال`، `wifi`، `backup`…). با کلیدهای جهت و Enter مستقیم به صفحه بروید.
- 📊 **داشبورد زنده در صفحه‌ی نمای کلی:** اینترنت و IP عمومی، مدت روشن بودن و بار پردازنده، حافظه‌ی رم، فضای ذخیره‌سازی (با هشدار بالای ۸۰٪)، دستگاه‌های متصل، رادیوهای وای‌فای با کانال و قدرت و تعداد کلاینت، وضعیت پروکسی (PassWall، PassWall 2، OpenClash، HomeProxy، Nikki) و تعداد آپدیت‌های پکیج.
- ⬆️ **آپگرید همه:** دکمه‌ای کنار «Update lists…» در صفحه‌ی نرم‌افزارها. اول لیست پکیج‌ها را نشان می‌دهد، ماژول‌های کرنل را رد می‌کند، `apk upgrade` را روی خود روتر در پس‌زمینه اجرا می‌کند و گزارش زنده می‌دهد؛ اگر پنل وسط کار ری‌استارت شود هم آپگرید ادامه پیدا می‌کند.
- 💡 **راهنما در هر صفحه:** یک کارت کوتاه توضیح می‌دهد صفحه چه کاری می‌کند و برای تنظیمات حساس (WAN، فایروال، فلش و…) هشدار می‌دهد.
- 🌐 **فارسی / انگلیسی:** با یک کلیک منو، راهنما و داشبورد عوض می‌شوند. در حالت فارسی چیدمان راست‌به‌چپ می‌شود و عددها فارسی‌اند. فونت وزیرمتن داخل تم است و بدون اینترنت هم کار می‌کند.
- 🌗 **تیره · روشن · خودکار**، 📱 **مناسب موبایل** با منوی کشویی و نوار ثابت Save & Apply، 🔐 **صفحه‌ی ورود اختصاصی**.
- 🧩 **سازگار با همه‌ی برنامه‌ها:** روی اجزای استاندارد LuCI ساخته شده و همه‌ی اپ‌ها، از جمله اپ‌های Lua مثل پسوال، بدون مشکل کار می‌کنند.

### نصب

**از پنل وب (ساده‌ترین روش)**

۱. در **System › Administration › Repo Public Keys** این کلید را یک بار اضافه کنید (پکیج‌های CoreNet با آن امضا می‌شوند):

</div>

```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEddziHMBCZj3GlDV2RsEBaoz1O2MP
QrpFaEhmFk9456QWGmnq9HSk6ECbrauI9sN+2+KPvVDnyKDP75yLtu2lNA==
-----END PUBLIC KEY-----
```

<div dir="rtl">

۲. فایل `.apk` را از [Releases](https://github.com/Plus98ir/luci-theme-corenet/releases/latest) دانلود کنید و از **System › Software › Upload Package…** نصب کنید.<br>
۳. در **System › System › Language and Style** تم **CoreNet** را انتخاب کنید و صفحه را با `Ctrl+F5` دوباره باز کنید.

**آپدیت خودکار در صفحه‌ی نرم‌افزارها:** این خط را به فایل `/etc/apk/repositories.d/customfeeds.list` اضافه کنید تا نسخه‌های جدید بعد از «Update lists…» در تب Updates بیایند:

</div>

```
https://corenetbase.com/luci-theme-corenet/apk/packages.adb
```

<div dir="rtl">

**از SSH:**

</div>

```sh
curl -sL -o /etc/apk/keys/corenet.pem https://github.com/Plus98ir/luci-theme-corenet/releases/latest/download/corenet.pem
echo https://corenetbase.com/luci-theme-corenet/apk/packages.adb >> /etc/apk/repositories.d/customfeeds.list
apk update && apk add luci-theme-corenet
```

<div dir="rtl">

### تنظیمات

- **زبان پیش‌فرض:** `uci set luci.corenet.lang=fa` (مقدارها: `auto`، `fa`، `en`) و بعد `uci commit luci`. هر مرورگر می‌تواند با دکمه‌ی زبان آن را عوض کند.
- **تم پیش‌فرض:** `uci set luci.corenet.theme=dark` (مقدارها: `dark`، `light`، `auto`).
- **یادداشت‌های خودتان روی صفحه‌ها:** فایل `/www/luci-static/corenet/custom.js` را بسازید و `window.CN_NOTES` را با مسیر صفحه و متن فارسی و انگلیسی پر کنید (نمونه در بخش انگلیسی). منتخب‌های پیش‌فرض هم با `window.CN_PINS` در همین فایل تعیین می‌شوند.
- **اجرای یک دستور بعد از «آپگرید همه»:** فایل اجرایی `/etc/corenet/post-upgrade` بسازید؛ بعد از هر آپگرید موفق اجرا می‌شود.

### نیازمندی‌ها

OpenWrt نسخه‌ی **۲۵.۱۲ یا جدیدتر** (مدیر پکیج apk). پکیج به معماری وابسته نیست و روی همه‌ی روترها نصب می‌شود.

### مجوز

Apache-2.0. استایل پایه‌ی اجزای فرم از `luci-theme-bootstrap` گرفته شده و فونت وزیرمتن (OFL) است.

</div>
