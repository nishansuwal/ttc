import React, { useState } from "react";
import Link from "next/link";
// import useTranslation from "next-translate/useTranslation";
import Cookies from "js-cookie";
// import { useRouter } from "next/router";
import Swal from "sweetalert2";
const Top_header = () => {
  // const { t, lang } = useTranslation("common");
  // const router = useRouter();

  // const userDetail = Cookies.get("user-detail")
  //   ? JSON.parse(Cookies.get("user-detail"))
  //   : null;
  // const openWishlistPage = () => {
  //   const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
  //   if (!token) {
  //     const Toast = Swal.mixin({
  //       toast: true,
  //       position: "top-end",
  //       showConfirmButton: false,
  //       timer: 4000,
  //       timerProgressBar: true,
  //       didOpen: (toast) => {
  //         toast.addEventListener("mouseenter", Swal.stopTimer);
  //         toast.addEventListener("mouseleave", Swal.resumeTimer);
  //       },
  //     });
  //     Toast.fire({
  //       icon: "info",
  //       title: "Please login first for better experience",
  //     });
  //     return router.push("/login");
  //   }
  //   router.push("/wishlist");
  // };

  return (
    <div className="bg-slate-600 dark:bg-slate-700 text-gray-50 px-4 py-1 text-sm lg:block hidden">
      <div className="flex flex-row justify-between items-center">
        <div>
          <ul className="inline-flex">
            <li className="ml-2">
              <i className="fab fa-facebook-square"></i>
            </li>
            <li className="ml-3">
              <i className="fab fa-twitter-square"></i>
            </li>
            <li className="ml-3">
              <i className="fab fa-instagram"></i>
            </li>
            <li className="ml-3">
              <i className="fab fa-whatsapp"></i>
            </li>
            <li className="ml-3 capitalize">
              <Link passHref href="/about">
                <span>
                  <i className="fas fa-address-card mr-1"></i>
                  {("about")}
                </span>
              </Link>
            </li>
            <li className="ml-3 capitalize">
              <Link passHref href="/contact">
                <span>
                  <i className="fas fa-envelope mr-1"></i>
                </span>
                {("contact")}
              </Link>
            </li>
            <li className="ml-4">
              <div className="flex items-center justify-center text-white">
                <div className="text-center space-y-12">
                  <div className="text-center text-sm font-normal capitalize">
                    Services offered -
                    <div className="relative inline-grid grid-cols-1 grid-rows-1 gap-12 overflow-hidden">
                      <span className="animate-word col-span-full row-span-full">
                        <Link href="#" passHref>
                          Fast Delivery
                        </Link>
                      </span>
                      <span className="animate-word-delay-1 col-span-full row-span-full">
                        <Link href="#" passHref>
                          Quality Assured
                        </Link>
                      </span>
                      <span className="animate-word-delay-2 col-span-full row-span-full ml-1">
                        <Link href="#" passHref>
                          Payment Gateway
                        </Link>
                      </span>
                      <span className="animate-word-delay-3 col-span-full row-span-full">
                        <Link href="#" passHref>
                          Become a seller
                        </Link>
                      </span>
                      <span className="animate-word-delay-4 col-span-full row-span-full">
                        <Link href="#" passHref>
                          Order tracking
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Top_header;
