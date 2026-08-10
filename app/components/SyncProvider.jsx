"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "../store/cartSlice";
import { fetchWishlistItems } from "../store/wishListSlice";

export default function SyncProvider({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartItems());
        dispatch(fetchWishlistItems());
    }, [dispatch]);

    return <>{children}</>;
}
