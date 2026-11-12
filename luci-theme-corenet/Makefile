#
# CoreNet theme for LuCI - https://corenetbase.com
# Copyright 2026 PluS98
# Licensed under the Apache License 2.0
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=CoreNet - modern bilingual (FA/EN) theme with dashboard and menu search
LUCI_DEPENDS:=+luci-base
LUCI_PKGARCH:=all

PKG_NAME:=luci-theme-corenet
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=PluS98

define Package/luci-theme-corenet/postrm
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	uci -q delete luci.themes.CoreNet
	uci -q delete luci.corenet
	uci commit luci
	[ "$$(uci -q get luci.main.mediaurlbase)" = "/luci-static/corenet" ] && {
		uci set luci.main.mediaurlbase='/luci-static/bootstrap'
		uci commit luci
	}
}
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
