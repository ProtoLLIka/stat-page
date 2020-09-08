import React, { Component } from 'react'
import './style.css'
class AdminAuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div class="authContainer">
                    <form>
                        <h1>Вход</h1>
                        <input type="text" placeholder="Логин" name="uname" required />
                        <input type="password" placeholder="Пароль" name="psw" required />
                        <button type="submit">Войти</button>
                    </form>


                </div>
            </div>
        )
    }
}

export default AdminAuthPage