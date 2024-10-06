export interface PayPalOrderProps {
  name: string;
  description: string;
  price: string;
}

export const generatePaypalOrderBody = ({
  name,
  description,
  price,
}: PayPalOrderProps) => {
  const priceConvertFromVNDToUSD = Math.round(Number(price) / 23000);

  return {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: name,
            description,
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: priceConvertFromVNDToUSD,
            },
          },
        ],
        amount: {
          currency_code: "USD",
          value: priceConvertFromVNDToUSD,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: priceConvertFromVNDToUSD,
            },
          },
        },
      },
    ],
  };
};
