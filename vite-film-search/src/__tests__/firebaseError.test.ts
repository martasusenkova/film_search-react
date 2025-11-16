import { describe, it, expect } from "vitest";
import {
  getFirebaseErrorMessage,
  FirebaseErrorMessage,
  StoreError,
} from "../services/firebase/getFirebaseErrorMessage";
import type { FirebaseError } from "firebase/app";

describe("getFirebaseErrorMessage", () => {
  it("returns friendly message for known error codes", () => {
    expect(
      getFirebaseErrorMessage({ code: "auth/wrong-password" } as unknown as FirebaseError),
    ).toBe(FirebaseErrorMessage.WRONG_PASSWORD);
    expect(
      getFirebaseErrorMessage({ code: "auth/email-already-in-use" } as unknown as FirebaseError),
    ).toBe(FirebaseErrorMessage.EMAIL_ALREADY_IN_USE);
    expect(
      getFirebaseErrorMessage({ code: "store/movie-already-favorite" } as unknown as FirebaseError),
    ).toBe(FirebaseErrorMessage.MOVIE_ALREADY_FAVORITE);
  });

  it("returns unknown for unknown codes", () => {
    expect(getFirebaseErrorMessage({ code: "some/unknown" } as unknown as FirebaseError)).toBe(
      FirebaseErrorMessage.UNKNOWN_ERROR,
    );
  });
});

describe("StoreError", () => {
  it("stores code", () => {
    const e = new StoreError("my-code");
    expect(e.code).toBe("my-code");
  });
});
