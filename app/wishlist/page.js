import React from 'react';
import WishList from '../components/WishList';
export const metadata = {
  title: "Your Wishlist - Save Your Favorite Products | VASP Planner",
  description:
    "View and manage your favorite gifts and wellness products on your VASP Planner wishlist. Save items to revisit and shop later.",
};


export default function page() {


  return (
    <>
      <WishList />
    </>
  );
}
