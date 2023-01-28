import type { NextPage } from "next";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { executeRequest } from "../services/api";

type LoginProps =  {
    setToken (s: string): void
}

export const Login : NextPage<LoginProps> = ({setToken}) =>{

    const [login,setLogin] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // STATES DO MODAL
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loadingModal, setLoadingModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordModal, setPasswordModal] = useState('')

    const closeModal = () => {
        setShowModal(false);
        setLoadingModal(false);
        setErrorMsg('');
        setName('');
        setEmail('');
        setPasswordModal('');
    }

    const doSave = async () => {
        try{
            setErrorMsg('');
            if(!name || !email || !passwordModal ){
                setErrorMsg('Favor preencher os campos!');
                return
            }

            setLoadingModal(true);

            const body = {
                name,
                email,
                password: passwordModal
            };

            await executeRequest('user', 'post', body);
            closeModal();
        }catch(e : any){
            console.log(`Erro ao criar novo usuario: ${e}`);
            if(e?.response?.data?.error){
                setErrorMsg(e.response.data.error);
            }else{
                setErrorMsg(`Erro ao cadastrar usuario, tente novamente.`);
            }
        }

        setLoadingModal(false);
    }

    const  doLogin = async () => {
        try {
            setError('');
            if(!login || !password){
                setError('Favor preencher os campos!')
                return
            }

            setLoading(true);

            setError('Formulario Ok')
            const body = {
                login,
                password
            }

            const result = await executeRequest('login','post', body);
            if(result && result.data){
                const obj = result.data
                localStorage.setItem('accessToken',obj.token);
                localStorage.setItem('name',obj.name);
                localStorage.setItem('email',obj.email);
                setToken(obj.token);
            }

        } catch (e: any) {
            console.log(`Erro ao efetuar Login: ${e}`);
            if(e?.response?.data?.error){
                setError(e?.response?.data?.error)
            } else {
                setError('Erro ao efetuar login, tente novamente.');
            }
            
        }

        setLoading(false);
    }

    return (
        <>
            <div className="container-login">
                <img src="/logo.svg" alt="Logo FIAP" className="logo"/>
                <div className="form">
                    {error && <p className="error">{error}</p>}

                    {/* input login/email */}
                    <div className="input">
                        <img src="/mail.svg" alt="Login Icone" />
                        <input type="text" placeholder="Login"
                            value={login}
                            onChange={evento=> setLogin(evento.target.value)}
                        />
                    </div>

                    {/* input passworld */}   
                    <div className="input">
                        <img src="/lock.svg" alt="Senha Icone" />
                        <input type="password" placeholder="Senha"
                            value={password}
                            onChange={evento => setPassword(evento.target.value)}
                        />
                    </div>

                    <button onClick={doLogin} disabled={loading}>{loading ? '...Carregando' : 'Login'}</button>
                    <span  onClick={() => setShowModal(true)}>Cadastra-se já !!</span>
                    
                </div> 
                
            </div>
            <Modal
                show={showModal}
                onHide={closeModal}
                className="container-modal"
            >
                <Modal.Body>
                    <p>Novo Cadastro</p>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <input type='text' placeholder="Nome"
                        value={name} onChange={e => setName(e.target.value)} />
                    <input type='text' placeholder="Email"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <input type='text' placeholder="Senha" 
                        value={passwordModal} onChange={e => setPasswordModal(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <div className="button col-12">
                        <button onClick={doSave} disabled={loadingModal}>{loadingModal ? '...Carregando' : 'Cadastrar'}</button>
                        <span onClick={closeModal}>Cancelar</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}