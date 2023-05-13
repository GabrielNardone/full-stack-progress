
export const Card = ({ props, handleDelete }: any) => {
    return (
        <div className="card">
            <img src={props.pic} alt={props.name} />
            <div className="card-body">

                <h4><span>{props.id}</span>{props.name}</h4>

                <button
                    onClick={() => handleDelete(props.id)}
                >
                    Delete
                </button>

            </div>
        </div>
    );
}
