"use client"

import React from "react"
import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { toast } from "@medusajs/ui"
import { ui, UILanguage } from "@lib/i18n/ui"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
  uiLanguage?: UILanguage
}

const ProfilePassword: React.FC<MyInformationProps> = ({ uiLanguage = "en" }) => {
  const t = ui(uiLanguage)
  const [successState, setSuccessState] = React.useState(false)

  // TODO: Add support for password updates
  const updatePassword = async () => {
    toast.info(t.passwordUpdateNotImplemented)
  }

  const clearState = () => {
    setSuccessState(false)
  }

  return (
    <form
      action={updatePassword}
      onReset={() => clearState()}
      className="w-full"
    >
      <AccountInfo
        label={t.password}
        currentInfo={<span>{t.passwordHiddenReason}</span>}
        isSuccess={successState}
        isError={false}
        errorMessage={undefined}
        clearState={clearState}
        uiLanguage={uiLanguage}
        data-testid="account-password-editor"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t.oldPassword}
            name="old_password"
            required
            type="password"
            data-testid="old-password-input"
          />
          <Input
            label={t.newPassword}
            type="password"
            name="new_password"
            required
            data-testid="new-password-input"
          />
          <Input
            label={t.confirmPassword}
            type="password"
            name="confirm_password"
            required
            data-testid="confirm-password-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePassword
