import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchToggleDarkMode } from "../../redux/cart/cartActions";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
const ItemLoader = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 rounded">
        <div className="container px-2 py-2 mx-auto animate-pulse">
          <div className="">
            <div className="w-full flex items-center justify-between gap-3">
              <div className="w-[4rem] h-[3rem] bg-gray-300 rounded-full dark:bg-gray-600"></div>

              <h1 className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700">
                <br />
                <span>
                  {" "}
                  <p className="w-[25%] h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const PhoneHeader = () => {
  const [searchProduct, setSearchProducts] = useState([""]);
  const [searchModal, setSearchModal] = useState(false);
  const [searchText, setSearchText] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [viewSearchBar, setSearchBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userDetail = Cookies.get("user-detail")
    ? JSON.parse(Cookies.get("user-detail"))
    : null;
  const logout = () => {
    Cookies.remove("user-detail");
    Cookies.remove("user-token");
    router.push("/");
  };
  const darkMode = useSelector((state) => state.darkMode?.mode);
  const dispatch = useDispatch();
  const performSearch = async (keywords) => {
    if (keywords) {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product/search/${keywords}`
      );
      if (response.data.length > 0) {
        setSearchProducts(response.data);
        setLoading(false);
        setSearchModal(true);
      } else {
        setLoading(true);
        setSearchModal(true);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchModal(false);
    router.push(`/search/${searchText}`);
  };

  return (
    <>
      <div className="sticky top-0 w-full px-4 py-4 z-[990] bg-gray-100 lg:hidden dark:bg-slate-800 block backdrop-filter backdrop-blur-lg bg-opacity-25 overflow-y-auto">
        <div className="flex flex-row justify-between">
          <div>
            <Link href="/">
              <p className="text-xl font-semibold text-red-600">Zoomni</p>
            </Link>
          </div>

          <div className="flex gap-4 text-xl">
            <button
              onClick={() => {
                dispatch(fetchToggleDarkMode(darkMode));
              }}
              className="text-xl text-rose-600 border-rose-600 rounded-full"
            >
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            {userDetail && (
              <div className="relative">
                <img
                  onClick={() => setDisplayMenu(!displayMenu)}
                  onMouseOver={() => setDisplayMenu(true)}
                  src={userDetail.picture}
                  alt={userDetail.firstName + " " + userDetail.lastName}
                  className={`w-[1.8rem] h-[1.8rem] rounded-full cursor-pointer ${
                    displayMenu && "ring-offset-2 ring-2 ring-red-500"
                  }`}
                />
                {displayMenu && (
                  <div
                    onMouseLeave={() => setDisplayMenu(false)}
                    className="bg-gray-800 bg-opacity-40 text-white absolute top-[3rem] w-[9rem] left-[-5rem] px-2 py-3 rounded backdrop-filter backdrop-blur-lg"
                  >
                    <Link href="/user-profile">
                      <button className="bg-gray-500 px-2 rounded py-1 text-sm backdrop-filter backdrop-blur-lg bg-opacity-25">
                        {userDetail.firstName + " " + userDetail.lastName}
                      </button>
                    </Link>
                    <button
                      onClick={logout}
                      className="bg-gray-500 px-2 rounded py-1 mt-2 text-sm backdrop-filter backdrop-blur-lg bg-opacity-25"
                    >
                      logout
                    </button>
                  </div>
                )}
              </div>
            )}
            {viewSearchBar ? (
              <span
                className="text-red-500"
                onClick={() => setSearchBar(!viewSearchBar)}
              >
                <i className="far fa-times"></i>
              </span>
            ) : (
              <span onClick={() => setSearchBar(!viewSearchBar)}>
                <i className="far fa-search text-red-600 mt-2"></i>
              </span>
            )}
          </div>
        </div>
      </div>
      {viewSearchBar && (
        <div
          id="search-modal"
          className="bg-slate-200 mb-2 w-full top-0 z-[999] py-2 px-2 flex justify-between fixed transition-all duration-300 backdrop-filter backdrop-blur-lg bg-opacity-25"
        >
          <input
            onChange={(e) => performSearch(e.target.value)}
            placeholder="search products here..."
            type="text"
            className="bg-gray-100 dark:bg-slate-900 px-3 placeholder:text-sm py-1 rounded-full dark:placeholder:text-gray-400  placeholder:text-gray-100 shadow w-[100%] focus:outline-none focus:shadow-lg border-2 border-rose-600 tracking-widest"
          />
          {viewSearchBar && (
            <button
              className="text-rose-600 text-center m-2 border-2 rounded px-2 border-rose-600"
              onClick={() => setSearchBar(!viewSearchBar)}
            >
              <i className="far fa-times"></i>
            </button>
          )}
          {searchModal && (
            <div className="w-[100%] absolute top-[4.2rem] z-[999] rounded inset-0 h-[100vh] overflow-y-scroll mb-[1.8rem]">
              <div className="">
                <div className="flex justify-center">
                  <div className="w-full p-2">
                    <div className="bg-gray-800 shadow-md rounded-lg px-3 py-2 mb-4 backdrop-filter backdrop-blur-lg bg-opacity-90">
                      {loading && <ItemLoader />}
                      <div className="max-w-2xl mx-auto">
                        <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                          {/* <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-normal leading-none text-gray-900 dark:text-white">
                              Latest Products
                            </h3>
                            <a
                              href="#"
                              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                              View all
                            </a>
                          </div> */}
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200 dark:divide-gray-700"
                            >
                              {searchProduct &&
                                searchProduct.map((item, index) => (
                                  <li key={index} className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-shrink-0">
                                        <img
                                          className="w-[3rem] h-[3rem] rounded-full object-cover"
                                          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item?.featureImage}`}
                                          alt={item.title}
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <Link href={`/product/${item.slug}`}>
                                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {item.title}
                                          </p>
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                          Rs. {item.sellingPrice}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PhoneHeader;
