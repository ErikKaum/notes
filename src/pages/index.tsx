import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const [guess, setGuess] = useState<string>("")
  const [conversation, setConversation] = useState<string[]>(["go running"])

  const submitGuess = async(e:any) => {
		e.preventDefault()
    setConversation([...conversation, guess])

		if (guess.length === 0) {
			return
		}

		console.log(guess)
		setGuess("")
	}

	const handleGuess = (e:any) => {
		e.preventDefault()
		setGuess(e.target.value)
	}


  return (
    <>
      <Head>
        <title>Todo list here!</title>
        <meta name="description" content="A place to make todo lists & take notes with the help of GPT"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen bg-teal-50">
      <div className="flex p-10 w-full h-full justify-center items-end">

      <div className="w-2/3 h-full overflow-hidden rounded-xl">					
        {/* other's guesses */}
        <div className="flex w-full mb-2 h-[calc(90%)] bg-white rounded-xl border border-slate-400">
          <div className="p-10">
            {
              conversation && conversation.map((item: any) => {
                return(
                  <p className="m-4 p-2 rounded-sm bg-blue-100" key={item}>{item}</p>
                )
              })
            }
          </div>
        </div>

        {/* my guess */}
        <form onSubmit={submitGuess} className='flex w-full h-[calc(9%)] items-center rounded-xl'>
          <input
          type="text"
          onChange={(e) => handleGuess(e)}
          className='border border-slate-400 bg-slate-50 w-full h-full px-5 rounded-xl'
          placeholder="what should we do today?"
          value={guess}
          >
          </input>
          <input type="submit" className="hidden"></input>
        </form>				
        </div>
        </div>
        </main>
    </>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
