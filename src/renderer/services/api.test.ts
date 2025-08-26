import { describe, it, expect, vi, beforeEach } from "vitest";
import { api, checkApiHealth } from "./api";
import { mockFetchResponse } from "../../test/test-utils";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("api.get", () => {
    it("should make GET request and return data", async () => {
      const mockData = { data: [{ id: 1, name: "Test" }], total: 1 };
      mockFetch.mockResolvedValueOnce(mockFetchResponse(mockData));

      const result = await api.get("/test");

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/api/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result).toEqual(mockData);
    });

    it("should handle API errors", async () => {
      const errorResponse = {
        error: {
          message: "Not found",
          status: 404,
          timestamp: new Date().toISOString(),
          path: "/test",
        },
      };
      mockFetch.mockResolvedValueOnce(
        mockFetchResponse(errorResponse, false, 404)
      );

      await expect(api.get("/test")).rejects.toThrow("Not found");
    });
  });

  describe("api.post", () => {
    it("should make POST request with data", async () => {
      const postData = { name: "New Item" };
      const responseData = { data: { id: 1, ...postData } };
      mockFetch.mockResolvedValueOnce(mockFetchResponse(responseData));

      const result = await api.post("/test", postData);

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      expect(result).toEqual(responseData);
    });

    it("should handle POST without data", async () => {
      const responseData = { data: { message: "Success" } };
      mockFetch.mockResolvedValueOnce(mockFetchResponse(responseData));

      await api.post("/test");

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: undefined,
      });
    });
  });

  describe("api.put", () => {
    it("should make PUT request with data", async () => {
      const putData = { id: 1, name: "Updated Item" };
      const responseData = { data: putData };
      mockFetch.mockResolvedValueOnce(mockFetchResponse(responseData));

      const result = await api.put("/test/1", putData);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/test/1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(putData),
        }
      );
      expect(result).toEqual(responseData);
    });
  });

  describe("api.delete", () => {
    it("should make DELETE request", async () => {
      const responseData = { data: null };
      mockFetch.mockResolvedValueOnce(mockFetchResponse(responseData));

      const result = await api.delete("/test/1");

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/test/1",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(responseData);
    });
  });

  describe("checkApiHealth", () => {
    it("should return true when API is healthy", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
      } as Response);

      const result = await checkApiHealth();

      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/health");
    });

    it("should return false when API is unhealthy", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      const result = await checkApiHealth();

      expect(result).toBe(false);
    });

    it("should return false when network error occurs", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await checkApiHealth();

      expect(result).toBe(false);
    });
  });

  describe("error handling", () => {
    it("should throw generic error for network failures", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(api.get("/test")).rejects.toThrow("Network error");
    });

    it("should throw generic error for unknown errors", async () => {
      mockFetch.mockRejectedValueOnce("Unknown error");

      await expect(api.get("/test")).rejects.toThrow(
        "네트워크 오류가 발생했습니다."
      );
    });

    it("should handle malformed error responses", async () => {
      mockFetch.mockResolvedValueOnce(mockFetchResponse({}, false, 500));

      await expect(api.get("/test")).rejects.toThrow("HTTP 500");
    });
  });
});
