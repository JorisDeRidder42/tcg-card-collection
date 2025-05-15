const Fault = () => {
    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
            <button onClick={() => window.location.href = '/'}>Back home</button>
        </div>
    )
}
export default Fault;