// @ts-nocheck
import wrap from "svelte-spa-router/wrap";
import Notfound from "./notfound.svelte";
import { push } from "svelte-spa-router";
import { writable } from "svelte/store";

export const isOpen = writable(true);
export const base_url = "https://snakesystem-web-api-tdam.shuttle.app/api/v1"

export async function fetchColumns(tablename) {
  try {
    const response = await fetch(`${base_url}/data/header?tablename=${tablename}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching columns:", error);
  }
}

export const modals = writable({});

export const openModal = (/** @type {any} */ id) => {
  modals.update((prev) => ({ ...prev, [id]: { show: true } }));
};

export const closeModal = (/** @type {any} */ id) => {
  modals.update((prev) => ({ ...prev, [id]: { show: false } }));
};

export const routes = {
    '/': wrap({
        userData: {
            title: 'Home',
            icon: 'house',
            loading: true
        },
        asyncComponent: () => import('./client/home.svelte'),
    }),
    '/contact': wrap({
        userData: {
            title: 'Contact',
            icon: 'telephone',
            loading: true
        },
        asyncComponent: () => import('./client/contact.svelte'),
    }),
    '/login': wrap({
        userData: {
            title: 'Login',
            icon: 'person',
            loading: true
        },
        asyncComponent: () => import('./client/login.svelte'),
    }),
    '/notes': wrap({
        userData: {
            title: 'Notes',
            icon: 'book',
            loading: true
        },
        asyncComponent: () => import('./client/notes.svelte'),
    }),
    '/notes/:slug': wrap({
        userData: {
            title: 'Notes',
            icon: 'book',
            loading: true
        },
        asyncComponent: () => import('./client/notes.svelte'),
    }),
    '/notes/:slug/*': wrap({
        userData: {
            title: 'Notes',
            icon: 'book',
            loading: true
        },
        asyncComponent: () => import('./client/notes.svelte'),
    }),

    // Private route zone
    '/dashboard': wrap({
        userData: {
            title: 'Dashboard',
            icon: 'grid',
            loading: true
        },
        asyncComponent: () => import('./admin/dashboard.svelte'),
        conditions: [
            async (detail) => {
                const response = await fetch(`${base_url}/auth/session`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                if (data.result) {
                    detail.userData.loading = false
                    return true
                }
                else {
                    detail.userData.loading = false
                    push('/')
                    return false
                }
            }
        ],
    }),
    '/dashboard/notes': wrap({
        userData: {
            title: 'Notes',
            icon: 'grid',
            loading: true
        },
        asyncComponent: () => import('./admin/notes.svelte'),
        conditions: [
            async (detail) => {
                const response = await fetch(`${base_url}/auth/session`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                if (data.result) {
                    detail.userData.loading = false
                    return true
                }
                else {
                    detail.userData.loading = false
                    push('/')
                    return false
                }
            }
        ],
    }),
    '/dashboard/email': wrap({
        userData: {
            title: 'Dashboard',
            icon: 'grid',
            loading: true
        },
        asyncComponent: () => import('./admin/email.svelte'),
        conditions: [
            async (detail) => {
                const response = await fetch(`${base_url}/auth/session`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                if (data.result) {
                    detail.userData.loading = false
                    return true
                }
                else {
                    detail.userData.loading = false
                    push('/')
                    return false
                }
            }
        ],
    }),
    '*': Notfound
}

export function formatWIBDate(dateString) {
    const date = new Date(dateString);

    // Offset ke WIB (UTC+7)
    const wibOffset = 7 * 60; // dalam menit
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const wibDate = new Date(utc + (wibOffset * 60000));

    // Format jam dan menit
    const hours = wibDate.getHours();
    const minutes = wibDate.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    const hour12 = ((hours + 11) % 12 + 1);

    // Format hari dan tanggal
    const day = wibDate.toLocaleDateString('en-US', { weekday: 'short' });
    const month = wibDate.toLocaleDateString('en-US', { month: 'short' });
    const dayNumber = wibDate.getDate();
    const year = wibDate.getFullYear();

    return `${hour12}:${minutes} ${isPM ? 'PM' : 'AM'} WIB, ${day} ${month} ${dayNumber}, ${year}`;
}
