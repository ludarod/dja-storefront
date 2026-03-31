export type UILanguage = "es" | "en"

export const resolveUILanguage = (locale?: string | null): UILanguage => {
  const normalized = (locale || "").toLowerCase()
  return normalized.startsWith("en") ? "en" : "es"
}

type UIStrings = {
  topBanner: string
  home: string
  account: string
  cart: string
  menu: string
  store: string
  switchUser: string
  copyright: string
  backToCart: string
  back: string
  products: string
  allProducts: string
  collections: string
  support: string
  whatsappSupport: string
  social: string
  followUs: string
  instagram: string
  facebook: string
  whatsapp: string
  contactHeading: string
  contactDescription: string
  contactName: string
  contactEmail: string
  contactMessage: string
  sendMessage: string
  contactSubmitted: string
  brandDescription: string
  quantity: string
  remove: string
  subtotalExclTaxes: string
  viewCart: string
  emptyCart: string
  browseProducts: string
  payment: string
  edit: string
  paymentMethod: string
  giftCard: string
  enterPaymentDetails: string
  continueToReview: string
  paymentDetails: string
  anotherStep: string
  language: string
  defaultLabel: string
  selectPaymentMethod: string
  andLabel: string
  sortBy: string
  latestArrivals: string
  priceLowHigh: string
  priceHighLow: string
  checkout: string
  review: string
  inYourCart: string
  placeOrder: string
  legalReviewText: string
  summary: string
  goToCheckout: string
  item: string
  price: string
  total: string
  overview: string
  profile: string
  addresses: string
  orders: string
  logout: string
  welcomeBack: string
  signIn: string
  signInDescription: string
  notMember: string
  joinUs: string
  becomeMember: string
  registerDescription: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  privacyPolicy: string
  termsOfUse: string
  byCreatingAccount: string
  join: string
  alreadyMember: string
  gotQuestions: string
  customerServiceText: string
  customerService: string
  metaStoreName: string
  categorySuffix: string
  collectionSuffix: string
  signInMetaDescription: string
  profileMetaDescription: string
  hello: string
  shippingAddress: string
  billingAddress: string
  contact: string
  continueToDelivery: string
  billingSameAsShipping: string
  billingDeliverySame: string
  useSavedAddressQuestion: string
  addressLabel: string
  companyLabel: string
  postalCodeLabel: string
  cityLabel: string
  stateProvinceLabel: string
  chooseAddress: string
  signInPromptTitle: string
  signInPromptSubtitle: string
  shipping: string
  taxes: string
  discount: string
  subtotalExclShippingTaxes: string
  delivery: string
  shippingMethod: string
  deliveryPreference: string
  pickUpYourOrder: string
  storeLabel: string
  chooseStoreNearYou: string
  continueToPayment: string
  method: string
  cancel: string
  saveChanges: string
  updateSuccessSuffix: string
  genericErrorTryAgain: string
  nameLabel: string
  passwordHiddenReason: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
  passwordUpdateNotImplemented: string
  noBillingAddress: string
  apartmentSuiteEtc: string
  province: string
  pageNotFound: string
  pageDoesNotExist: string
  goToFrontpage: string
  cartNotFoundMessage: string
  emptyCartTitle: string
  emptyCartDescription: string
  backToHome: string
  signedInAs: string
  completed: string
  saved: string
  recentOrders: string
  datePlaced: string
  orderNumber: string
  totalAmount: string
  noRecentOrders: string
  goToOrder: string
  accountMetaDescription: string
  addressesMetaDescription: string
  shippingAddressesTitle: string
  shippingAddressesDescription: string
  newAddress: string
  addAddress: string
  editAddress: string
  save: string
  removeAddress: string
  relatedProductsTitle: string
  relatedProductsDescription: string
  searchProducts: string
  searchPlaceholder: string
  searchButton: string
  noProductsFound: string
  tryAnotherSearch: string
}

const es: UIStrings = {
  topBanner: "Sabor Cubano Express - Envio Premium a Bayamo Granma",
  home: "Inicio",
  account: "Mi Cuenta",
  cart: "Carrito",
  menu: "Menu",
  store: "Tienda",
  switchUser: "Cambiar usuario",
  copyright: "Todos los derechos reservados.",
  backToCart: "Volver al carrito",
  back: "Volver",
  products: "Productos",
  allProducts: "Todos los productos",
  collections: "Colecciones",
  support: "Soporte",
  whatsappSupport: "WhatsApp Soporte",
  social: "Redes sociales",
  followUs: "Síguenos",
  instagram: "Instagram",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  contactHeading: "¿Quieres escribirnos?",
  contactDescription: "Cuéntanos qué necesitas y te responderemos en menos de 24 horas.",
  contactName: "Nombre",
  contactEmail: "Correo electrónico",
  contactMessage: "Mensaje",
  sendMessage: "Enviar mensaje",
  contactSubmitted: "Gracias por escribirnos. Te contactamos pronto.",
  brandDescription:
    "Tradicion y sabor de Granma directamente a tu puerta. Calidad Premium.",
  quantity: "Cantidad",
  remove: "Eliminar",
  subtotalExclTaxes: "Subtotal (excl. impuestos)",
  viewCart: "Ver Carrito",
  emptyCart: "Tu carrito esta vacio.",
  browseProducts: "Explorar productos",
  payment: "Pago",
  edit: "Editar",
  paymentMethod: "Metodo de pago",
  giftCard: "Tarjeta regalo",
  enterPaymentDetails: "Ingresa tus datos de pago",
  continueToReview: "Continuar a revision",
  paymentDetails: "Detalles de pago",
  anotherStep: "Aparecera otro paso",
  language: "Idioma",
  defaultLabel: "Predeterminado",
  selectPaymentMethod: "Selecciona un metodo de pago",
  andLabel: "y",
  sortBy: "Ordenar por",
  latestArrivals: "Novedades",
  priceLowHigh: "Precio: menor a mayor",
  priceHighLow: "Precio: mayor a menor",
  checkout: "Checkout",
  review: "Revision",
  inYourCart: "En tu carrito",
  placeOrder: "Realizar pedido",
  legalReviewText:
    "Al hacer clic en Realizar pedido, confirmas que has leido y aceptado nuestros Terminos de uso, Terminos de venta y Politica de devoluciones, y reconoces que has leido nuestra Politica de privacidad.",
  summary: "Resumen",
  goToCheckout: "Ir al checkout",
  item: "Articulo",
  price: "Precio",
  total: "Total",
  overview: "Resumen",
  profile: "Perfil",
  addresses: "Direcciones",
  orders: "Pedidos",
  logout: "Cerrar sesion",
  welcomeBack: "Bienvenido de nuevo",
  signIn: "Iniciar sesion",
  signInDescription: "Inicia sesion para una experiencia de compra mejorada.",
  notMember: "No eres miembro?",
  joinUs: "Unete",
  becomeMember: "Hazte miembro",
  registerDescription:
    "Crea tu perfil para acceder a una experiencia de compra mejorada.",
  firstName: "Nombre",
  lastName: "Apellido",
  email: "Correo",
  phone: "Telefono",
  password: "Contrasena",
  privacyPolicy: "Politica de privacidad",
  termsOfUse: "Terminos de uso",
  byCreatingAccount: "Al crear una cuenta, aceptas la",
  join: "Registrarme",
  alreadyMember: "Ya eres miembro?",
  gotQuestions: "Tienes preguntas?",
  customerServiceText:
    "Puedes encontrar preguntas frecuentes y respuestas en nuestra pagina de atencion al cliente.",
  customerService: "Atencion al cliente",
  metaStoreName: "Sabor Cubano",
  categorySuffix: "categoria",
  collectionSuffix: "coleccion",
  signInMetaDescription: "Inicia sesion en tu cuenta de Sabor Cubano.",
  profileMetaDescription: "Consulta y edita la informacion de tu perfil.",
  hello: "Hola",
  shippingAddress: "Direccion de envio",
  billingAddress: "Direccion de facturacion",
  contact: "Contacto",
  continueToDelivery: "Continuar a entrega",
  billingSameAsShipping: "La direccion de facturacion es igual a la de envio",
  billingDeliverySame: "La direccion de facturacion y entrega es la misma.",
  useSavedAddressQuestion: "quieres usar una de tus direcciones guardadas?",
  addressLabel: "Direccion",
  companyLabel: "Empresa",
  postalCodeLabel: "Codigo postal",
  cityLabel: "Ciudad",
  stateProvinceLabel: "Estado / Provincia",
  chooseAddress: "Elige una direccion",
  signInPromptTitle: "Ya tienes una cuenta?",
  signInPromptSubtitle: "Inicia sesion para una mejor experiencia.",
  shipping: "Envio",
  taxes: "Impuestos",
  discount: "Descuento",
  subtotalExclShippingTaxes: "Subtotal (sin envio ni impuestos)",
  delivery: "Entrega",
  shippingMethod: "Metodo de envio",
  deliveryPreference: "Como te gustaria recibir tu pedido",
  pickUpYourOrder: "Recoger tu pedido",
  storeLabel: "Tienda",
  chooseStoreNearYou: "Elige una tienda cercana",
  continueToPayment: "Continuar a pago",
  method: "Metodo",
  cancel: "Cancelar",
  saveChanges: "Guardar cambios",
  updateSuccessSuffix: "actualizado correctamente",
  genericErrorTryAgain: "Ocurrio un error, intenta nuevamente",
  nameLabel: "Nombre",
  passwordHiddenReason: "La contrasena no se muestra por seguridad",
  oldPassword: "Contrasena actual",
  newPassword: "Nueva contrasena",
  confirmPassword: "Confirmar contrasena",
  passwordUpdateNotImplemented: "La actualizacion de contrasena no esta implementada",
  noBillingAddress: "No hay direccion de facturacion",
  apartmentSuiteEtc: "Apartamento, suite, etc.",
  province: "Provincia",
  pageNotFound: "Pagina no encontrada",
  pageDoesNotExist: "La pagina que intentaste abrir no existe.",
  goToFrontpage: "Ir al inicio",
  cartNotFoundMessage:
    "El carrito que intentaste abrir no existe. Limpia las cookies e intenta nuevamente.",
  emptyCartTitle: "Tu carrito esta vacio",
  emptyCartDescription:
    "Aun no tienes productos en el carrito. Explora la tienda y agrega tus favoritos.",
  backToHome: "Volver al inicio",
  signedInAs: "Sesion iniciada como",
  completed: "Completado",
  saved: "Guardadas",
  recentOrders: "Pedidos recientes",
  datePlaced: "Fecha",
  orderNumber: "Numero de pedido",
  totalAmount: "Total",
  noRecentOrders: "No hay pedidos recientes",
  goToOrder: "Ir al pedido",
  accountMetaDescription: "Resumen de tu actividad en la cuenta.",
  addressesMetaDescription: "Consulta y administra tus direcciones de envio.",
  shippingAddressesTitle: "Direcciones de envio",
  shippingAddressesDescription:
    "Consulta y actualiza tus direcciones de envio. Puedes agregar todas las que necesites para acelerar el checkout.",
  newAddress: "Nueva direccion",
  addAddress: "Agregar direccion",
  editAddress: "Editar direccion",
  save: "Guardar",
  removeAddress: "Eliminar",
  relatedProductsTitle: "Productos recomendados",
  relatedProductsDescription:
    "Tambien podria gustarte esta seleccion que combina muy bien con este producto.",
  searchProducts: "Buscar productos",
  searchPlaceholder: "Escribe para buscar...",
  searchButton: "Buscar",
  noProductsFound: "No encontramos productos",
  tryAnotherSearch: "Prueba con otro termino de busqueda.",
}

const en: UIStrings = {
  topBanner: "Sabor Cubano Express - Premium shipping to Bayamo Granma",
  home: "Home",
  account: "My Account",
  cart: "Cart",
  menu: "Menu",
  store: "Store",
  switchUser: "Switch user",
  copyright: "All rights reserved.",
  backToCart: "Back to cart",
  back: "Back",
  products: "Products",
  allProducts: "All products",
  collections: "Collections",
  support: "Support",
  whatsappSupport: "WhatsApp Support",
  social: "Social",
  followUs: "Follow us",
  instagram: "Instagram",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  contactHeading: "Want to reach out?",
  contactDescription: "Tell us how we can help and we will reply within 24 hours.",
  contactName: "Name",
  contactEmail: "Email",
  contactMessage: "Message",
  sendMessage: "Send message",
  contactSubmitted: "Thanks for reaching out. We'll be in touch soon.",
  brandDescription:
    "Tradition and flavor from Granma delivered to your door. Premium quality.",
  quantity: "Quantity",
  remove: "Remove",
  subtotalExclTaxes: "Subtotal (excl. taxes)",
  viewCart: "View Cart",
  emptyCart: "Your cart is empty.",
  browseProducts: "Browse products",
  payment: "Payment",
  edit: "Edit",
  paymentMethod: "Payment method",
  giftCard: "Gift card",
  enterPaymentDetails: "Enter your payment details",
  continueToReview: "Continue to review",
  paymentDetails: "Payment details",
  anotherStep: "Another step will appear",
  language: "Language",
  defaultLabel: "Default",
  selectPaymentMethod: "Select a payment method",
  andLabel: "and",
  sortBy: "Sort by",
  latestArrivals: "Latest arrivals",
  priceLowHigh: "Price: Low -> High",
  priceHighLow: "Price: High -> Low",
  checkout: "Checkout",
  review: "Review",
  inYourCart: "In your cart",
  placeOrder: "Place order",
  legalReviewText:
    "By clicking Place order, you confirm you have read and accepted our Terms of Use, Terms of Sale and Returns Policy, and acknowledge that you have read our Privacy Policy.",
  summary: "Summary",
  goToCheckout: "Go to checkout",
  item: "Item",
  price: "Price",
  total: "Total",
  overview: "Overview",
  profile: "Profile",
  addresses: "Addresses",
  orders: "Orders",
  logout: "Log out",
  welcomeBack: "Welcome back",
  signIn: "Sign in",
  signInDescription: "Sign in to access an enhanced shopping experience.",
  notMember: "Not a member?",
  joinUs: "Join us",
  becomeMember: "Become a member",
  registerDescription:
    "Create your profile and get access to an enhanced shopping experience.",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  password: "Password",
  privacyPolicy: "Privacy Policy",
  termsOfUse: "Terms of Use",
  byCreatingAccount: "By creating an account, you agree to the",
  join: "Join",
  alreadyMember: "Already a member?",
  gotQuestions: "Got questions?",
  customerServiceText:
    "You can find frequently asked questions and answers on our customer service page.",
  customerService: "Customer service",
  metaStoreName: "Sabor Cubano",
  categorySuffix: "category",
  collectionSuffix: "collection",
  signInMetaDescription: "Sign in to your Sabor Cubano account.",
  profileMetaDescription: "View and edit your profile information.",
  hello: "Hello",
  shippingAddress: "Shipping address",
  billingAddress: "Billing address",
  contact: "Contact",
  continueToDelivery: "Continue to delivery",
  billingSameAsShipping: "Billing address same as shipping address",
  billingDeliverySame: "Billing and delivery address are the same.",
  useSavedAddressQuestion: "do you want to use one of your saved addresses?",
  addressLabel: "Address",
  companyLabel: "Company",
  postalCodeLabel: "Postal code",
  cityLabel: "City",
  stateProvinceLabel: "State / Province",
  chooseAddress: "Choose an address",
  signInPromptTitle: "Already have an account?",
  signInPromptSubtitle: "Sign in for a better experience.",
  shipping: "Shipping",
  taxes: "Taxes",
  discount: "Discount",
  subtotalExclShippingTaxes: "Subtotal (excl. shipping and taxes)",
  delivery: "Delivery",
  shippingMethod: "Shipping method",
  deliveryPreference: "How would you like your order delivered",
  pickUpYourOrder: "Pick up your order",
  storeLabel: "Store",
  chooseStoreNearYou: "Choose a store near you",
  continueToPayment: "Continue to payment",
  method: "Method",
  cancel: "Cancel",
  saveChanges: "Save changes",
  updateSuccessSuffix: "updated successfully",
  genericErrorTryAgain: "An error occurred, please try again",
  nameLabel: "Name",
  passwordHiddenReason: "The password is not shown for security reasons",
  oldPassword: "Old password",
  newPassword: "New password",
  confirmPassword: "Confirm password",
  passwordUpdateNotImplemented: "Password update is not implemented",
  noBillingAddress: "No billing address",
  apartmentSuiteEtc: "Apartment, suite, etc.",
  province: "Province",
  pageNotFound: "Page not found",
  pageDoesNotExist: "The page you tried to access does not exist.",
  goToFrontpage: "Go to frontpage",
  cartNotFoundMessage:
    "The cart you tried to access does not exist. Clear your cookies and try again.",
  emptyCartTitle: "Your cart is empty",
  emptyCartDescription:
    "You do not have products in your cart yet. Browse the store and add your favorites.",
  backToHome: "Back to home",
  signedInAs: "Signed in as",
  completed: "Completed",
  saved: "Saved",
  recentOrders: "Recent orders",
  datePlaced: "Date placed",
  orderNumber: "Order number",
  totalAmount: "Total amount",
  noRecentOrders: "No recent orders",
  goToOrder: "Go to order",
  accountMetaDescription: "Overview of your account activity.",
  addressesMetaDescription: "View and manage your shipping addresses.",
  shippingAddressesTitle: "Shipping addresses",
  shippingAddressesDescription:
    "View and update your shipping addresses. You can add as many as you need to speed up checkout.",
  newAddress: "New address",
  addAddress: "Add address",
  editAddress: "Edit address",
  save: "Save",
  removeAddress: "Remove",
  relatedProductsTitle: "Related products",
  relatedProductsDescription:
    "You may also like this curated selection that pairs well with this product.",
  searchProducts: "Search products",
  searchPlaceholder: "Type to search...",
  searchButton: "Search",
  noProductsFound: "No products found",
  tryAnotherSearch: "Try a different search term.",
}

export const ui = (language: UILanguage): UIStrings =>
  language === "en" ? en : es
