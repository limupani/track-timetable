/**
 * components/Schedule/SundaySplash.jsx
 *
 * Placeholder screen shown when the user switches to Sunday.
 * Replace the content here whenever the Sunday feature ships.
 */

import { shared } from '../../styles/shared'

export default function SundaySplash() {
  return (
    <div style={shared.splash}>
      <div style={shared.splashEmoji}>🌴</div>
      <h2 style={shared.splashTitle}>It's Sunday!</h2>
      <p style={shared.splashSub}>
        Something exciting is coming to your Sundays soon — stay tuned.
      </p>
    </div>
  )
}
