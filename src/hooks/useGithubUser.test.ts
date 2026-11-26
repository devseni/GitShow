import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { mockRepos, mockUser } from "../test/mocks";
import { useGithubUser } from "./useGithubUser";

describe("useGithubUser", () => {
  afterEach(() => vi.resetAllMocks());

  it("Starts with empty state", () => {
    const { result } = renderHook(() => useGithubUser());

    expect(result.current.user).toBeNull();
    expect(result.current.repos).toHaveLength(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets user and repos after a successful search", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockUser),
      } as never)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockRepos),
      } as never);

    const { result } = renderHook(() => useGithubUser());

    act(() => {
      result.current.searchUser("johndoe");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user?.login).toBe(mockUser.login);
    expect(result.current.repos).toHaveLength(mockRepos.length);
    expect(result.current.error).toBeNull();
  });

  it("sets an error message when user is not found", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    } as never);

    const { result } = renderHook(() => useGithubUser());

    act(() => {
      result.current.searchUser("thisUserDoesNotExist");
    });

    await waitFor(() => {
      expect(result.current.error).toBe("User not found on GitHub.");
    });

    expect(result.current.user).toBeNull();
  });

  it("sets an error message of network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("Network error"),
    );

    const { result } = renderHook(() => useGithubUser());

    act(() => {
      result.current.searchUser("johndoe");
    });

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Network error. Please check your connection.",
      );
    });
  });

  it("sets a generic error message on a non-404 server error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ message: "Internal server error" }),
    } as never);

    const { result } = renderHook(() => useGithubUser());

    act(() => {
      result.current.searchUser("johndoe");
    });

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Something went wrong. Please try again.",
      );
    });

    expect(result.current.user).toBeNull();
    expect(result.current.repos).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });

  it("resets state back to initial when reset is called", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockUser),
    } as never);
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockRepos),
    } as never);

    const { result } = renderHook(() => useGithubUser());

    act(() => {
      result.current.searchUser("johndoe");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).not.toBeNull();
    expect(result.current.repos.length).toBeGreaterThan(0);

    act(() => {
      result.current.reset();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.repos).toHaveLength(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
