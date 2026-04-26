import { useEffect } from 'react'

export default function MessengerChat() {
  useEffect(() => {
    // Insert fb-root anchor if missing
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div')
      fbRoot.id = 'fb-root'
      document.body.insertBefore(fbRoot, document.body.firstChild)
    }

    // Load the SDK only once
    if (!document.getElementById('facebook-jssdk')) {
      window.fbAsyncInit = () => {
        window.FB?.init({ xfbml: true, version: 'v19.0' })
      }
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/de_DE/sdk/xfbml.customerchat.js'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div
      className="fb-customerchat"
      attribution="biz_inbox"
      page_id="61584717095028"
      theme_color="#13A538"
      logged_in_greeting="Hallo! Wie können wir Ihnen helfen?"
      logged_out_greeting="Hallo! Wie können wir Ihnen helfen?"
    />
  )
}
