"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders, getCacheOptions } from "./cookies"

type MyOrdersResponse = {
  customer_id: string
  orders: any[]
  count: number
  offset: number
  limit: number
}

type CouponValidationResponse = {
  valid: boolean
  code?: string
  message?: string
  promotion_id?: string
  discount_type?: string | null
  discount_value?: number
  discount_amount?: number
}

export const listMyOrders = async (limit: number = 10, offset: number = 0) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("orders")),
  }

  return sdk.client
    .fetch<MyOrdersResponse>("/store/me/orders", {
      method: "GET",
      query: {
        limit,
        offset,
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then((res) => res.orders)
}

export const validateCouponCode = async ({
  code,
  cartId,
}: {
  code: string
  cartId?: string
}): Promise<CouponValidationResponse> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<CouponValidationResponse>("/store/coupons/validate", {
      method: "POST",
      body: {
        code,
        cart_id: cartId,
      },
      headers,
      cache: "no-store",
    })
    .catch((err) => {
      try {
        medusaError(err)
      } catch {}

      return {
        valid: false,
        message: err?.message || "Cupon invalido",
      }
    })
}

export const getShippingQuote = async (cartId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<any>("/store/shipping/quote", {
      method: "POST",
      body: {
        cart_id: cartId,
      },
      headers,
      cache: "no-store",
    })
}

export const subscribeStoreNotification = async (payload: {
  email?: string
  event: "order_updates" | "back_in_stock" | "promotions"
  product_id?: string
}) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<any>("/store/notifications/subscribe", {
      method: "POST",
      body: payload,
      headers,
      cache: "no-store",
    })
}
