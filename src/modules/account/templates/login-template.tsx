"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import { UILanguage } from "@lib/i18n/ui"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = ({ uiLanguage }: { uiLanguage: UILanguage }) => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} uiLanguage={uiLanguage} />
      ) : (
        <Register setCurrentView={setCurrentView} uiLanguage={uiLanguage} />
      )}
    </div>
  )
}

export default LoginTemplate
