import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

// Helper function to create a mock API response
export const createMockApiResponse = <T,>(data: T, total?: number) => ({
  data,
  ...(total !== undefined && { total }),
});

// Helper function to create mock tasks
export const createMockTask = (overrides = {}) => ({
  id: "1",
  title: "Test Task",
  description: "Test Description",
  completed: false,
  priority: "medium" as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

// Helper function to create mock users
export const createMockUser = (overrides = {}) => ({
  id: "1",
  name: "Test User",
  email: "test@example.com",
  createdAt: new Date().toISOString(),
  ...overrides,
});

// Helper to wait for async operations
export const waitFor = (
  callback: () => void | Promise<void>,
  timeout = 1000
) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const check = async () => {
      try {
        await callback();
        resolve(undefined);
      } catch (error) {
        if (Date.now() - startTime >= timeout) {
          reject(error);
        } else {
          setTimeout(check, 10);
        }
      }
    };
    check();
  });
};

// Mock fetch response helper
export const mockFetchResponse = (data: any, ok = true, status = 200) => {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
    redirected: false,
    statusText: ok ? "OK" : "Error",
    type: "basic" as ResponseType,
    url: "",
    clone: () => mockFetchResponse(data, ok, status),
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
  } as Response);
};
