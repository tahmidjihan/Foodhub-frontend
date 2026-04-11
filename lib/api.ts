/**
 * FoodHub API Client Layer
 * Provides typed, reusable functions for all API calls
 *
 * IMPORTANT: Uses relative `/api/*` paths which are:
 * - In development: proxied via next.config.ts rewrites to backend
 * - In production: proxied via Netlify redirects to backend
 * This ensures cookies (scoped to frontend domain) are forwarded correctly
 */

// Use relative path - will be proxied to backend
const API_BASE = '';

// ============= Types =============

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: 'Admin' | 'Provider' | 'Customer';
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
}

export interface Meal {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string[];
  description: string;
  type: 'veg' | 'non-veg' | 'vegan' | 'other';
  providerId: string;
  categoryId: string;
  Category?: Category;
  provider?: Pick<User, 'id' | 'name' | 'image'>;
  avgRating?: number;
  reviewCount?: number;
}

export interface MealDetails extends Meal {
  reviews: Review[];
  relatedMeals?: Meal[];
}

export interface Review {
  id: string;
  description: string;
  rating?: number;
  UserId: string;
  MealId: string;
  User: Pick<User, 'id' | 'name' | 'image'>;
  createdAt?: string;
}

export interface Order {
  id: string;
  quantity: number;
  total: number;
  status: 'Pending' | 'InProgress' | 'Completed' | 'Cancelled';
  address: string;
  createdAt: string;
  updatedAt: string;
  MealId: string;
  UserId: string;
  Meal?: Meal;
}

export interface CartItem {
  id: string;
  UserId: string;
  MealId: string;
  quantity: number;
  Meal: Meal;
}

export interface DashboardStats {
  totalOrders: number;
  totalSpending: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  inProgressOrders: number;
  totalMeals: number;
  totalProviders: number;
  totalCustomers: number;
}

export interface ChartDataPoint {
  date: string;
  orders: number;
  revenue: number;
}

export interface StatusDistribution {
  name: string;
  value: number;
  color: string;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  user?: Pick<User, 'id' | 'name' | 'email' | 'image'>;
  mealCount?: number;
  avgRating?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// ============= API Client =============

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  // Use relative path - will be proxied to backend
  const url = `${API_BASE}/api${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.message || `HTTP ${response.status}`,
        message: errorData.message,
      };
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return { data: undefined as T };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// ============= Meals API =============

export async function getMeals(params?: {
  skip?: number;
  take?: number;
  category?: string;
  search?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): Promise<ApiResponse<Meal[]>> {
  const searchParams = new URLSearchParams();
  if (params?.skip !== undefined) searchParams.set('skip', String(params.skip));
  if (params?.take !== undefined) searchParams.set('take', String(params.take));
  if (params?.category) searchParams.set('category', params.category);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.type && params.type !== 'both')
    searchParams.set('type', params.type);
  if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

  const query = searchParams.toString();
  return fetchApi<Meal[]>(`/meals${query ? `?${query}` : ''}`);
}

export async function getMealById(
  id: string,
): Promise<ApiResponse<MealDetails>> {
  return fetchApi<MealDetails>(`/meals/${id}`);
}

export async function getMealsByProvider(
  providerId: string,
): Promise<ApiResponse<Meal[]>> {
  return fetchApi<Meal[]>(`/meals/provider/${providerId}`);
}

// ============= Categories API =============

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return fetchApi<Category[]>('/categories');
}

// ============= Orders API =============

export async function getUserOrders(): Promise<ApiResponse<Order[]>> {
  return fetchApi<Order[]>('/orders');
}

export async function createOrder(data: {
  mealId: string;
  quantity: number;
  total: number;
  address: string;
}): Promise<ApiResponse<Order>> {
  return fetchApi<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============= Cart API =============

export async function getCart(): Promise<ApiResponse<CartItem[]>> {
  return fetchApi<CartItem[]>('/cart');
}

export async function addToCart(
  mealId: string,
  quantity: number = 1,
): Promise<ApiResponse<CartItem>> {
  return fetchApi<CartItem>('/cart', {
    method: 'POST',
    body: JSON.stringify({ MealId: mealId, quantity }),
  });
}

export async function updateCartItem(
  itemId: string,
  quantity: number,
): Promise<ApiResponse<CartItem>> {
  return fetchApi<CartItem>(`/cart/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeFromCart(
  itemId: string,
): Promise<ApiResponse<void>> {
  return fetchApi<void>(`/cart/${itemId}`, {
    method: 'DELETE',
  });
}

// ============= Reviews API =============

export async function getMealReviews(
  mealId: string,
): Promise<ApiResponse<Review[]>> {
  return fetchApi<Review[]>(`/review/meal/${mealId}`);
}

export async function createReview(data: {
  mealId: string;
  description: string;
  rating?: number;
}): Promise<ApiResponse<Review>> {
  return fetchApi<Review>('/review', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============= Dashboard API =============

export async function getDashboardStats(): Promise<
  ApiResponse<DashboardStats>
> {
  return fetchApi<DashboardStats>('/dashboard/stats');
}

export async function getDashboardChartData(): Promise<
  ApiResponse<ChartDataPoint[]>
> {
  return fetchApi<ChartDataPoint[]>('/dashboard/chart-data');
}

export async function getDashboardStatusDistribution(): Promise<
  ApiResponse<StatusDistribution[]>
> {
  return fetchApi<StatusDistribution[]>('/dashboard/status-distribution');
}

export async function getRecentOrders(
  limit: number = 5,
): Promise<ApiResponse<Order[]>> {
  return fetchApi<Order[]>(`/dashboard/recent-orders?limit=${limit}`);
}

// ============= Providers API =============

export async function getProviders(): Promise<ApiResponse<ProviderProfile[]>> {
  return fetchApi<ProviderProfile[]>('/providers');
}

export async function getProviderById(
  id: string,
): Promise<ApiResponse<ProviderProfile>> {
  return fetchApi<ProviderProfile>(`/providers/${id}`);
}

// ============= Profile API =============

export async function updateProfile(data: {
  name?: string;
  image?: string;
  address?: string;
  phone?: string;
}): Promise<ApiResponse<User>> {
  return fetchApi<User>('/users/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  return fetchApi<User>('/users/me');
}

// ============= Meal Details & Related =============

export async function getMealDetails(
  id: string,
): Promise<ApiResponse<MealDetails>> {
  return fetchApi<MealDetails>(`/meals/${id}`);
}

export async function getRelatedMeals(
  mealId: string,
): Promise<ApiResponse<Meal[]>> {
  return fetchApi<Meal[]>(`/meals/${mealId}/related`);
}

// ============= User-specific =============

export async function getUserReviews(): Promise<ApiResponse<Review[]>> {
  return fetchApi<Review[]>('/review/user');
}

export async function getProviderMeals(
  providerId: string,
): Promise<ApiResponse<Meal[]>> {
  return fetchApi<Meal[]>(`/meals/provider/${providerId}`);
}
