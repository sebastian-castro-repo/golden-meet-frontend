import homeIcon from '@assets/icons/home.svg'
import homeIconActive from '@assets/icons/home_active.svg'
import settingIcon from '@assets/icons/settings.svg'
import supportIcon from '@assets/icons/support_agent.svg'
import React from "react";
import { lazy } from "react";
// import {ADMIN} from "@/constants/roles.ts";
const HomePage = lazy(() => import("@/containers/home").then(({ HomePage }) => ({ default: HomePage })));
export const HOME = "/"
export const SETTINGS = "/config"
export const SUPPORT = "/soporte"

interface section {
    code: string,
    name: string,
    commonName: string,
    sessionRequired: boolean,
    role: number[]
}

export interface page {
        code: string,
        name: string,
        path: string|undefined,
        sessionRequired: boolean,
        permission: string,
        icon: any,
        iconActive: any,
        enabled: boolean,
        showMobile: boolean,
        mobileName: string,
        show: boolean,
        secondActiveUrl: string,
        secondActiveSubName: string,
        subPaths?: string[],
        sections: section[],
        component?: React.ComponentType<any>,
        subItem?: string,
        subItems?: string[]
    }

export const PAGES_CODES= {
    HOME: "HOME",
    SETTINGS: "SETTINGS",
    SUPPORT: "SUPPORT",
}

export const PERMISSIONS= {
    COMMON: "COMMON",
}

export const PAGES: Partial<page>[] = [
    {
        code: PAGES_CODES.HOME,
        name: "Inicio",
        path: HOME,
        sessionRequired: false,
        permission: PERMISSIONS.COMMON,
        icon: homeIcon,
        iconActive: homeIconActive,
        enabled: true,
        showMobile: true,
        mobileName: "Inicio",
        show: true,
        component: HomePage
    }
]

export const SETTING_PAGES: Partial<page>[] = [
    {
        code: PAGES_CODES.SETTINGS,
        name: "Configuración",
        path: SETTINGS,
        sessionRequired: false,
        permission: PERMISSIONS.COMMON,
        icon: settingIcon,
        iconActive: settingIcon,
        enabled: true,
        show: true
    },
    {
        code: PAGES_CODES.SUPPORT,
        name: "Soporte",
        path: SUPPORT,
        sessionRequired: false,
        permission: PERMISSIONS.COMMON,
        icon: supportIcon,
        iconActive: supportIcon,
        enabled: true,
        show: true
    }
]
