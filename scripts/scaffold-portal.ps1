param(
  [Parameter(Mandatory)] [string]$Name,
  [Parameter(Mandatory)] [int]$Port,
  [Parameter(Mandatory)] [string]$Title
)

$root = "D:\Gogate Products\apps\$Name"
$pkg = @"
{
  "name": "@gogate/$Name",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p $Port",
    "build": "next build",
    "start": "next start -p $Port"
  },
  "dependencies": {
    "next": "^14.2.18",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^22.9.0",
    "@types/react": "^18.3.12",
    "typescript": "^5.6.3"
  }
}
"@
Set-Content -Path "$root\package.json" -Value $pkg -Encoding UTF8

$layout = @"
import './globals.css';
export const metadata = { title: '$Title' };
export default function RootLayout({{ children }}: {{ children: React.ReactNode }}) {{
  return (
    <html lang="en"><body><header className="portal-header"><strong>$Title</strong></header><main>{{children}}</main></body></html>
  );
}}
"@
New-Item -Path "$root\src\app" -ItemType Directory -Force | Out-Null
Set-Content -Path "$root\src\app\layout.tsx" -Value $layout -Encoding UTF8
Set-Content -Path "$root\src\app\globals.css" -Value "body{font-family:system-ui;margin:0}.portal-header{background:#1a237e;color:#fff;padding:1rem}" -Encoding UTF8
Set-Content -Path "$root\src\app\page.tsx" -Value "export default function Page(){return <div style={{padding:'2rem'}}><h1>$Title</h1><p>Portal scaffold — connect to API at localhost:4000</p></div>}" -Encoding UTF8
Set-Content -Path "$root\next.config.js" -Value "module.exports={reactStrictMode:true}" -Encoding UTF8
Write-Host "Scaffolded $Name on port $Port"
