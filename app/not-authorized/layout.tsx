export const metadata = {
  title: 'Not Authorized',
  description: 'Not authorized to access this  website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
