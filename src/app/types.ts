/**
 * Intrinsic Attributes
 */
interface IntrinsicAttributes {
  id: string;
  name: string;
  handle: string;
}

/**
 * General Types
 */
type Currency = "USD" | "EUR" | "GBP" | "AUD" | "CAD" | "CHF" | "JPY";
type Amount = {
  value: number;
  currency: Currency;
};
type PaymentProvider = "stripe" | "braintree";
type IntegrationProvider =
  | "klaviyo"
  | "stripe"
  | "googleAnalytics"
  | "googleTagManager"
  | "hubspot"
  | "meta"
  | "facebookAds"
  | "salesforce"
  | "zendesk"
  | "sendgrid"
  | "mailchimp"
  | "salesforceMarketingCloud"
  | "gorgias";
type IntegrationAuthenticationType = "apiKey" | "oauth" | "basic";
type TaxProvider = "avalara" | "taxJar" | "stripe" | "manual";
type VideoProvider = "youtube" | "vimeo" | "upload";

/**
 * Access
 */
type AccessActions = "read" | "write" | "full";
type AccessPoint =
  | "store"
  | "user"
  | "organization"
  | "settings"
  | "billing"
  | "integrations"
  | "reports"
  | "subscriptions"
  | "subscriptionPlans"
  | "orders"
  | "products"
  | "customers";

/**
 * Plans
 */
type PlanTypes = "starter" | "pro" | "enterprise";

interface PlanAccess {
  users: number | "unlimited";
  stores: number | "unlimited";
  products: number | "unlimited";
  orders: number | "unlimited";
  customers: number | "unlimited";
  integrations: number | "unlimited";
  webhooks: number | "unlimited";
  subscriptions: number | "unlimited";
  subscriptionPlans: number | "unlimited";
  reports: number | "unlimited";
}

interface Plan {
  id: string;
  name: string;
  type: PlanTypes;
  permissions: Permission[];
  access: PlanAccess;
}

/**
 * Users & Permissions
 */
interface Permission {
  id: string;
  name: string;
  access: AccessActions;
  accessPoint: AccessPoint;
  store: Store;
}

interface User extends IntrinsicAttributes {
  firstName: string;
  lastName: string;
  email: string;
  permissions: Permission[];
  organization: Organization;
  stores: Store[];
}

/**
 * Organization
 */
interface Organization extends IntrinsicAttributes {
  company: string;
  users: User[];
  stores: Store[];
}

/**
 * Store
 */
interface Store extends IntrinsicAttributes {
  title: string; // Must have a title
  organization: Organization; // Must belong to an organization
  plan: Plan; // Must have a plan
  users: User[]; // Must have at least one user
  products?: Product[];
  collections?: ProductCollection[];
  integrations?: Integration[];
  subscriptionPlans?: SubscriptionPlan[];
  shippingRules?: ShippingRule[];
  discounts?: Discount[];
  settings: StoreSettings;
  pages?: Page[];
}

interface StoreSettings extends IntrinsicAttributes {
  store: Store;
  address: Address;
  currency: Currency;
  timezone: string;
  taxBehavior: "taxIncluded" | "taxExcluded";
  taxProvider?: TaxProvider;
  theme: StoreTheme;
  domains: StoreDomain[];
  metadata?: Record<string, string>;
}

interface StoreDomain extends IntrinsicAttributes {
  store: Store;
  domain: string;
  provider: string;
  type: "primary" | "additional";
  active: boolean;
  connected: boolean;
  httpsEnabled: boolean;
  connectionStatus: "connected" | "disconnected" | "pending";
  metadata?: Record<string, string>;
}

interface StoreTheme extends IntrinsicAttributes {
  store: Store;
  styles: {
    brandColors: {
      primary: string;
      secondary: string;
      accent: string;
      neutral: string;
    };
    textColors: {
      body: string;
      heading: string;
      button: string;
      link: string;
    };
    backgroundColors: {
      body: string;
      card: string;
      input: string;
    };
    fonts: {
      body: string;
      heading: string;
      button: string;
      input: string;
    };
    customCSS: string;
  };
}

/**
 * Products & Collections
 */
interface ProductCollection extends IntrinsicAttributes {
  title: string;
  store: Store;
  products: Product[];
}
interface Product extends IntrinsicAttributes {
  title: string;
  store: Store;
  description: string;
  featuredImage?: ContentImage;
  media?: ContentImage[] | ContentVideo[];
  tags: string[];
  price: Amount;
  variants: ProductVariant[];
}

interface ProductVariant extends IntrinsicAttributes {
  title: string;
  product: Product;
  featuredImage?: ContentImage;
  media?: ContentImage[] | ContentVideo[];
  options: ProductVariantOption[];
  price: Amount;
  inventory: InventoryItem[];

}

interface ProductVariantOption extends IntrinsicAttributes {
  title: string;
  value: string;
  productVariant: ProductVariant;
}

/**
 * Inventory & Locations
 */
interface Location extends IntrinsicAttributes {
  name: string;
  store: Store;
  inventoryItems: InventoryItem[];
}
interface InventoryItem extends IntrinsicAttributes {
  productVariant: ProductVariant;
  location: Location;
  quantity: number;
  onHand: number;
  reserved: number;
  incoming: number;
  backordered: number;
  available: number;
}

/**
 * Orders
 */
interface Order extends IntrinsicAttributes {
  store: Store;
  customer: Customer;
  items: OrderItem[];
  billingAddress: Address;
  shippingAddress: Address;
  discounts: Discount[];
  shippingLines: ShippingLine[];
  fulfillments: Fulfillment[];
  paymentStatus:
    | "pending"
    | "paid"
    | "refunded"
    | "voided"
    | "partiallyPaid";
  fulfillmentStatus:
    | "pending"
    | "fulfilled"
    | "partiallyFulfilled"
    | "canceled";
}
interface OrderItem extends IntrinsicAttributes {
  productVariant: ProductVariant;
  quantity: number;
  price: Amount;
  discounts: Discount[];
  location: Location;
  fulfillmentStatus:
    | "pending"
    | "fulfilled"
    | "partiallyFulfilled"
    | "canceled";
  metadata?: Record<string, string>;
}

/**
 * Shipping & Fulfillment
 * @extends IntrinsicAttributes
 */
interface ShippingRule extends IntrinsicAttributes {
  store: Store;
  title: string;
  location: Location;
  description?: string;
  serviceCode: string;
  carrierCode: string;
  price: Amount;
  type: "flatRate" | "weightBased" | "priceBased" | "quantityBased";
  min?: number;
  max?: number;
  metadata?: Record<string, string>;
}
interface ShippingLine extends IntrinsicAttributes {
  title: string;
  serviceCode: string;
  carrierCode: string;
  price: Amount;
  matchedShippingRules: ShippingRule[];
}

interface Fulfillment extends IntrinsicAttributes {
  order: Order;
  items: FulfillmentItem[];
}

interface FulfillmentItem extends IntrinsicAttributes {
  productVariant: ProductVariant;
  quantity: number;
}

/**
 * Address
 */
interface Address extends IntrinsicAttributes {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

/**
 * Customers
 */
interface Customer extends IntrinsicAttributes {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orders?: Order[];
  addresses?: Address[];
  defaultAddress?: Address;
  subscriptions?: Subscription[];
  paymentMethods?: PaymentMethod[];
  customerToken?: string;
  customerTokenProvider?: PaymentProvider;
  metadata?: Record<string, string>;
}

interface PaymentMethod extends IntrinsicAttributes {
  customer: Customer;
  token: string;
  type: "card" | "bankAccount";
  last4: string;
  expires: string;
  metadata?: Record<string, string>;
  provider: PaymentProvider;
}

/**
 * Discounts
 */
interface Discount extends IntrinsicAttributes {
  name: string;
  amount: Amount;
  discountType: "percentage" | "fixed";
  appliesTo:
    | "order"
    | "subscription"
    | "product"
    | "customer"
    | "collection"
    | "shipping";
  code: string;
  applicationType: "once" | "recurring";
  combinability: "cumulative" | "additive" | "exclusive";
  metadata?: Record<string, string>;
  customer?: Customer;
}

/**
 * Subscriptions
 */
interface SubscriptionFrequency {
  interval: "day" | "week" | "month" | "year";
  intervalCount: number;
}
interface SubscriptionPlan extends IntrinsicAttributes {
  name: string;
  store: Store;
  price: Amount;
  frequencyTarget: "delivery" | "billing";
  billingFrequency: SubscriptionFrequency;
  trialPeriod: number;
  trialPeriodFrequency: SubscriptionFrequency;
  deliveryFrequency: SubscriptionFrequency;
  restrictions?: {
    maxBillingCycles?: number;
    maxChargeAmount?: Amount;
    productVariants?: ProductVariant[];
    products?: Product[];
    collections?: ProductCollection[];
  };
  metadata?: Record<string, string>;
}
interface Subscription extends IntrinsicAttributes {
  customer: Customer; // Payment method comes from the customer
  plan: SubscriptionPlan;
  frequency: SubscriptionFrequency; // Initially set to the plan's frequency but can be updated by the customer or store admins
  frequencyTarget: "delivery" | "billing";
  status:
    | "active"
    | "inactive"
    | "trialing"
    | "pastDue"
    | "canceled"
    | "failed";
  startDate: Date;
  endDate?: Date;
  orders: Order[];
  nextBillingDate: Date;
  nextDeliveryDate: Date;
  trialEndDate: Date;
  billingAddress: Address;
  deliveryAddress: Address;
  notes?: string;
  discounts: Discount[];
  metadata?: Record<string, string>;
}

/**
 * Integrations & Webhooks
 */
interface Integration extends IntrinsicAttributes {
  store: Store;
  provider: IntegrationProvider;
  enabled: boolean;
  connected: boolean;
  authentication: {
    type: IntegrationAuthenticationType;
    apiKey?: string;
    apiSecret?: string;
    username?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
  };
  metadata?: Record<string, string>;
}

/**
 * Content: Fields
 */
interface ContentField extends IntrinsicAttributes {
  store: Store;
  name: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "date"
    | "boolean"
    | "select"
    | "multiselect"
    | "radio"
    | "checkbox"
    | "richtext"
    | "image";
  options?: ContentFieldOption[];
  required?: boolean;
  position?: number;
  validation?: string;
  defaultValue?: string;
  metadata?: Record<string, string>;
}

interface ContentFieldOption extends IntrinsicAttributes {
  contentField: ContentField;
  label: string;
  value: string | number | boolean | object | object[] | ContentImage | ContentVideo | string[] | number[];
  metadata?: Record<string, string>;
}

/**
 * Content: Images & Videos
 */
interface ContentImage extends IntrinsicAttributes {
  store: Store;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  metadata?: Record<string, string>;
}

interface ContentVideo extends IntrinsicAttributes {
  store: Store;
  url: string;
  provider?: VideoProvider;
  metadata?: Record<string, string>;
}

/**
 * Content: Pages
 */
interface Page extends IntrinsicAttributes {
  store: Store;
  title: string;
  handle: string;
  content?: string;
  contentFields?: ContentField[];
  type: "page" | "blogPost";
  published: boolean;
  publishedAt: Date;
  publishedBy: User;
  createdAt: Date;
  updatedAt: Date;
  seo: {
    title: string;
    description: string;
    image: ContentImage;
  };
  featuredImage?: ContentImage;
  media?: ContentImage[] | ContentVideo[];
  metadata?: Record<string, string>;
}

export interface FormObject {
  [key: string]: FormDataEntryValue;
}