import "./table.css";
import Tablecard from "../../components/Tablecard/Tablecard";
import Header from "../../components/Header/Header";

function Table() {
  return (
    <div className="table">
    <Header />
    <p>Tableaux</p>
    <Tablecard/>
    </div>

  )
}
export default Table;