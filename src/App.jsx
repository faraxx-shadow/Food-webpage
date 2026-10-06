import { useMemo, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { categories, restaurants } from "./data";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Foodie<span>.</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/orders">Orders</Link>

        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="link-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <Link to="/cart" className="cart-link">
          Cart <span>{itemCount}</span>
        </Link>
      </nav>
    </header>
  );
}

function Home() {
  const featuredRestaurants = restaurants.filter(
    (restaurant) => restaurant.featured
  );

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Hungry?</p>
          <h1>Delicious food delivered to your door.</h1>
          <p>
            Discover the best restaurants and order your favourite meals in
            just a few clicks.
          </p>
          <Link to="/restaurants" className="button">
            Explore Restaurants
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000"
            alt="Food table"
          />
        </div>
      </section>

      <main className="container">
        <section>
          <div className="section-heading">
            <h2>Popular Categories</h2>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={`/restaurants?category=${category.name}`}
                className="category-card"
                key={category.id}
              >
                <span>{category.emoji}</span>
                <strong>{category.name}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-section">
          <div className="section-heading">
            <h2>Featured Restaurants</h2>
            <Link to="/restaurants">View all</Link>
          </div>

          <div className="restaurant-grid">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard
                restaurant={restaurant}
                key={restaurant.id}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
      <img src={restaurant.image} alt={restaurant.name} />

      <div className="restaurant-card-content">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisines.join(" • ")}</p>

        <div className="restaurant-meta">
          <span className="rating">★ {restaurant.rating}</span>
          <span>{restaurant.deliveryTime} min</span>
          <span>₹{restaurant.priceForTwo} for two</span>
        </div>
      </div>
    </Link>
  );
}

function Restaurants() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");
  const [category, setCategory] = useState("All");

  const filteredRestaurants = useMemo(() => {
    let result = restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(search.toLowerCase())
        );

      const matchesCategory =
        category === "All" || restaurant.cuisines.includes(category);

      return matchesSearch && matchesCategory;
    });

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "delivery") {
      result.sort((a, b) => a.deliveryTime - b.deliveryTime);
    }

    if (sort === "price") {
      result.sort((a, b) => a.priceForTwo - b.priceForTwo);
    }

    return result;
  }, [search, sort, category]);

  return (
    <main className="container page">
      <h1>Restaurants</h1>

      <div className="filters">
        <input
          type="search"
          placeholder="Search restaurants or cuisines"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option>All</option>
          {categories.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="rating">Top rated</option>
          <option value="delivery">Fastest delivery</option>
          <option value="price">Lowest price</option>
        </select>
      </div>

      {filteredRestaurants.length === 0 ? (
        <EmptyState message="No restaurants match your search." />
      ) : (
        <div className="restaurant-grid">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              restaurant={restaurant}
              key={restaurant.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = restaurants.find((item) => item.id === id);
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (!restaurant) {
    return <EmptyState message="Restaurant not found." />;
  }

  const menuCategories = [
    "All",
    ...new Set(restaurant.menu.map((item) => item.category)),
  ];

  const menuItems =
    selectedCategory === "All"
      ? restaurant.menu
      : restaurant.menu.filter((item) => item.category === selectedCategory);

  return (
    <main className="container page">
      <section className="restaurant-banner">
        <img src={restaurant.image} alt={restaurant.name} />

        <div>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.cuisines.join(" • ")}</p>
          <p>{restaurant.location}</p>
          <div className="restaurant-meta">
            <span className="rating">★ {restaurant.rating}</span>
            <span>{restaurant.deliveryTime} min delivery</span>
          </div>
        </div>
      </section>

      <div className="menu-tabs">
        {menuCategories.map((category) => (
          <button
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="menu-list">
        {menuItems.map((item) => (
          <article className="menu-item" key={item.id}>
            <div className="menu-item-info">
              <span className={item.veg ? "veg-icon" : "non-veg-icon"}>
                ●
              </span>
              <h3>{item.name}</h3>
              <strong>₹{item.price}</strong>
              <p>{item.description}</p>
            </div>

            <div className="menu-item-image">
              <img src={item.image} alt={item.name} />
              <button
                className="add-button"
                onClick={() => addToCart(item, restaurant)}
              >
                Add
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="empty-page">
        <h1>Your cart is empty</h1>
        <p>Add delicious food from a restaurant to continue.</p>
        <Link to="/restaurants" className="button">
          Browse Restaurants
        </Link>
      </main>
    );
  }

  return (
    <main className="container page">
      <h1>Your Cart</h1>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.restaurantName}</p>
                <strong>₹{item.price}</strong>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </section>

        <BillSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          discount={discount}
          total={total}
        />
      </div>
    </main>
  );
}

function BillSummary({
  subtotal,
  deliveryFee,
  tax,
  discount,
  total,
}) {
  return (
    <aside className="bill-summary">
      <h2>Bill Details</h2>

      <div>
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div>
        <span>Delivery fee</span>
        <span>₹{deliveryFee.toFixed(2)}</span>
      </div>

      <div>
        <span>Taxes</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <div>
        <span>Discount</span>
        <span>-₹{discount.toFixed(2)}</span>
      </div>

      <hr />

      <div className="total-row">
        <strong>Total</strong>
        <strong>₹{total.toFixed(2)}</strong>
      </div>

      <Link to="/checkout" className="button full-width">
        Proceed to Checkout
      </Link>
    </aside>
  );
}

function Checkout() {
  const {
    cartItems,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    clearCart,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "Cash on Delivery",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function placeOrder(event) {
    event.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      setError("Please complete all delivery details.");
      return;
    }

    const previousOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customer: form,
      items: cartItems,
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      status: "Confirmed",
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...previousOrders])
    );

    clearCart();
    navigate("/orders");
  }

  if (cartItems.length === 0) {
    return (
      <main className="empty-page">
        <h1>Your cart is empty</h1>
        <Link to="/restaurants" className="button">
          Browse Restaurants
        </Link>
      </main>
    );
  }

  return (
    <main className="container page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h2>Delivery Details</h2>

          {error && <p className="form-error">{error}</p>}

          <label>
            Full name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Phone number
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </label>

          <label>
            Address
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House number, street, area"
            />
          </label>

          <label>
            City
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
            />
          </label>

          <label>
            Payment method
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit/Debit Card</option>
            </select>
          </label>

          <button className="button full-width">
            Place Order
          </button>
        </form>

        <BillSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          discount={discount}
          total={total}
        />
      </div>
    </main>
  );
}

function Orders() {
  const { user } = useAuth();
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="container page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <EmptyState message="You have not placed any orders yet." />
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <h3>{order.id}</h3>
                  <p>{order.createdAt}</p>
                </div>

                <span className="order-status">{order.status}</span>
              </div>

              <div className="order-products">
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <strong>Total: ₹{order.total.toFixed(2)}</strong>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    try {
      login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>

        {error && <p className="form-error">{error}</p>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button className="button full-width">Login</button>

        <p>
          New user? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    register(form.name, form.email, form.password);
    navigate("/");
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          minLength="6"
          required
        />

        <button className="button full-width">
          Register
        </button>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="container page">
      <section className="profile-card">
        <h1>My Profile</h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <button className="button" onClick={logout}>
          Logout
        </button>
      </section>
    </main>
  );
}

function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <div>🍽️</div>
      <h2>{message}</h2>
      <Link to="/restaurants" className="button">
        Explore Food
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Foodie. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="*"
          element={<EmptyState message="Page not found." />}
        />
      </Routes>

      <Footer />
    </>
  );
}
