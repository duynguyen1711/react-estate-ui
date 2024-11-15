import Filter from "../../components/filter/Filter";
import { listData } from "../../lib/dummydata"
import "./listPage.scss"

const ListPage = () => {
    const data = listData;
    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                </div>
            </div>
            <div className="mapContainer">map</div>
        </div>
    )
}

export default ListPage
