export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui', background: '#f5f5f5' }}>{children}</body>
    </html>
  );
}
