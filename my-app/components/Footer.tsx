import { NextPage } from "next"

type FooterProps =  {

}

export const Footer: NextPage<FooterProps> = () =>{
    return(
        <div className="container-footer">
            <button><img src="/add.svg" alt="" /> Adicionar uma tarefa</button>
            <span>© Copyright {new Date().getFullYear()}. Todos os direitos reservados.</span>
        </div>
    )
}