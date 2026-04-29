export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-amber-500 border-b-transparent animate-spin" />
    </div>
  )
}
