import React, { Suspense, lazy } from "react"
import { cn } from "../../lib/utils"

const Spline = lazy(() => import("@splinetool/react-spline"))

const SplineScene = ({ scene, className }) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-2 border-cyan-400/40 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-white/30 text-sm font-mono">Loading 3D...</span>
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={cn("w-full h-full", className)} />
    </Suspense>
  )
}

export { SplineScene }
