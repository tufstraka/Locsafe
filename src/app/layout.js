export const metadata = {
  title: 'Locsafe 🗺',
  description: 'Locsafe™ is an asset tracking and management system',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossOrigin=""></script>
      </body>
    </html>
  )
}