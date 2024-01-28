import { Header } from "./Header"
import { Closet } from "./Closet"
export function TapInCloset() {

  return (
    <>
    <div className="tap-container">
      <Header/>
      <Closet/>
    </div>
    </>
  )
}

// TapInCloset will act as the App but for authorized users.
// Header will will always be rendered except in ADD mode.

// First idea was to use conditional ternary operation if user
// selected 'Dress me', 'Closet', or 'Outfits' tab.
