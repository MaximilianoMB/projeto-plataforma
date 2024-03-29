import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber ($name: String!, $email: String!){
        createSubscriber(data: {name: $name, email: $email}) {
            id
        }
    }
` 

export function Subscribe() {

    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();
       await createSubscriber({
            variables: {
                name,
                email,
            }
        })
        navigate('/event')
    }

    return(
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />
                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Assista aos melhores <strong className="text-blue-500">solos de guitarra</strong> do planeta!
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em cada sessão teremos um grande intérprete do instrumento debulhando seu cerebelo!
                    </p>
                </div>
                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Insira qualquer e-mail e senha</strong>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input 
                        className="bg-gray-900 rounded px-5 h-14"
                        type="text" 
                        placeholder="Seu nome completo"
                        onChange={event => setName(event.target.value)}>
                        </input>
                        <input 
                        className="bg-gray-900 rounded px-5 h-14"
                        type="email"
                        placeholder="Digite seu e-mail"
                        onChange={event => setEmail(event.target.value)}>
                        </input>
                        <button
                        disabled={loading}
                        className="mt-4 bbg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50" 
                        type="submit">
                            Quero ver essa maestria!
                        </button>
                    </form>
                </div>
            </div>
            <img src="/src/assets/coldMockup.png" className="mt-18" alt=""></img>
        </div>
    );
}
