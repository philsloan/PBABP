import { useEffect, useState, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const DonateButton = ({ currency, amount }) => {
  const amountRef = useRef(amount);
  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);
  return (
    <PayPalButtons
      // forceReRender={[currency, amount]}
      style={{ label: "donate" }}
      fundingSource="paypal"
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amountRef.current,
                breakdown: {
                  item_total: {
                    currency_code: currency,
                    value: amountRef.current,
                  },
                },
              },
              items: [
                {
                  name: "TESTTESTTEST",
                  description: "DESCRIBEDESCRIBEDESCRIBE",
                  quantity: "1",
                  unit_amount: {
                    currency_code: currency,
                    value: amountRef.current,
                  },
                  category: "DONATION",
                },
              ],
            },
          ],
        });
      }}
    />
  );
};
function DonateForm() {
  const [amount, setAmount] = useState("5.00");
  return (
    <form className="DonateForm">
      <AmountPicker
        onAmountChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <DonateButton currency="USD" amount={amount} />
    </form>
  );
}
function AmountPicker({ onAmountChange }) {
  return (
    <fieldset onChange={onAmountChange}>
      <legend>Donation Amount</legend>
      <label>
      <input type="text" id="override-price3" size="10" placeholder="0.00">
        $Enter Cash Value$
      </input>
      </label>
    </fieldset>
  );
}
export function DonateApp() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "test",
        components: "buttons",
        currency: "USD",
      }}
    >
      <DonateForm />
    </PayPalScriptProvider>
  );
}