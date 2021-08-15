
const Message = ({ msg }) => (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
        {msg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
);

export default Message;
