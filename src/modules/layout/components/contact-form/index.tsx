"use client"

import { FormEvent, useState } from "react"
import { Mail, MessageCircle, Send, User } from "lucide-react"

type ContactFormProps = {
  heading: string
  description: string
  nameLabel: string
  emailLabel: string
  messageLabel: string
  submitLabel: string
  successMessage: string
}

type FormStatus = "idle" | "sent"

export default function ContactForm({
  heading,
  description,
  nameLabel,
  emailLabel,
  messageLabel,
  submitLabel,
  successMessage,
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sent")
  }

  const isDisabled = status === "sent"

  return (
    <div className="bg-[#111] rounded-[24px] border border-white/10 px-5 py-6 text-white">
      <div className="mb-3 flex items-center gap-2 text-base font-bold uppercase tracking-[3px] text-gold">
        <MessageCircle size={18} />
        <span>{heading}</span>
      </div>
      <p className="text-sm text-white/70 mb-6">{description}</p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="text-[0.65rem] uppercase tracking-[3px] text-white/70">
          {nameLabel}
          <div className="mt-1">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
              <User size={14} />
              <input
                className="w-full bg-transparent text-sm placeholder:text-white/40 focus:outline-none"
                placeholder={nameLabel}
                name="name"
                value={values.name}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>
        </label>
        <label className="text-[0.65rem] uppercase tracking-[3px] text-white/70">
          {emailLabel}
          <div className="mt-1">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
              <Mail size={14} />
              <input
                className="w-full bg-transparent text-sm placeholder:text-white/40 focus:outline-none"
                placeholder={emailLabel}
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>
        </label>
        <label className="text-[0.65rem] uppercase tracking-[3px] text-white/70">
          {messageLabel}
          <div className="mt-1">
            <div className="flex rounded-[20px] bg-white/5 p-3">
              <textarea
                className="flex-1 resize-none bg-transparent text-sm placeholder:text-white/40 focus:outline-none"
                placeholder={messageLabel}
                name="message"
                rows={4}
                value={values.message}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>
        </label>
        <button
          type="submit"
          disabled={isDisabled}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-black uppercase tracking-[3px] text-[#111] transition hover:bg-[#f2c96d]"
        >
          <Send size={14} />
          {submitLabel}
        </button>
        {status === "sent" && (
          <p className="mt-3 text-[0.65rem] uppercase tracking-[3px] text-white/80" aria-live="polite">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  )
}
