import { useEffect, useState } from "react"
import { api } from "./lib/axios"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"


interface News {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}
const apiKey = import.meta.env.VITE_API_KEY;
export default function App() {
  const [news, setNews] = useState<News[]>([]);
  async function getNews() {
    await api.get(`top-headlines?category=technology&country=br&pagesize=30&apiKey=${apiKey}`, {
      withCredentials: true
    })
    .then((response) => {
        setNews(response.data.articles)
    })
  } 
  useEffect(() => {getNews()}, [])
  
  return (
    <main className=" bg-zinc-50 text-zinc-900 py-4 px-6 flex justify-center flex-col items-center">
      <div className="absolute top-4 left-4">
        <h1 className="font-bold text-4xl">Solrac News</h1>
      </div>
      <div className=" p-4 h-screen flex items-center flex-col space-y-4 max-w-[80%] my-20 w-max">
        {news.map((content) => 
        <div key={content.url} className="max-w-sm w-full h-64 lg:max-w-full lg:flex">
          {/* <div
            className={`h-48 w-48 rounded-l-sm lg:h-auto lg:w-48 flex-none bg-cover bg-center text-center overflow-hidden bg-[url("${content.urlToImage}")]`}>
          </div> */}
          <div className="border border-indigo-600 lg:border-indigo-600 bg-white w-full rounded-md  p-4 flex flex-col justify-between leading-normal">
            <div className=" flex flex-col space-y-4">
              <div>
                <div className="text-gray-900 font-bold text-xl">{content.title}</div>
              </div>
              <p className="text-gray-700 line-clamp-3 text-justify text-base">{content.description}</p>
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="text-md">
                <p className="text-gray-900 leading-none">{content.author}</p>
                <p className="text-gray-600">{format(content.publishedAt, "d' de 'MMMM", {locale : ptBR})}</p>
              </div>
              <div className="mx-5 relative self-end">
                <a href={content.url}
                  className=" shadow-shape font-semibold py-2 px-5 bg-indigo-600 rounded-md text-zinc-50 hover:bg-indigo-400 transition-all">Read</a>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </main>
  )
}