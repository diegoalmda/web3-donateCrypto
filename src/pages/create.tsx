import { ChangeEvent, useReducer, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { addCampaign, getLastCampaignId } from "@component/services/Web3Service";

const HANDLE_INPUT_TEXT = "HANDLE_INPUT_TEXT"
const CLEAR = "CLEAR"

interface CampaignProps {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

type Action = { type: typeof HANDLE_INPUT_TEXT, field: string, payload: string } | { type: typeof CLEAR }


export default function Create() {

  const initialFormState = {
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  }

  const formReducer = (state: CampaignProps, action: Action) => {
    switch (action.type) {
      case HANDLE_INPUT_TEXT:
        return {
          ...state,
          [action.field]: action.payload,
        }
      case CLEAR:
        return initialFormState
      default: return state
    }
  }
  
  const [campaign, dispatch] = useReducer(formReducer, initialFormState);
  const [message, setMessage] = useState("")

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: HANDLE_INPUT_TEXT,
      field: event.currentTarget.name,
      payload: event.currentTarget.value
    })
  }
  
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: HANDLE_INPUT_TEXT,
      field: event.currentTarget.name,
      payload: event.currentTarget.value
    })
  }

  function handleFormSubmit(event: React.FormEvent<HTMLInputElement>) {
    setMessage("Salvando. Por favor aguarde...")
    addCampaign(campaign)
      .then(tx => getLastCampaignId())
      .then(id => { 
        setMessage(`Campanha salva com ID ${id}. Avise seus amigos e passe esse número.`)
        dispatch({ type: CLEAR })
      })
      .catch(err => {
        console.error(err)
        setMessage(err.message)
      })
  }

  return (
    <>
      <Head>
        <title>Donate Crypto | Criar Campanha</title>
      </Head>
      <div className="container">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
        <p>Preencha os campos para incluir sua campanha na plataforma.</p>
        <hr className="mb-4" />
        <div className="col-6">
          <div className="form-floating mb-3">
            <input type="text" className="form-control" name="title" id="title" value={campaign.title} onChange={(e) => handleTextChange(e)} />
            <label htmlFor="title">Título:</label>
          </div>
          <div className="form-floating mb-3">
            <textarea className="form-control" name="description" id="description" value={campaign.description} onChange={(e) => handleTextAreaChange(e)} />
            <label htmlFor="description">Descrição:</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" name="imageUrl" id="imageUrl" value={campaign.imageUrl} onChange={(e) => handleTextChange(e)} />
            <label htmlFor="imageUrl">URL da imagem:</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" name="videoUrl" id="videoUrl" value={campaign.videoUrl} onChange={(e) => handleTextChange(e)} />
            <label htmlFor="videoUrl">URL do vídeo:</label>
          </div>
        </div>
        <div className="col-6 mb-3">
          <input type="button" className="btn btn-primary col-12 p-3" value="Salvar Campanha" onClick={handleFormSubmit} />
        </div>
        <div className="col-6 mb-3">
          <Link href="/" className="btn btn-secondary col-12 p-3" aria-label="button" role="button">Voltar</Link>
        </div>
        {
          message && <div className="alert alert-success p-3 col-6" role="alert">{message}</div>
        }
      </div>
    </>
  )
}