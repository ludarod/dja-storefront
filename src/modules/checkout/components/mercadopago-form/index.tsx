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
          <Text className="text-base-semi text-ui-fg-base uppercase tracking-wider">
            Pago con tarjeta
          </Text>
        </div>
        <div className="flex items-center gap-x-3">
          <img src="https://img.icons8.com/color/96/000000/visa.png" className="h-9 w-auto" alt="Visa" />
          <img src="https://img.icons8.com/color/96/000000/mastercard.png" className="h-9 w-auto" alt="Mastercard" />
          <img src="https://img.icons8.com/color/96/000000/amex.png" className="h-9 w-auto" alt="Amex" />
          <img src="https://img.icons8.com/color/96/000000/diners-club.png" className="h-9 w-auto" alt="Diners" />
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
