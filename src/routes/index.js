// @ts-nocheck
import wrap from "svelte-spa-router/wrap";
import Notfound from "./notfound.svelte";
import { push } from "svelte-spa-router";

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
            title: 'Home',
            icon: 'house',
            loading: true
        },
        asyncComponent: () => import('./client/contact.svelte'),
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
                const response = await fetch('/api/auth/session', {
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