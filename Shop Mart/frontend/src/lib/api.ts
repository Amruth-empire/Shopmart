const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function for API calls
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // Include cookies for session management
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

// Products API
export const productsAPI = {
  getAll: () => apiRequest('/products'),
  getById: (id: string) => apiRequest(`/products/${id}`),
  create: (data: any) => apiRequest('/products/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Cart API
export const cartAPI = {
  getCart: () => apiRequest('/users/cart'),
  addToCart: (productId: string) => apiRequest('/users/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  }),
  removeFromCart: (productId: string) => apiRequest('/users/cart/remove', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  }),
  updateQuantity: (productId: string, quantity: number) => apiRequest('/users/cart/update', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }),
};

// Auth API
export const authAPI = {
  checkAuth: () => apiRequest('/users/check-auth'),
  logout: () => apiRequest('/users/logout', {
    method: 'GET',
  }),
};

// Orders API
export const ordersAPI = {
  getAll: () => apiRequest('/orders'),
  getById: (id: string) => apiRequest(`/orders/${id}`),
  create: (orderData: any) => apiRequest('/orders/create', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
};

// Shop API
export const shopAPI = {
  getProducts: () => apiRequest('/shop'),
};

// Payment API
export const paymentAPI = {
  initiatePayment: (amount: number) => apiRequest('/payment/create', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  }),
  verifyPayment: (paymentId: string) => apiRequest('/payment/verify', {
    method: 'POST',
    body: JSON.stringify({ paymentId }),
  }),
};

export default {
  products: productsAPI,
  cart: cartAPI,
  auth: authAPI,
  orders: ordersAPI,
  shop: shopAPI,
  payment: paymentAPI,
};
