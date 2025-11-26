export var FirebaseErrorMessage;
(function (FirebaseErrorMessage) {
    FirebaseErrorMessage["EMAIL_ALREADY_IN_USE"] = "The email is already in use";
    FirebaseErrorMessage["WRONG_PASSWORD"] = "Email or password so wrong";
    FirebaseErrorMessage["NOT_FOUND"] = "User not found, please enter correct email";
    FirebaseErrorMessage["MOVIE_ALREADY_FAVORITE"] = "The movie is already a favorite";
    FirebaseErrorMessage["UNKNOWN_ERROR"] = "Error! Please reload the page";
})(FirebaseErrorMessage || (FirebaseErrorMessage = {}));
export const getFirebaseErrorMessage = (error) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return FirebaseErrorMessage.EMAIL_ALREADY_IN_USE;
        case "auth/wrong-password":
            return FirebaseErrorMessage.WRONG_PASSWORD;
        case "auth/user-not-found":
            return FirebaseErrorMessage.NOT_FOUND;
        case "store/movie-already-favorite":
            return FirebaseErrorMessage.MOVIE_ALREADY_FAVORITE;
        default:
            return FirebaseErrorMessage.UNKNOWN_ERROR;
    }
};
export class StoreError extends Error {
    code;
    constructor(code) {
        super();
        this.code = code;
    }
}
