
import { NextPageContext } from "next"
import {signOut, getSession} from "next-auth/react"
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import InfoModal from "@/components/InfoModal";


export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if(!session){
    return{
      redirect:{
        destination: '/auth',
        permanent: false,

      }
    }
  }
  return{
    props: {}
  }
}


export default function Home() {
      const { data: user } = useCurrentUser();
      const { data: movies = []} = useMovieList();
      const { data: favorites = []} = useFavorites();
      const { isOpen, closeModal} = useInfoModal();


        return (
              <>
                <InfoModal visible={isOpen} onClose={closeModal}/>
                <Navbar />
                <Billboard />
                <div className="pb-40">
                  <MovieList data={movies} tittle={"Trending Now"}/>
                  <MovieList data={favorites} tittle={"My List of Favorites"}/>
                </div>

              </>
        )
}
