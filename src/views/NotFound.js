import React, { Fragment } from 'react'
import Headerr from '../components/FormHeaderAndFooter/Headerr'
import Footerr from '../components/FormHeaderAndFooter/Footerr'
import fourofour from '../../src/assets/img/404.png'

function NotFound() {
    return (
        <Fragment>
            <div className="container-fluid stepsform stepsform1">
                <div className="row padding-row1 cslocation forgetFPage loginPage">
                    <div className="col-sm-12 loginlogo innnFOur">
                        <Headerr />
                    </div>

                    <div className='col-sm-12 fourofouurrr' style={{padding: '0', position: 'relative', margin: '0 auto'}}>
                        <img src={fourofour} alt='asd' style={{width: '100%'}} />
                        <h3 className='fourofouurrr'>We are Under Maintenance</h3>
                    </div>

                    <div className="col-sm-12 noPadd innnFOur">
                        <Footerr />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NotFound