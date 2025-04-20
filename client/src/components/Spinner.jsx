import { CircleLoader } from "react-spinners"
const spinner = () => {
  return (
      <div className="spinner">
          <CircleLoader
  color="#167aff"
  size={150}
  speedMultiplier={1}
/>
      </div>
  )
}

export default spinner