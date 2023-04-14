import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { getCampaign, donate } from "@component/services/Web3Service";

export default function Donate() {  
  const [campaign, setCampaign] = useState({} as any);
  const [donation, setDonation] = useState(0)
  const [message, setMessage] = useState("")

  function onChangeId(event: React.FormEvent<HTMLInputElement>) {
    campaign.id = event.currentTarget.value
  }

  function handleSearch(event: React.FormEvent<HTMLInputElement>) {
    setMessage("Buscando. Por favor aguarde...")
    getCampaign(campaign.id)
      .then((result: any) => {
        setMessage("")
        result.id = campaign.id
        setCampaign(result)
      })
      .catch((err: Error) => setMessage(err.message))
  }

  function onChangeDonationValue(event: React.FormEvent<HTMLInputElement>) {
    setDonation(parseFloat(event.currentTarget.value))
  }

  function handleDonateValue() {
    setMessage("Doando. Por favor aguarde...")
    donate(campaign.id, donation)
      .then((transaction: any) => setMessage(`Doação realizada, obrigado. Em alguns minutos o saldo será atualizado.`))
      .catch((err: Error) => setMessage(err.message))
  }

  return (
    <>
      <Head>
        <title>Donate Crypto | Fazer Doação</title>
      </Head>
      <div className="container">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
        {
          campaign.id ?
            <>
              <p className="mb-5">
                Qual é o ID da campanha que procura?
              </p>
              <div className="col-3">
                <div className="input-group mb-3">
                  <input type="number" name="campaignId" id="campaignId" className="form-control" onChange={onChangeId} value={campaign.id} />
                  <input type="button" value="Buscar" className="btn btn-primary p-3" onClick={handleSearch} />
                </div>
              </div>
            </>
          :
          <>
            <p>Verifique se esta é a campanha certa antes de finalizar sua doação.</p>
            <hr />
            <div className="row flex-lg-row-reverse align-items-center g-5">
              <div className="col-7">
                {
                  campaign.videoUrl
                    ? <iframe src={campaign.videoUrl} width="100%" height="480"></iframe>
                    : <Image src={campaign.imageUrl} alt="" className="d-block mx-lg-auto img-fluid" width="640" height="480" />
                }
              </div>
              <div className="col-5 mb-5" style={{ height:480, overflowY: "auto" }}>
                <h2>{campaign.title}</h2>
                <p><strong>Autor:</strong>{campaign.author}</p>
                <p className="mb-3">{campaign.description}</p>
                {
                  campaign.videoUrl &&
                  <p>Assita ao vídeo para entender mais sobre nossa campanha.</p>
                }
                <p className="mb-3 fst-italic mt-5">
                  E aí, o que achou do projeto? Jáfoi arrecadado {campaign.balance / 10 ** 18} BNB nesta campanha. Quanto você quer doar (em BNB)?
                </p>
                <div className="mb-3">
                  <div className="input-group">
                    <input type="number" name="donation" id="donation" className="form-control" onChange={onChangeDonationValue} value={donation} />
                    <span className="input-group-text">BNB</span>
                    <input type="button" value="Doar" className="btn btn-primary p-3 w-25" onClick={handleDonateValue} />
                  </div>
                </div>
              </div>
            </div>
          </>
        }        
        {
          message && <div className="alert alert-success p-3 col-6" role="alert">{message}</div>
        }
      </div>
    </>
  )
}