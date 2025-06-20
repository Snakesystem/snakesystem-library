import { writable } from "svelte/store";
import Swal from "sweetalert2";

export const loading = writable(true);
export const baseUrl = import.meta.env.VITE_URL_API;
export const isOpen = writable(true);
export const modals = writable({});
export const paramsEditData = writable({
  data: null,
  action: "add",
  table: null
});

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

export const openModal = (id) => {
  modals.update((prev) => ({ ...prev, [id]: { show: true } }));
};

export const closeModal = (id) => {
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
    autoRefreshInterval: 120 * 1000,
    toolbar: ".toolbar",
    offset: 0,
    pageSize: 100,
    pageList: [100, 200, 500],
    height: 750,
    columns: tableFormatter(columns, tablename),
  });
}

export function tableFormatter(columns, tablename) {
  return columns.map((col) => {
    const field = col.field?.toLowerCase();
    switch (field) {
      case "lastupdate":
        return {
          ...col,
          formatter: (value) => formatWIBDate(value),
        };

      case "content_md":
        return {
          ...col,
          formatter: (value) => `<a href="${value}" target="_blank">View</a>`,
        };

      case "slug":
        return {
          ...col,
          formatter: (value, row) => `<code>${value}</code>`,
        };

      case "ipaddress":
        return {
          ...col,
          formatter: (value) => `<span class="badge bg-secondary">${value}</span>`,
        };

      case "action":
        return {
          ...col,
          formatter: (value, row) => {
            const rowStr = encodeURIComponent(JSON.stringify(row));
            return `
            <button 
              type="button" 
              class="btn btn-sm btn-warning me-1 btn-edit" 
              data-row="${rowStr}" 
              data-table="${tablename}">
              <i class="bi bi-pencil"></i>
            </button>
            <button 
              type="button" 
              class="btn btn-sm btn-danger btn-delete" 
              data-row="${rowStr}" 
              data-table="${tablename}">
              <i class="bi bi-trash"></i>
            </button>
          `;
          }
        };

      default:
        return col; // kolom lain tetap
    }
  });
}

export function getParamsEdit(data, action, table) {
  paramsEditData.update((prev) => ({ ...prev, data, action, table }));
}

function editRow(row, tablename) {
  getParamsEdit(row, "edit", tablename);
  return openModal("add-notes");
}

function deleteRow(row, tablename) {
  return Swal.fire({
    title: 'Kamu yakin?',
    text: `Kamu akan menghapus! ${tablename} ${row.Title}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yoi, hapus!',
    preConfirm: () => {
      Swal.fire({
        title: 'Ngga boleh di hapus woi',
        text: `Ngga bisa hapus ${tablename} ${row.Title}`,
        icon: 'info',
        showConfirmButton: false,
        timer: 1500
      })
      // await fetch(`${baseUrl}/data/delete/${row.NotedNID}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      // .then((response) => {
      //   if (!response.ok) {
      //     Swal.fire("Failed!", response.statusText, "error");
      //   }
      //   return response.json();
      // })
      // .then((data) => {
      //   if (data.status === "success") {
      //     Swal.fire("Deleted!", data.message, "success");
      //     initTable(columns, tablename, tablePK, filter, toolbarButton);
      //   } else {
      //     Swal.fire("Failed!", data.message, "error");
      //   }
      // })
      // .catch((error) => {
      //   console.error("Error deleting row:", error);
      // });
    }
  });
}

document.addEventListener('click', (e) => {
  const editBtn = e.target.closest('.btn-edit');
  const deleteBtn = e.target.closest('.btn-delete');

  if (editBtn) {
    const raw = editBtn.getAttribute("data-row");
    const row = JSON.parse(decodeURIComponent(raw));
    const table = editBtn.dataset.table;
    editRow(row, table);
  }

  if (deleteBtn) {
    const raw = deleteBtn.getAttribute("data-row");
    const row = JSON.parse(decodeURIComponent(raw));
    const table = deleteBtn.dataset.table;
    deleteRow(row, table);
  }
});
