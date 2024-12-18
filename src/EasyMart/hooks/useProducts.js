import { useEffect, useState } from "react";
// import firebase from "firebase";
// import * as firebase from "firebase";
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import initializeAuthentication from "../pages/Login/Firebase/firebase.init";
import getBaseUrl from "./getBaseUrl";

initializeAuthentication();

const getFromLocalStorage = () => {
  const cartList = localStorage.getItem("shopping_cart");
  if (cartList) {
    return JSON.parse(localStorage.getItem("shopping_cart"));
  } else {
    return [];
  }
};

const useProducts = () => {
  const getStarting = JSON.parse(localStorage.getItem("starting"));
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  const [user, setUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [vendorUser, setVendorUser] = useState({});
  const [token, setToken] = useState("");

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [superOffer, setSuperOffer] = useState([]);
  const [superOfferCheckbox, setSuperOfferCheckbox] = useState(false);

  const [categoriesProducts, setCategoriesProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesCheckbox, setCategoriesCheckbox] = useState([]);

  const [brands, setBrands] = useState([]);
  const [brandsCheckbox, setBrandsCheckbox] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState("");

  const [vendors, setVendors] = useState([]);
  const [vendorsCheckbox, setVendorsCheckbox] = useState([]);

  const [headerSearchText, setHeaderSearchText] = useState("");
  const [headerSuggestBox, setHeaderSuggestBox] = useState(false);

  const [rangePrice, setRangePrice] = useState(0);
  const [productColorId, setProductColorId] = useState("");

  const [cart, setCart] = useState(getFromLocalStorage());
  const [newQuantity, setNewQuantity] = useState(1);
  const [userOrder, setUserOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${getBaseUrl()}/products`)
      .then((res) => res.json())
      .then((data) => {
        setCategoriesProducts(data);

        let newArray = [];
        for (const categories of data) {
          categories?.products?.map((data) =>
            newArray.push({ ...data, cate_name: categories?.cate_name })
          );
          // console.log("cate--", categories?.cate_name)
        }
        setProducts(newArray);
        // setDisplayProducts(newArray);

        // console.log("newArray--", data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const offerList = products?.filter(
      (product) => product.superOffer === true
    );
    setSuperOffer(offerList);
  }, [products]);

  const handleAllCategory = () => {
    fetch(`${getBaseUrl()}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategory = (e) => {
    setSelectedBrands("");
    setSelectedCategory(e.target.textContent);

    let newArray = [];
    newArray.push(e.target.textContent);
    setCategoriesCheckbox(newArray);
  };

  const handleAllBrands = () => {
    
    fetch(`${getBaseUrl()}/brands`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBrands = (e) => {
    setSelectedCategory("");
    setSelectedBrands(e);

    let newArray = [];
    newArray.push(e);
    setBrandsCheckbox(newArray);
  };

  const handleAllVendors = () => {
    fetch(`${getBaseUrl()}/vendors`)
      .then((res) => res.json())
      .then((data) => {
        setVendors(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let filteredProducts = [...products];

    // Apply search filter
    if (headerSearchText) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(headerSearchText.toLowerCase())
      );
    }

    // Apply super offer filter
    if (superOfferCheckbox) {
      filteredProducts = filteredProducts.filter(
        (product) => product.superOffer
      );
    }

    // Apply category filter
    if (categoriesCheckbox.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categoriesCheckbox.includes(product.cate_name)
      );
    }

    // Apply brand filter
    if (brandsCheckbox.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        brandsCheckbox.includes(product.brand_name)
      );
    }

    // Apply vendor filter
    if (vendorsCheckbox.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        vendorsCheckbox.includes(product.vendors_name)
      );
    }

    // Set filtered products
    setDisplayProducts(filteredProducts);
  }, [
    categoriesCheckbox,
    brandsCheckbox,
    vendorsCheckbox,
    superOfferCheckbox,
    products,
    headerSearchText,
  ]);

  // Category
  const handleCategoriesCheckbox = (ctName) => {
    let newArray = [];
    if (categoriesCheckbox?.length === 0) {
      newArray.push(ctName);
      setSelectedCategory(ctName);
    } else {
      const findData = categoriesCheckbox?.find((pd) => pd === ctName);
      if (findData === ctName) {
        const removeData = categoriesCheckbox.filter((pd) => pd !== ctName);
        newArray.push(...removeData);
        setSelectedCategory("");
      } else {
        newArray.push(...categoriesCheckbox, ctName);
        setSelectedCategory(ctName);
      }
    }
    setCategoriesCheckbox(newArray);
  };

  const handleBrandsCheckbox = (brandName) => {
    let newArray = [];
    if (brandsCheckbox?.length === 0) {
      newArray.push(brandName);
      setSelectedBrands(brandName);
    } else {
      const findData = brandsCheckbox?.find((pd) => pd === brandName);
      if (findData === brandName) {
        const removeData = brandsCheckbox.filter((pd) => pd !== brandName);
        newArray.push(...removeData);
        setSelectedBrands("");
      } else {
        newArray.push(...brandsCheckbox, brandName);
        setSelectedBrands(brandName);
      }
    }
    setBrandsCheckbox(newArray);
  };

  const handleVendorsCheckbox = (vendorName) => {
    let newArray = [];
    if (vendorsCheckbox?.length === 0) {
      newArray.push(vendorName);
    } else {
      const findData = vendorsCheckbox?.find((pd) => pd === vendorName);
      if (findData === vendorName) {
        const removeData = vendorsCheckbox.filter((pd) => pd !== vendorName);
        newArray.push(...removeData);
      } else {
        newArray.push(...vendorsCheckbox, vendorName);
      }
    }
    setVendorsCheckbox(newArray);
  };

  // -------------------------------------------------------------------------
  // Global filtering function
  // -------------------------------------------------------------------------
  const handleClearAllProductsPage = () => {
    setSuperOfferCheckbox(false);
    setDisplayProducts([...products]);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };
  const handleClearWithoutSearch = () => {
    setSuperOfferCheckbox(false);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setProductColorId("");
  };
  const handleClearWithoutSuperOffer = () => {
    setSuperOfferCheckbox(true);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };
  const handleClearWithoutCategories = () => {
    setSuperOfferCheckbox(false);
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };
  const handleClearWithoutBrands = () => {
    setSuperOfferCheckbox(false);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };
  const handleClearWithoutVendors = () => {
    setSuperOfferCheckbox(false);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };

  // -------------------------------------------------------------------------
  // Projects Searching Result
  // -------------------------------------------------------------------------
  const showData = (searchShowData) => {
    const matchedProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(searchShowData.toLowerCase())
    );
    setDisplayProducts(matchedProducts);
  };

  // allProduct.js
  const handleSearch = (searchData) => showData(searchData);
  //Search.js
  const handleSearchClick = (searchData2) => {
    showData(searchData2);
    handleClearWithoutSearch();
    setHeaderSuggestBox(true);
  };

  // header.js
  const handleSuggestClick = (searchData3) => showData(searchData3);

  const handleProductColor = (id) => {
    setProductColorId(id);
  };

  // -------------------------------------------------------------------------
  // handleAddToCart
  // -------------------------------------------------------------------------
  const handleAddToCart = (product, colorId) => {
    const newCart = [...cart];
    const existingIndex = newCart.findIndex((c) => c._id === product._id);

    // Step 1: Calculate cart quantity for this product
    const cartQuantity =
      existingIndex >= 0 ? newCart[existingIndex].quantity : 0;

    // Step 2: Calculate dynamic available stock
    const availableStock = product.stock - cartQuantity;

    // Step 3: Check stock availability
    if (newQuantity > availableStock) {
      toast.warn(
        `Only ${
          availableStock > 0 ? availableStock : 0
        } Product : Out of stock!`,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        }
      );
      return;
    }
    // Step 4: Check max quantity per product
    if (cartQuantity + newQuantity > 5) {
      toast.warn("Maximum of 5 product allowed at a time!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      return;
    }

    // Step 5: Update cart
    if (existingIndex >= 0) {
      // Update existing product quantity in cart
      newCart[existingIndex].quantity += newQuantity;
      newCart[existingIndex].color_id = colorId;
    } else {
      // Add new product to cart
      const newItem = { ...product, quantity: newQuantity, color_id: colorId };
      newCart.push(newItem);
    }

    // Step 6: Update cart state and storage
    setCart(newCart);
    localStorage.setItem("shopping_cart", JSON.stringify(newCart));

    // Reset input quantity
    setNewQuantity(1);

    // Notify user
    toast.success("Product was added successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  };

  const handleMinusToCart = (product) => {
    const newCart = [...cart];
    const existingIndex = newCart.findIndex((c) => c._id === product._id);

    if (existingIndex >= 0) {
      const currentQuantity = newCart[existingIndex].quantity;

      // Step 1: Reduce quantity by 1 or remove if it reaches 0
      if (currentQuantity > 1) {
        newCart[existingIndex].quantity -= 1;
      } else {
        // Remove product from cart
        newCart.splice(existingIndex, 1);
      }

      // Step 2: Update cart
      setCart(newCart);
      localStorage.setItem("shopping_cart", JSON.stringify(newCart));

      toast.success("Product quantity updated!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else {
      toast.error("Product not found in the cart!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  // Delete Product
  const handleRemove = (_id) => {
    const newCart = cart.filter((product) => product._id !== _id);
    setCart(newCart);
    localStorage.setItem("shopping_cart", JSON.stringify(newCart));
  };

  const handleProductOrders = () => {
    fetch(`${getBaseUrl()}/orders`)
      .then((res) => res.json())
      .then((result) => {
        setTotalOrder(result);

        const filterUser = result?.filter(
          (data) => data.receiver_email === user.email
        );
        setUserOrder(filterUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`${getBaseUrl()}/message`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // -----------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------

  const registerUser = (email, password, name, phoneNumber, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");

        const newUser = { email, displayName: name, phoneNumber };
        setUser(newUser);

        saveUser(email, name, phoneNumber, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});

        navigate("/");

        Swal.fire({
          position: "center",
          icon: "success",
          title: "New User created successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        setAuthError(error.message);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        navigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const signInWithGoogle = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        saveUser(user.email, user.displayName, user.phoneNumber, "PUT");

        setAuthError("");
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const setUpRecaptcha = (number, name) => {
    const newUser = { phoneNumber: number, displayName: name };

    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();

    let email;
    saveUser(email, name, number, "PUT");

    updateProfile(auth.currentUser, {
      phoneNumber: number,
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {});

    return signInWithPhoneNumber(auth, newUser, recaptchaVerifier);
  };

  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  useEffect(() => {
    fetch(`${getBaseUrl()}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.email]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = (email, displayName, phoneNumber, method) => {
    const user = { email, displayName, phoneNumber };
    fetch(`${getBaseUrl()}/users`, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`${getBaseUrl()}/users`)
      .then((res) => res.json())
      .then((result) => {
        setUserList(result);
        const isVendor = result.find((data) => data.email === user.email);
        setVendorUser(isVendor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return {
    getStarting,
    handleClearAllProductsPage,
    handleClearWithoutSearch,
    handleClearWithoutSuperOffer,
    handleClearWithoutCategories,
    handleClearWithoutBrands,
    handleClearWithoutVendors,
    products,
    setProducts,
    displayProducts,
    setDisplayProducts,
    superOffer,
    superOfferCheckbox,
    setSuperOfferCheckbox,
    categoriesProducts,
    categories,
    setCategories,
    handleAllCategory,
    handleCategory,
    selectedCategory,
    setSelectedCategory,
    handleCategoriesCheckbox,
    categoriesCheckbox,
    setCategoriesCheckbox,
    brands,
    handleBrands,
    selectedBrands,
    setSelectedBrands,
    handleBrandsCheckbox,
    brandsCheckbox,
    setBrandsCheckbox,
    vendors,
    setVendors,
    vendorsCheckbox,
    setVendorsCheckbox,
    handleVendorsCheckbox,
    rangePrice,
    setRangePrice,
    cart,
    setCart,
    newQuantity,
    setNewQuantity,
    handleAddToCart,
    handleMinusToCart,
    handleRemove,
    rangePrice,
    setRangePrice,
    handleProductColor,
    productColorId,
    totalOrder,
    setTotalOrder,
    userOrder,
    setUserOrder,
    handleProductOrders,
    headerSearchText,
    setHeaderSearchText,
    headerSuggestBox,
    setHeaderSuggestBox,
    handleSearch,
    handleSearchClick,
    handleSuggestClick,
    user,
    userList,
    setUserList,
    admin,
    vendorUser,
    token,
    isLoading,
    authError,
    registerUser,
    loginUser,
    signInWithGoogle,
    setUpRecaptcha,
    logOut,
    messages,
    setMessages,
    handleAllBrands,
    handleAllVendors,
  };
};

export default useProducts;
