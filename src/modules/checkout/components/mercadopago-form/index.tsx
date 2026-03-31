"use client"

import { loadMercadoPago } from "@mercadopago/sdk-js"
import { CheckCircleSolid, ExclamationCircle } from "@medusajs/icons"
import { Button, Text } from "@medusajs/ui"
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
            save: "Guardar datos de pago",
            ready: "Tarjeta lista para usar en la compra.",
            name: "Nombre del titular",
            email: "Correo electronico",
            docType: "Tipo de documento",
            docNumber: "Numero de documento",
            installments: "Cuotas",
            issuer: "Banco",
            cardNumber: "Numero de tarjeta",
            expiration: "Vencimiento",
          }
        : {
            missingKey: "NEXT_PUBLIC_MP_PUBLIC_KEY is required to load Mercado Pago.",
            formError: "Mercado Pago form could not be loaded.",
            save: "Save payment details",
            ready: "Card details saved for checkout.",
            name: "Cardholder name",
            email: "Email",
            docType: "Document type",
            docNumber: "Document number",
            installments: "Installments",
            issuer: "Issuer",
            cardNumber: "Card number",
            expiration: "Expiration",
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
              placeholder: "1234 5678 9012 3456",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "123",
            },
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: copy.name,
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
                  description: "Compra en Sabor Cubano",
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
    <div className="mt-4 rounded-xl border border-ui-border-base bg-ui-bg-subtle p-5">
      <form id={formId} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="form-checkout__cardholderName"
            className="font-sans txt-compact-small font-medium"
          >
            {copy.name}
          </label>
          <input
            id="form-checkout__cardholderName"
            autoComplete="cc-name"
            className="h-10 rounded-md border border-ui-border-base bg-ui-bg-field px-3"
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="form-checkout__cardholderEmail"
            className="font-sans txt-compact-small font-medium"
          >
            {copy.email}
          </label>
          <input
            id="form-checkout__cardholderEmail"
            type="email"
            autoComplete="email"
            defaultValue={email || ""}
            className="h-10 rounded-md border border-ui-border-base bg-ui-bg-field px-3"
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="form-checkout__cardNumber"
            className="font-sans txt-compact-small font-medium"
          >
            {copy.cardNumber}
          </label>
          <div
            id="form-checkout__cardNumber"
            className="min-h-12 rounded-md border border-ui-border-base bg-ui-bg-field px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="form-checkout__expirationDate"
              className="font-sans txt-compact-small font-medium"
            >
              {copy.expiration}
            </label>
            <div
              id="form-checkout__expirationDate"
              className="min-h-12 rounded-md border border-ui-border-base bg-ui-bg-field px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="form-checkout__securityCode"
              className="font-sans txt-compact-small font-medium"
            >
              CVV
            </label>
            <div
              id="form-checkout__securityCode"
              className="min-h-12 rounded-md border border-ui-border-base bg-ui-bg-field px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="form-checkout__issuer"
              className="font-sans txt-compact-small font-medium"
            >
              {copy.issuer}
            </label>
            <select
              id="form-checkout__issuer"
              defaultValue=""
              className="h-10 rounded-md border border-ui-border-base bg-ui-bg-field px-3"
            >
              <option value="">{copy.issuer}</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="form-checkout__installments"
              className="font-sans txt-compact-small font-medium"
            >
              {copy.installments}
            </label>
            <select
              id="form-checkout__installments"
              defaultValue=""
              className="h-10 rounded-md border border-ui-border-base bg-ui-bg-field px-3"
            >
              <option value="">{copy.installments}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="form-checkout__identificationType"
              className="font-sans txt-compact-small font-medium"
            >
              {copy.docType}
            </label>
            <select
              id="form-checkout__identificationType"
              defaultValue=""
              className="h-10 rounded-md border border-ui-border-base bg-ui-bg-field px-3"
            >
              <option value="">{copy.docType}</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="form-checkout__identificationNumber"
              className="font-sans txt-compact-small font-medium"
            >
              {copy.docNumber}
            </label>
            <input
              id="form-checkout__identificationNumber"
              className="h-10 rounded-md border border-ui-border-base bg-ui-bg-field px-3"
            />
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isSaving}
          disabled={!isMounted}
          className="mt-2"
        >
          {copy.save}
        </Button>
      </form>

      {error && (
        <div className="mt-3 flex items-start gap-2 text-ui-fg-error">
          <ExclamationCircle />
          <Text>{error}</Text>
        </div>
      )}

      {isReady && !error && (
        <div className="mt-3 flex items-start gap-2 text-ui-fg-interactive">
          <CheckCircleSolid />
          <Text>{copy.ready}</Text>
        </div>
      )}
    </div>
  )
}

export default MercadoPagoForm
