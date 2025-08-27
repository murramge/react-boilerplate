import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const electronAPI = {
  // Platform info
  platform: process.platform,

  // App version
  getVersion: () => process.env.npm_package_version || "1.0.0",

  // Window controls
  minimize: () => ipcRenderer.invoke("window-minimize"),
  maximize: () => ipcRenderer.invoke("window-maximize"),
  close: () => ipcRenderer.invoke("window-close"),

  // File operations (example)
  selectFile: () => ipcRenderer.invoke("dialog-file-select"),
  saveFile: (content: string) =>
    ipcRenderer.invoke("dialog-file-save", content),

  // System info
  getSystemInfo: () => ({
    platform: process.platform,
    arch: process.arch,
    version: process.version,
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  }),

  // Notifications (example)
  showNotification: (title: string, body: string) => {
    new Notification(title, { body });
  },

  // Environment
  isDevelopment: () => process.env.NODE_ENV === "development",

  // Store (example for app settings)
  store: {
    get: (key: string) => ipcRenderer.invoke("store-get", key),
    set: (key: string, value: any) =>
      ipcRenderer.invoke("store-set", key, value),
    delete: (key: string) => ipcRenderer.invoke("store-delete", key),
    clear: () => ipcRenderer.invoke("store-clear"),
  },
};

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", electronAPI);

// Type definitions for the exposed API
export type ElectronAPI = typeof electronAPI;

// Declare global interface for TypeScript
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
