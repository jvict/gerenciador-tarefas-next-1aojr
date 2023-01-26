import { NextPage } from "next"
import { useState } from "react"

type HeaderProps =  {
    sair (): void
    showModal():void
}

export const Header: NextPage<HeaderProps> = ({sair, showModal}) =>{
    return(
        <div className="container-header">
            <img src="/logo.svg" alt="Logo FIAP" className="logo"/>
            <button onClick={showModal}><span>+</span> Adicionar Tarefa</button>
            
            <div className="mobile">
            <span>Olá, {localStorage.getItem('name')?.toString()} </span>
                <img src="/exit-mobile.svg" alt="Sair" onClick={sair}/>
            </div>

            <div className="desktop">
                <span>Olá,</span>
                <img src="/exit-desktop.svg" alt="Sair" onClick={sair}/>
            </div>
        </div>
    )
}