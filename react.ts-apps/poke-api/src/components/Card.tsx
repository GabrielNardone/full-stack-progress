
export const Card = ({ props}: any) => {
    return (
        <div className="card">
            <img src={props.pic} alt={props.name} />
            <div className="card-body">

                <h4><span>{props.id}</span>{props.name}</h4>

            </div>
        </div>
    );
}
