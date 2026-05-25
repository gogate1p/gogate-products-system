const KEYS = [
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'PAYU_MERCHANT_KEY',
  'PAYU_MERCHANT_SALT',
  'EASEBUZZ_MERCHANT_KEY',
  'SHIPROCKET_EMAIL',
  'SHIPROCKET_PASSWORD',
  'NIMBUSPOST_API_KEY',
  'SHIPDAY_API_KEY',
  'ZIPPYKIND_API_KEY',
  'DELIFORCE_API_KEY',
  'GOGATE_COURIER_API_KEY',
  'GOOGLE_MAPS_API_KEY',
  'DIDIT_API_KEY',
];

export default function ApiKeysPage() {
  return (
    <>
      <h1>Payment &amp; courier API keys</h1>
      <p>Razorpay, PayU, Easebuzz, Shiprocket, Nimbuspost, Shipday, Zippykind, Deliforce, Gogate Courier, GMaps, Didit</p>
      <ul>
        {KEYS.map((k) => (
          <li key={k}>
            <code>{k}</code> — configure via POST /admin/api-keys
          </li>
        ))}
      </ul>
    </>
  );
}
