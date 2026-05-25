'use client';

export default function SellerLoginPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: 400 }}>
      <h1>Seller login</h1>
      <p>Sign up first, then complete KYC in dashboard.</p>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
