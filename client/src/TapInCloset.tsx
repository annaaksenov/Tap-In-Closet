
export function TapInCloset() {
  return (
    <>
    <div className="tap-container">
    </div>
    </>
  )
}

// TapInCloset will act as the App but for authorized users.
// NavBar will will always be rendered except in ADD mode.

// First idea was to use conditional ternary operation if user
// selected 'Dress me', 'Closet', or 'Outfits' tab.
// I could implement Private route
