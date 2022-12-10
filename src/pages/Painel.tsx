import { Fragment, ReactComponentElement, ReactElement } from "react"
import { Sidebar } from "../components/Admin/Sidebar"
import { Header } from "../components/Header"

export const Painel = ({ children }: { children: JSX.Element }) => {
    return (
        <div className="flex  h-screen w-screen" >
            <Sidebar />
            <section className="flex flex-col w-full h-full bg-slate-600">
                <Header />
                {children}
            </section>
        </div>
    )
}