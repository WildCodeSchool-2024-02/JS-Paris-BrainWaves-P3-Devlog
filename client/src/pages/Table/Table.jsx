import { useParams } from "react-router-dom";
import "./table.css";
import Tablecard from "../../components/Tablecard/Tablecard";
import Header from "../../components/Header/Header";

function Table() {
  const { id } = useParams();

  return (
    <div className="table">
      <Header />
      <p>Tableaux</p>
      <Tablecard projectId={id} />
    </div>
  );
}

export default Table;
