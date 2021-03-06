import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";


export function Subscribe(){
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, {loading}] = useCreateSubscriberMutation()

  async function handleSubscribe(event: FormEvent){
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      }
    })
    
    navigate('/event')
  }


  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="flex flex-col items-center justify-between px-8 mt-20 
        md:w-full md:max-w-[1100px] md:mx-auto md:flex-row"
      >
        <div className="mb-8 md:max-w-[640px]">
          <Logo />
          <h1 className="text-[2rem] leading-tight 
            mt-8 md:text-[2.5rem]"
          >
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong> 
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni repellendus unde mollitia praesentium numquam. Ab provident nemo accusamus nihil nam quibusdam, asperiores qui earum tenetur, sit deleniti, enim labore rerum.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="text" 
              placeholder="Seu nome completo" 
              onChange={event => setName(event.target.value)}
            />

            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="email" 
              placeholder="Digite seu e-mail"
              onChange={event => setEmail(event.target.value)} 
            />

            <button 
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>

        </div>

      </div>

      <img src="/src/assets/image-screen.png" alt="" className="mt-10" />
    </div>
  )
}