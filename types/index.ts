/**
 * Shared Types for FoodHub Frontend
 * Centralized type definitions used across the application
 */

// ============= User & Auth =============

export type UserRole = 'Admin' | 'Provider' | 'Customer';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  isActive: boolean;
  address?: string;
  phone?: string;
}

export interface AuthSession {
  user: User;
  session: {
    id: string;
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress?: string;
    userAgent?: string;
    userId: string;
  };
}

// ============= Categories =============

export interface Category {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  mealCount?: number;
}

// ============= Meals =============

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
  createdAt?: string;
}

export interface MealDetails extends Meal {
  reviews: Review[];
  relatedMeals?: Meal[];
  providerName?: string;
  categoryName?: string;
}

// ============= Reviews =============

export interface Review {
  id: string;
  description: string;
  rating?: number;
  UserId: string;
  MealId: string;
  User: Pick<User, 'id' | 'name' | 'image'>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReviewInput {
  mealId: string;
  description: string;
  rating: number;
}

// ============= Orders =============

export type OrderStatus = 'Pending' | 'InProgress' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  address: string;
  createdAt: string;
  updatedAt: string;
  MealId: string;
  UserId: string;
  Meal?: Meal;
  User?: Pick<User, 'id' | 'name' | 'email'>;
}

export interface CreateOrderInput {
  mealId: string;
  quantity: number;
  total: number;
  address: string;
}

// ============= Cart =============

export interface CartItem {
  id: string;
  UserId: string;
  MealId: string;
  quantity: number;
  Meal: Meal;
}

// ============= Providers =============

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

// ============= Dashboard =============

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

// ============= API Response =============

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// ============= Pagination =============

export interface PaginationParams {
  skip?: number;
  take?: number;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  hasMore: boolean;
}

// ============= Filters =============

export interface MealFilters {
  search?: string;
  category?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  take?: number;
}

// ============= Forms =============

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface ProfileUpdateForm {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  image?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ============= UI =============

export interface NavLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavLink[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  meal: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}
