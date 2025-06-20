import { writable } from "svelte/store";

export const loading = writable(true);
export const baseUrl = import.meta.env.VITE_URL_API;
export const isOpen = writable(true);
export const modals = writable({});

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

export const openModal = (/** @type {any} */ id) => {
  modals.update((prev) => ({ ...prev, [id]: { show: true } }));
};

export const closeModal = (/** @type {any} */ id) => {
  modals.update((prev) => ({ ...prev, [id]: { show: false } }));
};

export async function fetchColumns(tablename) {
  try {
    const response = await fetch(`${baseUrl}/data/header?tablename=${tablename}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching columns:", error);
  }
}

export function initTable(columns, tablename, tablePK, filter={}, toolbarButton) {
    // Destroy table first if already exists
    // @ts-ignore
    globalThis.$("#myTable").bootstrapTable("destroy");

    // Initialize new table
    // @ts-ignore
    globalThis.$("#myTable").bootstrapTable({
      url: `${baseUrl}/data/get-table?tablename=${tablename}&nidkey=${tablePK}&filter=${JSON.stringify(filter)}`,
      method: "GET",
      contentType: "application/json",
      buttons: toolbarButton(),
      buttonsClass: "primary",
      // buttonsAlign: "left",
      // toolbarAlign: "right",
      dataType: "json",
      cache: true,
      sidePagination: "server",
      showColumns: true,
      pagination: true,
      showRefresh: true,
      autoRefresh: true,
      autoRefreshInterval: 120,
      toolbar: ".toolbar",
      offset: 0,
      pageSize: 100,
      pageList: [100, 200, 500],
      height: 750,
      columns: columns
    });
  }