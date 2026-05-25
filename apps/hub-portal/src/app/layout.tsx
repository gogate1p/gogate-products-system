export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ background: '#6a1b9a', color: '#fff', padding: '1rem' }}>Gogate Hub</header>
        {children}
      </body>
    </html>
  );
}
