import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { doLogin } from '../services/Web3Service'

import metamaskIcon from '../../public/metamask.svg'

export default function Home() {
  const [wallet, setWallet] = useState("")
  const [error, setError] = useState("")

  function handleLogin() {
    doLogin()
      .then(walletMetamask => setWallet(walletMetamask))
      .catch(error => setError(error.message))
  }

  return (
    <>
      <Head>
        <title>Donate Crypto | Home</title>        
      </Head>
      <main className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center py-5 g-5">
          {
            !wallet ?
              <div className="col-10 col-sm-8 col-lg-6">
                <Image 
                  priority
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
                  alt="Grupo de pessoas sorrindo na frente de um computador" 
                  className="d-block mx-lg-auto img-fluid"
                  width="700"
                  height="500"
                />
              </div>
            :
              <div className="col-10 col-sm-8 col-lg-6">
                <p className="mb-3">Seja bem vindo <span className="text-success">{wallet}</span></p>
                <p className="mb-3">O que você deseja fazer?</p>
                <div className="cal-12">
                  <p><Link href="/donate" className="btn btn-primary col-6 p-3">Quero fazer uma doação</Link></p>
                  <p><Link href="/create" className="btn btn-secondary col-6 p-3">Quero criar uma campanha</Link></p>
                </div>
              </div>
          }
          <div className='col-lg-6'>
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
            <p className="lead">Sua plataforma descentralizada de doações.</p>
            <p className="lead mb-3">
              Autentique-se com sua carteira, crie sua campanha ou doe para campanhas existentes.
            </p>
            {
              !wallet &&
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type='button' className='btn btn-primary btn-lg px-4 me-md-2'
                  onClick={handleLogin}
                >
                  <Image src={metamaskIcon} className='me-3' width="64" alt="ícone da carteira metamask" />
                  Conectar com a MetaMask
                </button>
              </div>
            }
            <small className="text-danger">{error}</small>
          </div>
        </div>
      </main>
    </>
  )
}
