import React from "react"

import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"
import { UILanguage } from "@lib/i18n/ui"

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
  uiLanguage: UILanguage
}

const AddressBook: React.FC<AddressBookProps> = ({
  customer,
  region,
  uiLanguage,
}) => {
  const { addresses } = customer
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
        <AddAddress region={region} addresses={addresses} uiLanguage={uiLanguage} />
        {addresses.map((address) => {
          return (
            <EditAddress
              region={region}
              address={address}
              key={address.id}
              uiLanguage={uiLanguage}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AddressBook
