'use strict';
'require baseclass';
'require ui';
'require rpc';

/*
 * CoreNet theme for LuCI - menu, search palette, page help, FA/EN switch,
 * theme switch and the home dashboard.
 * Copyright 2026 PluS98 - https://corenetbase.com - Apache-2.0
 */

const ICON = {
	status: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
	system: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M19 9h3M19 15h3M2 9h3M2 15h3"/>',
	services: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
	network: '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M5 16v-4h14v4M12 8v4"/>',
	shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
	disk: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
	chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
	box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
	signal: '<path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>',
	home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
	route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>',
	flame: '<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-2 2-2 5-2 8 0 4 3 7 7 7z"/>',
	log: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
	list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
	wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0M12 20h.01"/>',
	lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
	terminal: '<path d="m4 17 6-6-6-6M12 19h8"/>',
	key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.8-9.8M17 6l3 3M15 8l2 2"/>',
	globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
	package: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5M12 22V12M7.5 4.2l9 5.2"/>',
	play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
	clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
	upgrade: '<circle cx="12" cy="12" r="9"/><path d="m8 12 4-4 4 4M12 16V8"/>',
	bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
	save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
	power: '<path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0"/>',
	rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
	link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
	sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
	search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
	users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
	server: '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
	tunnel: '<path d="M3 21V11a9 9 0 0 1 18 0v10"/><path d="M8 21v-8a4 4 0 0 1 8 0v8"/>',
	plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>',
	ethernet: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15v-3h2v-2h6v2h2v3M9 15v-1.5M12 15v-1.5M15 15v-1.5"/>',
	switch: '<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/>',
	dns: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5zM4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
	activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
	star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
	chevron: '<path d="m9 6 6 6-6 6"/>',
	dot: '<circle cx="12" cy="12" r="2.5"/>',
	sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
	moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
	auto: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
	memory: '<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 7V4M10 7V4M14 7V4M18 7V4M6 17v3M10 17v3M14 17v3M18 17v3"/>',
	info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
	warn: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
	note: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
	close: '<path d="M18 6 6 18M6 6l12 12"/>',
	enter: '<path d="M9 10 4 15l5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>'
};

const callSystemInfo = rpc.declare({ object: 'system', method: 'info' });
const callBoard = rpc.declare({ object: 'system', method: 'board' });
const callIfDump = rpc.declare({ object: 'network.interface', method: 'dump', expect: { 'interface': [] } });
const callLeases = rpc.declare({ object: 'luci-rpc', method: 'getDHCPLeases', expect: { '': {} } });
const callWireless = rpc.declare({ object: 'luci-rpc', method: 'getWirelessDevices', expect: { '': {} } });
const callIwInfo = rpc.declare({ object: 'iwinfo', method: 'info', params: [ 'device' ], expect: { '': {} } });
const callAssoc = rpc.declare({ object: 'iwinfo', method: 'assoclist', params: [ 'device' ], expect: { results: [] } });
const callInitList = rpc.declare({ object: 'luci', method: 'getInitList', expect: { '': {} } });
const callProcs = rpc.declare({ object: 'luci', method: 'getProcessList', expect: { result: [] } });
const callUpgrades = rpc.declare({ object: 'luci.corenet', method: 'upgrades', params: [ 'force' ], expect: { '': {} } });

const PROXIES = [
	{ init: 'passwall2', name: 'PassWall 2', path: 'admin/services/passwall2', re: /passwall2\// },
	{ init: 'passwall', name: 'PassWall', path: 'admin/services/passwall', re: /\/passwall\// },
	{ init: 'openclash', name: 'OpenClash', path: 'admin/services/openclash', re: /clash|mihomo/ },
	{ init: 'homeproxy', name: 'HomeProxy', path: 'admin/services/homeproxy', re: /homeproxy|sing-box/ },
	{ init: 'nikki', name: 'Nikki', path: 'admin/services/nikki', re: /mihomo/ }
];

function $(sel) { return document.querySelector(sel); }

function store(key, val) {
	try {
		if (val === undefined) return localStorage.getItem(key);
		if (val === null) localStorage.removeItem(key);
		else localStorage.setItem(key, val);
	} catch (e) {}
	return null;
}

function svg(name, cls) {
	const s = document.createElement('span');
	s.className = 'cn-ico' + (cls ? ' ' + cls : '');
	s.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON[name] || ICON.dot) + '</svg>';
	return s;
}

function txt(tag, cls, text) {
	const el = document.createElement(tag);
	if (cls) el.className = cls;
	if (text != null) el.textContent = String(text);
	return el;
}

function H() { return window.CN_HELP || { ui: {}, groups: {}, pages: {} }; }
function lang() { return document.documentElement.getAttribute('data-cn-lang') === 'fa' ? 'fa' : 'en'; }
function fa() { return lang() === 'fa'; }

function t(key) {
	const e = H().ui[key];
	return e ? (e[lang()] || e.en) : key;
}

function num(v) {
	const s = String(v);
	return fa() ? s.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]).replace(/\./g, '٫') : s;
}

function fmtBytes(b) {
	const u = [ 'B', 'KB', 'MB', 'GB', 'TB' ];
	let i = 0;
	b = +b || 0;
	while (b >= 1024 && i < u.length - 1) { b /= 1024; i++; }
	return '⁦' + num(b.toFixed(b >= 100 || i == 0 ? 0 : 1)) + ' ' + u[i] + '⁩';
}

function fmtUptime(s, short) {
	s = Math.max(0, Math.floor(+s || 0));
	const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
	const p = [];
	if (d) p.push(num(d) + (fa() ? ' ' : '') + t('days'));
	if (d || h) p.push(num(h) + (fa() ? ' ' : '') + t('hours'));
	if (!short || !d) p.push(num(m) + (fa() ? ' ' : '') + t('minutes'));
	return p.join(fa() ? ' و ' : ' ');
}

return baseclass.extend({
	__init__() {
		this.items = [];
		this.byPath = {};
		this.cats = [];

		ui.menu.load().then((tree) => this.render(tree));
	},

	/* ------------------------------------------------------------ menu tree */

	render(tree) {
		this.tree = tree;
		this.renderModeMenu(tree);

		const mode = this.modeRoot;
		if (mode) {
			this.buildIndex(mode.node, mode.name);
			this.renderNav();
			this.renderCrumbs();
			this.renderHelp();

			if (L.env.dispatchpath.length >= 3) {
				let node = tree, url = '';
				for (let i = 0; i < 3 && node; i++) {
					node = node.children[L.env.dispatchpath[i]];
					url = url + (url ? '/' : '') + L.env.dispatchpath[i];
				}
				if (node)
					this.renderTabMenu(node, url);
			}
		}

		this.bindChrome();
		this.refreshChrome();

		if (L.env.dispatchpath.join('/') == 'admin/status/overview')
			this.startDash();
	},

	renderModeMenu(tree) {
		const ul = $('#modemenu');
		const children = ui.menu.getChildren(tree);

		children.forEach((child, index) => {
			const isActive = L.env.requestpath.length ? child.name === L.env.requestpath[0] : index === 0;

			if (ul)
				ul.appendChild(E('li', { 'class': isActive ? 'active' : '' }, [
					E('a', { 'href': L.url(child.name) }, [ _(child.title) ])
				]));

			if (isActive)
				this.modeRoot = { node: child, name: child.name };
		});

		if (ul && ul.children.length > 1)
			ul.style.display = '';
	},

	buildIndex(root, base) {
		const walk = (node, path, depth, cat) => {
			ui.menu.getChildren(node).forEach((child) => {
				const p = path + '/' + child.name;
				const it = { path: p, node: child, depth: depth, cat: depth == 1 ? p : cat, parent: path };
				this.items.push(it);
				this.byPath[p] = it;
				if (depth == 1)
					this.cats.push(it);
				/* getChildren() resolves alias nodes to their target, which has
				   no children - descend into the raw tree node instead */
				if (depth < 3)
					walk((node.children || {})[child.name] || child, p, depth + 1, it.cat);
			});
		};
		walk(root, base, 1, null);
	},

	help(path) { return H().pages[path] || null; },

	titleOf(it) {
		const h = it.depth == 1 ? H().groups[it.path] : this.help(it.path);
		if (fa() && h && h.fa)
			return h.fa;
		return _(it.node.title);
	},

	iconOf(it) {
		const h = it.depth == 1 ? H().groups[it.path] : this.help(it.path);
		if (h && h.i)
			return h.i;
		return it.depth == 1 ? 'services' : 'dot';
	},

	isActive(path) {
		const cur = L.env.dispatchpath.join('/');
		return cur == path || cur.indexOf(path + '/') == 0;
	},

	getPins() {
		let pins = null;
		try { pins = JSON.parse(store('cn-pins') || 'null'); } catch (e) {}
		if (!Array.isArray(pins))
			pins = Array.isArray(window.CN_PINS) ? window.CN_PINS : [
				'admin/status/overview', 'admin/network/wireless', 'admin/system/package-manager', 'admin/services/passwall2'
			];
		return pins.filter((p) => this.byPath[p]);
	},

	togglePin(path) {
		const pins = this.getPins();
		const i = pins.indexOf(path);
		if (i >= 0) pins.splice(i, 1);
		else pins.push(path);
		store('cn-pins', JSON.stringify(pins));
		this.renderNav();
	},

	renderNav() {
		const nav = $('#cn-nav');
		if (!nav) return;
		nav.innerHTML = '';

		const pins = this.getPins();
		if (pins.length)
			nav.appendChild(this.navGroup('fav', t('favorites'), 'star', pins.map((p) => this.byPath[p]), true));

		this.cats.forEach((cat) => {
			if (/\/logout$/.test(cat.path))
				return;
			const kids = this.items.filter((it) => it.depth == 2 && it.cat == cat.path);
			if (!kids.length) {
				nav.appendChild(this.navGroup(cat.path, this.titleOf(cat), this.iconOf(cat), [ cat ], false));
				return;
			}
			nav.appendChild(this.navGroup(cat.path, this.titleOf(cat), this.iconOf(cat), kids, false));
		});
	},

	navGroup(id, title, ico, items, isFav) {
		let open = {};
		try { open = JSON.parse(store('cn-open') || '{}') || {}; } catch (e) {}

		const active = !isFav && this.isActive(id);
		const isOpen = isFav ? open[id] !== false : (active || open[id] === true);
		const sec = E('div', { 'class': 'cn-grp' + (isOpen ? ' open' : '') + (active ? ' active' : '') + (isFav ? ' fav' : '') });
		const head = E('button', { 'type': 'button', 'class': 'cn-grp-h' });
		head.appendChild(svg(ico));
		head.appendChild(txt('span', 'cn-grp-t', title));
		head.appendChild(svg('chevron', 'cn-chev'));
		head.addEventListener('click', () => {
			sec.classList.toggle('open');
			let o = {};
			try { o = JSON.parse(store('cn-open') || '{}') || {}; } catch (e) {}
			o[id] = sec.classList.contains('open');
			store('cn-open', JSON.stringify(o));
		});

		const ul = E('ul', { 'class': 'cn-grp-l' });
		const pins = this.getPins();

		items.forEach((it) => {
			const pinned = pins.indexOf(it.path) >= 0;
			const a = E('a', { 'href': L.url(it.path) });
			a.appendChild(svg(this.iconOf(it)));
			a.appendChild(txt('span', 'cn-lnk-t', this.titleOf(it)));
			if (isFav && it.depth > 2 && this.byPath[it.parent])
				a.appendChild(txt('small', 'cn-lnk-p', this.titleOf(this.byPath[it.parent])));

			const pin = E('button', {
				'type': 'button',
				'class': 'cn-pin' + (pinned ? ' on' : ''),
				'title': pinned ? t('unpin') : t('pin')
			});
			pin.appendChild(svg('star'));
			pin.addEventListener('click', (ev) => {
				ev.preventDefault();
				ev.stopPropagation();
				this.togglePin(it.path);
			});

			ul.appendChild(E('li', { 'class': this.isActive(it.path) ? 'active' : '' }, [ a, pin ]));
		});

		sec.appendChild(head);
		sec.appendChild(ul);
		return sec;
	},

	renderTabMenu(tree, url, level) {
		const container = $('#tabmenu');
		const ul = E('ul', { 'class': 'tabs' });
		const children = ui.menu.getChildren(tree);
		let activeNode = null;

		children.forEach((child) => {
			const isActive = (L.env.dispatchpath[3 + (level || 0)] == child.name);
			const path = url + '/' + child.name;
			const h = this.help(path);
			const title = (fa() && h && h.fa) ? h.fa : _(child.title);
			const a = E('a', { 'href': L.url(url, child.name) });
			a.textContent = title;
			ul.appendChild(E('li', { 'class': 'tabmenu-item-%s %s'.format(child.name, isActive ? 'active' : '') }, [ a ]));
			if (isActive)
				activeNode = child;
		});

		if (ul.children.length == 0)
			return E([]);

		if (!level)
			container.innerHTML = '';
		container.appendChild(ul);
		container.style.display = '';

		if (activeNode)
			this.renderTabMenu(activeNode, url + '/' + activeNode.name, (level || 0) + 1);

		return ul;
	},

	renderCrumbs() {
		const box = $('#cn-crumbs');
		if (!box) return;
		box.innerHTML = '';

		const dp = L.env.dispatchpath;
		let first = true;
		for (let i = 2; i <= dp.length; i++) {
			const it = this.byPath[dp.slice(0, i).join('/')];
			if (!it) continue;
			if (!first) box.appendChild(svg('chevron', 'cn-crumb-sep'));
			const last = (i == dp.length) || !this.byPath[dp.slice(0, i + 1).join('/')];
			const a = E(last ? 'span' : 'a', last ? { 'class': 'cn-crumb cur' } : { 'class': 'cn-crumb', 'href': L.url(it.path) });
			a.textContent = this.titleOf(it);
			box.appendChild(a);
			first = false;
			if (last) break;
		}
	},

	/* ------------------------------------------------------------ page help */

	renderHelp() {
		const box = $('#cn-help');
		if (!box) return;
		box.innerHTML = '';
		box.className = '';

		const dp = L.env.dispatchpath;
		const cands = [];
		for (let i = dp.length; i >= 2; i--)
			cands.push(dp.slice(0, i).join('/'));

		let page = null, pagePath = null;
		const warns = [], notes = [];
		const L2 = lang();
		const custom = window.CN_NOTES || {};

		cands.forEach((p) => {
			const h = this.help(p);
			if (h && !page && (h.en || h.fd)) { page = h; pagePath = p; }
			if (h && (h.w || h.fw)) {
				const w = (L2 == 'fa' ? h.fw : h.w) || h.w || h.fw;
				if (warns.indexOf(w) < 0) warns.push(w);
			}
			const n = custom[p];
			if (n) [].concat(n).forEach((x) => {
				const s = typeof x == 'string' ? x : (x[L2] || x.en || x.fa);
				if (s && notes.indexOf(s) < 0) notes.push(s);
			});
		});

		this.hasHelp = !!(page || warns.length || notes.length);
		const btn = $('#cn-help-btn');
		if (btn) btn.style.display = this.hasHelp ? '' : 'none';

		if (!this.hasHelp || store('cn-help') == 'off')
			return;

		box.className = 'cn-help';
		const it = this.byPath[pagePath];
		const head = E('div', { 'class': 'cn-help-h' });
		head.appendChild(svg(it ? this.iconOf(it) : 'info', 'cn-help-ico'));
		const tt = E('div', { 'class': 'cn-help-tt' });
		tt.appendChild(txt('small', null, t('help')));
		tt.appendChild(txt('b', null, it ? this.titleOf(it) : (page && (fa() ? page.fa : '')) || ''));
		head.appendChild(tt);
		const close = E('button', { 'type': 'button', 'class': 'cn-icon-btn cn-help-x', 'title': t('hide') });
		close.appendChild(svg('close'));
		close.addEventListener('click', () => { store('cn-help', 'off'); this.renderHelp(); });
		head.appendChild(close);
		box.appendChild(head);

		if (page)
			box.appendChild(txt('p', 'cn-help-d', (L2 == 'fa' ? page.fd : page.en) || page.en || page.fd));

		warns.forEach((w) => {
			const d = E('div', { 'class': 'cn-help-w' });
			d.appendChild(svg('warn'));
			d.appendChild(txt('span', null, w));
			box.appendChild(d);
		});
		notes.forEach((n) => {
			const d = E('div', { 'class': 'cn-help-n' });
			d.appendChild(svg('note'));
			d.appendChild(txt('span', null, n));
			box.appendChild(d);
		});
	},

	/* ------------------------------------------------------------ chrome */

	bindChrome() {
		if (this.bound) return;
		this.bound = true;

		const body = document.body;
		const closeNav = () => body.classList.remove('cn-nav-open');

		const burger = $('#cn-burger');
		if (burger) burger.addEventListener('click', () => body.classList.toggle('cn-nav-open'));
		const scrim = $('#cn-scrim');
		if (scrim) scrim.addEventListener('click', closeNav);

		[ '#cn-search-btn', '#cn-search-btn2' ].forEach((s) => {
			const b = $(s);
			if (b) b.addEventListener('click', () => { closeNav(); this.openPalette(); });
		});

		const lb = $('#cn-lang-btn');
		if (lb) lb.addEventListener('click', () => {
			const l = fa() ? 'en' : 'fa';
			document.documentElement.setAttribute('data-cn-lang', l);
			store('cn-lang', l);
			this.relabel();
		});

		const tb = $('#cn-theme-btn');
		if (tb) tb.addEventListener('click', () => {
			const order = [ 'dark', 'light', 'auto' ];
			const cur = document.documentElement.getAttribute('data-cn-theme') || 'dark';
			const next = order[(order.indexOf(cur) + 1) % order.length];
			document.documentElement.setAttribute('data-cn-theme', next);
			store('cn-theme', next);
			if (window.cnApplyTheme) window.cnApplyTheme();
			this.refreshChrome();
		});

		const hb = $('#cn-help-btn');
		if (hb) hb.addEventListener('click', () => {
			store('cn-help', store('cn-help') == 'off' ? null : 'off');
			this.renderHelp();
		});

		document.addEventListener('keydown', (ev) => {
			const tag = (ev.target && ev.target.tagName) || '';
			const typing = /INPUT|TEXTAREA|SELECT/.test(tag) || (ev.target && ev.target.isContentEditable);
			if ((ev.ctrlKey || ev.metaKey) && (ev.key == 'k' || ev.key == 'K')) {
				ev.preventDefault();
				this.openPalette();
			}
			else if (ev.key == '/' && !typing && !document.body.classList.contains('modal-overlay-active')) {
				ev.preventDefault();
				this.openPalette();
			}
		});

		const pal = $('#cn-palette');
		if (pal) {
			pal.addEventListener('click', (ev) => { if (ev.target === pal) this.closePalette(); });
			const q = $('#cn-pal-q');
			q.addEventListener('input', () => this.searchPalette(q.value));
			q.addEventListener('keydown', (ev) => this.palKey(ev));
		}
	},

	relabel() {
		this.refreshChrome();
		this.renderNav();
		this.renderCrumbs();
		this.renderHelp();
		if (L.env.dispatchpath.length >= 3) {
			let node = this.tree, url = '';
			for (let i = 0; i < 3 && node; i++) {
				node = node.children[L.env.dispatchpath[i]];
				url = url + (url ? '/' : '') + L.env.dispatchpath[i];
			}
			if (node) this.renderTabMenu(node, url);
		}
		if (this.dashData) this.drawDash();
	},

	refreshChrome() {
		const l = lang();
		document.querySelectorAll('.cn-i18n').forEach((el) => {
			const v = el.getAttribute('data-' + l);
			if (v != null) el.textContent = v;
		});

		const ll = $('#cn-lang-lbl');
		if (ll) ll.textContent = fa() ? 'فارسی' : 'English';

		const th = document.documentElement.getAttribute('data-cn-theme') || 'dark';
		const tl = $('#cn-theme-lbl');
		if (tl) tl.textContent = t(th);
		const tb = $('#cn-theme-btn');
		if (tb) {
			const old = tb.querySelector('svg');
			const ico = svg(th == 'light' ? 'sun' : (th == 'auto' ? 'auto' : 'moon'));
			if (old) old.replaceWith(ico.firstChild);
		}

		const q = $('#cn-pal-q');
		if (q) q.placeholder = t('search');
	},

	/* ------------------------------------------------------------ palette */

	openPalette() {
		const pal = $('#cn-palette');
		if (!pal) return;
		pal.hidden = false;
		document.body.classList.add('cn-pal-open');
		const q = $('#cn-pal-q');
		q.value = '';
		q.placeholder = t('search');
		this.searchPalette('');
		setTimeout(() => q.focus(), 10);
	},

	closePalette() {
		const pal = $('#cn-palette');
		if (pal) pal.hidden = true;
		document.body.classList.remove('cn-pal-open');
	},

	searchPalette(query) {
		const list = $('#cn-pal-list');
		list.innerHTML = '';
		const norm = (x) => String(x || '').toLowerCase().replace(/[-_‌]/g, '').replace(/ي/g, 'ی').replace(/ك/g, 'ک');
		const toks = norm(query).trim().split(/\s+/).filter(Boolean);

		const res = [];
		this.items.forEach((it) => {
			if (it.depth == 1 && this.items.some((x) => x.cat == it.path && x.depth == 2))
				return;
			if (/\/logout$/.test(it.path))
				return;
			const h = this.help(it.path) || {};
			const parent = this.byPath[it.parent];
			const ph = parent ? (this.help(parent.path) || H().groups[parent.path] || {}) : {};
			const fields = [
				[ norm(_(it.node.title)) + ' ' + norm(h.fa), 10 ],
				[ (parent ? norm(_(parent.node.title)) + ' ' + norm(ph.fa) : '') + ' ' + norm((H().groups[it.cat] || {}).fa), 3 ],
				[ norm(it.path.replace(/\//g, ' ')), 2 ],
				[ norm(h.k), 6 ],
				[ norm(h.en) + ' ' + norm(h.fd), 1 ]
			];

			let score = 0;
			for (const tk of toks) {
				let best = 0;
				for (const [ hay, w ] of fields) {
					const i = hay.indexOf(tk);
					if (i < 0) continue;
					const sc = (i == 0 || hay[i - 1] == ' ') ? w * 1.5 : w;
					if (sc > best) best = sc;
				}
				if (!best) return;
				score += best;
			}
			res.push({ it, score });
		});

		res.sort((a, b) => b.score - a.score || a.it.depth - b.it.depth);
		const shown = toks.length ? res.slice(0, 30) : res.filter((r) => r.it.depth == 2).slice(0, 40);

		if (!shown.length) {
			list.appendChild(txt('li', 'cn-pal-empty', t('noresult')));
			this.palSel = -1;
			return;
		}

		shown.forEach((r, i) => {
			const it = r.it;
			const li = E('li', { 'class': i == 0 ? 'sel' : '' });
			const a = E('a', { 'href': L.url(it.path) });
			a.appendChild(svg(this.iconOf(it)));
			const tw = E('span', { 'class': 'cn-pal-t' });
			tw.appendChild(txt('b', null, this.titleOf(it)));
			const trail = [];
			const cat = this.byPath[it.cat];
			if (cat && cat !== it) trail.push(this.titleOf(cat));
			if (it.depth > 2 && this.byPath[it.parent]) trail.push(this.titleOf(this.byPath[it.parent]));
			const other = fa() ? _(it.node.title) : ((this.help(it.path) || {}).fa || '');
			if (other && other != this.titleOf(it)) trail.push(other);
			tw.appendChild(txt('small', null, trail.join(' · ')));
			a.appendChild(tw);
			a.appendChild(svg('enter', 'cn-pal-enter'));
			li.appendChild(a);
			li.addEventListener('mousemove', () => this.palMark(i));
			list.appendChild(li);
		});
		this.palSel = 0;
	},

	palMark(i) {
		const lis = document.querySelectorAll('#cn-pal-list li:not(.cn-pal-empty)');
		if (!lis.length) return;
		this.palSel = (i + lis.length) % lis.length;
		lis.forEach((li, j) => li.classList.toggle('sel', j == this.palSel));
		lis[this.palSel].scrollIntoView({ block: 'nearest' });
	},

	palKey(ev) {
		if (ev.key == 'Escape') { this.closePalette(); return; }
		if (ev.key == 'ArrowDown') { ev.preventDefault(); this.palMark(this.palSel + 1); }
		else if (ev.key == 'ArrowUp') { ev.preventDefault(); this.palMark(this.palSel - 1); }
		else if (ev.key == 'Enter') {
			ev.preventDefault();
			const a = document.querySelector('#cn-pal-list li.sel a');
			if (a) location.href = a.href;
		}
	},

	/* ------------------------------------------------------------ dashboard */

	startDash() {
		const box = $('#cn-dash');
		if (!box) return;
		box.className = 'cn-dash';
		this.dashData = {};

		const fast = () => {
			if (document.hidden) return Promise.resolve();
			return Promise.all([
				L.resolveDefault(callSystemInfo(), null),
				L.resolveDefault(callIfDump(), []),
				L.resolveDefault(callLeases(), {}),
				L.resolveDefault(callWireless(), {})
			]).then((r) => {
				const [ sys, ifs, leases, wl ] = r;
				const devs = [];
				Object.keys(wl || {}).forEach((radio) => {
					((wl[radio] || {}).interfaces || []).forEach((i) => { if (i.ifname) devs.push(i.ifname); });
				});
				return Promise.all(devs.map((d) => Promise.all([
					L.resolveDefault(callIwInfo(d), {}),
					L.resolveDefault(callAssoc(d), [])
				]))).then((iw) => {
					const iwmap = {};
					devs.forEach((d, i) => { iwmap[d] = { info: iw[i][0] || {}, assoc: iw[i][1] || [] }; });
					Object.assign(this.dashData, { sys, ifs, leases, wl, iwmap });
					this.drawDash();
				});
			});
		};

		const slow = () => {
			if (document.hidden) return Promise.resolve();
			return Promise.all([
				L.resolveDefault(callInitList(), {}),
				L.resolveDefault(callProcs(), [])
			]).then(([ init, procs ]) => {
				Object.assign(this.dashData, { init, procs });
				this.drawDash();
			});
		};

		const upd = () => L.resolveDefault(callUpgrades(false), null).then((u) => {
			this.dashData.upg = u;
			this.drawDash();
		});

		L.resolveDefault(callBoard(), {}).then((b) => { this.dashData.board = b; });
		fast();
		slow();
		upd();
		window.setInterval(fast, 5000);
		window.setInterval(slow, 15000);
		window.setInterval(upd, 1800000);
	},

	card(cls, ico, title, href) {
		const c = E(href ? 'a' : 'div', href ? { 'class': 'cn-card ' + cls, 'href': href } : { 'class': 'cn-card ' + cls });
		const h = E('div', { 'class': 'cn-card-h' });
		h.appendChild(svg(ico));
		h.appendChild(txt('span', null, title));
		c.appendChild(h);
		return c;
	},

	bar(pct, warn) {
		const b = E('div', { 'class': 'cn-bar' + (warn ? ' warn' : '') });
		const f = E('i');
		f.style.width = Math.max(0, Math.min(100, pct)).toFixed(1) + '%';
		b.appendChild(f);
		return b;
	},

	drawDash() {
		const box = $('#cn-dash');
		const d = this.dashData || {};
		if (!box || !d.sys) return;
		box.innerHTML = '';
		const grid = E('div', { 'class': 'cn-grid' });

		/* Internet */
		const wan = (d.ifs || []).find((i) => i.up && (i.route || []).some((r) => r.target == '0.0.0.0' && r.mask == 0));
		const ci = this.card('cn-c-net', 'globe', t('internet'), L.url('admin/network/network'));
		const st = E('div', { 'class': 'cn-state ' + (wan ? 'ok' : 'bad') });
		st.appendChild(E('i'));
		st.appendChild(txt('span', null, wan ? t('connected') : t('disconnected')));
		ci.appendChild(st);
		if (wan) {
			const ip = ((wan['ipv4-address'] || [])[0] || {}).address;
			ci.appendChild(txt('div', 'cn-big cn-ltr', ip || '—'));
			ci.appendChild(txt('div', 'cn-sub', (wan.interface || '') + ' · ' + (wan.proto || '').toUpperCase() + ' · ' + fmtUptime(wan.uptime)));
		}
		grid.appendChild(ci);

		/* System */
		const sys = d.sys;
		const cs = this.card('cn-c-sys', 'system', t('system'), L.url('admin/status/realtime'));
		cs.appendChild(txt('div', 'cn-big', fmtUptime(sys.uptime, true)));
		cs.appendChild(txt('div', 'cn-sub', t('uptime')));
		const ld = (sys.load || []).map((x) => num((x / 65536).toFixed(2))).join(fa() ? ' ، ' : ' · ');
		cs.appendChild(txt('div', 'cn-kv', t('load') + ': ' + ld));
		if (d.board && d.board.release)
			cs.appendChild(txt('div', 'cn-kv cn-ltr', (d.board.release.description || '').replace(/\s*\([^)]*\)/, '')));
		grid.appendChild(cs);

		/* Memory */
		const mem = sys.memory || {};
		const mu = (mem.total || 0) - (mem.available || mem.free || 0);
		const mp = mem.total ? mu / mem.total * 100 : 0;
		const cm = this.card('cn-c-mem', 'memory', t('memory'), L.url('admin/status/processes'));
		cm.appendChild(txt('div', 'cn-big', num(Math.round(mp)) + (fa() ? '٪' : '%')));
		cm.appendChild(this.bar(mp, mp >= 90));
		cm.appendChild(txt('div', 'cn-sub', fmtBytes(mu) + ' / ' + fmtBytes(mem.total)));
		grid.appendChild(cm);

		/* Storage */
		const root = sys.root || {};
		const rp = root.total ? root.used / root.total * 100 : 0;
		const warnS = rp >= 80;
		const cd = this.card('cn-c-disk' + (warnS ? ' warn' : ''), 'disk', t('storage'), L.url('admin/system/package-manager'));
		cd.appendChild(txt('div', 'cn-big', num(Math.round(rp)) + (fa() ? '٪' : '%')));
		cd.appendChild(this.bar(rp, warnS));
		cd.appendChild(txt('div', 'cn-sub', fmtBytes((root.avail || 0) * 1024) + ' ' + t('free') + ' / ' + fmtBytes((root.total || 0) * 1024)));
		if (warnS) cd.appendChild(txt('div', 'cn-warn', t('storage_warn')));
		grid.appendChild(cd);

		/* Clients */
		const leases = ((d.leases || {}).dhcp_leases || []).length;
		let sta = 0;
		Object.keys(d.iwmap || {}).forEach((k) => { sta += (d.iwmap[k].assoc || []).length; });
		const cc = this.card('cn-c-cli', 'users', t('clients'), L.url('admin/network/dhcp'));
		cc.appendChild(txt('div', 'cn-big', num(leases)));
		cc.appendChild(txt('div', 'cn-sub', t('leases')));
		cc.appendChild(txt('div', 'cn-kv', t('wifi_clients') + ': ' + num(sta)));
		grid.appendChild(cc);

		/* Proxy */
		const init = d.init || {};
		const procs = d.procs || [];
		PROXIES.filter((p) => init[p.init]).forEach((p) => {
			const proc = procs.find((x) => p.re.test(x.COMMAND || ''));
			const core = proc ? ((proc.COMMAND || '').split(' ')[0].split('/').pop()) : '';
			const enabled = !!init[p.init].enabled;
			const state = proc ? 'ok' : (enabled ? 'bad' : 'off');
			const cp = this.card('cn-c-proxy', 'rocket', p.name, L.url(p.path));
			const s = E('div', { 'class': 'cn-state ' + state });
			s.appendChild(E('i'));
			s.appendChild(txt('span', null, proc ? t('running') : (enabled ? t('stopped') : t('disabled'))));
			cp.appendChild(s);
			cp.appendChild(txt('div', 'cn-big cn-ltr', core || '—'));
			cp.appendChild(txt('div', 'cn-sub', t('proxy')));
			grid.appendChild(cp);
		});

		/* Updates */
		if (d.upg && d.upg.count != null) {
			const n = +d.upg.count || 0;
			const cu = this.card('cn-c-upd' + (n ? ' hot' : ''), 'upgrade', t('updates'), L.url('admin/system/package-manager'));
			cu.appendChild(txt('div', 'cn-big', num(n)));
			cu.appendChild(txt('div', 'cn-sub', n ? t('n_updates').replace('%d', num(n)) : t('up_to_date')));
			if (n) cu.appendChild(txt('div', 'cn-kv cn-ltr', (d.upg.packages || []).slice(0, 4).map((x) => x.name).join(', ') + (n > 4 ? ' …' : '')));
			grid.appendChild(cu);
		}

		box.appendChild(grid);

		/* Wi-Fi radios */
		const wl = d.wl || {};
		const radios = Object.keys(wl).sort();
		if (radios.length) {
			const w = this.card('cn-c-wifi', 'wifi', t('wireless'), L.url('admin/network/wireless'));
			const list = E('div', { 'class': 'cn-wl' });
			radios.forEach((r) => {
				const rd = wl[r] || {};
				const band = { '2g': '2.4 GHz', '5g': '5 GHz', '6g': '6 GHz', '60g': '60 GHz' }[(rd.config || {}).band] || '';
				(rd.interfaces || []).forEach((i) => {
					const info = Object.assign({}, i.iwinfo || {}, (d.iwmap[i.ifname] || {}).info || {});
					const n = ((d.iwmap[i.ifname] || {}).assoc || []).length;
					const row = E('div', { 'class': 'cn-wl-r' + (rd.up && i.ifname ? '' : ' off') });
					row.appendChild(E('i'));
					row.appendChild(txt('b', 'cn-ltr', (i.config || {}).ssid || i.section || r));
					row.appendChild(txt('span', 'cn-ltr', band || r));
					row.appendChild(txt('span', null, rd.up && i.ifname
						? t('channel') + ' ' + num(info.channel || (rd.config || {}).channel || '?') + (info.txpower != null ? ' · ' + num(info.txpower) + ' dBm' : '')
						: t('off')));
					row.appendChild(txt('span', 'cn-wl-n', num(n) + ' ' + t('clients')));
					list.appendChild(row);
				});
			});
			w.appendChild(list);
			box.appendChild(w);
		}
	}
});
