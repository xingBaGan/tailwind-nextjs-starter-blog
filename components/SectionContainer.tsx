import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-4">{children}</div>
    </div>
  )
}
