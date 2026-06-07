import '../auth.form.scss'

function Login(){


    const handleSubmit=(e)=>{
          e.preventDefault();
    }

    return(<>
        {/* <h1>LogIn</h1> */}
        <main>
            <div className="form-container">

                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                         <label htmlFor="email">Email:</label>
                         <input type="email" id="email" name="email" placeholder="example@gmail.com" />
                    </div>
                    <div className="input-group">
                         <label htmlFor="password">Password:</label>
                         <input type="password" id="password" name="password" placeholder="" />
                    </div>

                    <button className="button primary-button">login</button>

                </form>

            </div>
        </main>
    </>)
}


export default Login