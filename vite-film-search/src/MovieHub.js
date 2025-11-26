import { jsx as _jsx } from "react/jsx-runtime";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "router";
import { getTheme, setUser, clearUser, useAppDispatch, useAppSelector } from "store";
export const MovieHub = () => {
    const { theme } = useAppSelector(getTheme);
    const dispatch = useAppDispatch();
    const auth = getAuth();
    useEffect(() => {
        document.documentElement.setAttribute("theme", theme);
    }, [theme]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    name: user.displayName,
                    email: user.email,
                    id: user.uid,
                }));
            }
            else {
                dispatch(clearUser());
            }
        });
        return () => unsubscribe();
    }, [dispatch, auth]);
    return _jsx(RouterProvider, { router: router });
};
