import { describe, it, expect } from "vitest";
import { getFirebaseErrorMessage, FirebaseErrorMessage, StoreError, } from "../services/firebase/getFirebaseErrorMessage";
describe("getFirebaseErrorMessage", () => {
    it("returns friendly message for known error codes", () => {
        expect(getFirebaseErrorMessage({ code: "auth/wrong-password" })).toBe(FirebaseErrorMessage.WRONG_PASSWORD);
        expect(getFirebaseErrorMessage({ code: "auth/email-already-in-use" })).toBe(FirebaseErrorMessage.EMAIL_ALREADY_IN_USE);
        expect(getFirebaseErrorMessage({ code: "store/movie-already-favorite" })).toBe(FirebaseErrorMessage.MOVIE_ALREADY_FAVORITE);
    });
    it("returns unknown for unknown codes", () => {
        expect(getFirebaseErrorMessage({ code: "some/unknown" })).toBe(FirebaseErrorMessage.UNKNOWN_ERROR);
    });
});
describe("StoreError", () => {
    it("stores code", () => {
        const e = new StoreError("my-code");
        expect(e.code).toBe("my-code");
    });
});
