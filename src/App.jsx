import { useState } from 'react'
import './App.css'

const normalize = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim()

const isDate = (s) => {
  const m = s.trim().match(/^(\d{1,2})\s*[/.\-]\s*(\d{1,2})\s*[/.\-]\s*(\d{2}|\d{4})$/)
  return !!m && +m[1] === 13 && +m[2] === 9 && (m[3] === '26' || m[3] === '2026')
}

const questions = [
  {
    text: 'Qual a data do nosso primeiro beijo? 💋',
    placeholder: 'dd/mm/aa',
    check: isDate,
  },
  {
    text: 'Como chamamos o pirulito difícil de abrir? 🍭',
    placeholder: 'Sua resposta...',
    check: (s) => normalize(s) === 'pirulito caro',
  },
]

export default function App() {
  const [step, setStep] = useState(0)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (questions[step].check(answer)) {
      setStep(step + 1)
      setAnswer('')
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <main className="card">
      <div className="hearts">💖</div>
      {step < questions.length ? (
        <form onSubmit={submit} key={step}>
          <p className="step">Pergunta {step + 1} de {questions.length}</p>
          <h1>{questions[step].text}</h1>
          <input
            autoFocus
            value={answer}
            onChange={(e) => { setAnswer(e.target.value); setError(false) }}
            placeholder={questions[step].placeholder}
          />
          {error && <p className="error">Hmm, não foi essa... tente de novo 😉</p>}
          <button type="submit">Responder</button>
        </form>
      ) : (
        <div className="invite">
          <h1>Você acertou tudo! 🎉</h1>
          <p>
            Meu amor, você é a pessoa mais especial da minha vida. Quero te
            convidar para um jantar romântico, só nós dois, com luz de velas,
            boa comida, vinho e muitas risadas.
          </p>
          <p className="big">🍷 Aceita jantar comigo? 🕯️</p>
          <p>Escolha o dia e a hora — eu cuido do resto. 💕</p>
        </div>
      )}
    </main>
  )
}
