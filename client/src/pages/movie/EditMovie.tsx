import { useParams } from "react-router";


const EditMovie = () => {
  const {id} = useParams();

  return <div>
    EditMovie
    {id}
  </div>;
}

export default EditMovie;