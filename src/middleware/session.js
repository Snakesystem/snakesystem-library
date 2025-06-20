import { baseUrl, loading } from "$lib/index.js";
import { writable } from "svelte/store";

export const publicPages = ['/','/login', '/register', '/forget-password'];
export const wildcardPages = ['/activation/', '/reset-password/'];
export const protectedPages = ['/admin/dashboard', '/admin/about', '/admin/profile', '/admin/catatan', '/admin/email', '/admin/settings', '/admin/chat'];

export const session = writable(null);

export async function checkSession() {
  loading.set(true);
  try {
    const res = await fetch(`${baseUrl}/auth/session`, {
      credentials: 'include' // penting kalau pakai cookie
    });

    if (res.ok) {
      const data = await res.json();
      session.set(data.data); // misal: { user: { ... } }
      loading.set(false);
      return true;
    } else {
      loading.set(false);
      session.set(data.error);
      return false;
    }
  } catch (err) {
    loading.set(false);
    session.set(err);
    return false;
  }
}