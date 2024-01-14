import Image from 'next/image'
import CommentsForm from "@/components/CommentsForm"

export default function Home() {
  return(
    <div className="p-2   " >
      <div className="bg-gray-800 rounded-xl" >
        <CommentsForm/>
       </div>
    </div>
  )
}
