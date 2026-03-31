"use client"

import { loadMercadoPago } from "@mercadopago/sdk-js"
import { CheckCircleSolid, ExclamationCircle } from "@medusajs/icons"
import { Button, Text, clx } from "@medusajs/ui"
import { useEffect, useMemo, useRef, useState } from "react"

type MercadoPagoFormProps = {
  amount: number
  currencyCode: string
  email?: string | null
  uiLanguage: "es" | "en"
  initialReady?: boolean
  onSave: (data: Record<string, unknown>) => Promise<void>
}

declare global {
  interface Window {
    MercadoPago?: new (
      publicKey: string,
      options?: Record<string, unknown>
    ) => {
      cardForm: (config: Record<string, unknown>) => {
        unmount?: () => void
        getCardFormData: () => Record<string, any>
      }
    }
  }
}

const formId = "mp-checkout-form"

const MercadoPagoForm = ({
  amount,
  currencyCode,
  email,
  uiLanguage,
  initialReady = false,
  onSave,
}: MercadoPagoFormProps) => {
  const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY
  const cardFormRef = useRef<{ unmount?: () => void; getCardFormData: () => Record<string, any> } | null>(
    null
  )
  const mountedRef = useRef(false)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isReady, setIsReady] = useState(initialReady)

  const locale = uiLanguage === "es" ? "es-UY" : "en-US"

  const copy = useMemo(
    () =>
      uiLanguage === "es"
        ? {
            missingKey: "Falta NEXT_PUBLIC_MP_PUBLIC_KEY para cargar Mercado Pago.",
            formError: "No se pudo cargar el formulario de Mercado Pago.",
            save: "Guardar y continuar",
            ready: "Tarjeta lista para usar en la compra.",
            name: "Nombre del titular (como aparece en la tarjeta)",
            email: "Correo electrónico",
            docType: "Tipo de documento",
            docNumber: "Número de documento",
            installments: "Cuotas",
            issuer: "Banco emisor",
            cardNumber: "Número de tarjeta",
            expiration: "Vencimiento (MM/AA)",
            securePayment: "Pago 100% seguro procesado por Mercado Pago",
          }
        : {
            missingKey: "NEXT_PUBLIC_MP_PUBLIC_KEY is required to load Mercado Pago.",
            formError: "Mercado Pago form could not be loaded.",
            save: "Save and continue",
            ready: "Card details saved for checkout.",
            name: "Cardholder name (as shown on card)",
            email: "Email address",
            docType: "Document type",
            docNumber: "Document number",
            installments: "Installments",
            issuer: "Issuing bank",
            cardNumber: "Card number",
            expiration: "Expiration (MM/YY)",
            securePayment: "100% secure payment processed by Mercado Pago",
          },
    [uiLanguage]
  )

  useEffect(() => {
    let active = true

    const mountCardForm = async () => {
      if (!publicKey) {
        setError(copy.missingKey)
        return
      }

      try {
        await loadMercadoPago()

        if (!active || !window.MercadoPago) {
          return
        }

        const mp = new window.MercadoPago(publicKey, { locale })
        const cardForm = mp.cardForm({
          amount: String(amount),
          iframe: true,
          form: {
            id: formId,
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "0000 0000 0000 0000",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/AA",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "CVC",
            },
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "JUAN PEREZ",
            },
            issuer: {
              id: "form-checkout__issuer",
              placeholder: copy.issuer,
            },
            installments: {
              id: "form-checkout__installments",
              placeholder: copy.installments,
            },
            identificationType: {
              id: "form-checkout__identificationType",
              placeholder: copy.docType,
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: copy.docNumber,
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: copy.email,
            },
          },
          callbacks: {
            onFormMounted: (mountError: unknown) => {
              if (mountError) {
                const message =
                  mountError instanceof Error
                    ? mountError.message
                    : copy.formError
                setError(message)
                return
              }

              mountedRef.current = true
              setIsMounted(true)
            },
            onSubmit: async (event: Event) => {
              event.preventDefault()
              setError(null)
              setIsSaving(true)

              try {
                const formData = cardForm.getCardFormData()

                await onSave({
                  token: formData.token,
                  issuer_id: formData.issuerId,
                  payment_method_id: formData.paymentMethodId,
                  transaction_amount: Number(formData.amount || amount),
                  installments: Number(formData.installments || 1),
                  description: "Compra en Sabor Cubano Express",
                  payer: {
                    email: formData.cardholderEmail,
                    identification: {
                      type: formData.identificationType,
                      number: formData.identificationNumber,
                    },
                  },
                  currency_id: currencyCode.toUpperCase(),
                })

                setIsReady(true)
              } catch (saveError: any) {
                setError(saveError?.message || copy.formError)
              } finally {
                setIsSaving(false)
              }
            },
          },
        })

        cardFormRef.current = cardForm
      } catch (sdkError: any) {
        setError(sdkError?.message || copy.formError)
      }
    }

    mountCardForm()

    return () => {
      active = false
      if (mountedRef.current) {
        try {
          cardFormRef.current?.unmount?.()
        } catch {
          // The SDK throws if unmount is called before the form is fully mounted.
        }
      }
      mountedRef.current = false
      cardFormRef.current = null
    }
  }, [amount, copy.docNumber, copy.docType, copy.email, copy.formError, copy.installments, copy.issuer, copy.missingKey, copy.name, currencyCode, locale, onSave, publicKey])

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-ui-border-base bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Header con Logo */}
      <div className="flex items-center justify-between border-b border-ui-border-base bg-ui-bg-subtle px-5 py-4">
        <div className="flex items-center gap-x-3">
          <svg
            className="h-8 w-auto"
            viewBox="0 0 1000 248"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#009EE3"
              d="M116.7 186.2h28.1l20.4-86.3h0.6l20.4 86.3h27.9V61.7h-25.1v84.9h-0.6l-22.3-84.9h-21.7l-22.3 84.9h-0.6V61.7h-25.1v124.5h0.3zM250.7 186.2h79.7v-21.2h-54.6v-29.2h49.6v-21.2h-49.6V83h54.6V61.7h-79.7v124.5zM388.3 128.5c23.6-3.8 36.1-16.7 36.1-36.8 0-19.1-13.4-30-36.8-30h-43.2v124.5h25.1v-41.9l26.2 41.9h29.5l-31.1-47.5c-2.3-3.6-4.6-6.4-5.8-10.2zM369.5 83h16.2c9 0 13.6 3.5 13.6 10.1 0 7.4-5.4 11-13.6 11h-16.2V83zM464.2 188.7c31.1 0 54.9-24.8 54.9-64.4 0-38.3-24.3-65.1-54.6-65.1-23.9 0-41.6 15-49 34.6h25.9c4.9-8.4 12.8-14.2 23.3-14.2 17.6 0 29.2 17.4 29.2 44.7 0 27.3-11.6 44.7-29.2 44.7-10.7 0-18.7-5.8-23.6-14.5H415c7.3 19.4 25.1 34.2 49.2 34.2zM616.4 186.2h28.1l-44.5-124.5h-28.9l-44.5 124.5h27.6l7.8-25.1h46.6l7.8 25.1zM585 141.5l14.2-46.7h0.6l14.2 46.7H585zM678.8 188.7c18.1 0 31.9-8.7 38.6-22h0.6v19.4h25.1V61.7h-25.1V101c-6.8-13.4-20.6-22.1-38.7-22.1-31.1 0-54.7 26-54.7 64.9 0 38.9 23.1 64.9 54.2 64.9zM683.4 167.5c-16.7 0-29.2-14.7-29.2-43.7 0-29.1 12.5-43.8 29.2-43.8 16.7 0 29.2 14.7 29.2 43.8 0 29-12.5 43.7-29.2 43.7zM852.1 61.7h-25.1v39.5c-6.7-13.4-20.6-22.1-38.6-22.1-31.2 0-54.7 26-54.7 64.9 0 38.9 23.1 64.9 54.2 64.9 18.1 0 31.9-8.7 38.6-22h0.6v19.4h25.1V61.7h-0.1zM822.3 123.8c0 29-12.5 43.7-29.2 43.7-16.7 0-29.2-14.7-29.2-43.7 0-29.1 12.5-43.8 29.2-43.8 16.7 0 29.2 14.7 29.2 43.8zM921.2 188.7c32 0 55.4-26.6 55.4-64.9 0-38.3-23.4-64.9-55.4-64.9-32 0-55.4 26.6-55.4 64.9 0 38.3 23.4 64.9 55.4 64.9zM921.2 167.5c-16.8 0-29.8-14.7-29.8-43.7 0-29.1 13.1-43.8 29.8-43.8 16.7 0 29.7 14.7 29.7 43.8 0 29-13.1 43.7-29.7 43.7zM42.4 200.7l-4.2 3.6c-4 3.4-9.3 5.3-14.8 5.3s-10.8-1.9-14.8-5.3l-4.2-3.6c-1.5-1.2-1.5-3.4 0-4.6 30.6-24.9 44-59.5 39.4-101.3C38.2 43 78.4 0 128.5 0c52.9 0 94.7 45.4 90.4 99.4-3.4 42.6-26.3 78.7-60 101.4-1.4 1-1.4 3 0 4l4.2 3.6c4 3.4 9.3 5.3 14.8 5.3s10.8-1.9 14.8-5.3l4.2-3.6c1.5-1.2 3.7-1.2 5.2 0 28.5 24.3 69.1 31.3 103.1 18 36-14 60.1-49.9 61.3-88.5 1.7-54.7-41.2-101.4-95.3-101.4-52.6 0-95.2 42.6-95.2 95.2v105.5c0 10.3-8.4 18.7-18.7 18.7s-18.7-8.4-18.7-18.7V95.2C138.4 42.6 95.8 0 43.2 0-10.9 0-53.8 46.7-52.1 101.4c1.2 38.6 25.3 74.5 61.3 88.5 33.9 13.2 74.6 6.3 103.1-18 1.5-1.2 3.7-1.2 5.2 0l0.1 0z"
            />
          </svg>
        </div>
        <div className="flex items-center gap-x-2">
          <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-5 w-auto grayscale transition-all hover:grayscale-0" alt="Visa" />
          <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-5 w-auto grayscale transition-all hover:grayscale-0" alt="Mastercard" />
          <img src="https://img.icons8.com/color/48/000000/amex.png" className="h-5 w-auto grayscale transition-all hover:grayscale-0" alt="Amex" />
          <img src="https://img.icons8.com/color/48/000000/diners-club.png" className="h-5 w-auto grayscale transition-all hover:grayscale-0" alt="Diners" />
        </div>
      </div>

      <div className="p-6">
        <form id={formId} className="grid grid-cols-1 gap-5">
          {/* Cardholder Name */}
          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="form-checkout__cardholderName" className="txt-compact-small font-semibold text-ui-fg-base uppercase tracking-tight">
              {copy.name}
            </label>
            <input
              id="form-checkout__cardholderName"
              autoComplete="cc-name"
              className="h-11 rounded-lg border border-ui-border-base bg-ui-bg-field px-4 text-small-regular transition-all focus:border-ui-border-interactive focus:outline-none focus:ring-2 focus:ring-ui-bg-interactive/10"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Cardholder Email */}
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="form-checkout__cardholderEmail" className="txt-compact-small font-semibold text-ui-fg-base uppercase tracking-tight">
                {copy.email}
              </label>
              <input
                id="form-checkout__cardholderEmail"
                type="email"
                autoComplete="email"
                defaultValue={email || ""}
                className="h-11 rounded-lg border border-ui-border-base bg-ui-bg-field px-4 text-small-regular transition-all focus:border-ui-border-interactive focus:outline-none focus:ring-2 focus:ring-ui-bg-interactive/10"
              />
            </div>

            {/* Card Number */}
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="form-checkout__cardNumber" className="txt-compact-small font-semibold text-ui-fg-base uppercase tracking-tight">
                {copy.cardNumber}
              </label>
              <div
                id="form-checkout__cardNumber"
                className="h-11 rounded-lg border border-ui-border-base bg-ui-bg-field px-4 py-2 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Expiration Date */}
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="form-checkout__expirationDate" className="txt-compact-small font-semibold text-ui-fg-base uppercase tracking-tight">
                {copy.expiration}
              </label>
              <div
                id="form-checkout__expirationDate"
                className="h-11 rounded-lg border border-ui-border-base bg-ui-bg-field px-4 py-2 transition-all"
              />
            </div>

            {/* Security Code */}
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="form-checkout__securityCode" className="txt-compact-small font-semibold text-ui-fg-base uppercase tracking-tight">
                Código de seguridad (CVV)
              </label>
              <div
                id="form-checkout__securityCode"
                className="h-11 rounded-lg border border-ui-border-base bg-ui-bg-field px-4 py-2 transition-all"
              />
            </div>
          </div>

          {/* Hidden but necessary fields for MP SDK logic */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="form-checkout__issuer" className="txt-compact-small font-semibold text-ui-fg-base uppercase tracking-tight">
                {copy.issuer}
              </label>
              <select
                id="form-checkout__issuer"
                defaultValue=""
                className="h-11 rounded-lg border border-ui-border-base bg-ui-bg-field px-4 text-small-regular transition-all focus:border-ui-border-interactive focus:outline-none"
              >
                <option value="">{copy.issuer}</option>
              </select>
            </div>
            {/* OMITTING INSTALLMENTS Visual part as requested, but keeping the ID for the SDK */}
            <div className="hidden">
              <select id="form-checkout__installments" defaultValue="1">
                <option value="1">1</option>
              </select>
            </div>
            
            {/* Document Info */}
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="form-checkout__identificationType" className="txt-compact-small font-semibold text-ui-fg-base uppercase tracking-tight">
                {copy.docType}
              </label>
              <select
                id="form-checkout__identificationType"
                defaultValue=""
                className="h-11 rounded-lg border border-ui-border-base bg-ui-bg-field px-4 text-small-regular transition-all focus:border-ui-border-interactive focus:outline-none"
              >
                <option value="">{copy.docType}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="form-checkout__identificationNumber" className="txt-compact-small font-semibold text-ui-fg-base uppercase tracking-tight">
              {copy.docNumber}
            </label>
            <input
              id="form-checkout__identificationNumber"
              className="h-11 rounded-lg border border-ui-border-base bg-ui-bg-field px-4 text-small-regular transition-all focus:border-ui-border-interactive focus:outline-none focus:ring-2 focus:ring-ui-bg-interactive/10"
            />
          </div>

          <Button
            type="submit"
            isLoading={isSaving}
            disabled={!isMounted}
            className="mt-2 h-12 bg-ui-button-action text-base-regular shadow-md transition-transform active:scale-95"
          >
            {copy.save}
          </Button>

          <div className="flex items-center justify-center gap-x-2 text-ui-fg-muted">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-current stroke-2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">
              {copy.securePayment}
            </span>
          </div>
        </form>

        {error && (
          <div className="mt-5 flex items-center gap-2 rounded-lg border border-ui-border-error bg-ui-bg-error-subtle p-3 text-ui-fg-error">
            <ExclamationCircle className="h-5 w-5 shrink-0" />
            <Text className="text-small-regular">{error}</Text>
          </div>
        )}

        {isReady && !error && (
          <div className="mt-5 flex items-center gap-2 rounded-lg border border-ui-border-interactive bg-ui-bg-interactive-subtle p-3 text-ui-fg-interactive">
            <CheckCircleSolid className="h-5 w-5 shrink-0" />
            <Text className="text-small-regular font-medium">{copy.ready}</Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default MercadoPagoForm
